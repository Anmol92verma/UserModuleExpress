window.onload = function(e) {
  checkIfLoggedin();
};

function checkIfLoggedin() {
  var sessionid = Lockr.get("sessionid");

  if (sessionid) {
    document.getElementById("welcomediv").style = "display: block";
  } else {
    document.getElementById("welcomediv").style = "display: none";
  }
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

function onRegister() {
  var email = this.document.getElementById("emailregister");
  var password = this.document.getElementById("passwordregister");
  var fullname = this.document.getElementById("fullnameregister");
  var username = this.document.getElementById("usernameregister");
  var request = new XMLHttpRequest();

  var url = new URL("http://localhost:5000/register");
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
    }
  };
  request.open("POST", url.toString(), true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(
    JSON.stringify({
      email: email.value,
      password: password.value,
      fullname: fullname.value,
      username: username.value
    })
  );
}

function onLogout() {
  var request = new XMLHttpRequest();
  var url = new URL("http://localhost:5000/logout");
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
      Lockr.flush();
      checkIfLoggedin();
    }
  };
  request.open("DELETE", url.toString(), true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(
    JSON.stringify({
      userid: Lockr.get("sessionid")
    })
  );
}
