//-----------------------------------------------------------------------------
// * Add Extra Room Line
//-----------------------------------------------------------------------------
function addRoomLine() {
  console.log("Click!");
  var dummyLine = $("#dummyLine");
  var rooms = $("#apartmentRooms");
  var rowIndex = rooms.children().length + 1;
  var htmlText = dummyLine.html().replace(/0/gi, rowIndex);
  rooms.append(htmlText);
  $("#apartmentRooms > .hidden").removeClass("hidden");
}

//-----------------------------------------------------------------------------
// * Calculate Total Room Area by Index
//-----------------------------------------------------------------------------
function calculateRowArea(rowIndex) {
  var width = Number($("#inputWidth" + rowIndex).val()) || 0;
  var height = Number($("#inputHeight" + rowIndex).val()) || 0;
  var area = (width * height).toFixed(2);
  $("#totalArea" + rowIndex).html(area);
  return area;
}

//-----------------------------------------------------------------------------
// * Calculate Total Room Area Handler
//-----------------------------------------------------------------------------
function calculateTotalArea(e) {
  var currentRoomDiv = $(this).parent().parent();
  calculateRowArea(currentRoomDiv.data("index"));
}

//-----------------------------------------------------------------------------
// * Add Event Listeners
//-----------------------------------------------------------------------------
function addListeners() {
  $("#addRoomButton").click(addRoomLine);
  $(document).on(
      "blur",
      ".room-width input, .room-height input",
      calculateTotalArea
  );
}

$(document).ready(addListeners);
