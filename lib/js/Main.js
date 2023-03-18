var csInterface = new CSInterface();
var OS;

// var aesp = new Aesp({productVersion: "1.0.0"}, onLicenseStatusChange);
// // function onLicenseStatusChange(isValidLicense, isTrial) { };

var Counter = 0;
var isFlag = false;
var AllIndex = [];
$(document).ready(function () {

    csInterface.evalScript('GetOS()', function (val) {
        OS = val;
    });

    SaveDefaultEase();

    $(".Transform_Key").hover(function () {
        $(".Transform__Key__Menu").css("display", "block");
    }, function () {
        $(".Transform__Key__Menu").css("display", "none");
    }
    );

    $(".Transform_Key_Title > a").click(function (e) {
        Refresh();
    });

    $("#btn_Position").click(function (e) {
        get_Property("Position");
    });

    $("#btn_Anchor").click(function (e) {
        get_Property("Anchor Point");
    });

    $("#btn_Scale").click(function (e) {
        get_Property("Scale");
    });

    $("#btn_Rotation").click(function (e) {
        get_Property("Rotation");
    });

    $("#btn_RotationX").click(function (e) {
        get_Property("XRotation");
    });

    $("#btn_RotationY").click(function (e) {
        get_Property("YRotation");
    });

    $("#btn_RotationZ").click(function (e) {
        get_Property("ZRotation");
    });

    $("#btn_Oriention").click(function (e) {
        get_Property("Oriention");
    });

    $("#btn_Opacity").click(function (e) {
        get_Property("Opacity");
    });

    $(".Cubes").click(function (e) {
        csInterface.evalScript('ThreeD("' + false + '")', function (val) {
            if (val == "true") {
                $(".none").css("display", "block");
                $(".Cube").css("opacity", "0.7");
                $(".Cubes").css("background", "#181818");
            }
            else {
                $(".none").css("display", "none");
                $(".Cube").css("opacity", "1");
                $(".Cubes").css("background", "#2F2F2F");
            }
        });
    });

    $(".icon_Replace").click(function () {
        $(".btn__Search").css("display", "none");
        $(".btn__Replace").css("display", "flex");
    });

    $(".icon_Search").click(function () {
        $(".btn__Search").css("display", "flex");
        $(".btn__Replace").css("display", "none");
    });

    $(".btn__Search > div").hover(function () {
        $(".btn__Search__Menu").css("display", "block");
    }, function () {
        $(".btn__Search__Menu").css("display", "none");
    }
    );

    $(".btn__Replace > div").hover(function () {
        $(".btn__Search__Menu").css("display", "block");
    }, function () {
        $(".btn__Search__Menu").css("display", "none");
    }
    );

    $(".inp_Search").change(function (e) {
        Search_Replace("Search");
    });

    $(".Change_Search").click(function (e) {
        Search_Replace("Search");
    });

    $(".inp_Replace").change(function (e) {
        Search_Replace("Replace");
    });

    $(".Change_Replace").click(function (e) {
        Search_Replace("Replace");
    });

    $(".Item_Search_Value").click(function (e) {
        $(".Change_Search").html("Value");
        $(".Change_Replace").html("Value");
        $(".btn__Search__Menu").css("display", "none");
    });

    $(".Item_Search_Speed").click(function (e) {
        $(".Change_Search").html("Speed");
        $(".Change_Replace").html("Speed");
        $(".btn__Search__Menu").css("display", "none");
    });

    $(".Item_Search_Ease").click(function (e) {
        $(".Change_Search").html("Ease");
        $(".Change_Replace").html("Ease");
        $(".btn__Search__Menu").css("display", "none");
    });

    $(".TimeLine").click(function (e) {
        var Index = $(".inp-cbx:checked").parent().parent().find(".Num").text();
        if (Index == "") {
            alert("Please Select Key")
        }
        else {
            if (isFlag == false) {
                $(".TimeLines").css("opacity", "0.5");
                $(".TimeLines").css("background", "#181818");
                csInterface.evalScript('TimeLine("' + Index + '","' + true + '")', function (val) {
                });
                isFlag = true;
            }
            else {
                $(".TimeLines").css("opacity", "1");
                $(".TimeLines").css("background", "#2F2F2F");
                isFlag = false;
            }
        }
    });

    $(".Refresh").click(function (e) {
        Refresh();
    });

    $('.Setting').click(function (e) {
        $(".Header").css("display", "none");
        $(".main").css("display", "none");
        $(".Footer").css("display", "none");
        $(".Head_Setting").css("display", "flex");
        $(".Main_Setting").css("display", "flex");
        $(".Foot_Setting").css("display", "flex");
        $(".Ease_Setting").css("display", "flex");
        $(".Btn_Setting").css("display", "flex");
        $(".Setting_Panel").css("display", "flex");
        csInterface.resizeContent(490, 550);
        // window.__adobe_cep__.resizeContent("200", "200");
    });

    $("#cbx").click(function (e) {
        Counter++;
        if (Counter % 2 == 0) {
            $(".qwe").removeAttr('checked');
            csInterface.evalScript('All_Select_Deselect_Key("' + false + '")', function (val) {
            });
        }
        else {
            $(".qwe").attr('checked', 'checked');
            csInterface.evalScript('All_Select_Deselect_Key("' + true + '")', function (val) {
            });
        }
    });

    $(".ExitAll").click(function (e) {
        csInterface.evalScript('Key_Delete_Selected()', function (val) {
        });
        Refresh();
    });

    $(".CopyAll").click(function (e) {
        csInterface.evalScript('btn_CopyKeys()', function (val) {
            $(".Num_Copy").html(val);
        });
    });

    $(".Paste_Position").click(function (e) {
        csInterface.evalScript('btn_PasteValue()', function (val) {
            Refresh();
        });
    });

    $(".Paste_Speed").click(function (e) {
        csInterface.evalScript('btn_PasteSpeed()', function (val) {
            Refresh();
        });
    });

    $(".Paste_Ease").click(function (e) {
        csInterface.evalScript('btn_PasteEase()', function (val) {
            Refresh();
        });
    });

    $(".Paste_All").click(function (e) {
        csInterface.evalScript('btn_PasteAll()', function (val) {
            Refresh();
        });
    });

    $(".Paste_Key").click(function (e) {
        csInterface.evalScript('btn_PasteKey()', function (val) {
            Refresh();
        });
    });

    $(".Default__Ease").contextmenu(function (e) {
        e.preventDefault();
        Counter++;
        if (Counter % 2 == 0) {
            $(".Default__Ease__All").css("display", "none");
        }
        else {
            $(".Default__Ease__All").css("display", "block");
        }
    });

    $(".Default__Ease").click(function (e) {
        MenuDefaultEase();
        let Ease = $("#Default__Ease__1_0").html();
        csInterface.evalScript('DefaultEase("' + Ease + '")', function (val) {
        });
        Refresh();
    });

    $(".Go_Back").click(function (e) {
        MenuDefaultEase();
        let Time = $(".move_keyframe").val();
        csInterface.evalScript('BackKey("' + Time + '")', function (val) {
        });
        Refresh();
    });

    $(".Go_Next").click(function (e) {
        MenuDefaultEase();
        let Time = $(".move_keyframe").val();
        csInterface.evalScript('GoKey("' + Time + '")', function (val) {
        });
        Refresh();
    });

    $(".Add_Linear_Key").click(function (e) {
        csInterface.evalScript('CreateKey("' + "Linear" + '")', function (val) {
        });
        Refresh();
    });

    $(".Add_Bezier_Key").click(function (e) {
        csInterface.evalScript('CreateKey("' + "Bezier" + '")', function (val) {
        });
        Refresh();
    });

    $(".Add_Hold_Key").click(function (e) {
        csInterface.evalScript('CreateKey("' + "Hold" + '")', function (val) {
        });
        Refresh();
    });

});


