function GetOS() {
   try {
      return $.os.toLowerCase().indexOf("mac") >= 0 ? "MAC" : "WIN";
   } catch (er) {
      alert(er);
   }
}
