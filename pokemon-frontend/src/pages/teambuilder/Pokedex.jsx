import * as React from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useState, useEffect, useMemo } from 'react';
import useSWR from 'swr'
import api from '../../helper/api'
import axios from 'axios';
import Loader from '../../components/Loaders/Loader';
import { Box } from '@mui/material';

let columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'image', headerName: 'Image', width: 100, sortable: false, renderCell: (params) => <img src={params.value} loading='lazy' className='h-12' /> },
  { field: 'name', headerName: 'Name', width: 130, sortable: true, },
  {
    field: 'types',
    headerName: 'Types',
    sortable: false,
    width: 90,
    getApplyQuickFilterFn: undefined
  },
  {
    field: 'abilities',
    headerName: 'Abilities',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 130,
    getApplyQuickFilterFn: undefined
  },
  { field: 'hp', headerName: 'HP', type: 'number', width: 90 },
  { field: 'atk', headerName: 'Attack', type: 'number', width: 90 },
  { field: 'def', headerName: 'Defence', type: 'number', width: 90 },
  { field: 'spa', headerName: 'Sp.Attack', type: 'number', width: 90 },
  { field: 'spd', headerName: 'Sp.Defence', type: 'number', width: 90 },
  { field: 'spe', headerName: 'speed', type: 'number', width: 90 },
  { field: 'bst', headerName: 'BST', type: 'number', width: 90 }
];

function compare(a, b) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}

const fetcher = async (...args) => {
  const resp = await axios.get(...args);
  if (resp.status == 404) {
    throw new Error('error');
    return [];
  }
  let data = []
  for (let i = 0; i < resp.data.length; i++) {
    let x = resp.data[i]
    let pokemon = { id: x.id, image: `https://raw.githubusercontent.com/KaranRansing2002/pokemon-battle-simulator/old_version/src/images/${x.name}.png` }
    pokemon.name = x.name
    pokemon.types = x.types
    pokemon.abilities = x.abilities
    pokemon.ability = x.abilities[0]
    const arr = ['hp', 'atk', 'def', 'spa', 'spd', 'spe', 'bst'];
    for (let i = 0; i < x.stats.length; i++)
      pokemon[arr[i]] = x.stats[i]
    data.push(pokemon)
  }
  data.sort(compare)
  return data;
}

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

export default function Pokedex({ setSelectedPokemons,selectedPokemons }) {

  const { data, isLoading, error } = useSWR(`${api}/pokemon/all`, fetcher);
  const [rowids, setRowids] = useState([]);

  useEffect(() => {
    setRowids(selectedPokemons.map(x => x.id))
    // console.log(selectedPokemons)
  },[selectedPokemons])

  if (error) {
    return (
      <div className='grid place-items-center bg-[#1E2021] grid-rows-1 '>
        <div className='grid row-span-1 p-20'>
          <Loader />
          <h2 className='text-xl'>. . . Some error occured please refresh</h2>
        </div>
      </div>
    )
  }

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
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          const selectedRows = data.filter((row) => ids.includes(row.id));
          selectedRows.forEach((x) => {
            for (let y of selectedPokemons) {
              if (x.id == y.id && y.moves) {
                x.moves = y.moves
                // console.log(y);
              }
            }
          })
          // console.log(selectedRows)
          if(selectedRows.length<=6)setSelectedPokemons(selectedRows)
        }}
        rowSelectionModel={rowids}
        isRowSelectable={(params) => (selectedPokemons.length<6 || selectedPokemons.some((x)=>x.id===params.id))}
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[8, 10,]}
        slots={{ toolbar: QuickSearchToolbar }}
      />
    </div>
  );
}