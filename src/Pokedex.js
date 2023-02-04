import React,{useState} from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { columns,rows } from './Data.js'
import uuid from 'react-uuid';


// const tryRequire = (path) => {
//     try {
//       return [require(path),path];
//     } catch (err) {
//       return [require("./images/mew.png"),"./images/mew.png"];
//     }
//   };
function Pokedex(props) {
    // console.log(rows)
    const sPokemon = props.sPokemon
    const [num,setNum] = useState(50);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setNum(Math.min(num+50,900))
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
  return (
    <div className='h-full'>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 550 }}>
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
                                ind<num && <TableRow key = {ind} onClick={()=>sPokemon((oldArr)=>oldArr.length<6 ? [...oldArr,[uuid(),...row.filter((pk,ind)=>ind!==0)]] : oldArr)}>
                                    {
                                        columns.map((column,index) => (
                                        <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        >
                                        {
                                            index===1 ? <img className='h-8 scale-[1.5]' src={require(`./images/${name}.png`)}></img> : rows[ind][index]
                                        }
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
        <TablePagination
            rowsPerPageOptions={[10,50]}
            component="div"
            count={rows.slice(0,399).length}
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