function Index_Name() {
    csInterface.evalScript('Index_Name()', function (val) {
        var sp = val.split('<!>');
        $(".Index").html("#" + sp[0]);
        $(".Name_Layer").html(sp[1]);
    });

}

function Show_Key(val, z) {
    let sp = val.split("<!>")

    // alert("hh");

    let NumKey = sp[0];
    let TypeKey = sp[1].split(',');
    let TimeKey = sp[2].split(',');
    let Value = sp[3].split('<//>');
    let Ease = sp[4].split('<//>');
    let Speed = sp[5].split('<//>');
    let SpaceKey = sp[6].split(',');
    let Slider = 0;
    let DiffrentColor = "";
    let KeyLBH;
    let ReadOnly = "";
    let Opacity = "";
    let Show_Value_Key;
    var Values;


    csInterface.evalScript('ThreeD("' + true + '")', function (val) {
        if (val == "true") {
            $(".none").css("display", "block");
            $(".Cube").css("opacity", "0.7");
            $("#btn_Rotation").css("display", "none");
            $("#btn_RotationX").css("display", "block");
            $("#btn_RotationY").css("display", "block");
            $("#btn_RotationZ").css("display", "block");
            $("#btn_Oriention").css("display", "block");
            $(".Cubes").css("background", "#181818");
        }
        else {
            $(".none").css("display", "none");
            $(".Cube").css("opacity", "1");
            $("#btn_Rotation").css("display", "block");
            $("#btn_RotationX").css("display", "none");
            $("#btn_RotationY").css("display", "none");
            $("#btn_RotationZ").css("display", "none");
            $("#btn_Oriention").css("display", "none");
            $(".Cubes").css("background", "#2F2F2F");
        }

    });


    let txt = "";
    for (var i = 0; i < NumKey; i++) {


        if (Value[i].split(',').length == 2) {
            var Valu = Value[i].replace(',', '');
            Values = Valu.split(',');
        }
        else if (Value[i].split(',').length == 4) {
            var Valu = Value[i].replace(',', '');
            Values = Valu.split(',');
        }
        else {
            Values = Value[i].split(',');
        }

        let Eases = Ease[i].replace(',', '').split('<!!>');
        let Speeds = Speed[i].replace(',', '').split('<!!>');



        Slider++;

        if (Slider % 2 == 0) {
            DiffrentColor = "Item";
        }
        else {
            DiffrentColor = "Item-1";
        }


        if (TypeKey[i] == 1) {
            KeyLBH = "./lib/img/Linear.png";
            Eases[0] = 0;
            Eases[1] = 0;
            ReadOnly = "readonly";
            Opacity = 0.4;
        }
        else if (TypeKey[i] == 2) {
            KeyLBH = "./lib/img/Bezier.png";
            ReadOnly = "";
            Opacity = 1;
        }
        else if (TypeKey[i] == 3) {
            KeyLBH = "./lib/img/EaseIn.png";
            Eases[1] = 0;
            Opacity = 1;
            ReadOnly = "";
        }
        else if (TypeKey[i] == 4) {
            KeyLBH = "./lib/img/EaseOut.png";
            Eases[0] = 0;
            Opacity = 1;
            ReadOnly = "";
        }
        else if (TypeKey[i] == 5) {
            KeyLBH = "./lib/img/HoldOutEase.png";
            Eases[0] = 0;
            Opacity = 1;
            ReadOnly = "readonly";
        }
        else if (TypeKey[i] == 6) {
            KeyLBH = "./lib/img/HoldInEase.png";
            Opacity = 1;
            Eases[1] = 0;
            ReadOnly = "";
        }
        else if (TypeKey[i] == 7) {
            KeyLBH = "./lib/img/HoldIn.png";
            Eases[0] = 0;
            Eases[1] = 0;
            Opacity = 0.4;
            ReadOnly = "";
        }
        else if (TypeKey[i] == 8) {
            KeyLBH = "./lib/img/HoldOut.png";
            Eases[0] = 0;
            Eases[1] = 0;
            Opacity = 0.4;
            ReadOnly = "";
        }
        else if (TypeKey[i] == 9) {
            KeyLBH = "./lib/img/Hold.png";
            Eases[0] = 0;
            Eases[1] = 0;
            Opacity = 0.4;
            ReadOnly = "";
        }
        else if (TypeKey[i] == 10) {
            KeyLBH = "./lib/img/Circle.png";
            Eases[0] = 0;
            Eases[1] = 0;
            Opacity = 0.4;
            ReadOnly = "";
        }
        else if (TypeKey[i] == 11) {
            KeyLBH = "./lib/img/AutoBezier.png";
            Opacity = 1;
        }


        if (z === 1) {
            Show_Value_Key = Value_Key(Values, true);
        }
        else {
            Show_Value_Key = Value_Key(Values, false);
        }


        txt +=
            '<div class="' + DiffrentColor + '  rty" onclick="SelectedKeys(this)">' +
            '<div class="Items_Selected" title="Selected Key">' +
            '<input id="index' + (i + 1) + '" class="qwe inp-cbx"  name="asdd" type="checkbox" style="display: none;">' +
            '<label class="cbx" >' +
            '<span>' +
            '<svg width="12px" height="9px" viewBox="0 0 12 9">' +
            '<polyline points="1 5 4 8 11 1"></polyline>' +
            '</svg>' +
            '</span>' +
            '</label>' +
            '<div class="Menu">' +
            '<div class="MenuSelect">' +
            '<a class="Select_Before_Key" title="Select Before Key">Before</a>' +
            '<a class="Select_After_Key" title="Select After Key">After</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="Items_Index" title="Index"><p class="Num">' + (i + 1) + '</p></div>' +
            '<div class="head_Keys">' +
            '<a class="KeySelect">' +
            '<img src="' + KeyLBH + '" class="Key" alt="">' +
            '</a>' +
            '<div class="TypeKey">' +
            opSelec(TypeKey[i]) +
            '</div>' +
            '</div>' +
            '<div class="Items_Time" title="Time Key"><input class="Input_Time" value="' + TimeKey[i] + '"></div>' +
            '<div class="div_SpaceAll" title="Space Key Frame">' +
            '<input class="Input_SpaceBefore" value="' + SpaceKey[i] + '" readonly>' +
            '<span style="color: #afafaf;">/</span>' +
            '<input class="Input_SpaceAfter" value="' + SpaceKey[(i + 1)] + '" readonly>' +
            '</div>' +
            '<div class="Items_Amount" title="Value Key">' + Show_Value_Key + '</div>' +
            '<div title="Ease Key" class="div_Keys" style="opacity: ' + Opacity + ';">' +
            '<input class="Input_Ease uio" value="' + parseInt(Eases[0]) + '"  ' + ReadOnly + '>' +
            '<span style="color: #e9e9e9;">/</span>' +
            '<input class="Input_Ease jlk" value="' + parseInt(Eases[1]) + '"  ' + ReadOnly + '>' +
            '</div>' +
            '<div title="Speed Key" class="div_Speed" style="opacity: ' + Opacity + ';">' +
            '<input class="Input_Speed uio" value="' + parseInt(Speeds[0]) + '" ' + ReadOnly + '>' +
            '<span style="color: #e9e9e9;">/</span>' +
            '<input class="Input_Speed jlk" value="' + parseInt(Speeds[1]) + '" ' + ReadOnly + '>' +
            '</div>' +
            '<div class="Items_Move" title="Move Key Up Or Down">' +
            '<img src="./lib/img/Menu.png" class="Menu__Down__Close Go_Up_Layer">' +
            '<img src="./lib/img/Menu.png" class="Menu__Down__Close Go_Down_Layer">' +
            '</div>' +
            '<div class="Items_Del">' +
            '<a title="Delete" class="Exit" onclick="KeyDelete(' + (i + 1) + ')"><img src="./lib/img/Del.png" class="Exit" alt=""></a>' +
            '</div>' +
            '</div>'
            ;


    }

    $(".Items").html(txt);
}

