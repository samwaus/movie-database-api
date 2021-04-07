const { nanoid } = require("nanoid");
const Responses = require("./API_Responses");
const DynamoDB = require("./DynamoDb");

const tableName = process.env.tableName;

const getAllMovies = async (api) => {
  const movies = await DynamoDB.getAll(tableName).catch((err) => {
    console.log("error in loading data", err);
    return null;
  });

  if (!movies) {
    return Responses.failure_400({
      message: "Couldn't retrieve movies",
    });
  }

  return Responses.success_200({ movies });
};

const getMovie = async (api, event) => {
  console.log("event", event);
  if (!event.pathParameters || !event.pathParameters.ID) {
    // no movie ID submitted
    return Responses.failure_400({ message: "Movie ID not submitted." });
  }

  const movieID = event.pathParameters.ID;

  const movie = await DynamoDB.get(movieID, tableName).catch((err) => {
    console.log("error in loading data", err);
    return null;
  });

  if (!movie) {
    return Responses.failure_400({
      message: "Couldn't find a user by given ID",
    });
  }

  return Responses.success_200({ movie });
};

const addMovie = async (api, event) => {
  console.log("event add movie", event);
  if (!event.body) {
    // no movie data submitted
    return Responses.failure_400({ message: "Movie data not submitted." });
  }

  let movie = JSON.parse(event.body);
  // add the ID
  movie.ID = nanoid();

  const newMovie = await DynamoDB.write(movie, tableName).catch((err) => {
    console.log("Error in saving the movie");
    return null;
  });

  if (!newMovie) {
    return Responses.failure_400({
      message: "Couldn't create a new movie",
    });
  }

  return Responses.success_200({ movie });
};

module.exports = { getAllMovies, getMovie, addMovie };
