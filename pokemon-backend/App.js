const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const pokemonRouter = require("./routers/pokemonRouter");
const movesRouter = require("./routers/movesRouter");
const userRouter = require("./routers/userRouter");
const { v4: uuidv4 } = require("uuid");
const { Server } = require("socket.io");
const damage = require("./helper/damage");

// Allowed origins
const urls = [
  "https://pokemon-showdown-mu.vercel.app",
  "http://localhost:5173",
  "https://poke-showdown.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    const allowCredentials = origin && urls.includes(origin);
    const selectedOrigin = allowCredentials ? origin : "*";
    callback(null, selectedOrigin);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Manual CORS headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", urls[2]);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Start server
const server = app.listen(8000, () => {
  console.log("Server started.");
});

// Socket setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

// ========= NEW MATCHMAKING SYSTEM ========= //

let waitingPlayer = null; // store 1 player waiting
const userRoomMap = {}; // userid → room
const roomPlayers = {}; // room → [users]
const attacks = {}; // same as before

io.on("connection", (socket) => {
  console.log("user connected:", socket.id);

  // Player searching for online match
  socket.on("searchForOnlineMatch", (data) => {
    console.log("Searching:", data.player.name, data.userid);

    // If nobody waiting → queue this user
    if (!waitingPlayer) {
      waitingPlayer = { socket, data };
      console.log("Waiting:", data.userid);
      return;
    }

    // Someone was already waiting → match them
    const opponent = waitingPlayer;
    waitingPlayer = null;

    const roomId = uuidv4();

    // Join both players to the room
    socket.join(roomId);
    opponent.socket.join(roomId);

    // Map players to room
    userRoomMap[data.userid] = roomId;
    userRoomMap[opponent.data.userid] = roomId;
    roomPlayers[roomId] = [data.userid, opponent.data.userid];

    console.log("Room created:", roomId);

    // Emit game start
    io.to(roomId).emit("game_start", {
      room: roomId,
      users: roomPlayers[roomId],
    });
  });

  // Send player info
  socket.on("playerinfo", (data) => {
    socket.to(data.room).emit("playerinfo", data.player);
  });

  // Opponent Pokémon
  socket.on("opponentPokemon", (data) => {
    socket.to(data.room).emit("opponentPokemon", data.selectedPokemon);
  });

  // Attack logic (kept same, cleaned & stable)
  socket.on("attack", (data) => {
    const room = data.room;

    if (!attacks[room]) attacks[room] = [];

    if (attacks[room].length === 0) {
      attacks[room].push(data);
      return;
    }

    const first = attacks[room][0];
    const second = data;

    // If same user re-attacks, replace
    if (first.player === second.player) {
      attacks[room][0] = second;
      return;
    }

    // Determine attack order by speed
    let order = [first, second];
    if (second.pokemon.spe > first.pokemon.spe) {
      order = [second, first];
    }

    const [p1, p2] = order;

    const dmg1 = damage(p1.pokemon, p2.pokemon, p1.move);
    const dmg2 = damage(p2.pokemon, p1.pokemon, p2.move);

    p2.pokemon.currHp -= dmg1;
    const fainted = p2.pokemon.currHp <= 0;

    if (!fainted) {
      p1.pokemon.currHp -= dmg2;
    }

    io.to(room).emit("damageInfo", {
      data1: {
        name: p1.player,
        pokemon: p1.pokemon,
        message: `Initial attack by ${p1.move.Name} inflicts ${dmg1.toFixed(2)} damage!`,
      },
      data2: {
        name: p2.player,
        pokemon: p2.pokemon,
        message: fainted
          ? "Opponent's Pokémon fainted!"
          : `Follow-up attack by ${p2.move.Name} deals ${dmg2.toFixed(2)} damage!`,
      },
    });

    attacks[room] = [];
  });

  socket.on("message", (data) => {
    socket.to(data.room).emit("message", { user: data.user, message: data.message });
  });

  socket.on("resign", (data) => {
    socket.to(data.room).emit("resign", { winner: data.winner, message: data.message });
  });

  // DISCONNECT LOGIC
  socket.on("disconnect", () => {
    console.log("disconnected:", socket.id);

    // If this player was waiting → remove
    if (waitingPlayer && waitingPlayer.socket.id === socket.id) {
      waitingPlayer = null;
      return;
    }

    // Find user's room
    let found = Object.entries(userRoomMap).find(([uid, room]) => {
      const userSocket = io.sockets.sockets.get(socket.id);
      return userSocket && userSocket.rooms.has(room);
    });

    if (found) {
      const [userid, room] = found;

      delete userRoomMap[userid];
      delete roomPlayers[room];
      delete attacks[room];

      socket.to(room).emit("opponent_left");
    }
  });

  // Old events kept for compatibility
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.roomid).emit("receive_message", data);
  });

  socket.on("pokemon", (data) => {
    socket.to(data.roomid).emit("opponent_pokemon", data);
  });

  socket.on("currhp", (data) => {
    socket.to(data.roomid).emit("opponent_hp", data);
  });

  socket.on("attack", (data) => {
    socket.to(data.roomid).emit("opponent_attack", data);
  });
});

// Base route
app.get("/", (req, res) => {
  res.json("Hello world :)");
});

// API routes
app.use("/pokemon", pokemonRouter);
app.use("/moves", movesRouter);
app.use("/user", userRouter);
