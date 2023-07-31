import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { userContext } from '../../App';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useSWR from 'swr';
import api from '../../helper/api';
import axios from 'axios';
import FindLoader from '../../components/Loaders/FindLoader';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
const socket = io.connect(`${api}`);
import Battle from './Battle';

const options = ['Option 1', 'Option 2', 'Option 2', 'Option 2', 'Option 2', 'Option 2', 'Option 2', 'Option 2', 'Option 2', 'Option 2', 'Option 2', 'Option 2', 'Option 2', 'Option 2'];

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const fetcher = async (...args) => {
    const resp = await axios.get(...args);
    let data = resp.data.map(p => p.username);
    // console.log("data",data)
    return data;
}
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
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add_entry':
            const { player, key, value } = action.payload;
            return {
                ...state,
                [player]: {
                    ...state[player],
                    [key]: value
                }
            }
        case 'add_playerinfo':
            return {
                ...state,
                'player2': action.payload
            }
        
        case 'update_state':
            return action.payload;
        
        case 'set_orignal':
            return {
                ...state,
                player1: {
                    ...state.player1,
                    selectedPokemon: undefined,
                    selectedMove : undefined
                },
                player2: {
                    ...state.player2,
                    selectedPokemon: undefined,
                    selectedMove : undefined
                }
            }
        
        default:
            return state;
    }
}

function BattleMatchMaking() {

    const { battleTeam, setBattleTeam, userinfo } = useContext(userContext)
    const [roomid, setRoomid] = useState();
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    const navigate = useNavigate();

    const myteam = useRef();

    useEffect(() => {
        // console.log(userinfo, battleTeam)
        if (!battleTeam) {
            let team = localStorage.getItem('team');
            // console.log(team);
            if (team) {
                setBattleTeam(JSON.parse(team));
                myteam.current = [...JSON.parse(team)];
                console.log(myteam)
            }
        }
    }, [])
    useEffect(() => {
        if (userinfo) dispatch({ type: 'add_entry', payload: { player: 'player1', key: 'name', value: userinfo?.username } });
    }, [userinfo])
  
    useEffect(() => {
        socket.on("game_start", (data) => {
            setRoomid(data);
            setLoading(false);
            console.log(data);
        })   
        return ()=>socket.removeAllListeners();
    }, [socket])

    let { data, isLoading, error } = useSWR(`${api}/user/all`, fetcher);

    const handleChallengeUser = () => {
        socket.connect();
        //man nhi kr rha badme karunga
    }
    const handleSearchPlayers = () => {
        setLoading(true);
        // console.log(userinfo['_id']);
        socket.connect(); 
        if (battleTeam) myteam.current = [...battleTeam];
        dispatch({ type: 'set_orignal' });
        socket.emit('searchForOnlineMatch', {player : state.player1,userid : userinfo['_id']});
    }

    if (!battleTeam || !userinfo || battleTeam.length===0) {
        return (
            <div className='p-4 h-full flex flex-col justify-center items-center gap-4 uppercase text-red-400 text-2xl'>
                <h2 className='text-center'>Please Select a Team First</h2>
                <Button color='success' onClick={() => navigate('/myteams')} variant='contained'>my teams</Button>
            </div>
        )
    }

    if (!roomid) {
        return (
            <ThemeProvider theme={darkTheme}>
                <div className='h-full flex flex-col p-16 items-center gap-4 '>
                    <h1 className='uppercase text-center text-bold text-4xl text-transparent bg-[url("https://img1.picmix.com/output/stamp/normal/6/9/4/3/1503496_0792d.gif")] bg-center bg-cover bg-clip-text '>get ready for the battle</h1>
                    {!loading && <div className='flex sm:flex flex-col sm:gap-4 gap-4 text-green-400 text-bold sm:text-2xl text-xl items-center'>
                        <h3>Challenge User/Friend </h3>
                        <Autocomplete
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={data?.filter(p=>(p!=userinfo.username))}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Search ..." />}
                        />
                    </div>}
                    {
                        (value && !loading) &&
                        <div className='text-blue-400 text-underline mt-4 text-2xl'>{value} <Button variant='contained' color='success' onClick={handleChallengeUser} >Challenge</Button></div>
                    }
                    <div className='mt-8'>
                        {loading ? 
                            
                            <div className='flex flex-col gap-8 text-white'>
                                <Button variant='contained' color='error' onClick={() => { setLoading(false); socket.emit("user_disconnect", { userid: userinfo['_id'] }); socket.disconnect(); }} >stop</Button>
                                <FindLoader />
                                ... searching players
                            </div>
                            : <Button variant='contained' disabled={inputValue !== ''} onClick={handleSearchPlayers} color='success'>Search online</Button>
                        }
                        
                    </div>
                </div>
            </ThemeProvider>
        )
    }

    return (
        <div className='h-full'>
            <Battle state={state} socket={socket} room={roomid} dispatch={dispatch} battleTeam={battleTeam} setRoom={setRoomid} />
        </div>
    )
}

export default BattleMatchMaking
