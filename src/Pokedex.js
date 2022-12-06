import React,{useState} from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {rows,columns} from './Data.js'


function Pokedex(props) {
  return (
    <div className='h-full'>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 605 }}>
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
                            <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={()=>props.sPokemon((oldarr)=>oldarr.length<6 ? [...oldarr,row[1]] : oldarr)}>
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
