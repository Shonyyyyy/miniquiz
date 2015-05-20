$(document).ready(function() {
    quizUi = new QuizUi();
    quizUi.question = "Das ist die erste Frage";
    quizUi.questionNo = "1";
    quizUi.state = 1;
    quizUi.answers = new Array("tolle Antwort", "zweite tolle Antwort", "koennte falsch sein");
});

$(document).on('click', '#start-quiz', function (e) {
    quizUi.startQuiz();
});

$(document).on('click', '.answer-container', function (e) {
    quizUi.switchQuestion();
});

$(document).on('click', '#restart-quiz', function (e) {
    quizUi.resetQuiz();
});

QuizUi = function() {
    var that = this;

    var state;
    var question;
    var answers = new Array();
    var questionNo;

    this.startQuiz = function() {
        if(this.state == 1) {
            this.appendQuestion();
            this.appendAnswers();

            $('#start').fadeOut(500, function(){
                $('#game').fadeIn(500);
            });

            this.state = 2;
        } else {
            console.log("State is not correct for this action!");
        }

    }

    this.resetQuiz = function() {
        if(this.state == 3) {
            $('#result').fadeOut(500, function(){
                $('#start').fadeIn(500);
            });
            this.state = 1;
        } else {
            console.log("State is not correct for this action!");
        }
    }

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

    this.clearAnswerBar = function() {
        $('.progress').empty();
    }

    this.appendCorrectAnswer = function(width) {
        $('.progress').append('<div class="progress-bar progress-bar-success" style="width: ' + width + '%;"></div>');
    }

    this.appendIncorrectAnswer = function(width) {
        $('.progress').append('<div class="progress-bar progress-bar-danger" style="width: ' + width + '%;"></div>');
    }

    this.setQuestion = function(input) {
        this.question = input;
    }

    this.setAnswers = function(arrayInput) {
        this.answers = arrayIinput;
    }

    this.setQuestionNo = function(questionNo) {
        this.questionNo = questionNo;
    }

    this.appendQuestion = function() {
        $('#question-no').empty();
        $('#question-no').append(this.questionNo);

        $('#question-container').empty();
        $('#question-container').append(this.question);
    }

    this.appendAnswers = function() {
        var answersHtmlString = "";
        $('#answers').empty();

        for(var i = 0;i<this.answers.length;i++) {
            answersHtmlString += '<div class="btn btn-block btn-primary answer-container">' + this.answers[i] + '</div>';
        }

        $('#answers').append(answersHtmlString);

        $('.answer-container').click(function(){
            that.switchQuestion();
        });

    }
}
