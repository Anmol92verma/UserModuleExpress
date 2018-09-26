window.onload = function(e) {
  checkIfLoggedin();
};

function checkIfLoggedin() {
  var sessionid = Lockr.get("sessionid");

  if (sessionid) {
    window.location.href = "../view/dashboard/index.html";
  } else {
    window.location.href = "../view/login/index.html";
  }
}
