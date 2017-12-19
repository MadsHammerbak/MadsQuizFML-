$(document).ready(() => {


    SDK.User.loadNav();

    //SDK request for loading selected quiz from local storage
    const chosenQuiz = SDK.Storage.load("quizTitle");
    const chosenId = SDK.Storage.load("quizId");

    $("#header").append(chosenQuiz);



    //SDK request for loading all questions
    SDK.Question.findAll(chosenId, (err, question) => {

        //For each loop for adding all the questions to the table
        question.forEach((question) => {
            var question = question.questionTitle;
            var questionId = question.questionId;
            $(".table").append(`<div id="${questionId}"><p><b>${question}</b></p></div>`)
            console.log(question)

            //SDK request for loading all the options
            /*SDK.Choice.findAll(questionId, (err, choice) =>{

                choice = choice.choiceTitle;
                console.log(choice);


               /* var choice  = choice.choiceTitle;
                var choiceId = choice.id;
                var answer = choice.answer;

                //For each loop for adding options to the specific question (with radio buttons)
                choice.forEach((choices) => {
                    $(`#${questionId}`).append(`<p><input type="radio" class="choice-answer" name="option${questionId}" value="${choices.answer}"> ${choices.choiceTitle} </p>`);

                });
            });*/
        });
    });
    /*
    $("#getAnswers").on("click", () => {

        let totalQuestions = 0;
        let correctAnswers = 0;


        //Function to count number of questions answered
        $(".choice-answer").each(function () {
            if ($(this).is(":checked")) {
                totalQuestions++;
                //Function to count number of correct answers
                if ($(this).val() == 1) {
                    correctAnswers++;

                }
            }
            console.log(correctAnswers);
        })*/

});
