const { getMovie } = require("../../common/helpers");

exports.handler = async (event) => {
  return getMovie("cinemaworld", event);
};
