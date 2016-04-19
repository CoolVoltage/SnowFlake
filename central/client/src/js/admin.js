$(document).ready(function() {
    // get all instance and VM data
    $.ajax({
        url: "http://localhost:8000/login.html",
        context: document.body
    }).done(function(data) {
        data = '{ "message":"success", "instances": [ { "id": 2, "ip": "127.0.0.1", "owner": "1", "created_at": "2016-04-17 19:15:19", "updated_at": "2016-04-17 19:15:57", "password": "lol" } ], "virtualMachines": [ { "id": 1, "unique_identifier": "sddfhdfdfs", "running": 0, "ip": "127.0.0.1", "port": "32807", "owner": "1", "created_at": "2016-04-06 00:00:00", "updated_at": "2016-04-14 00:00:00" }, { "id": 1, "unique_identifier": "sddfhdfdfs", "running": 1, "ip": "127.0.0.1", "port": "32807", "owner": "1", "created_at": "2016-04-06 00:00:00", "updated_at": "2016-04-14 00:00:00" } ] }';  // Just for testing
        data = JSON.parse(data);
        if(data['message'] == "success"){
            var instanceData = data['instances'];
            var preemtableData = data['virtualMachines'];
            adminDiv = document.getElementById('adminData');
            instanceData.forEach(function(element, index, array){
                console.log(element);
                var instanceCard = document.createElement("div");
                instanceCard.className = "ui container clearing segment text cards padded";
                instanceCard.innerHTML += "IP: " + element['ip'] + "<br/>";
                instanceCard.innerHTML += "Owner: " + element['owner'] + "<br/>";
                var vmDiv = document.createElement("div");
                vmDiv.className = "ui cards clearing";
                preemtableData.forEach(function(vmElement, index, array){
                    if (vmElement['ip'] == element['ip'] && vmElement['running']){
                        var oneVMDiv = document.createElement("div");
                        oneVMDiv.className = "card";
                        oneVMDiv.innerHTML += "unique_identifier: " + vmElement['unique_identifier'] + "<br/>";
                        oneVMDiv.innerHTML += "owner: " + vmElement['owner'] + "<br/>";
                        oneVMDiv.innerHTML += "port: " + vmElement['port'] + "<br/>";
                        vmDiv.appendChild(oneVMDiv);
                    }
                });
                instanceCard.appendChild(vmDiv);
                adminDiv.appendChild(instanceCard);

            });
            adminDiv.innerHTML += "<br /><br />"
            var idleCard = document.createElement("div");
            idleCard.className = "ui container clearing segment text cards padded";
            idleCard.innerHTML = "Idle VMs<br/><br/>";
            preemtableData.forEach(function(element, index, array){
                if(!element['running']){
                    console.log("Idle");
                    var oneIdleVM = document.createElement("div");
                    oneIdleVM.className = "red card";
                    oneIdleVM.innerHTML += "unique_identifier: " + element['unique_identifier'] + "<br/>";
                    oneIdleVM.innerHTML += "owner: " + element['owner'] + "<br/>";
                    idleCard.appendChild(oneIdleVM);
                }
            });
            adminDiv.appendChild(idleCard);
        }
        else{
            
        }
    });
});
