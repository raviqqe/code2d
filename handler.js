'use strict';

module.exports.login = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! raviqqe\'s function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};
