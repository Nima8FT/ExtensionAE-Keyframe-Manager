var CKey = [];

function GetOS() {
   try {
      return $.os.toLowerCase().indexOf("mac") >= 0 ? "MAC" : "WIN";
   } catch (er) {
      alert(er);
   }
}

function Index_Name() {
   try {
      var Layer = app.project.activeItem.selectedLayers[0];
      var Index = Layer.index;
      var Name = Layer.name;
      for (var i = 0; i < Layer.selectedProperties.length; i++) {
         var NumKeys = Layer.selectedProperties[i].numKeys;
      }
      return Index + "<!>" + Name + "<!>" + NumKeys;
   } catch (error) {

   }
}

function TimeLine(index, isFlag) {
   if (isFlag == "true") {
      var Layers;
      var Layer = app.project.activeItem.selectedLayers;
      for (var i = 0; i < Layer[0].selectedProperties.length; i++) {
         Layers = Layer[0].selectedProperties[i];
      }
      var TimeKey = Layers.keyTime(parseInt(index));
      var LayerTime = app.project.activeItem;
      LayerTime.time = TimeKey;
   }
}

function ThreeD(isShow) {
   var Layer = app.project.activeItem.selectedLayers[0];
   if (isShow == "false") {
      if (Layer.threeDLayer === true) {
         Layer.threeDLayer = false;
      }
      else {
         Layer.threeDLayer = true;
      }
   }
   return Layer.threeDLayer;
}

function Search_Replace(Layer, ItemSearch, val, isSearch, index) {

   try {

      var LayerSwitch;
      var Index = [];
      var LayerTransform = app.project.activeItem.selectedLayers[0].property("ADBE Transform Group");

      switch (Layer) {
         case "Position":
            LayerSwitch = LayerTransform.property("ADBE Position");
            break;

         case "Anchor":
            LayerSwitch = LayerTransform.property("ADBE Anchor Point");
            break;

         case "Scale":
            LayerSwitch = LayerTransform.property("ADBE Scale");
            break;

         case "Rotation":
            LayerSwitch = LayerTransform.property("ADBE Rotate Z");
            break;

         case "Opacity":
            LayerSwitch = LayerTransform.property("ADBE Opacity");
            break;

         case "Orientation":
            LayerSwitch = LayerTransform.property("ADBE Orientation");
            break;

         case "X Rotation":
            LayerSwitch = LayerTransform.property("ADBE Rotate X");
            break;

         case "Y Rotation":
            LayerSwitch = LayerTransform.property("ADBE Rotate Y");
            break;
      }

      if (isSearch == "true") {
         var BetweenSearch = val.split('-');
         var FitSearch = val.split(',');
         var FPS = app.project.activeItem.frameRate;

         function Item_Search(e, mode) {
            switch (e) {
               case "Speed":
                  for (var i = 1; i <= LayerSwitch.numKeys; i++) {
                     var SpeedIn = LayerSwitch.keyInTemporalEase(i)[0].speed;
                     var SpeedOut = LayerSwitch.keyOutTemporalEase(i)[0].speed;
                     if (mode == 1) {
                        if (j == parseInt(SpeedIn) || j == parseInt(SpeedOut)) {
                           Index.push(i);
                           LayerSwitch.setSelectedAtKey(parseInt(i), true);
                        }
                     }
                     else if (mode == 2) {
                        if (FitSearch[j] == parseInt(SpeedIn) || FitSearch[j] == parseInt(SpeedOut)) {
                           Index.push(i);
                           LayerSwitch.setSelectedAtKey(parseInt(i), true);
                        }
                     }
                     else if (mode == 3) {
                        if (val == parseInt(SpeedIn) || val == parseInt(SpeedOut)) {
                           Index.push(i);
                           LayerSwitch.setSelectedAtKey(parseInt(i), true);
                        }
                     }
                  }
                  break;

               case "Ease":
                  for (var i = 1; i <= LayerSwitch.numKeys; i++) {
                     var EaseIn = LayerSwitch.keyInTemporalEase(i)[0].influence;
                     var EaseOut = LayerSwitch.keyOutTemporalEase(i)[0].influence;
                     if (mode == 1) {
                        if (j == parseInt(EaseIn) || j == parseInt(EaseOut)) {
                           Index.push(i);
                           LayerSwitch.setSelectedAtKey(parseInt(i), true);
                        }
                     }
                     else if (mode == 2) {
                        if (FitSearch[j] == parseInt(EaseIn) || FitSearch[j] == parseInt(EaseOut)) {
                           Index.push(i);
                           LayerSwitch.setSelectedAtKey(parseInt(i), true);
                        }
                     }
                     else if (mode == 3) {
                        if (val == parseInt(EaseIn) || val == parseInt(EaseOut)) {
                           Index.push(i);
                           LayerSwitch.setSelectedAtKey(parseInt(i), true);
                        }
                     }
                  }
                  break;

               case "Value":
                  for (var i = 1; i <= LayerSwitch.numKeys; i++) {
                     var Value = LayerSwitch.keyValue(i);
                     for (var k = 0; k < Value.length; k++) {
                        if (mode == 1) {
                           if (j == parseInt(Value[k])) {
                              Index.push(i);
                              LayerSwitch.setSelectedAtKey(parseInt(i), true);
                           }
                        }
                        else if (mode == 2) {
                           if (FitSearch[j] == parseInt(Value[k])) {
                              Index.push(i);
                              LayerSwitch.setSelectedAtKey(parseInt(i), true);
                           }

                        }
                        else if (mode == 3) {
                           if (val == parseInt(Value[k])) {
                              LayerSwitch.setSelectedAtKey(parseInt(i), true);
                              Index.push(i);
                           }
                        }
                     }
                     break;

                  }
            }
         }

         if (BetweenSearch.length == 2) {
            if (BetweenSearch[0] > BetweenSearch[1]) {
               for (var j = BetweenSearch[1]; j <= BetweenSearch[0]; j++) {
                  Item_Search(ItemSearch, 1);
               }
            }
            else if (BetweenSearch[1] > BetweenSearch[0]) {
               for (var j = BetweenSearch[0]; j <= BetweenSearch[1]; j++) {
                  Item_Search(ItemSearch, 1);
               }
            }
         }
         else if (FitSearch.length > 1) {
            for (var j = 0; j < FitSearch.length; j++) {
               Item_Search(ItemSearch, 2);
            }
         }
         else {
            Item_Search(ItemSearch, 3);
         }
      }
      else if (isSearch == "false") {
         var EaseSpeedRepl = val.split('/');
         var ValueRepl = val.split(',');
         var NumKey = index.split(',');
         var Value = [];

         for (var i = 0; i < NumKey.length; i++) {

            Value.push(LayerSwitch.keyValue(parseInt(NumKey[i])));
            var EaseInDef = LayerSwitch.keyInTemporalEase(parseInt(NumKey[i]))[0].influence;
            var EaseOutDef = LayerSwitch.keyOutTemporalEase(parseInt(NumKey[i]))[0].influence;
            var SpeedInDef = LayerSwitch.keyInTemporalEase(parseInt(NumKey[i]))[0].speed;
            var SpeedOutDef = LayerSwitch.keyOutTemporalEase(parseInt(NumKey[i]))[0].speed;

            if (ItemSearch == "Value") {
               if (LayerSwitch.name == "Rotation" || LayerSwitch.name == "Opacity" || LayerSwitch.name == "Orientation" || LayerSwitch.name == "X Rotation" || LayerSwitch.name == "Y Rotation" || LayerSwitch.name == "Z Rotation") {
                  LayerSwitch.setValueAtKey(parseInt(NumKey[i]), parseInt(ValueRepl[0]));
               }
               else {
                  if (ValueRepl.length == 1) {
                     LayerSwitch.setValueAtKey(parseInt(NumKey[i]), [parseInt(ValueRepl[0]), parseInt(Value[i][1]), parseInt(Value[i][2])]);
                  }
                  else if (ValueRepl.length == 2) {
                     LayerSwitch.setValueAtKey(parseInt(NumKey[i]), [ValueRepl[0], ValueRepl[1], Value[i][2]]);
                  }
                  else if (ValueRepl.length == 3) {
                     LayerSwitch.setValueAtKey(parseInt(NumKey[i]), [ValueRepl[0], ValueRepl[1], ValueRepl[2]]);
                  }
               }
            }

            if (ItemSearch == "Speed") {
               if (EaseSpeedRepl.length == 1) {
                  var EaseIn = new KeyframeEase(EaseSpeedRepl[0], EaseInDef);
                  var EaseOut = new KeyframeEase(EaseSpeedRepl[0], EaseOutDef);
               }
               else if (EaseSpeedRepl.length == 2) {
                  var EaseIn = new KeyframeEase(EaseSpeedRepl[0], EaseInDef);
                  var EaseOut = new KeyframeEase(EaseSpeedRepl[1], EaseOutDef);
               }
            }
            else if (ItemSearch == "Ease") {
               if (EaseSpeedRepl.length == 1) {
                  var EaseIn = new KeyframeEase(SpeedInDef, EaseSpeedRepl[0]);
                  var EaseOut = new KeyframeEase(SpeedOutDef, EaseSpeedRepl[0]);
               }
               else if (EaseSpeedRepl.length == 2) {
                  var EaseIn = new KeyframeEase(SpeedInDef, EaseSpeedRepl[0]);
                  var EaseOut = new KeyframeEase(SpeedOutDef, EaseSpeedRepl[1]);
               }
            }

            if (LayerSwitch.name == "Scale") {
               LayerSwitch.setTemporalEaseAtKey(parseInt(NumKey[i]), [EaseIn, EaseIn, EaseIn], [EaseOut, EaseOut, EaseOut]);
            }
            else if (ItemSearch == "Speed" || ItemSearch == "Ease") {
               LayerSwitch.setTemporalEaseAtKey(parseInt(NumKey[i]), [EaseIn], [EaseOut]);
            }

         }
      }

      return Index.toString();
      
   } catch (error) {

   }
}

