import React, { useContext, useEffect, useReducer, useState } from 'react'
import { userContext } from '../../App'
import { Button, createTheme, IconButton, ThemeProvider, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { backgrounds } from '../../helper/battleBackgrounds'
import pokemonAlive from '../../assets/pokeball-alive.png'
import pokemonDead from '../../assets/pokeball-dead.png'
import Timer from './Timer'
import RenderPokemon from './RenderPokemon'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { types } from '../../helper/types'
import GameEnd from './GameEnd'
import Chat from './Chat'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];

const Slot = ({ info, battleTeam, lostcnt }) => {
    return (
        <div className='grid grid-cols-5 gap-1 h-full'>
            <div className='bg-[#343434] col-span-1 flex flex-col items-center border-2 border-black'>
                <h3 className='text-blue-400 text-xs bg-black w-full text-center'>{info.title}</h3>
                <img src={info.image} className='h-10' />
            </div>
            <div className='bg-[#343434] col-span-4 border-2 border-black text-white pl-2 text-sm'>
                <div className='flex gap-2'>{battleTeam.map((p, index) => <img src={index > lostcnt - 1 ? pokemonAlive : pokemonDead} key={index} className='h-4' />)}</div>
                {info.message}
            </div>
        </div>
    )
}

export const ToolTipComp = ({ pokemon }) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='text-black flex gap-2 items-center'>
                {pokemon.types.map((p, index) => (<div key={index} className={`text-center p-1 border rounded border-black bg-[${types[p]}] flex`}>{p}</div>))}
                <h3>bst : {pokemon.bst}</h3>
            </div>
            <div className='flex flex-col gap-1'>
                <h3>hp : {pokemon.hp} | atk : {pokemon.atk} | def : {pokemon.def}</h3>
                <h3>spa : {pokemon.spa} | spd : {pokemon.spd} | spe : {pokemon.spe}</h3>
            </div>
        </div>
    )
}

