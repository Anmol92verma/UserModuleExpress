function onRegister() {
  var email = this.document.getElementById("emailregister");
  var password = this.document.getElementById("passwordregister");
  var fullname = this.document.getElementById("fullnameregister");
  var username = this.document.getElementById("usernameregister");
  var request = new XMLHttpRequest();

  var url = new URL("https://polar-dawn-18247.herokuapp.com/register");
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
      window.location.href = "../index.html";
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
