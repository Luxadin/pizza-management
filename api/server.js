const express = require('express');
const path = require('path');
const mongoose = require ('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// connect to the database
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://pizza:pizza@cluster0.tgoasdj.mongodb.net/pizza?authMechanism=DEFAULT", {
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

const {Topping, Pizza} = require ('./models/Models');

// Topping Handlers

// get list of toppings in database
app.get('/toppings', async (req, res) => {
    const toppings = await Topping.find().sort({"name" : 1});

    res.json(toppings);
});

// create new toppings

app.post('/toppings/new', (req, res) => {
    const topping = new Topping({
        name: req.body.name
    });

    //error checking to see if topping already exists
    topping.save((err, topping) => {
        if(err) return res.statusCode = 400;
        res.json(topping);
    });
})

//delete existing toppings

app.delete('/toppings/delete/:id', async (req, res) =>{
    const result = await Topping.findByIdAndDelete(req.params.id);
    res.json(result);
})

// edit names of existing toppings based on id

app.post('/toppings/edit/:id', async (req, res) =>{
    const result = await Topping.findByIdAndUpdate(req.params.id, { name: req.body.name })
    res.json(result);
})

// Pizza Handlers

// get list of pizzas in database
app.get('/pizzas', async (req, res) => {
    const pizzas = await Pizza.find();

    res.json(pizzas);
});

// create new pizza
// BUG: Add Pizza call hangs on error

app.post('/pizza/new', (req, res) => {
    let check = '';
    req.body.toppings.forEach(element => {
        check += element;
    });

    const pizza = new Pizza({
        toppings: req.body.toppings,
        checkString : check
    });
    console.log(pizza);
    //error checking to see if pizza already exists
    pizza.save((err, pizza) => {
        if(err) {
            return res.statusCode = 400;
        }
        res.json(pizza);
    });
})

//delete existing pizzas

app.delete('/pizza/delete/:id', async (req, res) =>{
    const result = await Pizza.findByIdAndDelete(req.params.id);
    res.json(result);
})

// edit names of existing toppings based on id

app.post('/pizza/edit/:id', async (req, res) =>{
    const result = await Pizza.findByIdAndUpdate(req.params.id, { toppings: req.body.toppings })
    res.json(result);
})

// Port will default to 3000 but if occupied on Heroku, it will give a random port.

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}...`));