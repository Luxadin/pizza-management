const express = require('express');
const path = require('path');
const mongoose = require ('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// connect to the database
mongoose.connect("mongodb+srv://pizza:pizza@cluster0.tgoasdj.mongodb.net/?authMechanism=DEFAULT", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to Database"))
    .catch(console.error);


// redirects requests back to index.html

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log("Server started on port ${port}..."));