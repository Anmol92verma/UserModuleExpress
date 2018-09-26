window.onload = function(e) {
  checkIfLoggedin();
};

function checkIfLoggedin() {
  var sessionid = Lockr.get("sessionid");

  if (sessionid) {
    window.location.href = "../dashboard/index.html";
  }
}

function onSignup() {
  window.location.href = "../signup/index.html";
}

function onLogin() {
  var email = this.document.getElementById("email");
  var password = this.document.getElementById("password");

  var request = new XMLHttpRequest();

  var url = new URL("http://localhost:5000/login");
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Lockr.set("sessionid", JSON.parse(this.responseText).session);
      alert(this.responseText);
      checkIfLoggedin();
    }
  };
  request.open("POST", url.toString(), true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(
    JSON.stringify({ email: email.value, password: password.value })
  );
}
