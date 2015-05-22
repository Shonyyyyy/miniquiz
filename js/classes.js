/**
 * questions <Question[]>:  contains all questions
 * maxRound <int>:  maximal amount of questions to be asked
 * currentRound <int>: indicated in which round the Quiz is (0 = game has not started)
 * correctAnswers <Question[]>: for each correct answer an questionobject is pushed into
 * @constructor
 */
Quiz = function() {
    this.questions; //Questionobjects only!
    this.maxRound = 3;
    this.currentRound = 0;
    this.correctAnswers = new Array(); //Questionobjects only!
	var that = this;
	this.askedQuestion = new Array();

	this.addCorrectAnswer = function() {
		this.correctAnswers.push(this.questions[this.askedQuestion[this.askedQuestion.length-1]]);
    }
	
	
	this.setMaxRound = function(maxRound){
		this.maxRound = maxRound;
		quizUi.setWidthAnswerElement(100/this.maxRound);
	}
	this.getMaxRound = function(){
		return this.maxRound;
	}
	/**
	*return a random Question which is not used in the Quiz before	
	*/
    this.getQuestion= function(){
	    var x = Math.floor((Math.random() * this.questions.length));
		for(var i = 0; i< this.askedQuestion.length; i++ )
		{
			if(x == this.askedQuestion[i])
			{
				return this.getQuestion();
			}
		}
		this.askedQuestion.push(x);
		return x;// questions[x];
    }
	/**
	* Switch a Question in the Gui. Looks how many Questions are aked and
	* stop the Quiz if the maxQuetion count reached. 
	*/
   	this.switchQuestion = function(){
	   	this.currentRound++;
		if(this.currentRound > this.maxRound) {
			this.endQuiz();
		} else {
			this.prepareNextQuestionForUi(this.getQuestion());
			quizUi.switchQuestion();
		}
   	}
   	/**
	* Finished the Quiz and reset the it.   	
	*/
	this.endQuiz = function() {
		//calculate results
		var mood = Math.round((100  /this.maxRound * this.correctAnswers.length)*100)/100;
		if(mood>66.67)
			mood = 1;
		else if(mood > 33.33)
			mood = 2;
		else
			mood = 3;
		quizUi.endQuiz(mood, this.correctAnswers.length, this.maxRound);
		this.resetQuiz();
	}

	this.resetQuiz = function() {
		this.correctAnswers = new Array();
		this.currentRound = 0;
		this.askedQuestion = new Array();
	}

    this.startQuiz = function(){
	  	try{
		  	var x = this.getQuestion();
		    //askedQuestion.push(x);
	    }
	    catch(e){
		    console.log("All Questions have been delivered");
	    }
		quizUi.state = 1;
		this.currentRound = 1;

		this.prepareNextQuestionForUi(x);

		quizUi.startQuiz();
	    
    }

	this.prepareNextQuestionForUi = function(index) {
		quizUi.setQuestion(this.questions[index].text);
		quizUi.setAnswers(this.questions[index].answers);
		quizUi.setQuestionNo(this.currentRound);
	}
	
	/*
	*start the XML Parser and Read the XML-File	
	*/
    this.init = function(){
	    quizUi.setWidthAnswerElement(100/this.maxRound);
		this.readFile();
	}
	
	/*
	* Read the XML-File and send it to parserXML()	
	*/
	this.readFile = function(){
		
		jQuery.get("quiz.xml",function(data){
			that.parseXML(data);
		});
	}
	
	/*
	* Parse the XML-Code in Questions. Put the Questions in the Quiz Objekt.
	*/
	this.parseXML = function(s){
		//Replace the String for split the String after this
		var xml = s.replace(/ /gi, "#+#");
		xml = xml.replace(/\n/gi, "#+#");
		xml = xml.replace(/</gi,"#+#");
		xml = xml.replace(/>/gi,"#+#");
		xml = xml.split("#+#");
		
		//Count the Questions in the XML-String
		var countQuestions = new Array();
		for(var i = 0; i<xml.length;i++) {
			//Pushed the position from the Start of the Question in this Array
			if(xml[i] == "Question"){
				countQuestions.push(i);
			}
			//Pushed the position from the End of the Question in the Array
			if(xml[i] == "/Question"){
				countQuestions.push(i);
			}
		}
		
		//Create new Arrays, to safe the elements
		var answerArray = new Array();
		var question = new Array();
		
		//Seach in each Qustions Element in the XML-File for the Text, Correctanwser und Answer
		for(var i = 0;i<countQuestions.length/2;i++){
			//Create an new Qustion Object and fill it
			question[i] = new Question();
			question[i].answers = new Array();
			question[i].id = i;
			
			//Search in the Quetion for the Elemente
			for(var j = countQuestions[i*2]; j<(countQuestions[(i*2)+1]);j++)
			{
				if(xml[j] == "QuestionText"){
					var text = "";
					j++;
					while(xml[j] != "/QuestionText"){
						text += xml[j]+" ";
						j++; 
					}
					question[i].text = text;
					
				}
				if(xml[j] == "correct"){
					var text = "";
					j++;
					while(xml[j] != "/correct"){
						text += xml[j]+" ";
						j++; 
					}
					answer = new Answer();
					answer.text = text;
					answer.qId = i;
					answer.correct = true;
					question[i].answers.push(answer);
				}
				if(xml[j] == "answer"){
					var text = "";
					j++;
					while(xml[j] != "/answer"){
						text += xml[j]+" ";
						j++; 
					}
					answer = new Answer();
					answer.text = text;
					answer.qId = i;
					answer.correct = false;
					question[i].answers.push(answer);
				}
			}	
			this.questions = question;	
		}		
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






