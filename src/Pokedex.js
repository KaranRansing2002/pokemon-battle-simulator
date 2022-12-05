import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 0, 
        label: '', 
        minWidth: 170 
    },
    { 
        id: 1,
        label: 'name', 
        minWidth: 100 
    },
    {
      id: 2,
      label: 'Types',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 3,
      label: 'abilities',
      minWidth: 170,
      align: 'right',
    },
    {
        id : 4,
        label : 'HP',
        minWidth : 50,
        align : 'right'
    },
    {
        id : 5,
        label : 'Atk',
        minWidth : 50,
        align : 'right'
    },
    {
        id : 6,
        label : 'Def',
        minWidth : 50,
        align : 'right'
    },
    {
        id : 7,
        label : 'Spa',
        minWidth : 50,
        align : 'right'
    },
    {
        id : 8,
        label : 'Spd',
        minWidth : 50,
        align : 'right'
    },
    {
        id : 9,
        label : 'Spe',
        minWidth : 50,
        align : 'right'
    }
];

const rows = [
    ["https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png","Charmander","Fire","Blaze,Solarpower",""]
]

function Pokedex() {
  return (
    <div className='h-full'>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    rows.map((row)=>{
                        return 
                        <TableRow>

                        </TableRow>
                    })
                }
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    </div>
  )
}

export default Pokedex;
