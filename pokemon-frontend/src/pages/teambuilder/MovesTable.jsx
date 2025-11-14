import React, { useEffect, useState } from "react";
import useSWR from "swr";
import api from "../../helper/api";
import { Box, Tooltip } from "@mui/material";
import axios from "axios";
import Loader from "../../components/Loaders/Loader";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { types } from "../../helper/types";

let columns = [
  { field: "id", headerName: "ID", width: 60 },

  { field: "Name", headerName: "Name", width: 150, sortable: true },

  {
    field: "Type",
    headerName: "Type",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <div
        className="px-2 py-1 text-xs rounded text-black font-semibold flex items-center justify-center border border-black"
        style={{
          backgroundColor: types[params.value.toLowerCase()],
        }}
      >
        {params.value}
      </div>
    ),
  },

  { field: "Effect", headerName: "Effect", width: 380 },

  {
    field: "Category",
    headerName: "Category",
    width: 90,
    sortable: false,
    renderCell: (params) => (
      <Tooltip title={params.value.split("-")[1].split(".")[0]}>
        <img src={params.value} loading="lazy" className="h-8" />
      </Tooltip>
    ),
  },

  { field: "Power", headerName: "Power", type: "number", width: 90 },
  { field: "Accuracy", headerName: "Accuracy", type: "number", width: 110 },
  { field: "PP", headerName: "PP", type: "number", width: 80 },
  { field: "Prob", headerName: "Probability", type: "number", width: 110 },
];

function QuickSearchToolbar() {
  return (
    <Box sx={{ p: 0.5, pb: 0 }}>
      <GridToolbarQuickFilter />
    </Box>
  );
}

const fetcher = async (...args) => {
  const resp = await axios.get(...args);
  const arr = [];
  for (let i = 0; i < resp.data.length; i++) {
    const move = resp.data[i];
    move.id = i;
    arr.push(move);
  }
  return arr;
};

const MovesTable = ({ pokemon, selectedMoves, setSelectedMoves }) => {
  const { data, isLoading, error } = useSWR(
    `${api}/moves/pokemon/${pokemon.name}`,
    fetcher
  );

  const rows = data || [];
  const [rowids, setRowids] = useState([]);

  useEffect(() => {
    setRowids(selectedMoves.map((x) => x.id));
  }, [selectedMoves]);

  // Loading UI
  if (isLoading) {
    return (
      <div className="grid place-items-center bg-[#1A1A1D] h-full rounded-lg">
        <div className="p-16">
          <Loader />
          <h2 className="text-xl text-gray-300 mt-3">... Loading Moves</h2>
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="grid place-items-center bg-[#1A1A1D] h-full rounded-lg">
        <div className="p-16">
          <Loader />
          <h2 className="text-xl text-red-400">Some error occurred. Refresh.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#111] p-4 rounded-lg">
      <div
        className="h-full w-full rounded-lg shadow-lg"
        style={{
          backgroundColor: "#1A1A1D",
          padding: "16px",
          border: "1px solid #2c2c2c",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          rowSelectionModel={rowids}
          onRowSelectionModelChange={(ids) => {
            const selectedRows = rows.filter((r) => ids.includes(r.id));
            if (selectedRows.length <= 4) setSelectedMoves(selectedRows);
          }}
          isRowSelectable={(params) =>
            selectedMoves.length < 4 ||
            selectedMoves.some((m) => m.id === params.id)
          }
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[10]}
          slots={{ toolbar: QuickSearchToolbar }}
          sx={{
            border: "none",
            color: "#e0e0e0",

            // Header
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#232326",
              borderBottom: "1px solid #333",
              color: "#EDEDED",
              fontSize: "0.9rem",
              fontWeight: "bold",
            },

            // Remove column separator
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },

            // Rows
            "& .MuiDataGrid-row": {
              backgroundColor: "#1E1E21",
              borderBottom: "1px solid #2d2d2f",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#29292d",
            },

            // Cells
            "& .MuiDataGrid-cell": {
              padding: "8px 12px",
              fontSize: "0.85rem",
            },

            // Scrollbar
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

            // Quick filter input
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#444" },
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#4ADE80" },
            },

            // Pagination
            "& .MuiTablePagination-root": {
              color: "white",
            },
          }}
        />
      </div>
    </div>
  );
};

export default MovesTable;