function Refresh(isCheck = false, e = null, isSelect = true) {

    // setting();
    let Name = $(".Transform_Key_Title > a").html();

    csInterface.evalScript('Split_Key("' + Name + '")', function (val) {
        if (Name == "Opacity" || Name == "Rotation" || Name == "XRotation" || Name == "YRotation" || Name == "ZRotation" || Name == "Oriention") {
            Show_Key(val, 1);
        }
        else {
            Show_Key(val, 2);
        }
        if (isCheck) {
            $(e.currentTarget).parent().parent().find('.qwe').attr('checked', 'checked');
            // alert("AAA");
        }
    });
    if (isSelect) {
        csInterface.evalScript('SelectedProperties("' + Name + '")', function (val) {
        });
    }

    $(".Transform_Key_Title > a").html(Name);
    Index_Name();

    AllIndex = [];
}

function get_Property(prop) {
    csInterface.evalScript('Split_Key("' + prop + '")', function (val) {
        if (prop == "Opacity" || prop == "Rotation" || prop == "XRotation" || prop == "YRotation" || prop == "ZRotation" || prop == "Oriention") {
            Show_Key(val, 1);
        }
        else {
            Show_Key(val, 2);
        }
    });
    csInterface.evalScript('SelectedProperties("' + prop + '")', function (val) {
    });
    $(".Transform_Key_Title > a").html(prop);
    Index_Name();
}

