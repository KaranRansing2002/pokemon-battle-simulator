import React, { useContext, useEffect, useState } from 'react';
import Team from '../teambuilder/Team';
import useSWR, { mutate } from 'swr';
import api from '../../helper/api';
import Loader from '../../components/Loaders/Loader';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Snackbar, SnackbarContent } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App';

const fetcher = async (...args) => {
    const resp = await axios.get(...args, { withCredentials: true });
    if (!resp.data.data || resp.data.data === undefined) throw new Error("No teams found! please build your team first !")

    return resp.data.data;
};

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export const TeamSlots = ({ team, border }) => {
    return (
        <div
            className={`grid grid-cols-6 gap-2 p-2 bg-[#1E2021] ${border ? 'border-red-400' : 'border-slate-400'
                } hover:border-green-400 hover:transition-colors duration-300 cursor-pointer border-2`}
        >
            {team.map((pokemon, index) => (
                <div key={index} className="flex justify-center items-center bg-[#343434] p-2">
                    <img className="sm:h-20 scale-[1.4] sm:scale-100" src={pokemon.image} />
                </div>
            ))}
        </div>
    );
};

function MyTeams() {
    const { data, isLoading, error } = useSWR(`${api}/user/team`, fetcher);
    const [ind, setInd] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar visibility
    const [count, setCount] = useState(0)
    const { battleTeam, setBattleTeam } = useContext(userContext);

    useEffect(() => {
        if (!ind && data) {
            setInd(0);
            setCount(data.length)
        }
        console.log(data)
    }, [data]);

    const handleBattle = () => {
        setBattleTeam(data[ind].team)
        navigate('/battle')
        setLoading(true);
    };

    const handleEdit = () => {
        const team = [...data[ind]['team']];
        team[0].teamid = data[ind].id;
        localStorage.setItem('team', JSON.stringify(team));
        navigate('/teambuilder');
    };

    const handleDelete = async () => {
        try {
            const resp = await axios.delete(`${api}/user/teams/${data[ind].id}`, {
                withCredentials: true,
            });
            setInd(data.length > 0 ? 0 : undefined)
            setCount(p => p - 1);
            setSnackbarOpen(true);
            mutate(`${api}/user/team`);
        } catch (error) {
            alert('Some error occurred');
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (error) {
        return (
            <div className="grid place-items-center grid-rows-1 h-full ">
                <div className="grid row-span-1 p-20">
                    <Loader />
                    <h2 className="text-xl text-white">{error.message}</h2>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="grid place-items-center bg-[#1E2021] grid-rows-1">
                <div className="grid row-span-1 p-20">
                    <Loader />
                    <h2 className="text-xl text-white">Loading...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="grid sm:grid-cols-3 h-full grid-cols-1 gap-4 sm:grid-rows-1 grid-rows-2 p-2">
            <div className="sm:col-span-2 bg-[#1E2021] p-4 flex flex-col gap-4">
                <div className="grid place-items-center gap-2">
                    {ind != undefined && <TeamSlots border team={data[ind].team} />}
                    <div className="flex gap-2">
                        <Button onClick={handleEdit} variant="contained" endIcon={<EditIcon />}>
                            Edit
                        </Button>
                        <ThemeProvider theme={darkTheme}>
                            <LoadingButton
                                onClick={handleBattle}
                                loading={loading}
                                loadingPosition="center"
                                variant="contained"
                                color="success"
                            >
                                Battle
                            </LoadingButton>
                        </ThemeProvider>
                        <Button onClick={handleDelete} variant="contained" endIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-2 sm:px-4 max-h-96 overflow-y-scroll">
                    <h2 className="text-green-400 mb-2 uppercase font-bold">Select a team by clicking on them (total : {count}) </h2>
                    {data.map((obj, index) => (
                        <div onClick={() => setInd(index)} key={index}>
                            <TeamSlots key={index} border={ind === index ? true : undefined} team={obj.team} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex ">
                {ind != undefined && <Team selectedPokemons={data[ind].team} />}
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
            >
                <SnackbarContent sx={{ backgroundColor: 'green' }} message="Team deleted successfully" />
            </Snackbar>
        </div>
    );
}

export default MyTeams;
