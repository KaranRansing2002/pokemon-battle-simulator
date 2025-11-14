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

export default function Pokedex({ setSelectedPokemons, selectedPokemons }) {

  const { data, isLoading, error } = useSWR(`${api}/pokemon/all`, fetcher);
  const [rowids, setRowids] = useState([]);

  useEffect(() => {
    setRowids(selectedPokemons.map(x => x.id))
    // console.log(selectedPokemons)
  }, [selectedPokemons])

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
        <div className='grid row-span-1 px-36 sm:px-96'>
          <Loader />
          <h2 className='text-xl'>. . . Loading</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-auto h-full bg-[#111] p-4 rounded-lg">
      <div
        className="w-full h-full rounded-lg shadow-lg"
        style={{
          backgroundColor: "#1A1A1D",
          padding: "16px",
          border: "1px solid #2c2c2c",
        }}
      >
        <DataGrid
          sx={{
            color: "#e0e0e0",
            border: "none",

            // Table background
            "& .MuiDataGrid-main": {
              backgroundColor: "#1A1A1D",
            },

            // Header  
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#232326",
              color: "#EDEDED",
              fontSize: "0.9rem",
              fontWeight: "bold",
              borderBottom: "1px solid #333",
            },

            // Column separators
            "& .MuiDataGrid-columnSeparator": {
              display: "none"
            },

            // Rows
            "& .MuiDataGrid-row": {
              backgroundColor: "#1E1E21",
              borderBottom: "1px solid #2d2d2f",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#27272b",
            },

            // Cells  
            "& .MuiDataGrid-cell": {
              padding: "8px 12px",
              fontSize: "0.85rem",
              borderColor: "#2a2a2d",
            },

            // Checkboxes  
            "& .MuiCheckbox-root": {
              color: "#4ADE80 !important",
            },

            // Toolbar quick filter box  
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#444" },
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#4ADE80" },
            },

            // Scrollbar  
            "& .MuiDataGrid-virtualScroller": {
              scrollbarWidth: "thin",
            },
            "& ::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "& ::-webkit-scrollbar-thumb": {
              background: "#444",
              borderRadius: "4px",
            },
            "& ::-webkit-scrollbar-thumb:hover": {
              background: "#666",
            },

            // Pagination  
            "& .MuiTablePagination-root": {
              color: "white"
            },
          }}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "12px",
          }}
          checkboxSelection
          onRowSelectionModelChange={(ids) => {
            const selectedRows = data.filter((row) => ids.includes(row.id));
            selectedRows.forEach((x) => {
              for (let y of selectedPokemons) {
                if (x.id == y.id && y.moves) {
                  x.moves = y.moves;
                }
              }
            });

            if (selectedRows.length <= 6) setSelectedPokemons(selectedRows);
          }}
          rowSelectionModel={rowids}
          isRowSelectable={(params) =>
            selectedPokemons.length < 6 ||
            selectedPokemons.some((x) => x.id === params.id)
          }
          rows={data}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 11 } },
          }}
          pageSizeOptions={[11, 12]}
          slots={{ toolbar: QuickSearchToolbar }}
        />
      </div>
    </div>
  );

}