exports.loginQuery = function(email, password) {
  return (
    "SELECT email, password FROM users WHERE email = '" +
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
