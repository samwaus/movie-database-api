const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

const DynamoDB = {
  async getAll(TableName, api) {
    const params = {
      TableName,
      Key: {
        api: { S: api },
      },
    };

    const scanResults = [];
    let items;
    do {
      items = await documentClient.scan(params).promise();
      items.Items.forEach((item) => scanResults.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");

    return scanResults;
  },

  async get(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(`Error fetching data for ID of ${ID} from ${TableName}`);
    }

    return data.Item;
  },

  async write(data, TableName) {
    if (!data.ID) {
      throw Error(`No ID provided`);
    }

    const params = {
      TableName,
      Item: data,
    };

    const response = await documentClient.put(params).promise();
    if (!response) {
      throw Error(`Error saving data ID of ${ID} into the table ${TableName}`);
    }

    return data;
  },
};

module.exports = DynamoDB;
