function initAdmin(){
	document.body.onkeydown = function(event){
			checkEingabe(event);
		};
}

var wort = "ADMINCONTROL";
var wortCounter = 0;

function checkEingabe(event){
		var letter = String.fromCharCode(event.keyCode);
		if((letter == wort.charAt(wortCounter) && wortCounter < wort.length-1))
		{		
			wortCounter ++;
		}
		else if(letter == wort.charAt(wortCounter))
		{	
			console.log("jo");
			showAdmin();
		}
		else
		{
			wortCounter = 0;
		}
}

function setRoundWert(){
	var maxRound = document.getElementById("roundNumber").value;
	quiz.setMaxRound(maxRound);
	$("#footer").fadeOut();
	document.getElementById("footer").innerHTML = "";
	
}

function showAdmin(){
	
	var html = '<div id="admin-umfeld">'+
		'<h1>Adminbereich</h1>'+
		'<p>Anzahl von Fragen Pro Runde: <input type="number" value="'+quiz.getMaxRound()+'" id="roundNumber"></p>'+
		'<button id="adminSetButton" class="btn btn-primary" onclick="setRoundWert()">Speichern</button>'+
	'</div>';
	document.getElementById("footer").innerHTML = html;
	$("#footer").fadeIn();
}