function Get_Key() {
   try {
      var Layer = app.project.activeItem.selectedLayers[0];

      if (Layer != "") {
         var Property_Transform;
         var Scale = [];
         var Anchor = [];
         var Position = [];
         var Rotation = [];
         var Opacity = [];
         var Orientation = [];
         var XRotation = [];
         var YRotation = [];
         var ZRotation = [];

         for (var i = 1; i <= Layer.property("ADBE Transform Group").numProperties; i++) {

            for (var j = 1; j <= Layer.property("ADBE Transform Group").property(i).numKeys; j++) {

               try {
                  Property_Transform = Layer.property("ADBE Transform Group").property(i);

                  var Time = Property_Transform.keyTime(j).toString();
                  var Value = Property_Transform.keyValue(j).toString();
                  var TypeKeyIn = Property_Transform.keyInInterpolationType(j).toString();
                  var TypeKeyOut = Property_Transform.keyOutInterpolationType(j).toString();
                  var TypeKey = TypeKeyIn + "<!!>" + TypeKeyOut;
                  var EaseIn = Property_Transform.keyInTemporalEase(j)[0].influence;
                  var EaseOut = Property_Transform.keyOutTemporalEase(j)[0].influence;
                  var Ease = EaseIn + "<!!>" + EaseOut;
                  var SpeedIn = Property_Transform.keyInTemporalEase(j)[0].speed;
                  var SpeedOut = Property_Transform.keyOutTemporalEase(j)[0].speed;
                  var Speed = SpeedIn + "<!!>" + SpeedOut;

                  switch (Property_Transform.name) {
                     case "Scale":
                        Scale.push(TypeKey + "</!/>" + Time + "</!/>" + Value + "</!/>" + Ease + "</!/>" + Speed + "<!!##$$>");
                        break;

                     case "Anchor Point":
                        Anchor.push(TypeKey + "</!/>" + Time + "</!/>" + Value + "</!/>" + Ease + "</!/>" + Speed + "<!!##$$>");
                        break;

                     case "Position":
                        Position.push(TypeKey + "</!/>" + Time + "</!/>" + Value + "</!/>" + Ease + "</!/>" + Speed + "<!!##$$>");
                        break;

                     case "Rotation":
                        Rotation.push(TypeKey + "</!/>" + Time + "</!/>" + Value + "</!/>" + Ease + "</!/>" + Speed + "<!!##$$>");
                        break;

                     case "Orientation":
                        Orientation.push(TypeKey + "</!/>" + Time + "</!/>" + Value + "</!/>" + Ease + "</!/>" + Speed + "<!!##$$>");
                        break;

                     case "X Rotation":
                        XRotation.push(TypeKey + "</!/>" + Time + "</!/>" + Value + "</!/>" + Ease + "</!/>" + Speed + "<!!##$$>");
                        break;

                     case "Y Rotation":
                        YRotation.push(TypeKey + "</!/>" + Time + "</!/>" + Value + "</!/>" + Ease + "</!/>" + Speed + "<!!##$$>");
                        break;

                     case "Z Rotation":
                        ZRotation.push(TypeKey + "</!/>" + Time + "</!/>" + Value + "</!/>" + Ease + "</!/>" + Speed + "<!!##$$>");
                        break;

                     case "Opacity":
                        Opacity.push(TypeKey + "</!/>" + Time + "</!/>" + Value + "</!/>" + Ease + "</!/>" + Speed + "<!!##$$>");
                        break;

                  }

               } catch (er) {

                  alert(er.message + "\n" + er.line)

               }

            }
         }
      }
      else {
         alert("Please Select Layer")
      }
      return Scale.toString() + "<!>" + Anchor.toString() + "<!>" + Position.toString() + "<!>" + Rotation.toString() + "<!>" + Opacity.toString() + "<!>" + Orientation.toString() + "<!>" + XRotation.toString() + "<!>" + YRotation.toString() + "<!>" + ZRotation.toString();
   } catch (error) {
      alert("Please Select Layer")
   }
}

function All_Select_Deselect_Key(isSelect) {
   var Layer = app.project.activeItem.selectedLayers[0].selectedProperties[0];
   if (isSelect == "true") {
      for (var i = 1; i <= Layer.numKeys; i++) {
         Layer.setSelectedAtKey(parseInt(i), true);
      }
   }
   else if (isSelect == "false") {
      for (var i = 1; i <= Layer.numKeys; i++) {
         Layer.setSelectedAtKey(parseInt(i), false);
      }
   }
}

function Key_Delete_Selected() {
   app.beginUndoGroup("Delete Selected");
   var Layers;
   var Layer = app.project.activeItem.selectedLayers;
   for (var i = 0; i < Layer[0].selectedProperties.length; i++) {
      Layers = Layer[0].selectedProperties[i];
   }
   var selectedKey = Layers.selectedKeys;
   if (confirm("Are You Sure Deleted Keys ? ")) {
      for (var i = Layers.numKeys; i >= 1; i--) {
         for (var j = 0; j <= selectedKey.length; j++) {
            if (selectedKey[j] == i) {
               Layers.removeKey(i);
            }
         }
      }
   }
   app.endUndoGroup();
}

function Split_Key(NameLayer) {
   try {

      var sp = Get_Key().split('<!>');
      var Layer;

      switch (NameLayer) {
         case "Scale":
            Layer = sp[0].split('<!!##$$>');
            break;

         case "Anchor Point":
            Layer = sp[1].split('<!!##$$>');
            break;

         case "Position":
            Layer = sp[2].split('<!!##$$>');
            break;

         case "Rotation":
            Layer = sp[3].split('<!!##$$>');
            break;

         case "XRotation":
            Layer = sp[6].split('<!!##$$>');
            break;

         case "YRotation":
            Layer = sp[7].split('<!!##$$>');
            break;

         case "ZRotation":
            Layer = sp[8].split('<!!##$$>');
            break;

         case "Oriention":
            Layer = sp[5].split('<!!##$$>');
            break;

         case "Opacity":
            Layer = sp[4].split('<!!##$$>');
            break;

      }

      var Num = Layer.length - 1;
      var Type = [];
      var Time = [];
      var Value = [];
      var Ease = [];
      var Speed = [];
      var SpaceKey = [];
      var SumSpaceKey = [0];

      for (var i = 0; i < Num; i++) {
         var sp_Key = Layer[i].split('</!/>');
         Type.push(Get_TypeKey(sp_Key[0]));
         Time.push(Get_TimeKey(sp_Key[1]));
         SpaceKey.push(Get_SpaceKey(sp_Key[1]));
         Value.push(sp_Key[2] + "<//>");
         Ease.push(sp_Key[3] + "<//>");
         Speed.push(sp_Key[4] + "<//>");
      }
      for (var i = 0; i < SpaceKey.length; i++) {
         if (SpaceKey[(i + 1)] == undefined) {
            SumSpaceKey.push(0);
         }
         else {
            SumSpaceKey.push(SpaceKey[(i + 1)] - SpaceKey[i]);
         }
      }
      return Num + "<!>" + Type.toString() + "<!>" + Time.toString() + "<!>" + Value.toString() + "<!>" + Ease.toString() + "<!>" + Speed.toString() + "<!>" + SumSpaceKey.toString();
   } catch (error) {

   }
}

function Get_TypeKey(Type_Key) {
   try {
      var sp = Type_Key.split('<!!>');
      var spl = sp[0].replace(',', '');
      var KeyTypeShow = [];

      if (spl == 6612 && sp[1] == 6612) {
         KeyTypeShow.push(1);
      }
      else if (spl == 6613 && sp[1] == 6613) {
         KeyTypeShow.push(2);
      }
      else if (spl == 6613 && sp[1] == 6612) {
         KeyTypeShow.push(3);
      }
      else if (spl == 6612 && sp[1] == 6613) {
         KeyTypeShow.push(4);
      }
      else if (spl == 6614 && sp[1] == 6613) {
         KeyTypeShow.push(5);
      }
      else if (spl == 6613 && sp[1] == 6614) {
         KeyTypeShow.push(6);
      }
      else if (spl == 6612 && sp[1] == 6614) {
         KeyTypeShow.push(7);
      }
      else if (spl == 6614 && sp[1] == 6612) {
         KeyTypeShow.push(8);
      }
      else if (spl == 6614 && sp[1] == 6614) {
         KeyTypeShow.push(9);
      }

   } catch (error) {

   }
   return KeyTypeShow;
}

function Get_TimeKey(TimeKey) {

   var FPS = app.project.activeItem.frameRate;
   var FPSKey = [];

   var ff = TimeKey * FPS;
   var M = 0, S = 0, F = 0;
   if (ff > FPS) {
      S = parseInt(ff / FPS);
      F = parseInt(ff - (S * FPS))

   }
   else
      F = parseInt(ff)
   if (S > 59) {
      M = parseInt(S / 60);
      S -= (M * 60)
   }

   FPSKey.push(pad(M) + ";" + pad(S) + ";" + pad(F));

   return FPSKey;
}

function pad(d) {
   return (d < 10) ? '0' + d.toString() : d.toString();
}

function Get_SpaceKey(TimeKey) {
   try {
      var SpaceKey = [];
      var FPS = app.project.activeItem.frameRate;
      SpaceKey.push(parseInt(TimeKey * FPS));
      return SpaceKey;
   } catch (error) {
   }
}

function SelectedProperties(val) {
   try {
      var Layer = app.project.activeItem.selectedLayers[0].property("ADBE Transform Group");

      Layer.property("ADBE Anchor Point").selected = false;
      Layer.property("ADBE Position").selected = false;
      Layer.property("ADBE Scale").selected = false;
      Layer.property("ADBE Rotate Z").selected = false;
      Layer.property("ADBE Opacity").selected = false;
      if (ThreeD(true) == true) {
         Layer.property("ADBE Orientation").selected = false;
         Layer.property("ADBE Rotate X").selected = false;
         Layer.property("ADBE Rotate Y").selected = false;
      }

      switch (val) {

         case "Anchor Point":
            Layer.property("ADBE Anchor Point").selected = true;
            for (var i = 1; i <= Layer.property("ADBE Anchor Point").numKeys; i++) {
               Layer.property("ADBE Anchor Point").setSelectedAtKey(parseInt(i), false);
            }
            break;

         case "Position":
            Layer.property("ADBE Position").selected = true;
            for (var i = 1; i <= Layer.property("ADBE Position").numKeys; i++) {
               Layer.property("ADBE Position").setSelectedAtKey(parseInt(i), false);
            }
            break;

         case "Scale":
            Layer.property("ADBE Scale").selected = true;
            for (var i = 1; i <= Layer.property("ADBE Scale").numKeys; i++) {
               Layer.property("ADBE Scale").setSelectedAtKey(parseInt(i), false);
            }
            break;

         case "Rotation":
            Layer.property("ADBE Rotate Z").selected = true;
            for (var i = 1; i <= Layer.property("ADBE Rotate Z").numKeys; i++) {
               Layer.property("ADBE Rotate Z").setSelectedAtKey(parseInt(i), false);
            }
            break;

         case "Oriention":
            Layer.property("ADBE Orientation").selected = true;
            for (var i = 1; i <= Layer.property("ADBE Orientation").numKeys; i++) {
               Layer.property("ADBE Orientation").setSelectedAtKey(parseInt(i), false);
            }
            break;


         case "XRotation":
            Layer.property("ADBE Rotate X").selected = true;
            for (var i = 1; i <= Layer.property("ADBE Rotate X").numKeys; i++) {
               Layer.property("ADBE Rotate X").setSelectedAtKey(parseInt(i), false);
            }
            break;


         case "YRotation":
            Layer.property("ADBE Rotate Y").selected = true;
            for (var i = 1; i <= Layer.property("ADBE Rotate Y").numKeys; i++) {
               Layer.property("ADBE Rotate Y").setSelectedAtKey(parseInt(i), false);
            }
            break;


         case "ZRotation":
            Layer.property("ADBE Rotate Z").selected = true;
            for (var i = 1; i <= Layer.property("ADBE Rotate Z").numKeys; i++) {
               Layer.property("ADBE Rotate Z").setSelectedAtKey(parseInt(i), false);
            }
            break;

         case "Opacity":
            Layer.property("ADBE Opacity").selected = true;
            for (var i = 1; i <= Layer.property("ADBE Opacity").numKeys; i++) {
               Layer.property("ADBE Opacity").setSelectedAtKey(parseInt(i), false);
            }
            break;
      }
   } catch (error) {

   }
}

function SelectKeys(index, isSelect, isControl, isShift, AllIndex, LayerName) {
   try {

      var Layer = app.project.activeItem.selectedLayers[0];

      switch (LayerName) {
         case "Anchor Point":
            Layer = Layer.property("ADBE Transform Group").property("ADBE Anchor Point");
            break;

         case "X Rotation":
            Layer = Layer.property("ADBE Transform Group").property("ADBE Rotate X");
            break;

         case "Y Rotation":
            Layer = Layer.property("ADBE Transform Group").property("ADBE Rotate Y");
            break;

         case "Z Rotation":
            Layer = Layer.property("ADBE Transform Group").property("ADBE Rotate Z");
            break;

         default:
            Layer = Layer.selectedProperties[0];
            break;
      }


      var sp = AllIndex.split(',');

      // if (isShift == "true") {
      //    if (sp[1] > sp[0]) {
      //       for (var i = sp[0]; i <= sp[1]; i++) {
      //          Layer.setSelectedAtKey(parseInt(i), true);
      //       }
      //    }
      //    else if(sp[0] > sp[1]){
      //       for (var i = sp[1]; i <= sp[0]; i++) {
      //          Layer.setSelectedAtKey(parseInt(i), true);
      //       }
      //    }
      // }

      if (isControl == "true") {
         for (var i = 0; i < sp.length; i++) {
            Layer.setSelectedAtKey(parseInt(sp[i]), true);
         }
      }

      if (isSelect === "false") {
         Layer.setSelectedAtKey(parseInt(index), false);
      }
      else {
         Layer.setSelectedAtKey(parseInt(index), true);
      }

   } catch (error) {
      alert(error.line + "/n" + error.message);
   }
}

function After_Before_SelectKey(index, isAfter) {
   var Indexes = [];
   var Layer = app.project.activeItem.selectedLayers[0].selectedProperties[0];

   if (isAfter == "true") {
      for (var i = index; i <= Layer.numKeys; i++) {
         Layer.setSelectedAtKey(parseInt(i), true);
      }
      Indexes.push(index)
      return Indexes;
   }
   else if (isAfter == "false") {
      for (var i = index; i >= 1; i--) {
         Layer.setSelectedAtKey(parseInt(i), true);
      }
   }
}

function Change_Type_Key(index, mode) {
   app.beginUndoGroup("Change Type Key");
   var Layer = app.project.activeItem.selectedLayers[0].selectedProperties[0];

   if (mode == "Linear") {
      Layer.setInterpolationTypeAtKey(parseInt(index), 6612, 6612);
   }
   else if (mode == "Bezier") {
      var KeyFrameIn = new KeyframeEase(0, 33);
      var KeyFrameOut = new KeyframeEase(0, 33);
      if (Layer.name == "Scale") {
         Layer.setTemporalEaseAtKey(parseInt(index), [KeyFrameIn, KeyFrameIn, KeyFrameIn], [KeyFrameOut, KeyFrameOut, KeyFrameOut]);
      }
      else {
         Layer.setTemporalEaseAtKey(parseInt(index), [KeyFrameIn], [KeyFrameOut]);
      }
      Layer.setInterpolationTypeAtKey(parseInt(index), 6613, 6613);
   }
   else if (mode == "EaseIn") {
      Layer.setInterpolationTypeAtKey(parseInt(index), 6613, 6612);
   }
   else if (mode == "EaseOut") {
      Layer.setInterpolationTypeAtKey(parseInt(index), 6612, 6613);
   }
   else if ("Hold") {
      Layer.setInterpolationTypeAtKey(parseInt(index), 6614, 6614);
   }

   app.endUndoGroup();
}

function ChangeTime(index, time) {
   app.beginUndoGroup("Change Time");
   try {

      var Layer = app.project.activeItem.selectedLayers[0].selectedProperties[0];

      var FPS = app.project.activeItem.frameRate;

      if (time > 0) {
         var t = time.toString();

         if ((t.length % 2) != 0)
            t = "0" + time.toString();

         if (t.length < 3)
            t = "0000" + t;

         if (t.length < 5)
            t = "00" + t;

         var sp = t.match(/.{1,2}/g)


         var ChangeTime = parseFloat(parseInt(sp[2]) / FPS + parseInt(sp[1]) + parseInt(sp[0] * 60));

      }
      else {
         var sp = time.split(';');
         var ChangeTime = parseFloat(parseInt(sp[2]) / FPS + parseInt(sp[1]) + parseInt(sp[0] * 60));
      }


      var Copy = CopyKey(Layer, index);
      Layer.removeKey(parseInt(index));
      var AddKey = Layer.addKey(ChangeTime);
      PasteKey(Layer, Copy, AddKey)
   } catch (er) {
      alert(er.message + "\n" + er.line)
   }
   app.endUndoGroup();
}

function ChangeValue(index, pos, isOne) {
   app.beginUndoGroup("Change Value");
   var sp = pos.split('<!!>');
   var Layer = app.project.activeItem.selectedLayers[0].selectedProperties[0];
   if (isOne == "true") {
      Layer.setValueAtKey(parseInt(index), parseInt(sp[0]));
   }
   else if (isOne == "false") {
      Layer.setValueAtKey(parseInt(index), [sp[0], sp[1], sp[2]]);
   }
   app.endUndoGroup();
}

function ChangeEase(index, ease, speed) {
   app.beginUndoGroup("Change Ease");
   var easesp = ease.split('<!!>');
   var speedsp = speed.split('<!!>');

   if (easesp[0] > 100 || easesp[1] > 100) {
      alert("Please Enter a Number Between 1 To 100");
   }
   else {
      var Layer = app.project.activeItem.selectedLayers[0].selectedProperties[0];
      var EaseIn = new KeyframeEase(speedsp[0], easesp[0]);
      var EaseOut = new KeyframeEase(speedsp[1], easesp[1]);
      if (Layer.name == "Scale") {
         Layer.setTemporalEaseAtKey(parseInt(index), [EaseIn, EaseIn, EaseIn], [EaseOut, EaseOut, EaseOut]);
      }
      else {
         Layer.setTemporalEaseAtKey(parseInt(index), [EaseIn], [EaseOut]);
      }
   }
   app.endUndoGroup();
}

function ChangeSpeed(index, ease, speed) {
   app.beginUndoGroup("Change Speed");
   var easesp = ease.split('<!!>');
   var speedsp = speed.split('<!!>');

   if (easesp[0] > 100 || easesp[1] > 100) {
      alert("Please Enter a Number Between 1 To 100");
   }
   else {
      var Layer = app.project.activeItem.selectedLayers[0].selectedProperties[0];
      var EaseIn = new KeyframeEase(speedsp[0], easesp[0]);
      var EaseOut = new KeyframeEase(speedsp[1], easesp[1]);

      if (Layer.name == "Scale") {
         Layer.setTemporalEaseAtKey(parseInt(index), [EaseIn, EaseIn, EaseIn], [EaseOut, EaseOut, EaseOut]);
      }
      else {
         Layer.setTemporalEaseAtKey(parseInt(index), [EaseIn], [EaseOut]);
      }
   }
   app.endUndoGroup();
}

function Move_Layer_Key(indexNow, indexNext) {
   app.beginUndoGroup("Change Time");
   try {

      var Layer = app.project.activeItem.selectedLayers[0].selectedProperties[0];

      var Copy1 = CopyKey(Layer, indexNow);
      var Copy2 = CopyKey(Layer, indexNext);

      var ChangeTime1 = Layer.keyTime(parseInt(indexNow));
      var ChangeTime2 = Layer.keyTime(parseInt(indexNext));

      var AddKey1 = Layer.addKey(ChangeTime1);
      var AddKey2 = Layer.addKey(ChangeTime2);

      PasteKey(Layer, Copy1, AddKey2)
      PasteKey(Layer, Copy2, AddKey1)

   } catch (er) {
      alert(er.message + "\n" + er.line)
   }
   app.endUndoGroup();
}

function KeyDelete(indexKey) {
   app.beginUndoGroup("Delete Key");
   app.project.activeItem.selectedLayers[0].selectedProperties[0].removeKey(indexKey);
   app.endUndoGroup();
}

function btn_CopyKeys() {
   CKey = [];


   var AllKey = [];
   var Layer = app.project.activeItem.selectedLayers;

   for (var i = 0; i < Layer.length; i += 1) {

      for (var j = 0; j < Layer[i].selectedProperties.length; j += 1) {

         if (Layer[i].selectedProperties[j] instanceof Property) {

            for (var k = 0; k < Layer[i].selectedProperties[j].selectedKeys.length; k += 1) {
               AllKey.push([
                  Layer[i].selectedProperties[j],
                  Layer[i].selectedProperties[j].selectedKeys[k]
               ]);
            }

         }
      }
   }

   var IndexKey = [];
   var LayerKey = [];
   var ESIn = [];
   var ESOut = [];


   var NumKeys = [];
   var Time = [];
   var Value = [];
   var TypeIn = [];
   var TypeOut = [];
   var EaseIn = [];
   var EaseOut = [];
   var SpeedIn = [];
   var SpeedOut = [];
   // var SpatialTangentIn = [];
   // var SpatialTangentOut = [];
   // var KeyRoving = [];
   // var keySelected = [];
   // var SpatialAutoBezier = [];
   // var SpatialContinuous = [];
   // var TemporalAutoBezier = [];
   // var TemporalContinuous = [];

   var sp = "<//>";


   for (var i = 0; i < AllKey.length; i += 1) {

      LayerKey.push(AllKey[i][0]);
      IndexKey.push(AllKey[i][1]);

      NumKeys.push(LayerKey.numKeys);

      Time.push(LayerKey[i].keyTime(IndexKey[i]) + sp);

      Value.push(LayerKey[i].keyValue(IndexKey[i]));
      Value.push(sp);

      TypeIn.push(LayerKey[i].keyInInterpolationType(IndexKey[i]) + sp);
      TypeOut.push(LayerKey[i].keyOutInterpolationType(IndexKey[i]) + sp);

      ESIn.push(LayerKey[i].keyInTemporalEase(IndexKey[i]));
      EaseIn.push(ESIn[i][0].influence + sp);
      SpeedIn.push(ESIn[i][0].speed + sp);

      ESOut.push(LayerKey[i].keyOutTemporalEase(IndexKey[i]));
      EaseOut.push(ESOut[i][0].influence + sp);
      SpeedOut.push(ESOut[i][0].speed + sp);

      // SpatialTangentIn.push(LayerKey[i].keyInSpatialTangent(IndexKey[i]) + sp);
      // SpatialTangentOut.push(LayerKey[i].keyOutSpatialTangent(IndexKey[i]) + sp);

      // KeyRoving.push(LayerKey[i].keyRoving(IndexKey[i]) + sp);
      // keySelected.push(LayerKey[i].keySelected(IndexKey[i]) + sp);

      // SpatialAutoBezier.push(LayerKey[i].keySpatialAutoBezier(IndexKey[i]) + sp);
      // SpatialContinuous.push(LayerKey[i].keySpatialContinuous(IndexKey[i]) + sp);

      // TemporalAutoBezier.push(LayerKey[i].keyTemporalAutoBezier(IndexKey[i]) + sp);
      // TemporalContinuous.push(LayerKey[i].keyTemporalContinuous(IndexKey[i]) + sp);

   }

   var NumKeys = IndexKey.length;

   CKey.push(Time.toString() + "<!>" + Value.toString() + "<!>" + TypeIn.toString() + "<!>" + TypeOut.toString() + "<!>" + EaseIn.toString() + "<!>" + EaseOut.toString() + "<!>" + SpeedIn.toString() + "<!>" + SpeedOut.toString() + "<!>" + NumKeys.toString());
   return NumKeys.toString();

}

