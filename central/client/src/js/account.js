$(document).ready(function() {
    // get all instance and VM data
    $.ajax({
        url: "http://localhost:8000/login.html",
        context: document.body
    }).done(function(data) {
        data = '{ "message":"success", "instances": [ { "id": 2, "ip": "104.236.55.35", "owner": "1", "created_at": "2016-04-17 19:15:19", "updated_at": "2016-04-17 19:15:57", "password": "lol" } ], "virtualMachines": [ { "id": 1, "unique_identifier": "sddfhdfdfs", "running": 1, "ip": "127.0.0.1", "port": "32807", "owner": "1", "created_at": "2016-04-06 00:00:00", "updated_at": "2016-04-14 00:00:00" } ] }';  // Just for testing
        data = JSON.parse(data);
        if(data['message'] == "success"){
            var instanceData = data['instances'];
            instanceData.forEach(function(element, index, array){
                var instanceRow = document.createElement("tr");
                var ipCol = document.createElement("td");
                var ctCol = document.createElement("td");
                var passCol = document.createElement("td");
                ipCol.innerHTML = element['ip'];
                ctCol.innerHTML = element['created_at'];
                passCol.innerHTML = element['password'];
                instanceRow.appendChild(ipCol);
                instanceRow.appendChild(ctCol);
                instanceRow.appendChild(passCol);
                document.getElementById('instanceTableBody').appendChild(instanceRow);
            });
            var preemtableData = data['virtualMachines'];
            preemtableData.forEach(function(element, index, array){
                var instanceRow = document.createElement("tr");
                var idCol = document.createElement("td");
                var runningCol = document.createElement("td");
                var ipCol = document.createElement("td");
                var ctCol = document.createElement("td");
                var passCol = document.createElement("td");
                idCol.innerHTML = element['unique_identifier'];
                runningCol.innerHTML = element['running'] ? "Yes" : "No";
                ipCol.innerHTML = element['ip'];
                ctCol.innerHTML = element['created_at'];
                passCol.innerHTML = element['password'];
                instanceRow.appendChild(idCol);
                instanceRow.appendChild(runningCol);
                instanceRow.appendChild(ipCol);
                instanceRow.appendChild(ctCol);
                instanceRow.appendChild(passCol);
                document.getElementById('preemtableTableBody').appendChild(instanceRow);
            });
        }
        else{
            
        }
    });
});
