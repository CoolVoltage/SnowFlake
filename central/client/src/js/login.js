$(document).ready(function() {
    // Checking is user is already logged in
    $.ajax({
        url: "http://localhost:8000/login.html",
        context: document.body
    }).done(function(data) {
        data = '{"username1":"pck"}';  // Just for testing
        data = JSON.parse(data);
        if('username' in data){
            // User already logged in
            window.location = "index.html"
        }
    });
});

function testLogin(ev){
    var username = $("#username").val();
    var password = $("#password").val();
    $.ajax({
        url: "http://localhost:8000/login.html",
        context: document.body
    }).done(function(data) {
        data = '{"message":"success"}';  // Just for testing
        data = JSON.parse(data);
        if(data['message'] == "success"){
            window.location = "index.html"
        }
        else{
            $("#loginError").css("display", "block");
        }
    });
    ev.preventDefault();
    return false;
}