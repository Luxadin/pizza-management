# Pizza Management App

This project was created using MERN - MongoDB, Express, React, Node.js.
It has been deployed online and can be accessed through [Heroku](https://pizzamanagement.herokuapp.com/) 

## Project Description

There are two roles: `Pizza Manager` and `Pizza Chef`

Pizza Manager will see the list of existing toppings and has the following actions:
- Add New Toppings to the list (Plus Sign within the lower right corner)
- Delete an existing topping
- Update an existing topping

Pizza Chef will see a list of existing pizzas and their toppings with the following actions:
- Create new pizza
- Delete an existing pizza
- Update an existing pizza's name
- Update an existing pizza's toppings

Limitation: 
- Pizza Manager is unable to create or update a topping to an already existing topping
- Pizza Chef is unable to create or update a pizza to an already existing pizza

## Local Run

There are two ways to locally run through the program.

Both require a change in both PizzaList.js and ToppingList.js in the client/src folder as it is currently set to get API calls from the heroku site when it is live.

If setting up to get calls from the heroku site, be sure to go to the [website](https://pizzamanagement.herokuapp.com/) first to wake up the database connection.

Be sure to have at least one of these commented out depending on which one you want to get the API and DB connection from.

Live Site: `const API_BASE = "https://pizzamanagement.herokuapp.com";`

Local Connection: `const API_BASE = "http://localhost:3000"`

### One Port
Within the command line, make your way to the client directory first.

- `npm run build` - creates a production front end within a build folder
- `cd ..` - go back up one directory to the main project directory
- `npm start` - starts up the database

Access the project at http://localhost:3000.

NOTE: The front end will not actively change with any changes to the client code with this local run if using for development.

### Two Port
Within the command line, make your way to the project directory. You should see only the api folder, client folder, package.json, Procfile and this README file.

- `npm start` - start up the database first to link to localhost:3000
- `cd client` - change into the client directory
- `npm start` - start up the front end
NOTE: There should be an error saying the following
`Something is already running on port 3000.

Would you like to run the app on another port instead?`
- Reply with yes and it will start up on port 3001

Access the react frontend at http://localhost:3001.