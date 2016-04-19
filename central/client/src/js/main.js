$(document).ready(function() {
    // Checking is user is already logged in
    if(location.pathname != "/login.html" && location.pathname != "/admin.html"){
        console.log("Checking in main");
        $.ajax({
            url: "api/isUserLoggedIn",
            context: document.body
        }).done(function(data) {
            if(!('username' in data)){
                // User not logged in
                window.location = "login.html"
            }
        });
    }
});


function logoutUser(){
    $.ajax({
        url: "api/logoutUser",
    }).done(function(data) {
        if(data['message'] == "success"){
            window.location = "login.html"
        }
        else{
            alert("Error!");
        }
    });
}