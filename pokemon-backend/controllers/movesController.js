const movesModel = require('../models/movesModel')

async function addMoves(req,res){
    try {
        const data = req.body;
        const move = await movesModel.create(data);
        res.json({
            message : "move added successfully",
            data : move
        })
    } catch (err) {
        console.log("error",err)
    }
}

async function getAllMoves(req,res) {
    try {
        const data = await movesModel.find();
        let ndata=[];
        let ids=[];
        for(let i=0;i<data.length;i++){
            if(ids.includes(data[i]["Id"])){
                continue;
            }
            ids.push(data[i]["Id"]);
            ndata.push(data[i]);
        }
        res.json(ndata);
    } catch (err) {
        console.log(err)
    }
}

async function pokemonMoves(req, res) {
    try {
        const name = req.params.name;
        const data = await movesModel.find({ Pokemon: { $regex: name, $options: 'i' } }).select('-Pokemon');
        let set = new Set();
        let moves = []
        for (let x of data) {
            if (!set.has(x.Id)) {
                moves.push(x);
                set.add(x.Id);
            }
        }
        return res.json(moves)
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

async function moveDetails(req, res) {
    try {
        const name = req.params.name;
        const data = await movesModel.findOne({ Name: name }).select('-Pokemon')
        res.json(data);
    } catch (err) { 
        console.log(err);
        res.send(err);
    }
}

module.exports={addMoves, getAllMoves,moveDetails,pokemonMoves}