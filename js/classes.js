/**
 * questions <Question[]>:  contains all questions
 * maxRound <int>:  maximal amount of questions to be asked
 * currentRound <int>: indicated in which round the Quiz is (0 = game has not started)
 * correctAnswers <Question[]>: for each correct answer an questionobject is pushed into
 * @constructor
 */
Quiz = function() {
    var questions; //Questionobjects only!
    var maxRound = 6;
    var currentRound = 0;
    var correctAnswers; //Questionobjects only!
	var that = this;
    this.addCorrectAnswer = function() {

	
    }
    this.init = function(){
		this.readXml();
	}
	this.readXml = function(){
       
       var xmlhttp;
       if(window.XMLHttpRequest){
           xmlhttp = new XMLHttpRequest();
       }
       else{
           xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
       }
       xmlhttp.onreadystatechange = function(){
           if(xmlhttp.readyState == 4)
           {
            	xmlText = xmlhttp.responseText;    //here we get all lines from text file*
				that.parse(xmlText);
           }
       }
       
       xmlhttp.open("GET", "../Documents/Studium/miniquiz/quiz.xml", true);
       xmlhttp.send();
	}
	this.parse = function(xmlText){
		if (window.DOMParser)
		{
			parser=new DOMParser();
			xmlDoc=parser.parseFromString(xmlText,"text/xml");
		}
		else // Internet Explorer
		{
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML(txt); 
		}
		var answerArray = new Array();
		var question = new Array();
		for(var c = 0; c < xmlDoc.getElementsByTagName("Question").length;c++){
			
			question[c] = new Question();
			question[c].answers = new Array();
			question[c].text = xmlDoc.getElementsByTagName("Question")[c].childNodes[1].childNodes[0].nodeValue;
			question[c].id = xmlDoc.getElementsByTagName("Question")[c].getAttribute("id");
			answer = new Answer();
			answer.text=xmlDoc.getElementsByTagName("Question")[c].childNodes[3].childNodes[0].nodeValue;
			answer.qId = question[c].id;
			answer.correct = true;
			
			question[c].answers.push(answer);
			ci = 5;
			
			for(i=0;i<xmlDoc.getElementsByTagName("Question")[c].childElementCount-2;i++){
				answer = new Answer();
				answer.text=xmlDoc.getElementsByTagName("Question")[c].childNodes[ci].childNodes[0].nodeValue;
				answer.qId = question[c].id;
				answer.correct = false;
				question[c].answers.push(answer);
				ci = ci+2;
			}
			
		}
		this.questions = question;
		
	}
}

/**
 * text <String>: text of that Question
 * id <int>: Id of that Question
 * answers <Answer[]>: all answers
 * @constructor
 */
Question = function() {
    var text;
    var id;
    var answers;
}

/**
 * text <String>: text of that answer
 * qId <int>: id of parent-question
 * correct <bool>: if answer is correct answer for that certain question
 * @constructor
 */
Answer = function() {
    var text;
    var qId;
    var correct;
    
}






