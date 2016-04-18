$(document).ready(function() {
    // Checking is user is already logged in
    $.ajax({
        url: "http://localhost:8000/index.html",
        context: document.body
    }).done(function(data) {
        data = '{"username":"pck"}';  // Just for testing
        data = JSON.parse(data);
        if(!('username' in data)){
            // User not logged in
            window.location = "login.html"
        }
    });
});