function Search_Replace(item) {
    if (item == "Search") {
        $(".rty").css("display", "none");
        let ItemSearch = $(".Change_Search").html();
        let Layer = $(".Transform_Key_Title > a").html();
        let Val = $(".inp_Search").val();
        if (Val == "") {
            Refresh();
        }
        else {
            csInterface.evalScript('Search_Replace("' + Layer + '","' + ItemSearch + '" , "' + Val + '" , "' + true + '", "' + 0 + '")', function (val) {
                val = val.split(',');
                for (let i = 0; i < val.length; i++) {
                    $("div > #index" + val[i]).parent().parent().addClass("d_non");
                    $("div > #index" + val[i]).parent().parent().find(".qwe").attr('checked', 'checked');
                }
            });
        }
        $(".inp_Replace").val("");
    }
    else if (item == "Replace") {
        let ItemSearch = $(".Change_Replace").html();
        let Layer = $(".Transform_Key_Title > a").html();
        let Val = $(".inp_Replace").val();
        let Index = $(".inp-cbx:checked").parent().parent();
        var Num = [];
        for (let i = 0; i < Index.length; i++) {
            Num.push($($(Index[i]).find(".Num")).text());
        }
        csInterface.evalScript('Search_Replace("' + Layer + '","' + ItemSearch + '" , "' + Val + '", "' + false + '" ,"' + Num.toString() + '")', function (val) {
            Refresh();
        });
        $(".inp_Search").val("");
    }

}

