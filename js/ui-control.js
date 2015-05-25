/**
 * Clicklistener for all Buttons
 */

$(document).on('click', '.answer-container', function (e) {
	quiz.checkAnswer(e.toElement.id);
    quiz.switchQuestion();
});

$(document).on('click', '#restart-quiz', function (e) {
    quizUi.resetQuiz();
});

/**
 * General Class for the UI
 * @constructor
 */
QuizUi = function() {
    that = this;
	this.widthAnswerElement;
    this.state; //States from 1 - 3
    this.question; //String for Question
    this.answers = new Array(); //Array for all answers
    this.questionNo; //Number of current Question

	this.setWidthAnswerElement = function(width){
		this.widthAnswerElement = width;
	}
    /**
     * Starts the Quiz and is called from #start-quiz button
     */
    this.startQuiz = function() {
        if(this.state == 1) {
            //append Questions and Answers
            this.appendQuestion();
            this.appendAnswers();

            //Display the Quiz and hide the start-screen
            $('#start').fadeOut(500, function(){
                $('#game').fadeIn(500);
            });

            //change the state
            this.state = 2;
        } else {
            console.log("State is not correct for this action!");
        }

    }
    /**
     * Displays the start screen. Can be called from Result screen only
     */
    this.resetQuiz = function() {
        if(this.state == 3) {
            $('#result').fadeOut(500, function(){
                $('#start').fadeIn(500);
            });
            this.state = 1;
            this.clearAnswerBar();
        } else {
            console.log("State is not correct for this action!");
        }
    }

    /**
     * Fades in the current Question and fades it back in again, after the new Questions
     * and answers were set and appended to the dom
     *
     * NOTE: Before using this method, you should use setQuestion() and setAnswers()!
     */
    this.switchQuestion = function() {
        if(this.state == 2) {
            $('#game').fadeOut(500, function() {
                that.appendQuestion();
                that.appendAnswers();
                $('#game').fadeIn(500);
            });
        } else {
            console.log("State is not correct for this action!");
        }
    }

    /**
     * Fades out the Quiz and show the result-screen with 3 different screens
     *
     * @param mood: int 1 - 3 -> 1 = Success -> 2 = Ok -> 3 = Bad!
     * @param correct: int amount of correct answers
     * @param max: int amount of questions asked
     */
    this.endQuiz = function(mood, correct, max) {
        if(this.state == 2) {
            $('#result-container').empty();

            switch(mood) {
                case 1:
                    $('#result-container').append('<div class="alert alert-success"><h3><strong>Sehr gut!</strong></h3><p>Du hast <strong>' + correct + '</strong> von <strong>' + max + '</strong> Fragen richtig beantwortet!</p></div>');
                    break;
                case 2:
                    $('#result-container').append('<div class="alert alert-warning"><h3><strong>Ganz Ok!</strong></h3><p>Du hast <strong>' + correct + '</strong> von <strong>' + max + '</strong> Fragen richtig beantwortet!</p></div>');
                    break;
                case 3:
                    $('#result-container').append('<div class="alert alert-danger"><h3><strong>Das war nicht ganz so gut!</strong></h3><p>Du hast <strong>' + correct + '</strong> von <strong>' + max + '</strong> Fragen richtig beantwortet!</p></div>');
                    break;
                default:
                    break;
            }

            $('#game').fadeOut(500, function() {
                $('#result').fadeIn(500);
            });

            this.state = 3;
        } else {
            console.log("State is not correct for this action!");
        }

    }

    /**
     * clears the answer-bar
     */
    this.clearAnswerBar = function() {
        $('.progress').empty();
    }

    /**
     * adds a green piece to the answer-bar
     * @param width: int
     */
    this.appendCorrectAnswer = function() {
        $('.progress').append('<div class="progress-bar progress-bar-success" style="width: ' + this.widthAnswerElement + '%;"></div>');
    }

    /**
     * adds a red piece to the answer-bar
     * @param width: int
     */
    this.appendIncorrectAnswer = function(width) {
        $('.progress').append('<div class="progress-bar progress-bar-danger" style="width: ' + this.widthAnswerElement + '%;"></div>');
    }

    /**
     * sets the Question to the class-field so it can be used by switchQuestion()
     * @param input: String
     */
    this.setQuestion = function(input) {
        this.question = input;
    }

    /**
     * sets the answers to the class-field so it can be used by switchQuestion()
     * @param input: String[]
     */
    this.setAnswers = function(arrayInput) {
        this.answers = arrayInput;
    }

    /**
     * sets the answers to the class-field so it can be used by switchQuestion()
     * @param questionNo: String
     */
    this.setQuestionNo = function(questionNo) {
        this.questionNo = questionNo;
    }

    /**
     * appends the Question to the dom and is used by switchQuestion and window.onload
     */
    this.appendQuestion = function() {
        $('#question-no').empty();
        $('#question-no').append(this.questionNo);

        $('#question-container').empty();
        $('#question-container').append(this.question);
    }

    /**
     * appends all answers from the array to the dom and is used by switchQuestion and window.onload
     */
    this.appendAnswers = function() {
        var answersHtmlString = "";
        $('#answers').empty();
		var usedId = new Array();
        for(var i = 0;i<this.answers.length;i++) {
	        usedId = this.getRandomAnswerNumber(usedId,this.answers.length);
			answersHtmlString += '<div class="btn btn-block btn-primary answer-container" id="answer'+usedId[(usedId.length - 1)]+'">' + this.answers[usedId[usedId.length-1]].text + '</div>';          
        }
		
        $('#answers').append(answersHtmlString);
    }
    
    /**
	* return a random Answer which is not used in the Quiz before
	* @param usedId[]: Int
	* @param arrrayLength[]: Int
	* return x: Int
	*/
    this.getRandomAnswerNumber = function(usedId,arrayLength){
	    var x = Math.floor((Math.random() * arrayLength));
		for(var i = 0; i< usedId.length; i++ )
		{
			if(x == usedId[i])
			{
				return this.getRandomAnswerNumber(usedId,arrayLength);
			}
		}
		usedId.push(x);
		return usedId;
    }
}
