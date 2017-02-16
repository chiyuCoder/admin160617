$(function () {
    var fhD = $("#fhdecision")[0];
    fhD.onchange = function () {
        $(".vsel").css("display","none");
        var fhV = fhD.value
        switch (fhV) {
            case "rmb":
                $("#selRMB").css("display", "block");
                break;
            case "ug":
                $("#selUG").css("display","block");
                break;
        }
    }
    $("#inputUGzdy").bind("click", function () {
        $("#nameUG").css("display", "block");
    });
    $("#inputsxf").bind("click", function () {
        $("#nameUG").css("display", "none");
    });
    $("#inputRMBzdy").bind("click", function () {
        $("#nameRMB").css("display", "block");
    });
    $("#inputRMBsxf").bind("click", function () {
        $("#nameRMB").css("display", "none");
    });    
})