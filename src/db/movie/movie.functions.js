//Naming movie.functions.js is a naming convention. The dot notation doesn't do anything in this filename
const Movie = require("./movie.model");
const mongoose = require("mongoose");


exports.createRecord = async (createObj) => {
  try {

    // Assign to a variable an instance of the Movie class with the data input to the createObj
    // It is == mongoose.model("Movies", mongoose.Schema({createObj}) so createObj must conform to the schema

    const newRecord = new Movie(createObj);
    const createResult = await newRecord.save();
    console.log(`Created a record for ${createResult}`)
    mongoose.disconnect();

  } catch (error) {
    console.log(error);
    mongoose.disconnect();
  }
};

exports.readRecord = async (readObj, sortObj) => {
    try {
      // If --read is entered into CLI without field specified, readObj will have the value of 'true' rather than an object.
      // This converts 'read: true' into an empty object
      typeof(readObj) ? readObj = {} : null
      const searchResult = await Movie.find(readObj).sort(sortObj);
      console.log(`Your rearch result is as follows: ${searchResult}`)
      mongoose.disconnect();

    } catch (error) {
      console.log(error);
      mongoose.disconnect();
    }
  };

exports.updateRecord = async (updateObj, filterObj) => {
    try {

      const updateResult = await Movie.updateMany(filterObj, updateObj);
      console.log(`Updated ${filterObj} to ${updateObj}`)
      mongoose.disconnect();

    } catch (error) {
      console.log(error);
    }
  };

exports.deleteRecord = async (deleteObj) => {
    try {

      Movie.findByIdAndDelete(deleteObj.id)
      console.log(`Deleted record id ${deleteObj.id}`)

      // console.log(filterObj)

      // const searchResult = await Movie.find(filterObj)

      // console.log(searchResult)
      
      // await searchResult.forEach( (element) => {

      //   Movie.findByIdAndDelete({_id: element._id})
      // })

      // I've left this in to show the failed attempts to delete by filter.

      // if () {
      //   console.log(`Deletion requested for ${filterObj}`)
      // const deleteResult = await Movie.deleteMany(filterObj);      
      // console.log(`Deleted ${deleteResult.n} records`)
      // } else {
      //   console.log(`--delete must be accompanied by --filter.`)
      // }

      // What a nightmare. If the filterObj is empty deleteMany() will delete everything.

      mongoose.disconnect();

    } catch (error) {
      console.log(error);
    }
  };