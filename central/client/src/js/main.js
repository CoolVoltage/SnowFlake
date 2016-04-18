$(document).ready(function() {
    // Checking is user is already logged in
    if(location.pathname != "/login.html" || location.pathname != "/admin.html"){
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
    }
});


function logoutUser(){
    $.ajax({
        url: "http://localhost:8000/login.html",
        context: document.body
    }).done(function(data) {
        data = '{"message":"success"}';  // Just for testing
        data = JSON.parse(data);
        if(data['message'] == "success"){
                    window.location = "login.html"
        }
        else{
            alert("Error!");
        }
    });
}