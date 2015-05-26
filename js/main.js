/**
* Inizalisiert the quiz and quizUI	
*/
$(document).ready(function() {
    quizUi = new QuizUi();
    quiz = new Quiz();
    quiz.init();
    initAdmin();
});

$(document).on('click', '#start-quiz', function (e) {
    quiz.startQuiz();
});

$(document).on('click', '#toggle-wrong-answers', function(e) {
   quizUi.toggleWrongAnswers();
});
