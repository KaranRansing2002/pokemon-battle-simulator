import React,{useState} from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { rows, columns } from './Data.js'


function Pokedex() {
    // console.log(rows)
  return (
    <div className='h-full'>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 605 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column,index) => (
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
                        rows.map((row,ind)=>{
                            // console.log(row[358])
                            const name=rows[ind][2];
                            return(
                                ind<50 && <TableRow>
                                    {
                                        columns.map((column,index) => (
                                        <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        >
                                        {index==1 ? <img className='h-8 scale-[2.5]' src={require(`./images/${name}.png`)}></img> : rows[ind][index]}
                                        </TableCell>
                                        ))
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
