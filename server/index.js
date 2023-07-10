const express = require('express')
const cors = require('cors')
const app = express()
const MongoClient = require("mongodb").MongoClient

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
//const collection = client.db("test").collection("recipes");


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
    const ingSearch = await Recipe.find({ 
        ingredient: { $elemMatch: { ingredientName: {$regex: req.params.ingredient} } }
    })

    const recipeSearch = await Recipe.find({ 
        recipeName: { $regex: req.params.ingredient}
    })
    try{
        //console.log(Object.keys(ingSearch).length !== 0)
        if(Object.keys(ingSearch).length !== 0){
            res.status(200).json({
                status: 'Success',
                data: {
                    ingSearch
                }            
            })
        }
        else if(Object.keys(recipeSearch).length !== 0){
            res.status(200).json({
                status: 'Success',
                data: {
                    recipeSearch
                }            
            })
        }
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        })
        console.log(err)
    }
})

// DELETE Route according to recipe name
app.delete('/delete-recipe/:id', async(req,res) => {
    await Recipe.findByIdAndDelete(req.params.id)

    try {
        res.status(204).json({
            status: 'Success',
            data: {}
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})

// GET recipe using id
app.get('/get-recipe/:id',async(req, res) => {
    const getRecipe = await Recipe.find({_id: req.params.id})
    try{
        res.status(200).json({
            status: 'Success',
            data: {
                getRecipe
            }
        })
    }catch(err){
        console.log(err)
    }
})

// UPDATE Route
app.put('/update-recipe/:id',async(req, res) => {
    const updateRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    try{
        res.status(200).json({
            status: 'Success',
            data: {
                updateRecipe
            }
        })
    }catch(err){
        console.log(err)
    }
})