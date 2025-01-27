async function timeLogs() {

    $("#add-time-logs-form").on("submit", function (event) {
        event.preventDefault();

        var mtlid = document.getElementById('mtlid').value;
        var mtldate = document.getElementById('mtldate').value;
        var mtltimein = document.getElementById('mtltimein').value;
        var mtltimeout = document.getElementById('mtltimeout').value;
        var manualtask = document.getElementById('manualtask').value;
        var mtlremarks = document.getElementById('mtlremarks').value;

        var data = {};
        data.id = mtlid;
        data.userId = uid;
        data.date = mtldate;
        data.timeIn = mtltimein;
        data.timeOut = mtltimeout;
        data.renderedHours = (new Date(mtltimeout) - new Date(mtltimein)) / 3600000 ;
        data.TaskId = manualtask;
        data.deleteFlag = 1;
        data.Remarks = mtlremarks;
        data.Identifier = "Manual";
        //console.log(data);
        $.ajax({
            url: '/TimeLogs/ManualLogs',
            data: data,
            type: "POST",
            dataType: "json"
        }).done(function (data) {
            //console.log(data);
            //notifyMsg('Success!', 'Successfully Saved', 'green', 'fas fa-check');
            //tlmodal.style.display = "none";
            if (mtlid == 0) {
                var notifmessage = "User " + uid + " wants to add a new manual time log.\nCheck the details below:\n" +
                    "User ID: " + uid +
                    "\nDate: " + mtldate +
                    "\nTime In: " + mtltimein +
                    "\nTime Out: " + mtltimeout +
                    "\nTask Description: " + mtlremarks;
            }
            else {
                var notifmessage = "User " + uid + " wants to update the time log.\nCheck the details below:\n" +
                    "User ID: " + uid +
                    "\nDate: " + mtldate +
                    "\nTime In: " + mtltimein +
                    "\nTime Out: " + mtltimeout +
                    "\nTask Description: " + mtlremarks;
            }
            
            var ndata = {};
            ndata.id = 0;
            ndata.userId = uid;
            ndata.notification = notifmessage;
            ndata.date = mtldate;
            ndata.statusId = 3;
            console.log(ndata);
            $.ajax({
                url: '/TimeLogs/LogsNotification',
                data: ndata,
                type: "POST",
                dataType: "json"
            }).done(function (data) {
                //console.log(data);
                notifyMsg('Success!', 'Successfully Saved', 'green', 'fas fa-check');
                tlmodal.style.display = "none";
                initializeDataTable();
            });
            //initializeDataTable();
        });
        
    });


    $('#timeoutreason').on('change', function () {

        document.getElementById("add-timeout").disabled = false;
        var otherreason = document.getElementById('timeoutreasonholder');
        const textarea = document.getElementById('otherreason');
        if ($("#timeoutreason").val() == "2") {
            textarea.required
            otherreason.style.display = "block";
            textarea.setAttribute('required', 'required');
        }
        else {

            otherreason.style.display = "none";
            textarea.removeAttribute('required');
        }
    });
    $('#show-timeout-modal').on('click', function () {
        var otherreason = document.getElementById('timeoutModal');
        otherreason.style.display = "flex";
        document.getElementById("add-timeout").disabled = true;
    });
    
}
function delete_item_timelogs() {

    console.log(localStorage.getItem('id'));
    console.log(localStorage.getItem('status'));
    console.log(localStorage.getItem('task'));
    console.log(localStorage.getItem('dateString'));
    console.log(localStorage.getItem('timein'));
    console.log(localStorage.getItem('timeout'));
    console.log(localStorage.getItem('remarks'));
    console.log(localStorage.getItem('userid'));


    var mtlid = localStorage.getItem('id');
    var mtldate = localStorage.getItem('dateString');
    var mtltimein = localStorage.getItem('timein');
    var mtltimeout = localStorage.getItem('timeout');
    var manualtask = localStorage.getItem('task');
    var mtlremarks = localStorage.getItem('remarks');

    var data = {};
    data.id = mtlid;
    data.userId = uid;
    data.date = mtldate;
    data.timeIn = mtltimein;
    data.timeOut = mtltimeout;
    data.renderedHours = (new Date(mtltimeout) - new Date(mtltimein)) / 3600000;
    data.TaskId = manualtask;
    data.deleteFlag = 0;
    data.Remarks = mtlremarks;
    console.log(data);
    $.ajax({
        url: '/TimeLogs/ManualLogs',
        data: data,
        type: "POST",
        dataType: "json"
    }).done(function (data) {
        //console.log(data);
        $("#alertmodal").modal('hide');
        notifyMsg('Success!', 'Successfully Saved', 'green', 'fas fa-check');
        initializeDataTable();
    });
}
function decline_item() {

    //console.log(localStorage.getItem('id'));
    //alert("Declined");
    var mtlid = localStorage.getItem('id');
    var action = localStorage.getItem('action');
    var data = {};
    data.id = mtlid;
    data.action = action;
    console.log(data);
    $.ajax({
        url: '/TimeLogs/UpdateLogStatus',
        data: data,
        type: "POST",
        dataType: "json"
    }).done(function (data) {
        //console.log(data);
        //alert("Declined");
        $("#alertmodal").modal('hide');
        notifyMsg('Success!', 'Successfully Decline', 'green', 'fas fa-check');
        initializeDataTable();
        renderedHours();
    });
}