let user = '', opponent = '';
function Battle({ state, socket, room, dispatch, battleTeam, setRoom }) {

    const { userinfo } = useContext(userContext)
    const navigate = useNavigate();

    const [resign, setResign] = useState('resign');
    const [status, setStatus] = useState(['waiting for action...', 'waiting for action...']);
    const [lostCount, setLostCount] = useState([0, 0]);
    const [gameEnd, setGameEnd] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.emit("playerinfo", { player: state.player1, room: room });
        user = userinfo.username;
        battleTeam.forEach((x, ind) => {
            battleTeam[ind] = { ...x, currHp: x.hp };
        })
    }, [])

    useEffect(() => {
        let timeoutid = undefined;
        socket.on("playerinfo", (data) => {
            dispatch({ type: 'add_playerinfo', payload: data });
            opponent = data.name;
        })
        socket.on("opponentPokemon", (data) => {
            dispatch({ type: 'add_entry', payload: { player: 'player2', key: 'selectedPokemon', value: data } })
        })
        socket.on("damageInfo", (data) => {
            console.log(state, data);
            let player1 = {}, player2 = {};
            if (data.data1.name === user) {
                player1 = data.data1;
                player2 = data.data2;
            }
            else {
                player1 = data.data2;
                player2 = data.data1;
            }
            dispatch({ type: 'add_entry', payload: { player: 'player1', key: 'selectedPokemon', value: player1.pokemon } });
            dispatch({ type: 'add_entry', payload: { player: 'player2', key: 'selectedPokemon', value: player2.pokemon } });
            // const selPokemon = state.player1.selectedPokemon.name
            battleTeam.forEach((x, index) => {
                if (x.name == player1.pokemon.name) {
                    battleTeam[index] = player1.pokemon;
                }
            });
            setStatus([player1.message, player2.message]);
            timeoutid = setTimeout(() => {
                if (player1.pokemon.currHp <= 0) {
                    setLostCount(p => [p[0] + 1, p[1]]);
                    dispatch({ type: 'add_entry', payload: { player: 'player1', key: 'selectedPokemon', value: undefined } });
                    dispatch({ type: 'add_entry', payload: { player: 'player1', key: 'selectedMove', value: undefined } });
                }
                else if (player2.pokemon.currHp <= 0) {
                    setLostCount(p => [p[0], p[1] + 1]);
                    dispatch({ type: 'add_entry', payload: { player: 'player2', key: 'selectedPokemon', value: undefined } });
                    dispatch({ type: 'add_entry', payload: { player: 'player2', key: 'selectedMove', value: undefined } });
                }
            }, 1400);
        })

        socket.on("message", (data) => {
            setMessages(m => [...m, data]);
        })

        socket.on("resign", (data) => {
            console.log(data);
            setGameEnd(data);
            setOpen(true);
        })

        return () => {
            if (timeoutid) clearTimeout(timeoutid);
            socket.emit("user_disconnect", { userid: userinfo['_id'] });
            socket.disconnect();
            // socket.removeAllListners();
        }
    }, [socket])

    useEffect(() => {
        let ok = false;
        if (lostCount[0] === 6) {
            ok = true;
            setGameEnd({ winner: opponent, message: `${opponent} won with ${6 - lostCount[1]} remaning!` });
        }
        if (lostCount[1] === 6) {
            ok = true;
            setGameEnd({ winner: user, message: `${user} won with ${6 - lostCount[0]} remaning!` });
        }
        if (resign === 'resigned') {
            ok = true;
            const obj = { winner: opponent, message: `${user} resigned the game!` }
            setGameEnd(obj);
            socket.emit("resign", { ...obj, room })
        }
        setOpen(ok);
    }, [lostCount, resign])

    useEffect(() => {
        if (gameEnd) {
            socket.emit("user_disconnect", { userid: userinfo['_id'] });
            socket.disconnect();
        }
    }, [gameEnd])

    const handlePokemonSelect = (pokemon) => {
        dispatch({ type: 'add_entry', payload: { player: 'player1', key: 'selectedPokemon', value: { currHp: pokemon.hp, ...pokemon } } });
        socket.emit("opponentPokemon", { selectedPokemon: { currHp: pokemon.hp, ...pokemon }, room: room });
    }

    const handleSelectMove = (move) => {
        dispatch({ type: 'add_entry', payload: { player: 'player1', key: 'selectedMove', value: move } });
        setStatus(s => [`selected move ${move.Name}`, 'waiting for action...']);
        socket.emit("attack", { player: state.player1.name, pokemon: state.player1.selectedPokemon, move, room })
        // wierd thing here 
        let pokemon = { ...state['player1']['selectedPokemon'] }
        pokemon = {
            ...pokemon,
            'moves': pokemon.moves.map(x => {
                if (x.id === move.id)
                    x.PP = Math.max(0, x.PP - 1);
                return x;
            })
        }
        dispatch({ type: 'add_entry', payload: { player: 'player1', key: 'selectedPokemon', value: pokemon } });
    }

    const sendMessage = () => {
        if (message !== '') {
            console.log(message);
            setMessages(m => [...m, { user, message }]);
            socket.emit("message", { user, message, room });
        }
    }

    return (
        <div className=' h-full sm:p-1 flex-grow'>
            <ThemeProvider theme={darkTheme}>
                <div className='grid sm:grid-cols-7 grid-cols-1 h-screen gap-2 p-2 flex-grow sm:h-full w-full'>

                    <div className='bg-[#1E2021] col-span-1 sm:col-span-4 p-2 grid grid-rows-6 gap-2 '>
                        <div className={`row-span-6 rounded border-4 border-black bg-[url(${background})] bg-no-repeat bg-cover min-h-[300px] grid grid-rows-2`}>
                            <div className='grid grid-cols-2 pt-4'>
                                <div style={{ gridColumn: '2' }}>
                                    {state.player2.selectedPokemon && <RenderPokemon pokemon={state.player2.selectedPokemon} front key={state.player2?.selectedPokemon?.name} ToolTip={ToolTipComp} />}
                                </div>
                            </div>
                            <div className='grid grid-cols-2 '>
                                {state.player1.selectedPokemon && <RenderPokemon pokemon={state.player1.selectedPokemon} key={state.player1.selectedPokemon.name} ToolTip={ToolTipComp} />}
                            </div>
                        </div>

                        {state.player1.selectedPokemon ? (
                            <div className='row-span-1 grid grid-cols-4 gap-1 p-1 border-slate-400 border-2'>
                                {state.player1.selectedPokemon.moves.map((move, index) => (
                                    <Tooltip key={index} arrow placement='bottom' title={<div className=''>
                                        <div className={`border border-black text-black mb-1 w-auto rounded p-1 bg-[${types[move.Type.toLowerCase()]}]`}>{move.Type}</div>
                                        <h3>pow : {move.Power} | acc : {move.Accuracy}</h3>
                                    </div>}>
                                        <Button variant='contained' color='success' sx={{ padding: '2px' }} disabled={move.PP === 0} onClick={() => handleSelectMove(move)}>
                                            <div className='font-bold sm:text-sm text-xs w-full '>
                                                <h2 className='text-xs'>{move.Name}</h2>
                                                <h3>{move.PP}</h3>
                                            </div>
                                        </Button>
                                    </Tooltip>
                                ))}
                            </div>
                        ) : (
                            <div className='w-full row-span-1 grid place-items-center text-red-400 uppercase  border-slate-400 p-1'>Please Select a pokemon to see their moves!</div>
                        )}
                        <div className='row-span-1 grid grid-cols-6 gap-1 border-slate-400 border-2 p-1 max-h-full'>
                            {battleTeam.map((pokemon, index) => (
                                <div
                                    key={index}
                                    className={`border-green-200 border bg-[#343434] hover:scale-[1.1] transition-scale duration-300 ${pokemon.currHp <= 0 && 'pointer-events-none brightness-50 cursor-not-allowed'} ease-in-out h-full grid place-items-center`}
                                    onClick={() => handlePokemonSelect(pokemon)}
                                >
                                    <Tooltip arrow placement="bottom-end" title={<ToolTipComp pokemon={pokemon} />}><img src={pokemon.image} className='sm:h-16' alt={`Pokemon ${index + 1}`} /></Tooltip>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='bg-[#1E2021] sm:col-span-3 p-2 grid grid-rows-4 gap-2'>
                        <div className='grid grid-cols-5 gap-1 row-span-1 h-full'>
                            <div className='flex flex-col gap-1 col-span-4'>
                                <Slot info={{ title: state.player1.name, image: state.player1.selectedPokemon?.image, message: status[0] }} battleTeam={battleTeam} lostcnt={lostCount[0]} />
                                <Slot info={{ title: state.player2.name, image: state.player2.selectedPokemon?.image, message: status[1] }} battleTeam={battleTeam} lostcnt={lostCount[1]} />
                            </div>
                            <div className='col-span-1 grid gap-2 place-items-center h-full'>
                                <div className='w-full bg-[#343434] border-2 border-black h-full'>
                                    <Timer setResign={setResign} timeUp={timeUp} setTimeUp={setTimeUp} move={state.player1.selectedMove} />
                                </div>
                                <div className='w-full bg-[#343434] border-2 border-black h-full grid place-items-center'>
                                    {resign === 'resign' && <Button size='small' color='error' variant='contained' onClick={() => setResign('confirm')}>resign</Button>}
                                    {resign === 'confirm' && <div className='w-full flex gap-2 justify-center'><IconButton onClick={() => setResign('resign')}><CloseIcon /></IconButton> <IconButton onClick={() => setResign('resigned')}><DoneIcon /></IconButton></div>}
                                </div>
                            </div>
                        </div>
                        <div className='row-span-3 bg-[#343434] border-2 border-black flex flex-col p-1'>
                            <div className='flex-1 border-2 border-black'>
                                <Chat messages={messages} user={user} />
                            </div>
                            <div className='flex gap-1 mt-1 text-white border-2 border-black p-1'>
                                <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className='flex w-full flex-1'>
                                    <input className='bg-[#1E2021] flex-1 border text-white p-1 border-blue-400' placeholder='Chat here!' onChange={(e) => setMessage(e.target.value)} />
                                </form>
                                <Button onClick={sendMessage} variant='contained'>send</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <GameEnd open={open} setOpen={setOpen} {...gameEnd} user={user} setRoom={setRoom} />
            </ThemeProvider>
        </div>
    )
}

export default Battle
