const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();
const path = require('path');
const hbs = require('hbs'); //to use partials
require("./db/conect");
const adduser = require("./modules/regester");


const template = path.join(__dirname, "../templates/views/");
const partials = path.join(__dirname, "../templates/partials/");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//if html file present in public folder, this renedered first not hbs
app.use(express.static("public"));
app.set("view engine", "hbs");
//to use ejs //if view present in root no error else specify the path
app.set("views", template);
hbs.registerPartials(partials)


app.get("/", (req, res) => {
    res.render("login");
})


app.get("/index", (req, res) => {
    res.render("index");
})



app.post("/newuser", async (req, res) => {
    try {
        const createUser = new adduser({
            User_email: req.body.user_email,
            User_password: req.body.user_password
        })
        const Done = await createUser.save();
        if (Done) {
            res.status(200).send({ status: 201, UserID: Done._id });
        } else {
            res.status(200).send({ status: 400, message: "User not created" });
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/olduser", async (req, res) => {
    try {
        const user = await adduser.find({ User_email: req.body.user_email, User_password: req.body.user_password });
        if (user.length == 0) {
            res.status(200).send({ status: 400, message: "user not found" });
        } else {
            res.status(200).send({ status: 201, UserID: user[0]._id });
        }
    } catch (error) {
        res.status(400).send(error);
    }
})



app.post("/getData", async (req, res) => {
    try {
        const user = await adduser.findOne({ _id: req.body._id });
        if (user) {
            res.status(200).send(user.saveBox);
        } else {
            res.status(200).send("Invalid user");
        }

    } catch (error) {
        res.status(400).send(error);
    }
})


app.post("/addData", async (req, res) => {
    const _id = req.body._id;
    const Added = await adduser.findOneAndUpdate({ _id }, { $push: { saveBox: req.body.boxdata } });
    if (Added) {
        res.status(200).send({ Data: Added.saveBox });
    } else {
        res.status(200).send("Invalid user");
    }

});



app.delete("/deleteData", async (req, res) => {
    const _id = req.body._id;
    const Added = await adduser.findOneAndUpdate({ _id }, { $pull: { saveBox: { id: req.body.index } } });
    if (Added) {
        res.status(200).send(Added);
    } else {
        res.status(200).send("Invalid user");
    }

});


app.delete("/deleteAccound", async (req, res) => {
    const _id = req.body._id;
    const deleted = await adduser.deleteOne({_id});
    if (deleted.deletedCount == 1) {
        res.status(200).send({status : true , message:"Account deleted"});
    } else {
        res.status(200).send("Invalid user");
    }

})



app.post("/addTrack", async (req, res) => {
    const _id = req.body._id;
    const Usertrack_path = `User_track.${req.body.Usertrack_path}`;
    const Added = await adduser.findOneAndUpdate({ _id }, { $push: { [Usertrack_path] : req.body.trackdata } } , {new: true});
    if (Added) {
        res.status(200).send({ Data: Added.User_track });
    } else { 
        res.status(200).send("Invalid user");
    }

});


app.post("/getUserData", async (req, res) => {
    try {
        const user = await adduser.findOne({ _id: req.body._id });
        if (user) {
            res.status(200).send({Data : user.User_track });
        } else {
            res.status(200).send("Invalid user");
        }

    } catch (error) {
        res.status(400).send(error);
    }
})



app.post("/User_Music", async (req, res) => {
    const _id = req.body._id;
    const musicLink = req.body.musicLink;
    const musicID = req.body.musicID;
    const Added = await adduser.findOneAndUpdate({ _id }, { $push: { User_music: { musicLink , musicID : req.body.musicID } } } , {new: true});
    if (Added) {
        res.status(200).send({status : 201 , Data: Added.User_music });
    } else {
        res.status(200).send("Invalid user");
    }
})



app.post("/Get_Music" , async (req, res) =>{
    const _id = req.body._id;
    const Added = await adduser.findOne({ _id });
    if (Added) {
        res.status(200).send({status : 201 , Data: Added.User_music });
    } else {
        res.status(200).send("Invalid user");
    }
})




app.listen(PORT, () => {
    console.log("Server is running on port 3000");
})