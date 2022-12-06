import charmander from './images/charmander.png'

const rows = [
    [charmander, "Charmander", "Fire", "Blaze | Solarpower", "39", "52", "43", "60", "50", "65", "309"],
    [charmander, "Charmander", "Fire", "Blaze | Solarpower", "39", "52", "43", "60", "50", "65", "309"],
    [charmander, "Charmander", "Fire", "Blaze | Solarpower", "39", "52", "43", "60", "50", "65", "309"],
    [charmander, "Charmander", "Fire", "Blaze | Solarpower", "39", "52", "43", "60", "50", "65", "309"],
    [charmander, "Charmander", "Fire", "Blaze | Solarpower", "39", "52", "43", "60", "50", "65", "309"],
    [charmander, "Charmander", "Fire", "Blaze | Solarpower", "39", "52", "43", "60", "50", "65", "309"],
    [charmander, "Charmander", "Fire", "Blaze | Solarpower", "39", "52", "43", "60", "50", "65", "309"],
    [charmander, "Charmander", "Fire", "Blaze | Solarpower", "39", "52", "43", "60", "50", "65", "309"],
    [charmander, "Charmander", "Fire", "Blaze | Solarpower", "39", "52", "43", "60", "50", "65", "309"],
    [charmander, "Charmander", "Fire", "Blaze | Solarpower", "39", "52", "43", "60", "50", "65", "309"],   
]
const types = [
    {
      name: "normal",
      color: "#A8A878",
    },
    {
      name: "fire",
      color: "#EF8031",
    },
    {
      name: "water",
      color: "#6890F0",
    },
    {
      name: "grass",
      color: "#78C850",
    },
    {
      name: "electric",
      color: "#F8D030",
    },
    {
      name: "ice",
      color: "#98D8D8",
    },
    {
      name: "fighting",
      color: "#C03028",
    },
    {
      name: "poison",
      color: "#A040A0",
    },
    {
      name: "ground",
      color: "#E0C068",
    },
    {
      name: "flying",
      color: "#A890F0",
    },
    {
      name: "psychic",
      color: "#F85888",
    },
    {
      name: "bug",
      color: "#A8B820",
    },
    {
      name: "rock",
      color: "#B8A038",
    },
    {
      name: "ghost",
      color: "#705898",
    },
    {
      name: "dark",
      color: "#705848",
    },
    {
      name: "dragon",
      color: "#7038F8",
    },
    {
      name: "steel",
      color: "#B8B8D0",
    },
    {
      name: "fairy",
      color: "#F0B6BC",
    },
];
  
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

export { rows, types, columns }

