
$(document).ready(function() {
    quizUi = new QuizUi();
    quiz = new Quiz();
    quiz.init();
});

$(document).on('click', '#start-quiz', function (e) {
    quiz.startQuiz();
    console.log("");
});
