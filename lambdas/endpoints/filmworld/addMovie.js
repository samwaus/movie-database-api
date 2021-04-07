const { addMovie } = require("../../common/helpers");

exports.handler = async (event) => {
  return addMovie("filmworld", event);
};
