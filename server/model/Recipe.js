const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true
    },
    ingredient: [
        {
            ingredientName: {
                type: String,
                required: true
            },
            ingredientQuantity: {
                type: Number,
                required: true
            },
            ingredientUnit: {
                type: String,
                required: false
            },
            ingredientCut: {
                type: String,
                required: false
            }
        }
    ],
    procedure: {
        type: Array,
        required: true
    }
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe