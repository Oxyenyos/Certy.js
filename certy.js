  $(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "10kms.csv",
        dataType: "text",
        success: function(data){
            data = processData(data);
        }     
       });

   });

 var data = []; 
 var lines = [];
 var tempArray = [];
 var output;
 var searchValue; 

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    } 
}



function formSubmit() {

         var value = document.getElementById('bib').value;
         value = value.toUpperCase();
         searchData(lines, value);
          function searchData(data, search) { 
              for(i=0; i<600; i++) {
                  var pos = $.inArray(search, data[i]);
                  if(pos !== -1) { tempArray.push(data[i]); }
              }
              return tempArray[0][0];
             
          }  

    	 var c = document.getElementById('canvas');
    	  var context = c.getContext('2d');
        var backgroundImage = new Image();

        backgroundImage.onload = function() {
            DrawScreen();
            DrawText();
        };

        backgroundImage.src = "10kms.png";

        function DrawScreen() {
           context.drawImage(backgroundImage, 0, 0);
        }
        
        function DrawText() {
           context.fillStyle = "black";
           context.font = "28px sans-serif";
           context.textBaseline = 'top';
           var name = tempArray[0][0].toLowerCase();
           name = name.capitalize();
           context.fillText(name+"   "+tempArray[0][3]+" Hours", 40, 210);
        }
  	  
        var canvasTag = document.getElementById("canvas");
        var data = canvas.toDataURL("image/png");
        canvasTag.innerHTML = data;
        canvasTag.style.display="block";

        String.prototype.capitalize = function() {
          return this.charAt(0).toUpperCase() + this.slice(1);
        }

	document.getElementById('download').addEventListener('click', function() {
	    downloadCanvas(this, 'canvas', 'ChennaiTrailMarathon'+tempArray[0][0]+'.png');
	}, false);

	function downloadCanvas(link, canvasId, filename) {
	    link.href = document.getElementById(canvasId).toDataURL();
	    link.download = filename;
	}

}
