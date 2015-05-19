/**
 * questions <Question[]>:  contains all questions
 * maxRound <int>:  maximal amount of questions to be asked
 * currentRound <int>: indicated in which round the Quiz is (0 = game has not started)
 * correctAnswers <Question[]>: for each correct answer an questionobject is pushed into
 * @constructor
 */
Quiz = function() {
    var questions = new Array(); //Questionobjects only!
    var maxRound = 6;
    var currentRound = 0;
    var correctAnswers = new Array(); //Questionobjects only!

    this.addCorrectAnswer = function() {

    }
}

/**
 * text <String>: text of that Question
 * id <int>: Id of that Question
 * answers <Answer[]>: all answers
 * @constructor
 */
Question = function() {
    var text = "";
    var id;
    var answers = new Array();
}

/**
 * text <String>: text of that answer
 * qId <int>: id of parent-question
 * correct <bool>: if answer is correct answer for that certain question
 * @constructor
 */
Answer = function() {
    var text = "";
    var qId;
    var correct;
}