async function modalDom() {

    // Get today's date
    let today = new Date();

    // Format it to YYYY-MM-DD (required format for the input type="date")
    let formattedDate = today.toISOString().split('T')[0];

    // Set the min attribute of the input element
    document.getElementById("mtldate").setAttribute("max", formattedDate);

    // Add event listeners to update the min value of timeout whenever timein changes
    document.getElementById('mtltimein').addEventListener('input', updateTimeoutMin);

    // Add event listener to timeout input to validate whenever timeout changes
    document.getElementById('mtltimeout').addEventListener('input', validateTimeout);

    // Initial call to ensure that min is updated when the page loads
    updateTimeoutMin();

}

// Function to update the 'min' value of the timeout input
function updateTimeoutMin() {
    const timein = document.getElementById('mtltimein').value;
    const timeoutInput = document.getElementById('mtltimeout');

    if (timein) {
        // Set the min value of timeout to the current timein value
        timeoutInput.setAttribute('min', timein);
    } else {
        // If timein is not set, reset the min value of timeout
        timeoutInput.removeAttribute('min');
    }
}

// Function to handle the validation and enable/disable the submit button
function validateTimeout() {
    const timein = document.getElementById('mtltimein').value;
    const timeout = document.getElementById('mtltimeout').value;
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.getElementById('add-time-logs');

    if (timein && timeout) {
        const timeinDate = new Date(timein);
        const timeoutDate = new Date(timeout);

        if (timeoutDate < timeinDate) {
            // Show error message and disable the submit button
            errorMessage.style.display = 'block';
            submitBtn.disabled = true;
            submitBtn.style.background = 'gray';
        } else {
            // Hide error message and enable the submit button
            errorMessage.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.style.background = 'var(--dark)';
        }
    } else {
        // Hide error message and disable the submit button if the fields are incomplete
        errorMessage.style.display = 'none';
        submitBtn.disabled = true;
        submitBtn.style.background = 'gray';
    }
}
function initializeNotiDataTable() {
    var tableId = '#noti-table';
    var lastSelectedRow = null;
    // Check if DataTable is already initialized
    if ($.fn.DataTable.isDataTable(tableId)) {
        // Destroy the existing DataTable instance
        $(tableId).DataTable().clear().destroy();
    }
    const data = {
        //Usertype: '',
        //UserId: user,
        //datefrom: $('#datefrom').val(),
        //dateto: $('#dateto').val(),
        //Department: depart
        StatusID: null
    };
    var dtProperties = {
        ajax: {
            url: '/TimeLogs/GetNotificationList',
            type: "Post",
            data:data,
            dataType: "json",
            processing: true,
            serverSide: true,
            complete: function (xhr) {
                var url = new URL(window.location.href);
                var _currentPage = url.searchParams.get("page01") == null ? 1 : url.searchParams.get("page01");
                // console.log('table1', _currentPage);
                table.page(_currentPage - 1).draw('page');
            },
            error: function (err) {
                alert(err.responseText);
            }
        },
        columns: [
            {
                "title": "Notification",
                "data": "notification",
                "render": function (data, type, row) {
                    var result = ""
                    result = "<a style='white-space: pre-line;'>" + data +"</a>";
                    return result;

                }
            },
            {
                "title": "Date",
                "data": "date"
            },
            {
                "title": "Status",
                "data": "statusName",
                "render": function (data, type, row) {
                    var result = ""
                    if (data == 4) {
                        result = "Read";
                    }
                    else {
                        result = "Unread";
                    }
                    return result;

                }

            }
            //,
            //{
            //    "title": "Action",
            //    "data": "id",
            //    "render": function (data, type, row) {

            //        var button = `<div class="action">
            //                                        <button class="tbl-delete btn btn-danger" id="" title="Delete" 
            //                                            data-id="${data}"
            //                                            data-status="${row.status}"
            //                                            data-name="${row.name}"
            //                                            data-description="${row.description}"
            //                                            data-date="${row.dateCreated}"                                
            //                                            data-positionid="${row.positionId}"
            //                                        >
            //                                        <i class="fa-solid fa-trash"></i> delete
            //                                    </button>
            //                                        <button class="edit-table btn btn-info" id="" title="Time Out"
            //                                            data-id="${data}"
            //                                            data-status="${row.status}"
            //                                            data-name="${row.name}"
            //                                            data-description="${row.description}"
            //                                            data-date="${row.dateCreated}"                                
            //                                            data-positionid="${row.positionId}"
            //                                        >
            //                                            <i class="fa-solid fa-pen-to-square"></i> edit
            //                                        </button>
            //                            </div>`;
            //        return button;
            //    }
            //}
        ],
        order: [[1, 'desc']], // Sort the second column (index 1) by descending order
        columnDefs: [
            {
                targets: 1,
                type: 'date' // Ensure DataTables recognizes this column as date type
            },
            { className: 'dt-left', targets: [0,] },
            {

                width: '50%', targets: 0
            }
        ]
    };

    var table = $(tableId).DataTable(dtProperties);

    $('#time-table').on('page.dt', function () {
        var info = table.page.info();
        var url = new URL(window.location.href);
        url.searchParams.set('page01', (info.page + 1));
        window.history.replaceState(null, null, url);
    });

    $(tableId + '_filter input').attr('placeholder', 'Search Here');

    $(tableId + ' tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        // console.log(data);
        // Remove highlight from the previously selected row
        if (lastSelectedRow) {
            $(lastSelectedRow).removeClass('selected-row');
        }
        // Highlight the currently selected row
        $(this).addClass('selected-row');
        lastSelectedRow = this;
    });

}
function renderedHours() {
    var depart = $('#selectDap').val() ? $('#selectDap').val() : 0;
    var user = $('#selectUser').val() ? $('#selectUser').val() : 0;
    const data = {
        Usertype: '',
        UserId: user,
        datefrom: $('#datefrom').val(),
        dateto: $('#dateto').val(),
        Department: depart
    };

    //console.log(data);
    $.ajax({
        url: '/Timelogs/GetTimelogsTotalHours',
        data: {
            data: data
        },
        type: "Post",
        datatype: "json",
        success: function (data) {
            var total = 0;

            var hours = 0;
            for (var i = 0; i < data.length; i++) {
                //console.log(data[i].statusId);
                if (data[i].statusId == 1) {

                    hours = data[i].renderedHours;
                }
                else {
                    hours = 0;
                }
                total += parseFloat(hours);
            }
            //console.log(total.toFixed(2));
            //$('#totalamount').html("Total Rendered Hours: " + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + total.toFixed(2));
        }
    });
}
