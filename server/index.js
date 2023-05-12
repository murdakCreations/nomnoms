const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

// Connect to DB
const mongoose = require('mongoose')

const DB = 'mongodb+srv://nom-noms:NbiI50nrttLM79dU@cluster0.ee7qx0i.mongodb.net/?retryWrites=true&w=majority'

//const client = new MongoClient(DB);
//const collection = client.db("recipesDB").collection("recipesCollection");

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database Connected...')
})


const Recipe = require('./model/Recipe')

// GET Route
app.get('/get-recipe', async(req, res) => {
    const recipes = await Recipe.find()
    try{
        res.status(200).json({
            status: 'Success',
            data: {
                recipes
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})

// POST Route

app.post('/add-recipe', async(req, res) => {
    const recipes = new Recipe(req.body)
    try{
        await recipes.save()
        res.status(201).json({
            status: 'Success',
            data: {
                Recipe
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})

// GET Route according to ingredient
app.get('/search-recipe/:ingredient',async(req, res) => {
    const recipes = await Recipe.find(
        { ingredient: { $elemMatch: { ingredientName: {$regex: req.params.ingredient} } } }
     )
    try{
        res.status(200).json({
            status: 'Success',
            data: {
                recipes
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        })
        console.log(err)
    }
})