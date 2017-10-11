export default function addEmailToMailChimp(email) {
  var request = require("request");

  var options = {
    method: 'POST',
    url: 'https://us16.api.mailchimp.com/3.0/lists/701291e753/members',
    headers: {
      'postman-token': 'a0e31f10-5c30-fb7e-48ad-d84cd8c5402f',
      'cache-control': 'no-cache',
      authorization: 'Basic YW55c3RyaW5nOjE4NGNmNWIyZDAxMzgwZjNlNDU2MWUyYWM2NGVmZDAyLXVzMTY=',
      'content-type': 'application/json'
    },
    body: {
      email_address: email,
      status: 'subscribed'
    },
    json: true
  };

  request(options, function(error, response, body) {
    if (error)
      throw new Error(error);
  });

}
