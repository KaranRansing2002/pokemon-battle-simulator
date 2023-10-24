const userModel = require('../models/userModel');

async function getTeam(req, res) {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email });
        return res.json({
            successfull: true,
            data : user["teams"]
        })
    } catch (err) {
        console.log(err);
    }
}

async function addTeam(req, res) { 
    try {
        console.log("add")
        const { team , email, id} = req.body;
        console.log(email,team)
        const user = await userModel.findOne({ email: email });
        // console.log(req.body);
        const obj = {...req.body};
        delete obj.email
        let ok=true;
        console.log(id)
        for(let i=0;i<user.teams.length;i++){
            if(user.teams[i].id===id){
                user.teams[i] = obj;
                ok=false;
            }
        }
        if(ok) user.teams.push(obj);

        await user.save();
        // const objj = { ...user }
        // console.log("team",objj["_doc"])
        return res.json({
            successfull: true,
            message : "team added successfully !",
            data : user
        })  
    } catch (err) {
        console.log(err);
    }
}

async function deleteTeam(req, res) { 
    try {
        const { email } = req.body;
        const {id} = req.params
        console.log(email);
        const user = await userModel.findOne({ email: email })
        if (user){
            const teams = user.teams.filter(team => team.id!=id);
            user['teams'] = teams;
            await user.save();
            res.json({
                successful: true,
                message : "team deleted successfully",
            })
        }
        else{
            res.json({
                successful: false,
                message: 'Team not found!'
            })
        }
    } catch (err) {
        console.log(err);
    }
}

async function getAllusers(req, res) {
    try {
        let users = await userModel.find().select('-password -email -teams -_id -__v').sort({elo : -1}).limit(50);
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message
        })
    }
}

async function getUser(req, res) {
    try {
        const {username} = req.params
        const user = await userModel.findOne({ username }).select('-password -__v');
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error : error.message
        })
    }

}

module.exports = {
    addTeam,
    getTeam,
    deleteTeam,
    getAllusers,
    getUser
} 