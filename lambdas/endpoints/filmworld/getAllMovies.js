const { getAllMovies } = require("../../common/helpers");

exports.handler = async (event) => {
  return getAllMovies("filmworld");
};
