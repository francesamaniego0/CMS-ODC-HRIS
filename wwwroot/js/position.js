
function myFunction() {
    pmodal.style.display = "none";
}
function myFunctionOpen() {
    document.getElementById('posid').value = "0";
    document.getElementById('posname').value = "";
    document.getElementById('desc').value = "";
    pmodal.style.display = "flex";
}
async function position() {

    $("#submitpos").on("submit", function (event) {
        event.preventDefault();
        var posid = document.getElementById('posid').value;
        var posdate = document.getElementById('posdate').value;
        var posname = document.getElementById('posname').value;
        var posdesc = document.getElementById('desc').value;
        //alert("Hi Position");
        //console.log(posid);
        //console.log(posname);
        //console.log(posdesc);

        var datetoday = new Date().toISOString();
        console.log(datetoday);
        var data = {};
        data.id = posid;
        data.name = posname;
        data.description = posdesc;
        data.status = 1;
        if (posid == 0) {

            data.dateCreated = datetoday;
        }
        else {
            data.dateCreated = posdate;
        }
        data.positionId = 'POS-0';
        console.log(data);
        $.ajax({
            url: '/Position/SavePosition',
            data: data,
            type: "POST",
            dataType: "json"
        }).done(function (data) {
            console.log(data);
            notifyMsg('Success!', 'Successfully Saved', 'green', 'fas fa-check');
            pmodal.style.display = "none";
            initializeDataTable();
        });
        
    });
    // Edit Time Logs
    $('#pos-table').on('click', '.edit-table', function () {
        var id = $(this).data('id');
        var date = $(this).data('date');
        var posname = $(this).data('name');
        var posdesc = $(this).data('description');
        

        // Extract the date and time part from the string
        //let dateParts = new Date().split(" ")[0].split("/"); // Get "05/01/2025"
        //let day = dateParts[0];
        //let month = dateParts[1];
        //let year = dateParts[2];
        //// Format the Date object to YYYY-MM-DD
        //let formattedDate = year + '-' + month + '-' + day;
        document.getElementById('posid').value = id;
        document.getElementById('posdate').value = date;
        document.getElementById('posname').value = posname;
        document.getElementById('desc').value = posdesc;
        pmodal.style.display = "flex";
    });
   
    
}

function delete_item() {

    console.log(localStorage.getItem('id'));
    //console.log(localStorage.getItem('status'));
    //console.log(localStorage.getItem('task'));
    //console.log(localStorage.getItem('dateString'));
    //console.log(localStorage.getItem('timein'));
    //console.log(localStorage.getItem('timeout'));
    //console.log(localStorage.getItem('remarks'));
    //console.log(localStorage.getItem('userid'));


    var mtlid = localStorage.getItem('id');
    //var mtldate = localStorage.getItem('dateString');
    //var mtltimein = localStorage.getItem('timein');
    //var mtltimeout = localStorage.getItem('timein');
    //var manualtask = localStorage.getItem('task');
    //var mtlremarks = localStorage.getItem('remarks');

    var data = {};
    data.id = mtlid;
    //data.userId = uid;
    //data.date = mtldate;
    //data.timeIn = mtltimein;
    //data.timeOut = mtltimeout;
    //data.renderedHours = (new Date(mtltimeout) - new Date(mtltimein)) / 3600000;
    //data.TaskId = manualtask;
    //data.status = 0;
    //data.Remarks = mtlremarks;
    console.log(data);
    //$.ajax({
    //    url: '/TimeLogs/ManualLogs',
    //    data: data,
    //    type: "POST",
    //    dataType: "json"
    //}).done(function (data) {
    //    //console.log(data);
    //    $("#alertmodal").modal('hide');
    //    notifyMsg('Success!', 'Successfully Saved', 'green', 'fas fa-check');
    //    initializeDataTable();
    //});

}