function btn_PasteValue() {

   var sp = CKey[0].split("<!>");

   var ValueCopy = sp[1].split("<//>");
   var AllKey = [];



   var Layer = app.project.activeItem.selectedLayers;

   for (var i = 0; i < Layer.length; i += 1) {

      for (var j = 0; j < Layer[i].selectedProperties.length; j += 1) {

         if (Layer[i].selectedProperties[j] instanceof Property) {

            for (var k = 0; k < Layer[i].selectedProperties[j].selectedKeys.length; k += 1) {

               AllKey.push([
                  Layer[i].selectedProperties[j],
                  Layer[i].selectedProperties[j].selectedKeys[k]
               ]);

            }

         }
      }
   }

   var IndexKey = [];
   var LayerKey = [];



   for (var i = 0; i < AllKey.length; i += 1) {
      LayerKey.push(AllKey[i][0]);
      IndexKey.push(AllKey[i][1]);

      var spValueCopy = ValueCopy[i].split(',');
      if (spValueCopy.length == 5) {
         LayerKey[i].setValueAtKey(IndexKey[i], [spValueCopy[1], spValueCopy[2], spValueCopy[3]]);
      }
      else if (spValueCopy.length == 4) {
         LayerKey[i].setValueAtKey(IndexKey[i], [spValueCopy[0], spValueCopy[1], spValueCopy[2]]);
      }
      else if (spValueCopy.length == 3) {
         LayerKey[i].setValueAtKey(IndexKey[i], [spValueCopy[1]]);
      }
      else if (spValueCopy.length == 2) {
         LayerKey[i].setValueAtKey(IndexKey[i], [spValueCopy[0]]);
      }

   }

}

function btn_PasteEase() {
   var sp = CKey[0].split('<!>');

   var EaseInCopy = sp[4].split("<//>");
   var EaseOutCopy = sp[5].split("<//>");

   var AllKey = [];
   var SpeedIn = [];
   var SpeedOut = [];
   var ESIn = [];
   var ESOut = [];


   var Layer = app.project.activeItem.selectedLayers;

   for (var i = 0; i < Layer.length; i += 1) {

      for (var j = 0; j < Layer[i].selectedProperties.length; j += 1) {

         if (Layer[i].selectedProperties[j] instanceof Property) {

            for (var k = 0; k < Layer[i].selectedProperties[j].selectedKeys.length; k += 1) {

               AllKey.push([
                  Layer[i].selectedProperties[j],
                  Layer[i].selectedProperties[j].selectedKeys[k]
               ]);

            }

         }
      }
   }

   var IndexKey = [];
   var LayerKey = [];



   for (var i = 0; i < AllKey.length; i += 1) {
      LayerKey.push(AllKey[i][0]);
      IndexKey.push(AllKey[i][1]);


      ESIn.push(LayerKey[i].keyInTemporalEase(IndexKey[i]));
      SpeedIn.push(ESIn[i][0].speed);

      ESOut.push(LayerKey[i].keyOutTemporalEase(IndexKey[i]));
      SpeedOut.push(ESOut[i][0].speed);
      var spEaseInCopy = EaseInCopy[i].split(',');
      var spEaseOutCopy = EaseOutCopy[i].split(',');

      if (spEaseInCopy.length == 2) {
         var EaseIn = new KeyframeEase(SpeedIn[i], spEaseInCopy[1]);
         var EaseOut = new KeyframeEase(SpeedOut[i], spEaseOutCopy[1]);
      }
      else if (spEaseInCopy.length == 1) {
         var EaseIn = new KeyframeEase(SpeedIn[i], spEaseInCopy[0]);
         var EaseOut = new KeyframeEase(SpeedOut[i], spEaseOutCopy[0]);
      }

      if (LayerKey[i].name == "Scale") {
         LayerKey[i].setTemporalEaseAtKey(parseInt(IndexKey[i]), [EaseIn, EaseIn, EaseIn], [EaseOut, EaseOut, EaseOut]);
      }
      else {
         LayerKey[i].setTemporalEaseAtKey(parseInt(IndexKey[i]), [EaseIn], [EaseOut]);
      }
   }
}

function btn_PasteSpeed() {

   var sp = CKey[0].split('<!>');

   var EaseInCopy = sp[4].split("<//>");
   var EaseOutCopy = sp[5].split("<//>");
   var SpeedInCopy = sp[6].split("<//>");
   var SpeedOutCopy = sp[7].split("<//>");

   var AllKey = [];



   var Layer = app.project.activeItem.selectedLayers;

   for (var i = 0; i < Layer.length; i += 1) {

      for (var j = 0; j < Layer[i].selectedProperties.length; j += 1) {

         if (Layer[i].selectedProperties[j] instanceof Property) {

            for (var k = 0; k < Layer[i].selectedProperties[j].selectedKeys.length; k += 1) {

               AllKey.push([
                  Layer[i].selectedProperties[j],
                  Layer[i].selectedProperties[j].selectedKeys[k]
               ]);

            }

         }
      }
   }

   var IndexKey = [];
   var LayerKey = [];



   for (var i = 0; i < AllKey.length; i += 1) {
      LayerKey.push(AllKey[i][0]);
      IndexKey.push(AllKey[i][1]);

      var spEaseInCopy = EaseInCopy[i].split(',');
      var spEaseOutCopy = EaseOutCopy[i].split(',');
      var spSpeedInCopy = SpeedInCopy[i].split(',');
      var spSpeedOutCopy = SpeedOutCopy[i].split(',');

      if (spEaseInCopy.length == 2) {
         var EaseIn = new KeyframeEase(spSpeedInCopy[1], spEaseInCopy[1]);
         var EaseOut = new KeyframeEase(spSpeedOutCopy[1], spEaseOutCopy[1]);
      }
      else if (spEaseInCopy.length == 1) {
         var EaseIn = new KeyframeEase(spSpeedInCopy, spEaseInCopy[0]);
         var EaseOut = new KeyframeEase(spSpeedOutCopy[0], spEaseOutCopy);
      }

      if (LayerKey[i].name == "Scale") {
         LayerKey[i].setTemporalEaseAtKey(parseInt(IndexKey[i]), [EaseIn, EaseIn, EaseIn], [EaseOut, EaseOut, EaseOut]);
      }
      else {
         LayerKey[i].setTemporalEaseAtKey(parseInt(IndexKey[i]), [EaseIn], [EaseOut]);
      }
   }
}

function btn_PasteAll() {

   var sp = CKey[0].split('<!>');

   var ValueCopy = sp[1].split("<//>");
   var EaseInCopy = sp[4].split("<//>");
   var EaseOutCopy = sp[5].split("<//>");
   var SpeedInCopy = sp[6].split("<//>");
   var SpeedOutCopy = sp[7].split("<//>");

   var AllKey = [];



   var Layer = app.project.activeItem.selectedLayers;

   for (var i = 0; i < Layer.length; i += 1) {

      for (var j = 0; j < Layer[i].selectedProperties.length; j += 1) {

         if (Layer[i].selectedProperties[j] instanceof Property) {

            for (var k = 0; k < Layer[i].selectedProperties[j].selectedKeys.length; k += 1) {

               AllKey.push([
                  Layer[i].selectedProperties[j],
                  Layer[i].selectedProperties[j].selectedKeys[k]
               ]);

            }

         }
      }
   }

   var IndexKey = [];
   var LayerKey = [];



   for (var i = 0; i < AllKey.length; i += 1) {
      LayerKey.push(AllKey[i][0]);
      IndexKey.push(AllKey[i][1]);

      var spValueCopy = ValueCopy[i].split(',');

      if (spValueCopy.length == 5) {
         LayerKey[i].setValueAtKey(IndexKey[i], [spValueCopy[1], spValueCopy[2], spValueCopy[3]]);
      }
      else if (spValueCopy.length == 4) {
         LayerKey[i].setValueAtKey(IndexKey[i], [spValueCopy[0], spValueCopy[1], spValueCopy[2]]);
      }
      else if (spValueCopy.length == 3) {
         LayerKey[i].setValueAtKey(IndexKey[i], [spValueCopy[1]]);
      }
      else if (spValueCopy.length == 2) {
         LayerKey[i].setValueAtKey(IndexKey[i], [spValueCopy[0]]);
      }

      var spEaseInCopy = EaseInCopy[i].split(',');
      var spEaseOutCopy = EaseOutCopy[i].split(',');
      var spSpeedInCopy = SpeedInCopy[i].split(',');
      var spSpeedOutCopy = SpeedOutCopy[i].split(',');

      if (spEaseInCopy.length == 2) {
         var EaseIn = new KeyframeEase(spSpeedInCopy[1], spEaseInCopy[1]);
         var EaseOut = new KeyframeEase(spSpeedOutCopy[1], spEaseOutCopy[1]);
      }
      else if (spEaseInCopy.length == 1) {
         var EaseIn = new KeyframeEase(spSpeedInCopy, spEaseInCopy[0]);
         var EaseOut = new KeyframeEase(spSpeedOutCopy[0], spEaseOutCopy);
      }

      if (LayerKey[i].name == "Scale") {
         LayerKey[i].setTemporalEaseAtKey(parseInt(IndexKey[i]), [EaseIn, EaseIn, EaseIn], [EaseOut, EaseOut, EaseOut]);
      }
      else {
         LayerKey[i].setTemporalEaseAtKey(parseInt(IndexKey[i]), [EaseIn], [EaseOut]);
      }
   }

}

function btn_PasteKey() {
   alert("AA");
}

function DefaultEase(Ease) {

   app.beginUndoGroup("Default Ease");

   var AllKey = [];
   var SpeedIn = [];
   var SpeedOut = [];
   var ESIn = [];
   var ESOut = [];
   var EaseDF = Ease.split('/');


   var Layer = app.project.activeItem.selectedLayers;

   for (var i = 0; i < Layer.length; i += 1) {

      for (var j = 0; j < Layer[i].selectedProperties.length; j += 1) {

         if (Layer[i].selectedProperties[j] instanceof Property) {

            for (var k = 0; k < Layer[i].selectedProperties[j].selectedKeys.length; k += 1) {

               AllKey.push([
                  Layer[i].selectedProperties[j],
                  Layer[i].selectedProperties[j].selectedKeys[k]
               ]);

            }

         }
      }
   }

   var IndexKey = [];
   var LayerKey = [];



   for (var i = 0; i < AllKey.length; i += 1) {
      LayerKey.push(AllKey[i][0]);
      IndexKey.push(AllKey[i][1]);

      ESIn.push(LayerKey[i].keyInTemporalEase(IndexKey[i]));
      SpeedIn.push(ESIn[i][0].speed);

      ESOut.push(LayerKey[i].keyOutTemporalEase(IndexKey[i]));
      SpeedOut.push(ESOut[i][0].speed);

      var EaseIn = new KeyframeEase(SpeedIn[i], EaseDF[0]);
      var EaseOut = new KeyframeEase(SpeedOut[i], EaseDF[1]);

      if (LayerKey[i].name == "Scale") {
         LayerKey[i].setTemporalEaseAtKey(parseInt(IndexKey[i]), [EaseIn, EaseIn, EaseIn], [EaseOut, EaseOut, EaseOut]);
      }
      else {
         LayerKey[i].setTemporalEaseAtKey(parseInt(IndexKey[i]), [EaseIn], [EaseOut]);
      }

   }
   app.endUndoGroup();
}

