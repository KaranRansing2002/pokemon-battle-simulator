import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import api from '../../helper/api'
import { Box, Tooltip } from '@mui/material';
import axios from 'axios';
import Loader from '../../components/Loaders/Loader';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { types } from '../../helper/types';

let columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'Name', headerName: 'Name', width: 130, sortable: true, },
    {
        field: 'Type',
        headerName: 'Type',
        sortable: false,
        width: 90,
        renderCell: (params) => <div className={`h-6 w-20 text-xs my-4 flex items-center justify-center p-2  border-black border-2 rounded`} style={{ backgroundColor: types[params.value.toLowerCase()] }} >{params.value}</div>,
        getApplyQuickFilterFn: undefined
    },
    { field: 'Effect', headerName: 'Effect', width: 400, getApplyQuickFilterFn: undefined },
    { field: 'Category', headerName: 'Category', width: 90, sortable: false, renderCell: (params) => <Tooltip title={params.value.split('-')[1].split('.')[0]}><img src={params.value} loading='lazy' className='h-8' /></Tooltip> },
    { field: 'Power', headerName: 'Power', type: 'number', width: 90 },
    { field: 'Accuracy', headerName: 'Accuracy', type: 'number', width: 90 },
    { field: 'PP', headerName: 'PP', type: 'number', width: 90 },
    { field: 'Prob', headerName: 'Probability', type: 'number', width: 90 },
];
function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
            }}
        >
            <GridToolbarQuickFilter />
        </Box>
    );
}

const fetcher = async (...args) => {
    const resp = await axios.get(...args);
    const data = [];
    for (let i = 0; i < resp.data.length; i++) {
        let x = resp.data[i];
        x.id = i;
        data.push(x);
    }
    // console.log(data)
    return data
}

const MovesTable = ({ pokemon, selectedMoves, setSelectedMoves }) => {
    const { data, isLoading, error } = useSWR(`${api}/moves/pokemon/${pokemon.name}`, fetcher)
    const [rowids, setRowids] = useState([]);

    useEffect(() => {
        setRowids(selectedMoves.map(x => x.id))
    }, [selectedMoves])

    if (isLoading) {
        return (

            <div className='grid place-items-center bg-[#1E2021] grid-rows-1 '>
                <div className='grid row-span-1 p-20'>
                    <Loader />
                    <h2 className='text-xl'>. . . Loading</h2>
                </div>
            </div>
        )
    }
    if (error) {
        <div className='grid place-items-center bg-[#1E2021] grid-rows-1 '>
            <div className='grid row-span-1 p-20'>
                <Loader />
                <h2 className='text-xl'>. . . Some error occured please refresh</h2>
            </div>
        </div>
    }

    return (
        <div className='text-white bg-slate-100 h-full'>
            <DataGrid
                sx={{
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                        height: '0.4em', // Change 'width' to 'height'
                    },
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                    },
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                    },
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-horizontal': { // Add horizontal scrollbar styles
                        height: '0.4em',
                    },
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb-horizontal': {
                        backgroundColor: '#888',
                    },
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb-horizontal:hover': {
                        background: '#555',
                    },

                }}
                style={{
                    height: '100%',
                    overflow: 'hidden',
                }}
                checkboxSelection
                onRowSelectionModelChange={(ids) => {
                    const selectedRows = data.filter((row) => ids.includes(row.id));
                    if (selectedRows.length <= 6) setSelectedMoves(selectedRows)
                }}
                rowSelectionModel={rowids}
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                isRowSelectable={(params) => (selectedMoves.length < 4 || selectedMoves.some((x) => x.id === params.id))}
                pageSizeOptions={[10, 10,]}
                slots={{ toolbar: QuickSearchToolbar }}
            />
        </div>
    );
}

export default MovesTable
