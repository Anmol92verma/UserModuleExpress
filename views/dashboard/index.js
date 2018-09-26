window.onload = function(e) {
  checkIfLoggedin();
};

function checkIfLoggedin() {
  var sessionid = Lockr.get("sessionid");

  if (sessionid) {
  } else {
    window.location.href = "../login/index.html";
  }
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