function Value_Key(Values, isOne) {
    let txt = "";
    if (isOne) {
        txt += '<div class="div_Input">';
        txt += '<input class="Input_Value" value="' + parseInt(Values[0]) + '">';
        txt += '</div>';
    }
    else {
        txt += '<div class="div_Input">';
        txt += '<input class="Input_Position" value="' + parseInt(Values[0]) + '">';
        txt += '<span style="color: #ffffff;">,</span>';
        txt += '<input class="Input_Position" value="' + parseInt(Values[1]) + '">';
        txt += '<span style="color: #ffffff;" class="none">,</span>';
        txt += '<input class="Input_Position none" value="' + parseInt(Values[2]) + '">';
        txt += '</div>';
    }
    return txt;
}

function opSelec(val) {
    let TT = "";
    TT += val == 1 ? '<a id="Linear" class="menu_Selected">Linear</a>' : '<a id="Linear">Linear</a>'
    TT += val == 2 ? '<a id="EaseB" class="menu_Selected">Ease</a>' : '<a id="EaseB">Ease</a>'
    TT += val == 3 ? '<a id="EaseIn" class="menu_Selected">Ease In</a>' : '<a id="EaseIn">EaseIn</a>'
    TT += val == 4 ? '<a id="EaseOut" class="menu_Selected">Ease Out</a>' : '<a id="EaseOut">EaseOut</a>'
    TT += val == 9 ? '<a id="Hold" class="menu_Selected">Hold</a>' : '<a id="Hold">Hold</a>'
    return TT;
}

function SelectedKeys(e) {

    var Index = e.children[1].children[0].innerHTML;
    var isControl;
    var isShift = true;
    AllIndex.push(Index);

    // if (AllIndex.length > 2) {
    //     AllIndex = [];
    //     AllIndex.push(Index);
    // }

    if (window.event.ctrlKey) {
        isShift = false;
        isControl = true;
    }
    else if (window.event.shiftKey) {
        isControl = true;
        isShift = true;
    }
    else {
        $(".qwe").removeAttr('checked');
        $(".rty").removeClass('bg_hover');
        isControl = false;
        isShift = false;
    }


    var TF = $(".TimeLines").css("opacity");
    if (TF > 0.5) {
        csInterface.evalScript('TimeLine("' + Index + '","' + false + '")', function (val) {
        });
    }
    else {
        csInterface.evalScript('TimeLine("' + Index + '","' + true + '")', function (val) {
        });
    }

    if (isShift == true) {
        if (AllIndex.length == 2) {
            if (AllIndex[1] > AllIndex[0]) {
                for (var i = AllIndex[0]; i <= AllIndex[1]; i++) {
                    a.push($(e).parent().find('#index' + i).attr('checked'));
                    $(e).parent().find('#index' + i).attr('checked', 'checked');
                }
            }
            else {
                for (var i = AllIndex[1]; i <= AllIndex[0]; i++) {
                    $(e).parent().find('#index' + i).attr('checked', 'checked');
                }
            }
        }
    }
    else {
        $(e.children[0].children[0]).attr('checked', 'checked');
    }


    var LayerName = $(".Name_Layer").html();
    var LayerProp = $(".Transform_Key_Title > a").html();
    csInterface.evalScript('SelectedLayer("' + LayerName + '","' + LayerProp + '")', function (val) {
    });


    $('#cbx').removeAttr('checked');
    $(e).addClass("bg_hover");
    csInterface.evalScript('SelectKeys("' + Index + '","' + true + '","' + isControl + '","' + isShift + '","' + AllIndex.toString() + '","' + LayerProp + '")', function (val) {
    });
    $(".MenuSelect").css("display", "none");
    $(".TypeKey").css("display", "none");
    $(".Default__Ease__All").css("display", "none");

}

function HideMenuSelect(e) {
    Counter++;
    e.preventDefault();
    var index = e.currentTarget.parentElement.children[2].children[0];

    if (Counter % 2 == 0) {
        $(".MenuSelect").css("display", "none");
    }
    else {
        $(index).css("display", "flex");
    }
}

