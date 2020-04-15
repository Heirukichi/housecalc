var dataArray = [];
var loading = false;

//-----------------------------------------------------------------------------
// * Add Extra Room Line
//-----------------------------------------------------------------------------
function addRoomLine() {
  let dummyLine = $("#dummyLine");
  let rooms = $("#apartmentRooms");
  let rowIndex = rooms.children().length + 1;
  if (!loading) {
    dataArray[rowIndex - 1] = new Room(rowIndex);
  }
  let htmlText = dummyLine.html().replace(/0/gi, rowIndex);
  rooms.append(htmlText);
  $("#apartmentRooms > .hidden").removeClass("hidden");
  if (loading) {
    $("#inputWidth" + rowIndex).val(dataArray[rowIndex - 1].width);
    $("#inputHeight" + rowIndex).val(dataArray[rowIndex - 1].height);
    $("#inputName" + rowIndex).val(dataArray[rowIndex - 1].name);
    calculateRowArea(rowIndex);
  }
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
// * Update Room Data
//-----------------------------------------------------------------------------
function updateRoomData(e) {
  var currentRoomDiv = $(this).parent().parent();
  var index = Number(currentRoomDiv.data("index"));
  dataArray[index - 1].width = Number($("#inputWidth" + index).val()) || 0;
  dataArray[index - 1].height = Number($("#inputHeight" + index).val()) || 0;
  dataArray[index - 1].name = $("#inputName" + index).val() || '';
}

//-----------------------------------------------------------------------------
// * Download Object As JSON File
//-----------------------------------------------------------------------------
function downloadObjectAsJson() {
  let dataStr = "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(dataArray));
  let dlAnchor = $("#downloadAnchorElem1");
  dlAnchor.attr("href", dataStr);
  dlAnchor.attr("download", "rooms.json");
  dlAnchor[0].click();
}

//-----------------------------------------------------------------------------
// * Upload Data From JSON File
//-----------------------------------------------------------------------------
function uploadDataFromJson() {
  let jsonText = $("#roomsData").val();
  loading = true;
  dataArray = JSON.parse(jsonText);
  for (var i = 0; i < dataArray.length; i++) {
    addRoomLine();
  }
  loading = false;
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
  $(document).on(
      "blur",
      "#apartmentRooms input",
      updateRoomData
  );
  $(document).on(
      "click",
      "#downloadAnchorElem",
      downloadObjectAsJson
  );
  $(document).on(
    "click",
    "#uploadRoomsData",
    uploadDataFromJson
  );
}

//-----------------------------------------------------------------------------
// * Setup Page
//-----------------------------------------------------------------------------
function setupPage() {

  addListeners();
}

$(document).ready(setupPage);
