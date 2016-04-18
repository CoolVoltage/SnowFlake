$(document).ready(function() {
    console.log("ready");
    // Checking is user is already logged in
    $.ajax({
        url: "http://localhost:8000/index.html",
        context: document.body
    }).done(function(data) {
        data = '{"username1":"pck"}';  // Just for testing
        data = JSON.parse(data);
        console.log(data);
        if(!('username' in data)){
            // User not logged in
            window.location = "login.html"
        }
    });
});
