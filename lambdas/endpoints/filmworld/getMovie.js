const { getMovie } = require("../../common/helpers");

exports.handler = async (event) => {
  return getMovie("filmworld", event);
};
