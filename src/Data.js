import axios from "axios";
import React, { useEffect, useState } from "react";

const tableArr = ["name", "types", "abilities"];
const baseUrl = "http://localhost:8000/pokemon/";

// const stats = ['hp', "Atk", "Def", "Spa", "Spd", "Spe", "Bst"]

let rows = [];
let rrows = [];

function Data(props) {
  const { search, setSearch, teamPokemon} = props;
  const [trial, setTrail] = useState("");
  function compare(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    // if (rows.length > 0) return;
    rows = [];
    axios
      .get(`http://localhost:8000/pokemon/all`)
      .then((resp) => {
        resp.data.sort(compare);
        // console.log(data['types'],data["id"])
        let row = [];
        for (let i = 0; i < resp.data.length; i++) {
          const data = resp.data[i];
          row.push(data["id"]);
          row.push(data["imageUrl"]);
          row.push(data["name"]);
          let str = "";
          for (let x of data["types"]) {
            if (str.length > 0) str += " | ";
            str += x;
          }
          row.push(str);
          str = "";
          for (let x of data["abilities"]) {
            if (str.length > 0) str += " | ";
            str += x;
          }
          row.push(str);
          for (let x of data["stats"]) {
            row.push(x);
          }
          rows.push(row);
          row = [];
        }
        return rows;
      })
      .then((rows) => {
        rows = rows.slice(0, 895);
        rrows = [...rows];
        // console.log("rows",rows);
      });
  }, []);

  if (search.length > 0) {
    // setSearch([...search,''])
    rows = [
      ...rrows.filter((x) => {
        return (
          x[2].substring(0, Math.min(x[2].length, search.length)) === search ||
          x[3].split(" | ").includes(search)
        );
      }),
    ];
  } else {
    rows = [...rrows];
  }

  return <div></div>;
}

export default Data;

const types = {
  normal: "#A8A878",
  fire: "#EF8031",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dark: "#705848",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  fairy: "#F0B6BC",
};

const columns = [
  {
    id: -1,
    label: "id",
    minWidth: 50,
  },
  {
    id: 0,
    label: "image",
    minWidth: 50,
  },
  {
    id: 1,
    label: "name",
    minWidth: 50,
  },
  {
    id: 2,
    label: "Types",
    minWidth: 100,
    align: "center",
  },
  {
    id: 3,
    label: "abilities",
    minWidth: 100,
    align: "center",
  },
  {
    id: 4,
    label: "HP",
    minWidth: 20,
    align: "center",
  },
  {
    id: 5,
    label: "Atk",
    minWidth: 20,
    align: "center",
  },
  {
    id: 6,
    label: "Def",
    minWidth: 20,
    align: "center",
  },
  {
    id: 7,
    label: "Spa",
    minWidth: 20,
    align: "center",
  },
  {
    id: 8,
    label: "Spd",
    minWidth: 20,
    align: "center",
  },
  {
    id: 9,
    label: "Spe",
    minWidth: 20,
    align: "center",
  },
  {
    id: 10,
    label: "Bst",
    minWidth: 20,
    align: "center",
  },
];

const colMoves = [
  {
    id: 0,
    label: "Name",
    minWidth: 50,
  },
  {
    id: 1,
    label: "Type",
    minWidth: 20,
    align: "center",
  },
  {
    id: 2,
    label: "Category",
    minWidth: 20,
    align: "center",
  },
  {
    id: 3,
    label: "Power",
    minWidth: 20,
    align: "center",
  },
  {
    id: 4,
    label: "Accuracy",
    minWidth: 20,
    align: "center",
  },
  {
    id: 5,
    label: "PP",
    minWidth: 20,
    align: "center",
  },
  {
    id: 6,
    label: "Effect",
    minWidth: 100,
    align: "center",
  },
  {
    id: 7,
    label: "Prob",
    minWidth: 20,
    align: "center",
  },
];

export { rows, types, columns, colMoves };