function HideMenuChangeType(e) {
    Counter++;
    e.preventDefault();
    if (Counter % 2 == 0) {
        $(".TypeKey").css("display", "none");
    }
    else {
        $(e.currentTarget).next().css("display", "flex");
    }
}

function KeyDelete(iKey) {
    csInterface.evalScript('KeyDelete(' + iKey + ')', function (val) {
        Refresh();
    });
}

function MenuDefaultEase() {

    var EaseDefault = $("#Default__Ease__1_0").text();
    var Ease1 = $("#Default__Ease__1_1").text();
    var Ease2 = $("#Default__Ease__2").text();
    var Ease3 = $("#Default__Ease__3").text();
    var Ease4 = $("#Default__Ease__4").text();
    var Ease5 = $("#Default__Ease__5").text();

    switch (EaseDefault) {

        case Ease1:
            $("#Default__Ease__1_1").addClass("menu_Selected");
            $("#Default__Ease__2").removeClass("menu_Selected");
            $("#Default__Ease__3").removeClass("menu_Selected");
            $("#Default__Ease__4").removeClass("menu_Selected");
            $("#Default__Ease__5").removeClass("menu_Selected");
            break;

        case Ease2:
            $("#Default__Ease__1_1").removeClass("menu_Selected");
            $("#Default__Ease__2").addClass("menu_Selected");
            $("#Default__Ease__3").removeClass("menu_Selected");
            $("#Default__Ease__4").removeClass("menu_Selected");
            $("#Default__Ease__5").removeClass("menu_Selected");
            break;

        case Ease3:
            $("#Default__Ease__1_1").removeClass("menu_Selected");
            $("#Default__Ease__2").removeClass("menu_Selected");
            $("#Default__Ease__3").addClass("menu_Selected");
            $("#Default__Ease__4").removeClass("menu_Selected");
            $("#Default__Ease__5").removeClass("menu_Selected");
            break;

        case Ease4:
            $("#Default__Ease__1_1").removeClass("menu_Selected");
            $("#Default__Ease__2").removeClass("menu_Selected");
            $("#Default__Ease__3").removeClass("menu_Selected");
            $("#Default__Ease__4").addClass("menu_Selected");
            $("#Default__Ease__5").removeClass("menu_Selected");
            break;

        case Ease5:
            $("#Default__Ease__1_1").removeClass("menu_Selected");
            $("#Default__Ease__2").removeClass("menu_Selected");
            $("#Default__Ease__3").removeClass("menu_Selected");
            $("#Default__Ease__4").removeClass("menu_Selected");
            $("#Default__Ease__5").addClass("menu_Selected");
            break;
    }

    $("#Default__Ease__1_1").click(function (e) {
        $("#Default__Ease__1_0").text(Ease1);
        $(".Default__Ease__All").css("display", "none");
    });

    $("#Default__Ease__2").click(function (e) {
        $("#Default__Ease__1_0").text(Ease2);
        $(".Default__Ease__All").css("display", "none");
    });

    $("#Default__Ease__3").click(function (e) {
        $("#Default__Ease__1_0").text(Ease3);
        $(".Default__Ease__All").css("display", "none");
    });

    $("#Default__Ease__4").click(function (e) {
        $("#Default__Ease__1_0").text(Ease4);
        $(".Default__Ease__All").css("display", "none");
    });

    $("#Default__Ease__5").click(function (e) {
        $("#Default__Ease__1_0").text(Ease5);
        $(".Default__Ease__All").css("display", "none");
    });
}

function SaveDefaultEase() { 
    var result = window.cep.fs.readFile(__dirname+"/SaveEase.txt");
    var SaveEase = result.data;
    var SaveEaseSplit = SaveEase.split("<!>");
    $("#Default__Ease__1_0").text(SaveEaseSplit[0]);
    $("#Default__Ease__1_1").text(SaveEaseSplit[0]);
    $("#Default__Ease__2").text(SaveEaseSplit[1]);
    $("#Default__Ease__3").text(SaveEaseSplit[2]);
    $("#Default__Ease__4").text(SaveEaseSplit[3]);
    $("#Default__Ease__5").text(SaveEaseSplit[4]);
}




$(document).on("contextmenu", ".cbx", function (e) {
    HideMenuSelect(e);
});

$(document).on("click", ".Select_After_Key", function (e) {
    var Index = e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[1].children[0].innerHTML;

    csInterface.evalScript('After_Before_SelectKey("' + Index + '","' + true + '")', function (val) {
    });

    csInterface.evalScript('Index_Name()', function (val) {
        var sp = val.split('<!>');
        var Sum = parseInt(sp[2]) - Index;
        for (var i = 1; i <= Sum; i++) {
            var Sum2 = (Number(Index) + i).toString();
            $("#index" + Sum2).parent().find('.qwe').attr('checked', 'checked');
        }
    });

    $(".MenuSelect").css("display", "none");
});

