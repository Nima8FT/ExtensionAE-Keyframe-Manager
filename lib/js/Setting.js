var csInterface = new CSInterface();
var OS;

// var aesp = new Aesp({productVersion: "1.0.0"}, onLicenseStatusChange);
// // function onLicenseStatusChange(isValidLicense, isTrial) { };

// var asd =document

var isDisplay = ".Cubes" + "<!>" + ".btn__Search" + "<!>" + ".btn__Replace"
    + "<!>" + ".Main_Time" + "<!>" + ".Main_Amount" + "<!>" + ".Main_SPK" + "<!>"
    + ".Main_Ease" + "<!>" + ".Main_Speed" + "<!>" + ".Main_Move" + "<!>"
    + ".AddKey" + "<!>" + ".Move__Time" + "<!>" + ".Default__Ease" + "<!>"
    + ".Copy" + "<!>" + ".Paste_Position" + "<!>" + ".Paste_Ease" + "<!>"
    + ".Paste_Speed" + "<!>" + ".Paste_All" + "<!>" + ".Paste_Key";

var isTick = "#ThreeD" + "<!>" + "#Search" + "<!>" + "#Replace" + "<!>"
    + "#Time" + "<!>" + "#Value" + "<!>" + "#Space_Time" + "<!>"
    + "#Ease" + "<!>" + "#Speed" + "<!>" + "#KeyMove" + "<!>"
    + "#CreateKey" + "<!>" + "#Main_Move" + "<!>" + "#DefaultEase" + "<!>"
    + "#Copy" + "<!>" + "#PasteValue" + "<!>" + "#PasteEase" + "<!>"
    + "#PasteSpeed" + "<!>" + "#PasteAll" + "<!>" + "#PasteKey";

