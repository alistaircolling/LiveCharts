var custom_colors =["#ff0000","#00ff00","#0000ff","#ff6600","#ff00ff","#00ffff"];
var bdata,bars,c , counter, dataInterval, totals;


window.onload = function () {
  counter = 0;
  bdata = [[1],[1],[1],[1],[1]];
 totals = Raphael("totals"), txtattr = { font: "12px sans-serif" };
  bars = Raphael("holder"), txtattr = { font: "12px sans-serif" };
  c = bars.barchart(10, 10, 800, 450, bdata, { colors:custom_colors, stretch:false, labels:[["one"], ["two"], ["3"], ["4"], ["5"]]});
  addLabels();
  updateTotals();
  loadData();
  addButtonListener();

};

var text1,text2,text3,text4,text5;
var total1,total2,total3,total4,total5;
var totalCopy;
var copy1 = "DOUG\nCOPTER";
var copy2 = "TOILET\nTEXTS";
var copy3 = "CHARITY\nTRAX";
var copy4 = "OPTION\nFOUR";
var copy5 = "OPTION\nFIVE";

var textAttributes =  {'text-anchor': 'middle', 'font-size':26, 'font-weight':'bold'};
var totalTextAttributes =  {'text-anchor': 'middle', 'font-size':80, 'font-weight':'bold', 'fill':'#ffffff'};
function addLabels(){
  var myLabels = ["one", "two", "3", "4", "5"];
  text1 = bars.text(175, 480, copy1).attr( textAttributes); text1.attr('fill',custom_colors[0]);
  text2 = bars.text(295, 480, copy2).attr( textAttributes); text2.attr('fill',custom_colors[1]);
  text3 = bars.text(410, 480, copy3).attr( textAttributes); text3.attr('fill',custom_colors[2]);
  text4 = bars.text(525, 480, copy4).attr( textAttributes); text4.attr('fill',custom_colors[3]);
  text5 = bars.text(635, 480, copy5).attr( textAttributes); text5.attr('fill',custom_colors[4]);
}

function updateTotals(){
  var i;
  var startX = 180;
  var startY = 380;
  var currentLabel;
  totals.remove();
  totals = Raphael("totals"), txtattr = { font: "12px sans-serif" };
  for(i=0; i<bdata.length; i++){
    currentLabel = eval("total"+(i+1));
    if(currentLabel != undefined){currentLabel.remove()}
    currentLabel =  totals.text(startX+(i*115), startY, bdata[i][0]-1).attr( totalTextAttributes);
    console.log("CL:"+currentLabel);

  }
}

function loadData(){
  console.log("reload data");
  clearInterval(dataInterval);
  var url = "https://spreadsheets.google.com/feeds/cells/0AmSovoaAS4VbdEV1LUlCTTVSeVFZYTM3eU9tb3d3TUE/od6/private/";
  var googleSpreadsheet = new GoogleSpreadsheet();
  googleSpreadsheet.url(url);
  googleSpreadsheet.load(function(data) {
    console.log(data);
    //doug
    bdata[0][0] = parseInt(data.data[5]);
    //toilet
    bdata[1][0] = parseInt(data.data[9]);
    //charity
    bdata[2][0] = parseInt(data.data[13]);
    //opt 4
    bdata[3][0] = parseInt(data.data[15]);
    //opt 5
    bdata[4][0] = parseInt(data.data[19]);
    console.log(bdata);
    b_animate();
    updateTotals();
    //load data again in 500ms
    dataInterval = setInterval( function(){loadData();},1000);
  });


}


function addButtonListener(){
   var button = document.getElementById("buttonid");
    if(button.addEventListener){
         button.addEventListener("click", function() {
           clearInterval(dataInterval);});
    } else {
         button.attachEvent("click", function() {
           clearInterval(dataInterval);});
    };
}




function b_animate(){
  console.log("animate:"+bdata);
    var c2 = bars.barchart(10, 10, 800, 450, bdata, { colors:custom_colors, stretch:false});
    $.each(c.bars, function(k, v) {
        v.animate({ path: c2.bars[k][0].attr("path") }, 500);
        v[0].value = bdata[k][0];
    });
    c2.remove();
}