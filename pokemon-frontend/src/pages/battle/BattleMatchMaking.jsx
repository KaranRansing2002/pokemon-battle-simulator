import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { userContext } from "../../App";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useSWR from "swr";
import axios from "axios";
import FindLoader from "../../components/Loaders/FindLoader";
import { useNavigate } from "react-router-dom";
import Battle from "./Battle";
import io from "socket.io-client";
import api from "../../helper/api"; // your backend base URL

// Create SOCKET INSTANCE ONLY ONCE
const socket = io(api, { autoConnect: false });

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const fetcher = async (url) => {
  const { data } = await axios.get(url);
  return data.map((p) => p.username);
};

const initialState = {
  player1: {
    name: undefined,
    selectedPokemon: undefined,
    selectedMove: undefined,
  },
  player2: {
    name: undefined,
    selectedPokemon: undefined,
    selectedMove: undefined,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add_entry":
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          [action.payload.key]: action.payload.value,
        },
      };

    case "add_playerinfo":
      return { ...state, player2: action.payload };

    case "set_orignal":
      return {
        ...state,
        player1: { ...state.player1, selectedPokemon: undefined, selectedMove: undefined },
        player2: { ...state.player2, selectedPokemon: undefined, selectedMove: undefined },
      };

    default:
      return state;
  }
};

function BattleMatchMaking() {
  const { battleTeam, setBattleTeam, userinfo } = useContext(userContext);

  const [roomid, setRoomid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);
  const myteam = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!battleTeam) {
      const team = localStorage.getItem("team");
      if (team) {
        const parsed = JSON.parse(team);
        setBattleTeam(parsed);
        myteam.current = [...parsed];
      }
    }
  }, []);

  useEffect(() => {
    if (userinfo) {
      dispatch({
        type: "add_entry",
        payload: { player: "player1", key: "name", value: userinfo.username },
      });
    }
  }, [userinfo]);

  // SOCKET EVENT LISTENERS — only once
  useEffect(() => {
    // game start event
    socket.on("game_start", (data) => {
      console.log("GAME START:", data);
      setRoomid(data.room);
      setLoading(false);
    });

    return () => {
      socket.off("game_start");
    };
  }, []);

  // load users
  const { data } = useSWR(`${api}/user/all`, fetcher);

  const handleSearchPlayers = () => {
    setLoading(true);
    socket.connect();

    if (battleTeam) myteam.current = [...battleTeam];

    dispatch({ type: "set_orignal" });

    socket.emit("searchForOnlineMatch", {
      player: state.player1,
      userid: userinfo._id,
    });
  };

  const handleStopSearch = () => {
    setLoading(false);
    socket.emit("user_disconnect", { userid: userinfo._id });
    socket.disconnect();
  };

  // No team selected
  if (!battleTeam || !userinfo || battleTeam.length === 0) {
    return (
      <div className="p-4 h-full flex flex-col justify-center items-center gap-4 uppercase text-red-400 text-2xl">
        <h2>Please Select a Team First</h2>
        <Button color="success" variant="contained" onClick={() => navigate("/myteams")}>
          My Teams
        </Button>
      </div>
    );
  }

  // BEFORE MATCH FOUND
  if (!roomid) {
    return (
      <ThemeProvider theme={darkTheme}>
        <div className="h-full flex flex-col p-16 items-center gap-4">
          <h1 className='uppercase text-center text-bold text-4xl text-transparent bg-[url("https://img1.picmix.com/output/stamp/normal/6/9/4/3/1503496_0792d.gif")] bg-center bg-cover bg-clip-text '>
            get ready for the battle
          </h1>

          {/* Challenger selection */}
          {!loading && (
            <div className="flex flex-col gap-4 text-green-400 text-bold text-xl items-center">
              <h3>Challenge User / Friend</h3>

              <Autocomplete
                value={value}
                onChange={(e, val) => setValue(val)}
                inputValue={inputValue}
                onInputChange={(e, val) => setInputValue(val)}
                options={data?.filter((u) => u !== userinfo.username) || []}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Search user..." />}
              />
            </div>
          )}

          {/* Challenge button */}
          {value && !loading && (
            <div className="text-blue-400 mt-4 text-2xl">
              {value}{" "}
              <Button variant="contained" color="success">
                Challenge
              </Button>
            </div>
          )}

          {/* Search Online Button */}
          <div className="mt-8">
            {loading ? (
              <div className="flex flex-col gap-8 text-white">
                <Button variant="contained" color="error" onClick={handleStopSearch}>
                  Stop
                </Button>
                <FindLoader />
                ... searching players
              </div>
            ) : (
              <Button
                variant="contained"
                disabled={inputValue !== ""}
                onClick={handleSearchPlayers}
                color="success"
              >
                Search online
              </Button>
            )}
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // AFTER MATCH FOUND → BATTLE PAGE
  return (
    <div className="h-full">
      <Battle
        state={state}
        socket={socket}
        room={roomid}
        dispatch={dispatch}
        battleTeam={battleTeam}
        setRoom={setRoomid}
      />
    </div>
  );
}

export default BattleMatchMaking;
