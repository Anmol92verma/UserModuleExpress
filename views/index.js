window.onload = function(e) {
  checkIfLoggedin();
};

function checkIfLoggedin() {
  var sessionid = Lockr.get("sessionid");

  if (sessionid) {
    window.location.href = "../views/dashboard/index.html";
  } else {
    window.location.href = "../views/login/index.html";
  }
}
