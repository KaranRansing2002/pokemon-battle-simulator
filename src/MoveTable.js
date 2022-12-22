import React, { useState ,useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { colMoves } from "./Data";
import axios from "axios";
import { types } from "./Data";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


let rows=[]

function MoveTable(props) {
    const {teamPokemon,vari,func,currInput} = props
    const [num,setNum] = useState(50);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [mrows,setMrows] = useState([])
    const [trigger,setTrigger] = useState(true)

    function filterRows(rarr,arr,ind){
      console.log("rarr",arr,rarr.filter((r)=>(!arr.includes(r.Name))))
      return rarr.filter((r)=>(!arr.filter((x,index)=>ind!=index).includes(r.Name.toLowerCase())))
    }

    useEffect(()=>{
      if(vari[currInput].length==0){
        setMrows([...rows])
      }
      if(vari[currInput].length>0 && rows.length>0){
        console.log("currinp",vari)
        if(mrows.length>0 && vari[currInput]!=''){
          setMrows(filterRows(rows,vari,currInput).filter((row)=>{
            return(
              row["Name"].toLowerCase().includes(vari[currInput]) 
            )
          }))
        }
      }
    },[vari[currInput],trigger])

    useEffect(() => {
      axios.get(`http://localhost:8000/moves/all`).then((resp) => {
        // console.log(teamPokemon[2])
        const data = resp.data.filter((res)=>res.Pokemon.includes(teamPokemon[2]));
        for(let i=0;i<data.length;i++){
          data[i]["Name"]=capitalizeFirstLetter(data[i]["Name"])
        }
        rows=data
        setMrows(data);
        console.log(mrows);
      });
    }, [teamPokemon[2]]);

    const handleChangePage = (event, newPage) => {
        setNum(Math.min(num+50,840))
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // console.log("mrows",mrows)
  return (
    <div className="h-full">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {colMoves.map((column, index) => (
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
              {mrows.map((row, ind) => {
                return (
                  <TableRow key={ind} >
                    {colMoves.map((col) => {
                      return (
                        ind<num && <TableCell
                          key={col.id}
                          align={col.align}
                          style={{ minWidth: col.minWidth , cursor : "pointer"}}
                          onClick={()=>{!vari.includes(row["Name"].toLowerCase()) && func[currInput](row["Name"].toLowerCase()); setTrigger(!trigger)}}
                        >
                          {col.label === "Category" ? (
                            <img className='scale-75' src={row[col.label]} />
                          ) : col.label === "Type" ? (
                            <div
                              className={`h-6  text-xs my-4 flex items-center justify-center p-2  border-black border-2 rounded bg-[${
                                types[row[col.label].toLowerCase()]
                              }]`}
                            >
                              {row[col.label]}
                            </div>
                          ) : (
                            row[col.label]
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50]}
          component="div"
          count={mrows.slice(0, 840).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default MoveTable;
export {rows}