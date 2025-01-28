var addressCondition = 0;

 function getRegionsData() {
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refregion.csv",
        dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].split(",")
            //console.log(array.length);
            $("#region").empty();
            $("#region").append('<option value="0" disabled selected>Select Region</option>');
            for (var i = 0; i < array.length-1; i++) {
                let headers = array[i].split(",");
                //console.log(headers[2]);
                $("#region").append('<option value="' + headers[2].replaceAll('"', '') + '" data-id="' + headers[3].replaceAll('"', '') + '">' + headers[2].replaceAll('"', '') + "</option>");
            }
            
            
        }
    });
}
 function getProvinceData() {
    var region = $("#region option:selected").data('id');
    console.log("region");
    //alert(region);
     //console.log(localStorage.getItem('selectedRegion'));
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refprovince.csv",
        dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].split(",")
            //console.log(array.length);
            $("#province").empty();
            $("#province").append('<option value="0" disabled selected>Select Province</option>');
            for (var i = 0; i < array.length - 1; i++) {
                let headers = array[i].split(",")
                //console.log(region);
                if (headers[3].replaceAll('"', '') == region) {
                    $("#province").append('<option value="' + headers[2].replaceAll('"', '') + '"  data-id="' + headers[4].replaceAll('"', '') + '">' + headers[2].replaceAll('"', '') + "</option>");
                }
                
            }

        }
    });
}
 function getCityData() {
     var province = $("#province option:selected").data('id');
     //console.log("province");
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refcitymun.csv",
        dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].split(",")
            //console.log(array.length);
            $("#municipality").empty();
            $("#municipality").append('<option value="0" disabled selected>Select City</option>');
            for (var i = 0; i < array.length - 1; i++) {
                let headers = array[i].split(",")
                //console.log(headers[2]);
                if (headers[4].replaceAll('"', '') == province) {
                    $("#municipality").append('<option value="' + headers[2].replaceAll('"', '')+ '"  data-id="' + headers[5].replaceAll('"', '') + '">' + headers[2].replaceAll('"', '') + "</option>");
                }
                
            }

        }
    });
}
 function getBarangayData() {
     var city = $("#municipality option:selected").data('id');
     //console.log("city");
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refbrgy.csv",
        dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].split(",")
            //console.log(array.length);
            $("#barangay").empty();
            $("#barangay").append('<option value="0" disabled selected>Select Barangay</option>');
            for (var i = 0; i < array.length - 1; i++) {
                let headers = array[i].split(",")
                //console.log(headers[2]);
                if (headers[5].replaceAll('"', '') == city) {
                    $("#barangay").append('<option value="' + headers[2].replaceAll('"', '') + '">' + headers[2].replaceAll('"', '').toUpperCase() + "</option>");
                }
                
            }

        }
    });
}

 function addressDOM() {
    var region = document.getElementById('region');
    var province = document.getElementById('province');
    var municipality = document.getElementById('municipality');
    var barangay = document.getElementById('barangay');

    province.disabled = 'true';
    municipality.disabled = 'true';
    barangay.disabled = 'true';
    $("#region").change(function () {
         var regionValue = $("#region option:selected").data('id');
         //console.log(regionValue);

         localStorage.setItem('region', regionValue);

        getProvinceData();
        $("#province").removeAttr('disabled');
        //console.log($("#region option:selected").text());
    });
    $("#province").change(function () {
        getCityData();
        $("#municipality").removeAttr('disabled');
        //console.log($("#province option:selected").text());
    });
    $("#municipality").change(function () {
        getBarangayData();
        $("#barangay").removeAttr('disabled');
        console.log($("#municipality option:selected").text());
    });
    $("#barangay").change(function () {
        console.log($("#barangay option:selected").text());
    });
}

function GetAllDataAddress() {
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refregion.csv",
        dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].split(",")
            //console.log(array.length);
            $("#region").empty();
            $("#region").append('<option value="0" disabled selected>Select Region</option>');
            for (var i = 0; i < array.length - 1; i++) {
                let headers = array[i].split(",");
                //console.log(headers[2]);
                $("#region").append('<option value="' + headers[2].replaceAll('"', '') + '" data-id="' + headers[3].replaceAll('"', '') + '">' + headers[2].replaceAll('"', '') + "</option>");
            }


        }
    });
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refprovince.csv",
        dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].split(",")
            //console.log(array.length);
            $("#province").empty();
            $("#province").append('<option value="0" disabled selected>Select Province</option>');
            for (var i = 0; i < array.length - 1; i++) {
                let headers = array[i].split(",")
                //console.log(region);
                $("#province").append('<option value="' + headers[2].replaceAll('"', '') + '"  data-id="' + headers[4].replaceAll('"', '') + '">' + headers[2].replaceAll('"', '') + "</option>");
                

            }

        }
    });
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refcitymun.csv",
        dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].split(",")
            //console.log(array.length);
            $("#municipality").empty();
            $("#municipality").append('<option value="0" disabled selected>Select City</option>');
            for (var i = 0; i < array.length - 1; i++) {
                let headers = array[i].split(",")
                //console.log(headers[2]);
                $("#municipality").append('<option value="' + headers[2].replaceAll('"', '') + '"  data-id="' + headers[5].replaceAll('"', '') + '">' + headers[2].replaceAll('"', '') + "</option>");
                

            }

        }
    });
    $.ajax({
        type: "GET",
        url: "../../../excel/barangay_files/refbrgy.csv",
        dataType: "text",
        success: function (data) {
            //console.log(data);
            const array = data.toString().split("\n");
            let headers = array[0].split(",")
            //console.log(array.length);
            $("#barangay").empty();
            $("#barangay").append('<option value="0" disabled selected>Select Barangay</option>');
            for (var i = 0; i < array.length - 1; i++) {
                let headers = array[i].split(",")
                //console.log(headers[2]);
                $("#barangay").append('<option value="' + headers[2].replaceAll('"', '') + '">' + headers[2].replaceAll('"', '').toUpperCase() + "</option>");
                

            }

        }
    });
}