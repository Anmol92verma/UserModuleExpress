exports.loginQuery = function(email, password) {
  return (
    "SELECT userid, email, password FROM users WHERE email = '" +
    email +
    "' AND password = '" +
    password +
    "'"
  );
};

exports.searchUserByEmail = function(email) {
  return "SELECT email FROM users WHERE email = '" + email + "'";
};

exports.registerQuery = function(email, password, fullname, username) {
  return (
    "INSERT into users (email,password,fullname,username) VALUES ('" +
    email +
    "', '" +
    password +
    "', '" +
    fullname +
    "', '" +
    username +
    "')"
  );
};

exports.sessionCreateQuery = function(userid, sessionid) {
  return (
    "REPLACE into sessions (userid,session_id) VALUES ('" +
    userid +
    "', '" +
    sessionid +
    "')"
  );
};

exports.logoutUser = function(sessionid) {
  return "DELETE from sessions WHERE session_id = '" + sessionid + "'";
};
