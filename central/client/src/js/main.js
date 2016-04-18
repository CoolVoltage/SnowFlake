$(document).ready(function() {
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