$(document).on("click", ".Select_Before_Key", function (e) {
    var Index = e.currentTarget.parentElement.parentElement.parentElement.parentElement.children[1].children[0].innerHTML;

    csInterface.evalScript('After_Before_SelectKey("' + Index + '","' + false + '")', function (val) {
    });

    csInterface.evalScript('Index_Name()', function (val) {
        var sp = val.split('<!>');
        for (var i = sp[2]; i >= 1; i--) {
            var Sum2 = (Number(Index) - i).toString();
            $("#index" + Sum2).parent().find('.qwe').attr('checked', 'checked');
        }
    });

    $(".MenuSelect").css("display", "none");
});

$(document).on("contextmenu", ".KeySelect", function (e) {
    e.preventDefault();
    $(".MenuSelect").css("display", "none");
    HideMenuChangeType(e);
});

$(document).on("click", "#Linear", function (e) {
    var index = e.currentTarget.parentElement.parentElement.parentElement.children[1].children[0].innerHTML;
    csInterface.evalScript('Change_Type_Key("' + index + '","' + "Linear" + '")', function (val) {
    });
    $("#Linear").toggleClass("menu_Selected");
    Refresh();
    $(".MenuSelect").css("display", "none");
    HideMenuChangeType(e);
});

$(document).on("click", "#EaseB", function (e) {
    var index = e.currentTarget.parentElement.parentElement.parentElement.children[1].children[0].innerHTML;
    csInterface.evalScript('Change_Type_Key("' + index + '","' + "Bezier" + '")', function (val) {
    });
    $("#EaseB").toggleClass("menu_Selected");
    Refresh();
    $(".MenuSelect").css("display", "none");
    HideMenuChangeType(e);
});

$(document).on("click", "#EaseIn", function (e) {
    var index = e.currentTarget.parentElement.parentElement.parentElement.children[1].children[0].innerHTML;
    csInterface.evalScript('Change_Type_Key("' + index + '","' + "EaseIn" + '")', function (val) {
    });
    $("#EaseIn").toggleClass("menu_Selected");
    Refresh();
    $(".MenuSelect").css("display", "none");
    HideMenuChangeType(e);
});

$(document).on("click", "#EaseOut", function (e) {
    var index = e.currentTarget.parentElement.parentElement.parentElement.children[1].children[0].innerHTML;
    csInterface.evalScript('Change_Type_Key("' + index + '","' + "EaseOut" + '")', function (val) {
    });
    $("#EaseOut").toggleClass("menu_Selected");
    Refresh();
    $(".MenuSelect").css("display", "none");
    HideMenuChangeType(e);
});

$(document).on("click", "#Hold", function (e) {
    var index = e.currentTarget.parentElement.parentElement.parentElement.children[1].children[0].innerHTML;
    csInterface.evalScript('Change_Type_Key("' + index + '","' + "Hold" + '")', function (val) {
    });
    $("#EaseOut").toggleClass("menu_Selected");
    Refresh();
    $(".MenuSelect").css("display", "none");
    HideMenuChangeType(e);
});

$(document).on("change", ".Input_Time", function (e) {
    var IndexTime = e.currentTarget.parentElement.parentElement.children[1].children[0].innerHTML;
    var GetTime = e.currentTarget.value;
    csInterface.evalScript('ChangeTime("' + IndexTime + '","' + GetTime + '")', function (val) {
    });
    Refresh();
});

$(document).on("change", ".Input_Position", function (e) {
    var IndexPos = e.currentTarget.parentElement.parentElement.parentElement.children[1].children[0].innerHTML;
    var Pos1 = e.currentTarget.parentElement.children[0].value;
    var Pos2 = e.currentTarget.parentElement.children[2].value;
    var Pos3 = e.currentTarget.parentElement.children[4].value;
    var PosAll = Pos1 + "<!!>" + Pos2 + "<!!>" + Pos3;
    csInterface.evalScript('ChangeValue("' + IndexPos + '","' + PosAll + '","' + false + '")', function (val) {
    });
});

$(document).on("change", ".Input_Value", function (e) {
    var IndexPos = e.currentTarget.parentElement.parentElement.parentElement.children[1].children[0].innerHTML;
    let val = e.currentTarget.parentElement.children[0].value;
    csInterface.evalScript('ChangeValue("' + IndexPos + '","' + val + '","' + true + '")', function (val) {
    });
});

