const express = require('express');
const path = require('path');
const mongoose = require ('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://pizza:pizza@cluster0.tgoasdj.mongodb.net/?authMechanism=DEFAULT", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to Database"))
    .catch(console.error);


app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
})

app.listen(3000, () => console.log("Server started on port 3000"));