const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");
const pokemonRouter = require("./routers/pokemonRouter");
const movesRouter = require("./routers/movesRouter");
const userRouter = require("./routers/userRouter");
const http = require('http')
const { v4: uuidv4 } = require('uuid');
const {Server} = require("socket.io");
const damage = require("./damage");

console.log("it is working !");

const urls=["https://pokemon-showdown-mu.vercel.app",'http://localhost:5173','https://poke-showdown.vercel.app']

const corsOptions = {
  origin: urls[1],
  credentials: true, //
};
 
app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", urls[1]);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
const server = app.listen(8000, () => {
  console.log("Server started.");  
}); 

const io = new Server(server, {
  cors: {
    origin: "*",
    methods : ['GET','POST','PATCH','DELETE']
  }
})

const roomMap = {};   
// let roomAvail = -1;
let userRoomMap = {};
const attacks = {};
io.on("connection", (socket) => {
  // console.log("user connected", socket.id)

  socket.on("searchForOnlineMatch", (data) => {
    console.log(data.player.name,data.userid); 
    let room = -1;
    for (let x of Object.keys(roomMap)) {
      if (roomMap[x].length < 2) {
        room = x;
        break;
      }
    }
    if (room == -1) {
      room = uuidv4();  
      roomMap[room] = [];
    }
    socket.join(room);
    roomMap[room].push(data.userid);
    userRoomMap[data.userid] = room;
    console.log(roomMap);
    if (roomMap[room].length === 2) {
      io.to(room).emit('game_start', room); 
      room = -1;
    }
  })

  socket.on("playerinfo", (data) => {
    // console.log(data,"sd");
    socket.to(data.room).emit("playerinfo",data.player);  
  })

  socket.on("opponentPokemon", (data) => {
    socket.to(data.room).emit("opponentPokemon",data.selectedPokemon);
  })  
            
  socket.on("attack", (data) => {
    
    // console.log(data);
    if (!attacks[data.room]) {
      attacks[data.room] = []; 
    }
    if (attacks[data.room].length === 0) attacks[data.room].push(data);
    if (attacks[data.room].length === 1) {
      if (attacks[data.room][0].player === data.player)
        attacks[data.room][0] = data;
      else {
        if (attacks[data.room][0].pokemon.spe > data.pokemon.spe)
          attacks[data.room].push(data);
        else
          attacks[data.room].unshift(data);
          
        const player1 = attacks[data.room][0],player2=attacks[data.room][1];
        const damage1 = damage(player1.pokemon, player2.pokemon, player1.move);
        const damage2 = damage(player2.pokemon, player1.pokemon, player2.move);

        player2.pokemon.currHp -= damage1;
        let ok = player2.pokemon.currHp <= 0;
        player1.pokemon.currHp -= ok ? 0 : damage2;  
   
        const data1 = {
          name: player1.player,
          pokemon: player1.pokemon,
          message: `Initial attack by ${player1.move.Name} inflicts ${damage1.toFixed(2)} damage!`
        }
        const data2 = {
          name: player2.player,
          pokemon: player2.pokemon,
          message: ok ? `Opponent's attack struck first, causing Pokemon's defeat.` : `Follow-up attack with ${player2.move.Name} deals ${damage2.toFixed(2)} damage!`
        }
        console.log('here');
        io.to(data.room).emit("damageInfo", { data1, data2 }); 
        attacks[data.room] = [];
      }        
    } 
  })

  socket.on("message", (data) => {
    socket.to(data.room).emit("message", { user: data.user, message: data.message });          
  })

  socket.on('resign', (data) => {
    socket.to(data.room).emit('resign', { winner: data.winner, message: data.message });    
  })
  
  socket.on("user_disconnect", (data) => {
    const room = userRoomMap[data.userid];
    delete roomMap[room];
    console.log(data.userid,roomMap);
    // roomAvail = -1;
  })
  socket.on("join_room", (data) => {
    console.log("room joined", data);
    socket.join(data); 
  })
      
  socket.on("send_message", (data) => { 
    console.log(data);
    socket.to(data.roomid).emit("receive_message", data);
  })
 
  socket.on("pokemon", (data) => {
    console.log(data);
    socket.to(data.roomid).emit("opponent_pokemon",data)
  })

  socket.on("currhp", (data) => {
    socket.to(data.roomid).emit("opponent_hp", data);
  })    

  socket.on("attack", (data) => {
    // console.log("here",data);
    socket.to(data.roomid).emit("opponent_attack", data);
  })

  // socket.on("disconnect", () => {
  //   console.log("User Disconnected", socket.id);
  // }) 

})

   

app.get("/", (req, res) => {
  res.json("Hello world sdfsfs");
});


app.use('/pokemon',pokemonRouter)
app.use('/moves', movesRouter)
app.use('/user',userRouter)



