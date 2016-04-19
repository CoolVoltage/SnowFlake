$(document).ready(function() {
    // Checking is user is already logged in
    $.ajax({
        url: "api/isUserLoggedIn",
        // context: document.body
    }).done(function(data) {
        // data = '{"username1":"pck"}';  // Just for testing
        console.log(data);
        if('username' in data){
            // User already logged in
            window.location = "index.html"
        }
    });
});

function testLogin(ev){
    var username = $("#username").val();
    var password = $("#password").val();
    console.log(username);
    $.ajax({
        url: "api/loginUser",
        method: "POST",
        data: {'username':username, 'password':password}
    }).done(function(data) {
        console.log(data);
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