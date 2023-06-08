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
                required: false
            },
            ingredientQuantity: {
                type: Number,
                required: false
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
        required: false
    }
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe