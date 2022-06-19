const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    User_email: {
        type: String,
        unique: true
    },
    User_password: String,
    saveBox: {
        type: Array
    },
    User_track: {
        DSAP: { type: Array },
        DSAL: { type: Array },
        ENGR: { type: Array },
        ENGW: { type: Array },
        ENGL: { type: Array },
        ENGS: { type: Array },
        ENGWT: { type: Array },
        TYP: { type: Array },
        JSL: { type: Array },
        CSSL: { type: Array },
        RECTJS: { type: Array },
        NODEJS: { type: Array },
        PROJ: { type: Array },

    },
    User_music: {
        type: Array
    }
});

const Regester = new mongoose.model('Regester', userSchema);

module.exports = Regester;