$(document).on("change", ".Input_Ease", function (e) {
    var IndexPos = e.currentTarget.parentElement.parentElement.children[1].children[0].innerHTML;

    var ChangeEaseIn = e.currentTarget.parentElement.children[0].value;
    var ChangeEaseOut = e.currentTarget.parentElement.children[2].value;
    var ChangeEaseAll = ChangeEaseIn + "<!!>" + ChangeEaseOut;

    var Speed = $(e.currentTarget.parentElement).next()
    var SpeedIn = $(Speed).find(".uio").val();
    var SpeedOut = $(Speed).find(".jlk").val();
    var SpeedAll = SpeedIn + "<!!>" + SpeedOut;

    csInterface.evalScript('ChangeEase("' + IndexPos + '","' + ChangeEaseAll + '","' + SpeedAll + '")', function (val) { });
});

$(document).on("change", ".Input_Speed", function (e) {
    var IndexPos = e.currentTarget.parentElement.parentElement.children[1].children[0].innerHTML;

    var SpeedIn = e.currentTarget.parentElement.children[0].value;
    var SpeedOut = e.currentTarget.parentElement.children[2].value;
    var SpeedAll = SpeedIn + "<!!>" + SpeedOut;

    var Ease = $(e.currentTarget.parentElement).prev()
    var EaseIn = $(Ease).find(".uio").val();
    var EaseOut = $(Ease).find(".jlk").val();
    var EaseAll = EaseIn + "<!!>" + EaseOut;

    csInterface.evalScript('ChangeSpeed("' + IndexPos + '","' + EaseAll + '","' + SpeedAll + '")', function (val) { });
});

$(document).on("click", ".Go_Up_Layer", function (e) {
    let IndexNow = $(".inp-cbx:checked").parent().parent().find(".Num").text();
    let IndexBack = Number(IndexNow) - 1;

    csInterface.evalScript('Move_Layer_Key("' + IndexNow + '","' + IndexBack + '")', function (val) {
        // var tt = $(e.currentTarget).parent().parent().find('.qwe');
        Refresh(true, e, false);
    });

});

$(document).on("click", ".Go_Down_Layer", function (e) {
    let IndexNow = $(".inp-cbx:checked").parent().parent().find(".Num").text();
    let IndexNext = Number(IndexNow) + 1;

    csInterface.evalScript('Move_Layer_Key("' + IndexNow + '", "' + IndexNext + '")', function (val) {
        Refresh(true, e, false);
    });
});

$(document).on('keydown', function (e) {

    if (e.which == 120) {
        Refresh();
    }

    if (e.key === 'c' && e.ctrlKey) {
        csInterface.evalScript('btn_CopyKeys()', function (val) {
            $(".Num_Copy").html(val);
        });
    }

    if (e.key === 'v' && e.ctrlKey) {
        csInterface.evalScript('btn_PasteAll()', function (val) {
            Refresh();
        });
    }

    if (e.key === 'p') {
        csInterface.evalScript('Split_Key("' + "Position" + '")', function (val) {
            Show_Key(val, 2);
        });
        csInterface.evalScript('SelectedProperties("Position")', function (val) {
        });
        $(".Transform_Key_Title > a").html("Position");
        Index_Name();
    }

    if (e.key === 'a') {
        csInterface.evalScript('Split_Key("' + "Anchor" + '")', function (val) {
            Show_Key(val, 2);
        });
        csInterface.evalScript('SelectedProperties("Anchor")', function (val) {
        });
        $(".Transform_Key_Title > a").html("Anchor");
        Index_Name();
    }

    if (e.key === 's') {
        csInterface.evalScript('Split_Key("' + "Scale" + '")', function (val) {
            Show_Key(val, 2);
        });
        csInterface.evalScript('SelectedProperties("Scale")', function (val) {
        });
        $(".Transform_Key_Title > a").html("Scale");
        Index_Name();
    }

    if (e.key === 'r') {
        csInterface.evalScript('Split_Key("' + "Rotation" + '")', function (val) {
            Show_Key(val, 1);
        });
        csInterface.evalScript('SelectedProperties("Rotation")', function (val) {
        });
        $(".Transform_Key_Title > a").html("Rotation");
        Index_Name();
    }

    if (e.key === 't') {
        csInterface.evalScript('Split_Key("' + "Opacity" + '")', function (val) {
            Show_Key(val, 1);
        });
        csInterface.evalScript('SelectedProperties("Opacity")', function (val) {
        });
        $(".Transform_Key_Title > a").html("Opacity");
        Index_Name();
    }

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

