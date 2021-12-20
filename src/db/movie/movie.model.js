//Naming movie.model.js is a naming convention. The dot notation doesn't do anything in this filename

const mongoose = require("mongoose");

// Define a schema to be passed into mongoose.model()
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    actor: {
        type: String,
        default: "Not Specified",
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: 5
    }
})

// Assign the model to a variable. mongoose.model takes the name of the collection and a schema as arguments
const Movie = mongoose.model("Movies", movieSchema);

module.exports = Movie;