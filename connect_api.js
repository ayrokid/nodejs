var http = require("http");

var options = {
  "method": "GET",
  "hostname": "rajaongkir.com",
  "port": null,
  "path": "/api/starter/province?id=12",
  "headers": {
    "key": "7e6b9eef242c49c1141fc87712eaa2cc"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();