function GoKey(time) {
   app.beginUndoGroup("Go Key");

   var AllKey = [];


   var Layer = app.project.activeItem.selectedLayers;

   for (var i = 0; i < Layer.length; i += 1) {

      for (var j = 0; j < Layer[i].selectedProperties.length; j += 1) {

         if (Layer[i].selectedProperties[j] instanceof Property) {

            for (var k = 0; k < Layer[i].selectedProperties[j].selectedKeys.length; k += 1) {

               AllKey.push([
                  Layer[i].selectedProperties[j],
                  Layer[i].selectedProperties[j].selectedKeys[k]
               ]);

            }

         }
      }
   }

   var IndexKey = [];
   var LayerKey = [];
   var FPS = app.project.activeItem.frameRate;
   var GetTime = time / FPS;
   var TimeKey = [];


   for (var i = 0; i < AllKey.length; i += 1) {
      LayerKey.push(AllKey[i][0]);
      IndexKey.push(AllKey[i][1]);

      var TimeNowKey = LayerKey[i].keyTime(IndexKey[i]);
      TimeKey = TimeNowKey + GetTime;

      var Copy = CopyKey(LayerKey[i], IndexKey[i]);
      LayerKey[i].removeKey(parseInt(IndexKey[i]));
      var AddKey = LayerKey[i].addKey(TimeKey);
      PasteKey(LayerKey[i], Copy, AddKey)
   }
   app.endUndoGroup();
}

function BackKey(time) {
   app.beginUndoGroup("Back Key");

   var AllKey = [];


   var Layer = app.project.activeItem.selectedLayers;

   for (var i = 0; i < Layer.length; i += 1) {

      for (var j = 0; j < Layer[i].selectedProperties.length; j += 1) {

         if (Layer[i].selectedProperties[j] instanceof Property) {

            for (var k = 0; k < Layer[i].selectedProperties[j].selectedKeys.length; k += 1) {

               AllKey.push([
                  Layer[i].selectedProperties[j],
                  Layer[i].selectedProperties[j].selectedKeys[k]
               ]);

            }

         }
      }
   }

   var IndexKey = [];
   var LayerKey = [];
   var FPS = app.project.activeItem.frameRate;
   var GetTime = time / FPS;
   var TimeKey = [];


   for (var i = 0; i < AllKey.length; i += 1) {
      LayerKey.push(AllKey[i][0]);
      IndexKey.push(AllKey[i][1]);

      var TimeNowKey = LayerKey[i].keyTime(IndexKey[i]);
      TimeKey = TimeNowKey - GetTime;

      var Copy = CopyKey(LayerKey[i], IndexKey[i]);
      LayerKey[i].removeKey(parseInt(IndexKey[i]));
      var AddKey = LayerKey[i].addKey(TimeKey);
      PasteKey(LayerKey[i], Copy, AddKey)
   }
   app.endUndoGroup();
}

function CreateKey(mode) {
   app.beginUndoGroup("Create Key Linear");
   var Layers;
   var Layer = app.project.activeItem.selectedLayers;
   for (var i = 0; i < Layer[0].selectedProperties.length; i++) {
      Layers = Layer[0].selectedProperties[i];
   }
   var Time = app.project.activeItem.time;
   var AddKey = Layers.addKey(Time);
   if (mode == "Linear") {
      Layers.setInterpolationTypeAtKey(parseInt(AddKey), 6612, 6612);
   }
   else if (mode == "Bezier") {
      Layers.setInterpolationTypeAtKey(parseInt(AddKey), 6613, 6613);
      var EaseIn = new KeyframeEase(0, 33);
      var EaseOut = new KeyframeEase(0, 33);
      Layers.setTemporalEaseAtKey(parseInt(AddKey), [EaseIn], [EaseOut]);
   }
   else if (mode == "Hold") {
      Layers.setInterpolationTypeAtKey(parseInt(AddKey), 6614, 6614);
   }
   app.endUndoGroup();
}

function CopyKey(Layer, index) {

   var A1 = Layer.keyInInterpolationType(parseInt(index))
   var A2 = Layer.keyInSpatialTangent(parseInt(index))
   var A3 = Layer.keyInTemporalEase(parseInt(index))

   var A4 = Layer.keyOutInterpolationType(parseInt(index))
   var A5 = Layer.keyOutSpatialTangent(parseInt(index))
   var A6 = Layer.keyOutTemporalEase(parseInt(index))

   var A7 = Layer.keyRoving(parseInt(index))
   var A8 = Layer.keySelected(parseInt(index))

   var A9 = Layer.keySpatialAutoBezier(parseInt(index))
   var A10 = Layer.keySpatialContinuous(parseInt(index))

   var A11 = Layer.keyTemporalAutoBezier(parseInt(index))
   var A12 = Layer.keyTemporalContinuous(parseInt(index))

   var A13 = Layer.keyValue(parseInt(index))

   var A14 = Layer.keyInTemporalEase(parseInt(index))[0].influence;
   var A15 = Layer.keyOutTemporalEase(parseInt(index))[0].influence;

   var A16 = Layer.keyInTemporalEase(parseInt(index))[0].speed;
   var A17 = Layer.keyOutTemporalEase(parseInt(index))[0].speed;

   return A1.toString() + "<!>" + A2.toString() + "<!>" + A3.toString() + "<!>" + A4.toString() + "<!>" + A5.toString() + "<!>" + A6.toString() + "<!>" + A7.toString() + "<!>" + A8.toString() + "<!>" + A9.toString() + "<!>" + A10.toString() + "<!>" + A11.toString() + "<!>" + A12.toString() + "<!>" + A13.toString() + "<!>" + A14.toString() + "<!>" + A15.toString() + "<!>" + A16.toString() + "<!>" + A17.toString();
}

function PasteKey(Layer, Copy, index) {

   var sp = Copy.split('<!>');
   var Value = sp[12].split(',');

   Layer.setInterpolationTypeAtKey(parseInt(index), parseInt(sp[0]), parseInt(sp[3]))
   // Layer.setSpatialTangentsAtKey(parseInt(index), sp[1], sp[4])


   Layer.setValueAtKey(parseInt(index), [Value[0], Value[1], Value[2]]);

   // Layer.setRovingAtKey(parseInt(index), sp[6])

   // Layer.setSpatialAutoBezierAtKey(parseInt(index), sp[8])
   // Layer.setSpatialContinuousAtKey(parseInt(index), sp[9])

   // Layer.setTemporalAutoBezierAtKey(parseInt(index), sp[10])
   // Layer.setTemporalContinuousAtKey(parseInt(index), sp[11])

   if (sp[0] == 6613 || sp[3] == 6613) {
      var EaseIn = new KeyframeEase(parseInt(sp[15]), parseInt(sp[13]));
      var EaseOut = new KeyframeEase(parseInt(sp[16]), parseInt(sp[14]));

      if (Layer.name == "Scale") {
         Layer.setTemporalEaseAtKey(parseInt(index), [EaseIn, EaseIn, EaseIn], [EaseOut, EaseOut, EaseOut]);
      }
      else {
         Layer.setTemporalEaseAtKey(parseInt(index), [EaseIn], [EaseOut]);
      }
   }

}

function SelectedLayer(LayerName, LayerProp) {
   app.project.activeItem.layer(LayerName).selected = true;
   SelectedProperties(LayerProp);
}