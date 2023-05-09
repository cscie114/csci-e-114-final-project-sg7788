const fetch = require("node-fetch");

const handler = async function (event, context) {
  const { state } = event.queryStringParameters;
  const requestUrl = `https://api.weather.gov/alerts?active=1&area=${state}`;

  try {
    let response = await fetch(requestUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
      },
    });
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    // if response is ok
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        data,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
