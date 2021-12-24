require("./db/connection");
const yargs = require("yargs");
const { createRecord, readRecord, updateRecord, deleteRecord } = require("./db/movie/movie.functions.js");
const mongoose = require("mongoose");

const app = async (args) => {

  // Take the args object and slice it into seperate objects representing the command and their input data
  // Data to be input to the db should be one object: inputObj{}
  // Data to filter by should be one object: filterObj{}
  // Data to sort by should be one object: sortObj

  // Dot notation can be used with yargs so I can seperate input data from filter and sort in the cli
  //e.g. node src/app.js --create.title="Movie title" --create.actor="Johhny Megastar"

  try {

    console.log(args)

    if (args.create) {

      // The full command is: node src/app.js --create.title="Movie Title" --create.actor="Johhny Megastar"
      // This will create a record with the input fields { title: 'Movie Title', actor: 'Johhny Megastar' }

      await createRecord(args.create);

    } else if (args.read) {

      // The command to read is: node src/app.js --read.title="Movie Title" --read.actor="Johhny Megastar"
      // This will return all records matching the fields { title: 'Movie Title', actor: 'Johhny Megastar' }

      // The command to read a single record by it's id is: node src/app.js --read._id="<id number>"

      // --sort is an optional argument which will sort the returned result. "1" is in ascending order
      // The full command to read and sort is: node src/app.js --read.actor="Johhny Megastar" --sort.rating="ascending"

      // If there are no fields in args.read then it will read all records
      // e.g. --read
      // or: --read --sort.title="ascending"

      await readRecord(args.read, args.sort)

    } else if (args.update) {

      // The command to update is: node src/app.js --update.actor="Replacement Dude" --filter.title="Movie Title"
      // This will update all records matching the filter with the data in the update object
      // If you want to update a single record then target that record by id or be very specific with search terms.
      // Record id is returned by --read

      await updateRecord(args.update, args.filter);

    } else if (args.delete) {

      // The command to delete is: node src/app.js --delete.id="61bfba994522c89d9654e95f"
      // This will delete the record matching the id
      // Record id is returned by --read

      await deleteRecord(args.delete);

    } else {
      console.log("Incorrect command");
      mongoose.disconnect();
    }
  } catch (error) {
    console.log(error);
    mongoose.disconnect();
  }
};

app(yargs.argv);



//Create a CLI that allows users to store movies in a MogoDB database using mongoose.
// App must cover all CRUD opertations.
// Movie entries should include optional information.

// Strech goals - Allow for filtered serch results (by name/actor/rating),
// Create a second Schema/Model for TV shows with full CRUD operations

