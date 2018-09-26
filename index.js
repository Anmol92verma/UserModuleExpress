var express = require("express");
var database = require("./database");
var queries = require("./queries");
var crypto = require("crypto");

var generate_key = function() {
  var sha = crypto.createHash("sha256");
  sha.update(Math.random().toString());
  return sha.digest("hex");
};

var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded());

app.post("/login", function(req, res) {
  loginFirst(req, function(error, result, sessionId) {
    if (error) {
      // for database error
      res.send("Error in database connection! ");
    } else {
      // for database success
      if (sessionId) {
        var successLogin = { session: sessionId, message: "Success in Login!" };
        res.send(JSON.stringify(successLogin));
      } else {
        if (result) {
          res.send("Not a valid email user" + req.body.email);
        } else {
          var successLogin = { message: "Failed to create session" };
          res.send(JSON.stringify(successLogin));
        }
      }
    }
  });
});

function loginFirst(req, callbackLogin) {
  database.query(
    queries.loginQuery(req.body.email, req.body.password),
    function(error, result) {
      if (result.length > 0) {
        console.log("result is " + JSON.stringify(result));
        let userId = result[0].userid;
        createSession(userId, callbackLogin);
      } else {
        callbackLogin(error, result, null);
      }
    }
  );
}

function createSession(userid, callbackLogin) {
  var sessionId = generate_key();
  database.query(queries.sessionCreateQuery(userid, sessionId), function(
    error,
    result
  ) {
    if (error) {
      callbackLogin(error, result, null);
    } else {
      callbackLogin(error, result, sessionId);
    }
  });
}

app.post("/register", function(req, res) {
  checkIfUserExists(req.body.email, function(exists) {
    if (!exists) {
      insertUser(req, res);
    } else {
      res.send("User Already exists!");
    }
  });
});

function insertUser(req, res) {
  database.query(
    queries.registerQuery(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.username
    ),
    function(error, result) {
      if (error) {
        console.log(error);
        res.send("Error in database connection! ");
      } else {
        console.log(JSON.stringify(result));
        res.send("Successfull registered! " + req.body.email);
      }
    }
  );
}

function checkIfUserExists(email, callback) {
  database.query(queries.searchUserByEmail(email), function(error, result) {
    if (error) {
      console.log(error);
      callback(false);
      res.send("Error in database connection! ");
    } else {
      console.log(JSON.stringify(result));
      if (result.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    }
  });
}

app.listen(5000);
