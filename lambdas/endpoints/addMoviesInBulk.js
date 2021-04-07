const { nanoid } = require("nanoid");
const DynamoDB = require("../common/DynamoDB");
const tableName = process.env.tableName;
exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "SQS event processed.",
      input: event,
    }),
  };
  console.info("event:", JSON.stringify(event));
  // save movie data in the database using the message queue
  if (event.Records.length) {
    event.Records.map(async (record) => {
      console.log("#### Record", record.body);
      // it is assumed that the record contains 2 fields. 1. movie object, 2.api (cinemaworld or filmworld)
      // it is also assumed that the movie object contains the fields name, price, year
      let movie = JSON.parse(record.body).movie;
      // add the ID
      movie.ID = nanoid();
      movie.api = JSON.parse(record.body).api;

      const newMovie = await DynamoDB.write(movie, tableName).catch((err) => {
        console.log("Error in saving the movie");
      });

      if (!newMovie) {
        console.log("Couldn't create a new movie");
      }
    });
  }
  callback(null, response);
};
