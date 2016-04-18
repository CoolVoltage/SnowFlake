$( document ).ready(function() {
    console.log( "ready!" );
	$("loginForm").submit(function(){
		alert("HELLO");
		return false;
	});
});

function testLogin(ev){
	alert();
	ev.preventDefault();
	return false;
}