$(document).ready(function () {

    csInterface.evalScript('GetOS()', function (val) {
        OS = val;
    });


    $("#Head_Setting").attr("checked", "checked");
    $("#Row_Keyframe").attr("checked", "checked");
    $("#ToolsKeyframe").attr("checked", "checked");


    var Default_Ease_1 = $("#Default__Ease__1_1").html();
    var Default_Ease_2 = $("#Default__Ease__2").html();
    var Default_Ease_3 = $("#Default__Ease__3").html();
    var Default_Ease_4 = $("#Default__Ease__4").html();
    var Default_Ease_5 = $("#Default__Ease__5").html();

    Default_Ease_1 = Default_Ease_1.split("/");
    Default_Ease_2 = Default_Ease_2.split("/");
    Default_Ease_3 = Default_Ease_3.split("/");
    Default_Ease_4 = Default_Ease_4.split("/");
    Default_Ease_5 = Default_Ease_5.split("/");

    $("#S_Ease_1_1").val(Default_Ease_1[0]);
    $("#S_Ease_1_2").val(Default_Ease_1[1]);
    $("#S_Ease_2_1").val(Default_Ease_2[0]);
    $("#S_Ease_2_2").val(Default_Ease_2[1]);
    $("#S_Ease_3_1").val(Default_Ease_3[0]);
    $("#S_Ease_3_2").val(Default_Ease_3[1]);
    $("#S_Ease_4_1").val(Default_Ease_4[0]);
    $("#S_Ease_4_2").val(Default_Ease_4[1]);
    $("#S_Ease_5_1").val(Default_Ease_5[0]);
    $("#S_Ease_5_2").val(Default_Ease_5[1]);

    isDisplay = isDisplay.split("<!>");
    isTick = isTick.split("<!>");
    for (var i = 0; i < isDisplay.length; i++) {
        var isDisplayCheck = $(isDisplay[i]).css("display");
        if (isDisplayCheck == "flex" || isDisplayCheck == "block") {
            $(isTick[i]).attr("checked", "checked");
            $(isTick[i]).attr("isNone", "true");
        }
        else {
            $(isTick[i]).attr("isNone", "false");
        }
    }

    $(".Cancel_setting").click(function (e) {
        $(".Header").css("display", "flex");
        $(".main").css("display", "block");
        $(".Footer").css("display", "flex");
        $(".Head_Setting").css("display", "none");
        $(".Main_Setting").css("display", "none");
        $(".Foot_Setting").css("display", "none");
        $(".Ease_Setting").css("display", "none");
        $(".Btn_Setting").css("display", "none");
        $(".Setting_Panel").css("display", "none");
        csInterface.resizeContent(650, 400)
    });

    $(".Apply_setting").click(function (e) {

        $(".Header").css("display", "flex");
        $(".main").css("display", "block");
        $(".Footer").css("display", "flex");
        $(".Head_Setting").css("display", "none");
        $(".Main_Setting").css("display", "none");
        $(".Foot_Setting").css("display", "none");
        $(".Ease_Setting").css("display", "none");
        $(".Btn_Setting").css("display", "none");
        $(".Setting_Panel").css("display", "none");

        var Default_Ease_1_0 = $("#S_Ease_1_1").val();
        var Default_Ease_1_1 = $("#S_Ease_1_2").val();
        var Default_Ease_2_0 = $("#S_Ease_2_1").val();
        var Default_Ease_2_1 = $("#S_Ease_2_2").val();
        var Default_Ease_3_0 = $("#S_Ease_3_1").val();
        var Default_Ease_3_1 = $("#S_Ease_3_2").val();
        var Default_Ease_4_0 = $("#S_Ease_4_1").val();
        var Default_Ease_4_1 = $("#S_Ease_4_2").val();
        var Default_Ease_5_0 = $("#S_Ease_5_1").val();
        var Default_Ease_5_1 = $("#S_Ease_5_2").val();
        $("#Default__Ease__1_0").html(Default_Ease_1_0 + "/" + Default_Ease_1_1);
        $("#Default__Ease__1_1").html(Default_Ease_1_0 + "/" + Default_Ease_1_1);
        $("#Default__Ease__2").html(Default_Ease_2_0 + "/" + Default_Ease_2_1);
        $("#Default__Ease__3").html(Default_Ease_3_0 + "/" + Default_Ease_3_1);
        $("#Default__Ease__4").html(Default_Ease_4_0 + "/" + Default_Ease_4_1);
        $("#Default__Ease__5").html(Default_Ease_5_0 + "/" + Default_Ease_5_1);

        var SaveEase = Default_Ease_1_0 + "/" + Default_Ease_1_1 + "<!>" + Default_Ease_2_0 + "/" + Default_Ease_2_1 + "<!>" + Default_Ease_3_0 + "/" + Default_Ease_3_1 + "<!>" + Default_Ease_4_0 + "/" + Default_Ease_4_1 + "<!>" + Default_Ease_5_0 + "/" + Default_Ease_5_1;

        window.cep.fs.writeFile("../../SaveEase.txt",SaveEase)
        csInterface.resizeContent(650, 400)

    });

    $("#ThreeD").click(function (e) {
        var isNone = $("#ThreeD").attr("isNone");
        if (isNone == "true") {
            var isNone = $("#ThreeD").attr("isNone", "false");
            $(".Cubes").css("display", "none");
        }
        else {
            var isNone = $("#ThreeD").attr("isNone", "true");
            $(".Cubes").css("display", "flex");
        }
    });

    $("#Search").click(function (e) {
        let isNone = $("#Search").attr("isNone");
        if (isNone == "true") {
            $("#Search").attr("isNone", "false");
            $(".SerRep").css("display", "none");
        }
        else {
            $("#Search").attr("isNone", "true");
            $(".SerRep").css("display", "flex");
        }
    });

    $("#CreateKey").click(function (e) {
        let isNone = $("#CreateKey").attr("isNone");
        if (isNone == "true") {
            $("#CreateKey").attr("isNone", "false");
            $(".AddKey").css("display", "none");
        }
        else {
            $("#CreateKey").attr("isNone", "true");
            $(".AddKey").css("display", "flex");
        }
    });

    $("#Main_Move").click(function (e) {
        let isNone = $("#Main_Move").attr("isNone");
        if (isNone == "true") {
            $("#Main_Move").attr("isNone", "false");
            $(".Move__Time").css("display", "none");
        }
        else {
            $("#Main_Move").attr("isNone", "true");
            $(".Move__Time").css("display", "flex");
        }
    });

    $("#DefaultEase").click(function (e) {
        let isNone = $("#DefaultEase").attr("isNone");
        if (isNone == "true") {
            $("#DefaultEase").attr("isNone", "false");
            $(".Default__Ease").css("display", "none");
        }
        else {
            $("#DefaultEase").attr("isNone", "true");
            $(".Default__Ease").css("display", "flex");
        }
    });

    $("#Copy").click(function (e) {
        let isNone = $("#Copy").attr("isNone");
        if (isNone == "true") {
            $("#Copy").attr("isNone", "false");
            $(".Copy").css("display", "none");
        }
        else {
            $("#Copy").attr("isNone", "true");
            $(".Copy").css("display", "flex");
        }
    });

    $("#PasteValue").click(function (e) {
        let isNone = $("#PasteValue").attr("isNone");
        if (isNone == "true") {
            $("#PasteValue").attr("isNone", "false");
            $(".Paste_Position").css("display", "none");
        }
        else {
            $("#PasteValue").attr("isNone", "true");
            $(".Paste_Position").css("display", "flex");
        }
    });

    $("#PasteEase").click(function (e) {
        let isNone = $("#PasteEase").attr("isNone");
        if (isNone == "true") {
            $("#PasteEase").attr("isNone", "false");
            $(".Paste_Ease").css("display", "none");
        }
        else {
            $("#PasteEase").attr("isNone", "true");
            $(".Paste_Ease").css("display", "flex");
        }
    });

    $("#PasteSpeed").click(function (e) {
        let isNone = $("#PasteSpeed").attr("isNone");
        if (isNone == "true") {
            $("#PasteSpeed").attr("isNone", "false");
            $(".Paste_Speed").css("display", "none");
        }
        else {
            $("#PasteSpeed").attr("isNone", "true");
            $(".Paste_Speed").css("display", "flex");
        }
    });

    $("#PasteAll").click(function (e) {
        let isNone = $("#PasteAll").attr("isNone");
        if (isNone == "true") {
            $("#PasteAll").attr("isNone", "false");
            $(".Paste_All").css("display", "none");
        }
        else {
            $("#PasteAll").attr("isNone", "true");
            $(".Paste_All").css("display", "flex");
        }
    });

    $("#PasteKey").click(function (e) {
        let isNone = $("#PasteKey").attr("isNone");
        if (isNone == "true") {
            $("#PasteKey").attr("isNone", "false");
            $(".Paste_Key").css("display", "none");
        }
        else {
            $("#PasteKey").attr("isNone", "true");
            $(".Paste_Key").css("display", "flex");
        }
    });

    $("#Time").click(function (e) {
        let isNone = $("#Time").attr("isNone");
        if (isNone == "true") {
            $("#Time").attr("isNone", "false");
            $(".Main_Time").css("display", "none");
            $(".Items_Time").css("display", "none");
        }
        else {
            $("#Time").attr("isNone", "true");
            $(".Main_Time").css("display", "flex");
            $(".Items_Time").css("display", "flex");
        }
    });

    $("#Value").click(function (e) {
        let isNone = $("#Value").attr("isNone");
        if (isNone == "true") {
            $("#Value").attr("isNone", "false");
            $(".Main_Amount").css("display", "none");
            $(".Items_Amount").css("display", "none");
        }
        else {
            $("#Value").attr("isNone", "true");
            $(".Main_Amount").css("display", "flex");
            $(".Items_Amount").css("display", "flex");
        }
    });

    $("#Space_Time").click(function (e) {
        let isNone = $("#Space_Time").attr("isNone");
        if (isNone == "true") {
            $("#Space_Time").attr("isNone", "false");
            $(".Main_SPK").css("display", "none");
            $(".div_SpaceAll").css("display", "none");
        }
        else {
            $("#Space_Time").attr("isNone", "true");
            $(".Main_SPK").css("display", "flex");
            $(".div_SpaceAll").css("display", "flex");
        }
    });

    $("#Ease").click(function (e) {
        let isNone = $("#Ease").attr("isNone");
        if (isNone == "true") {
            $("#Ease").attr("isNone", "false");
            $(".Main_Ease").css("display", "none");
            $(".div_Keys").css("display", "none");
        }
        else {
            $("#Ease").attr("isNone", "true");
            $(".Main_Ease").css("display", "flex");
            $(".div_Keys").css("display", "flex");
        }
    });

    $("#Speed").click(function (e) {
        let isNone = $("#Speed").attr("isNone");
        if (isNone == "true") {
            $("#Speed").attr("isNone", "false");
            $(".Main_Speed").css("display", "none");
            $(".div_Speed").css("display", "none");
        }
        else {
            $("#Speed").attr("isNone", "true");
            $(".Main_Speed").css("display", "flex");
            $(".div_Speed").css("display", "flex");
        }
    });

    $("#KeyMove").click(function (e) {
        let isNone = $("#KeyMove").attr("isNone");
        if (isNone == "true") {
            $("#KeyMove").attr("isNone", "false");
            $(".Main_Move").css("display", "none");
            $(".Items_Move").css("display", "none");
        }
        else {
            $("#KeyMove").attr("isNone", "true");
            $(".Main_Move").css("display", "flex");
            $(".Items_Move").css("display", "flex");
        }
    });

});








function GetOS() {
    var a = __dirname;
    if (OS == "WIN") {
        var aa = a.split('\\');
        a = "";
        aa.forEach(item => {
            a += item + "\\\\";
        });
        a += "Presets\\\\";
    }
    else if (OS == "MAC") {
        a += "/Presets/";
    }
    return a;
}

