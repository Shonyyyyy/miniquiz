
/**
* start the Listenser for the AdminSection
*/
function initAdmin(){
	document.body.onkeydown = function(event){
			checkEingabe(event);
		};
}

//Codierte Word
var wort = "MPYUZO[Z`^[X";
//Richtig eingetippte buchstaben
var wortCounter = 0;

/**
*Prueft die eingaben vom Keyboard	
*/
function checkEingabe(event){
		var letter = String.fromCharCode(this.machWas(event));
		if((letter == wort.charAt(wortCounter) && wortCounter < wort.length-1))
		{		
			wortCounter ++;
		}
		else if(letter == wort.charAt(wortCounter))
		{	
			showAdmin();
		}
		else
		{
			wortCounter = 0;
		}
}


function checkEingabeRound(){
	var maxRound = document.getElementById("roundNumber").value;
	var maxSize = quiz.getMaxSizeRound();
	if(maxRound > maxSize){
		document.getElementById("roundNumber").value = maxSize;
	}
	else if(maxRound < 1){
		document.getElementById("roundNumber").value = 1;
	}
	
}
/**
* setze die Werte	
*/
function setRoundWert(){
	var maxRound = document.getElementById("roundNumber").value;
	quiz.setMaxRound(maxRound);
	$("#footer").fadeOut();
	document.getElementById("footer").innerHTML = "";
	
}

function showAdmin(){
	
	var html = '<div id="admin-umfeld">'+
		'<h1>Adminbereich</h1>'+
		'<p>Anzahl von Fragen Pro Runde: <input type="number" onchange="checkEingabeRound()" value="'+quiz.getMaxRound()+'" id="roundNumber"></p>'+
		'<button id="adminSetButton" class="btn btn-primary" onclick="setRoundWert()">Speichern</button>'+
	'</div>';
	document.getElementById("footer").innerHTML = html;
	$("#footer").fadeIn();
}