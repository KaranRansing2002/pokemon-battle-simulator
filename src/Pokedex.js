import React,{useState} from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import rows from './Data.js'

const columns = [
    { 
        id: 0, 
        label: 'image', 
        minWidth: 50 
    },
    { 
        id: 1,
        label: 'name', 
        minWidth: 50 
    },
    {
      id: 2,
      label: 'Types',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 3,
      label: 'abilities',
      minWidth: 100,
      align: 'center',
    },
    {
        id : 4,
        label : 'HP',
        minWidth : 20,
        align: 'center'
    },
    {
        id : 5,
        label : 'Atk',
        minWidth : 20,
        align: 'center'
    },
    {
        id : 6,
        label : 'Def',
        minWidth : 20,
        align: 'center'
    },
    {
        id : 7,
        label : 'Spa',
        minWidth : 20,
        align: 'center'
    },
    {
        id : 8,
        label : 'Spd',
        minWidth : 20,
        align: 'center'
    },
    {
        id : 9,
        label : 'Spe',
        minWidth : 20,
        align: 'center'
    },
    {
        id : 10,
        label : 'Bst',
        minWidth : 20,
        align: 'center'
    }
];

function Pokedex(props) {
    console.log(props)
  return (
    <div className='h-1/2'>
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
                    rows.map((row,index)=>{
                        return(
                            <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={()=>props.sPokemon((oldarr)=>[...oldarr,row[1]])}>
                                {
                                    columns.map((ele,index)=>{
                                        return (
                                            <TableCell key={index} align={ele.align}>
                                                {ele.id==0 ? <img className='h-8 scale-[2.5]' src={row[0]}></img> : row[ele.id]}
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        )
                    })
                }
            </TableBody>
            </Table>
        </TableContainer>
        </Paper>
    </div>
  )
}

export default Pokedex;
