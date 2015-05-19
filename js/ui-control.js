$(document).ready(function() {
    quizUi = new QuizUi();
    quizUi.question = "Das ist die erste Frage";
    quizUi.questionNo = "1";
    quizUi.answers = new Array("tolle Antwort", "zweite tolle Antwort", "koennte falsch sein");
});

$(document).on('click', '#start-quiz', function (e) {
    quizUi.startQuiz();
});

$(document).on('click', '.answer-container', function (e) {
    quizUi.switchQuestion();
});

QuizUi = function() {
    var that = this;

    var question;
    var answers = new Array();
    var questionNo;

    this.startQuiz = function() {
        this.appendQuestion();
        this.appendAnswers();

        $('#start').fadeOut(500, function(){
            $('#game').fadeIn(500);
        });

    }

    this.switchQuestion = function() {
        $('#game').fadeOut(500, function() {
            that.appendQuestion();
            that.appendAnswers();
            $('#game').fadeIn(500);
        });
    }

    this.setQuestion = function(input) {
        this.question = input;
    }

    this.setAnswers = function(input) {
        this.answers = input;
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
            answersHtmlString += '<div class="row">' +
                    '<div class="col-md-8 col-md-offset-2">' +
                    '<div class="answer-container">' +
                    this.answers[i] +
                    '</div>' +
                    '</div>' +
                    '</div>';
        }

        $('#answers').append(answersHtmlString);

        $('.answer-container').click(function(){
            that.appendQuestion();
            that.appendAnswers();
        });

    }
}
