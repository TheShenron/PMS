const mongoose = require('mongoose');

console.log(process.env.DatabasURL);

mongoose.connect(process.env.DatabasURL , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database");
}).catch((e) => {
    console.log("Connection failed", e);
})