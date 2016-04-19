$(document).ready(function() {
    // get all instance and VM data
    $.ajax({
        url: "api/details",
    }).done(function(data) {
        if(data['message'] == "success"){
            var instanceData = data['instances'];
            instanceData.forEach(function(element, index, array){
                console.log(data);
                var instanceRow = document.createElement("tr");
                var ipCol = document.createElement("td");
                var ctCol = document.createElement("td");
                var passCol = document.createElement("td");
                var delCol = document.createElement("td");
                ipCol.innerHTML = element['ip'];
                ctCol.innerHTML = element['created_at'];
                passCol.innerHTML = element['password'];
                delCol.innerHTML = "<button class='ui button red' onclick=delInstance(" + element['id'] + ")>Delete</button>";                    
                instanceRow.appendChild(ipCol);
                instanceRow.appendChild(ctCol);
                instanceRow.appendChild(passCol);
                instanceRow.appendChild(delCol);
                document.getElementById('instanceTableBody').appendChild(instanceRow);
            });
            var preemtableData = data['virtualMachines'];
            preemtableData.forEach(function(element, index, array){
                var instanceRow = document.createElement("tr");
                var idCol = document.createElement("td");
                var runningCol = document.createElement("td");
                var ipCol = document.createElement("td");
                var portCol = document.createElement("td");
                var passCol = document.createElement("td");
                var delCol = document.createElement("td");
                idCol.innerHTML = element['unique_identifier'].substring(0, 16);
                runningCol.innerHTML = element['running'] ? "Yes" : "No";
                ipCol.innerHTML = element['ipV6'];
                portCol.innerHTML = element['port'];
                passCol.innerHTML = element['password'];
                delCol.innerHTML = "<button class='ui button red' onclick=delVM(" + element['id'] + ")>Delete</button>";                    
                instanceRow.appendChild(idCol);
                instanceRow.appendChild(runningCol);
                instanceRow.appendChild(ipCol);
                instanceRow.appendChild(portCol);
                instanceRow.appendChild(passCol);
                instanceRow.appendChild(delCol);
                document.getElementById('preemtableTableBody').appendChild(instanceRow);
            });
        }
        else{
            
        }
    });
});


function newIntance(){
    $('.ui.modal').modal('show') ;
    // $('#loader').css('display', 'block');
    console.log("newIntance");
    $.ajax({
        url: "api/assignInstance",
    }).done(function(data) {
        console.log(data);
        if(data['message'] == "success"){
            window.location = "account.html"
        }
        else{
            alert("error");
        }
    });   
}

function newVM(){
    $('.ui.modal').modal('show') ;
    // $('#loader').css('display', 'block');
    console.log("newVM");
    $.ajax({
        url: "api/assignVM",
    }).done(function(data) {
        console.log(data);
        if(data['message'] == "success"){
            window.location = "account.html"
        }
        else{
            alert("error");
        }
    });   
}

function delInstance(instanceId){
    $('.ui.modal').modal('show') ;
    // $('#loader').css('display', 'block');
    $.ajax({
        url: "api/removeInstance/" + instanceId ,
    }).done(function(data) {
        console.log(data);
        if(data['message'] == "success"){
            window.location = "account.html"
        }
        else{
            alert("error");
        }
    });   
}

function delVM(vmID){
    $('.ui.modal').modal('show') ;
    // $('#loader').css('display', 'block');
    $.ajax({
        url: "api/removeVM/" + vmID ,
    }).done(function(data) {
        console.log(data);
        if(data['message'] == "success"){
            window.location = "account.html"
        }
        else{
            alert("error");
        }
    });   
}
