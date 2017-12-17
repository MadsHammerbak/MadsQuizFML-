$(document).ready(() => {

  SDK.User.loadNav();

  let questionId = 1;
  let unsavedIds = [];
  $(".courseGroup").hide();

  SDK.Courses.getCourses((err, courses) => {
      courses.forEach(function (course) {
          $("#courseDiv").append("<div class='col-md-3' id=" + course.courseId + "></div>");
          $("#" + course.courseId).append("<div id='courseBtn" + course.courseId + "' class='btn btn-default'>" + course.courseTitel + "</div>")
          $("#courseBtn" + course.courseId).click(function () {
            $("#course" + course.courseId + "Name").text(course.courseTitel);
            $(".courseGroup").hide();
            $("#course" + course.courseId).show();




          });
      });
  });

  $("#addQuestionBtn1").click(function(){
    addQuiz($(this));
  });

  $("#addQuestionBtn2").click(function(){
    addQuiz($(this));
  });

  $("#addQuestionBtn3").click(function(){
      addQuiz($(this));
  });

  $("#addQuestionBtn4").click(function(){
      addQuiz($(this));
  });

  $("#finishQuiz1").click(function(){
      saveAll();
  });

  $("#finishQuiz2").click(function(){
      saveAll();
  });

  $("#finishQuiz3").click(function(){
      saveAll();
  });

  $("#finishQuiz4").click(function(){
      saveAll();
  });

  function addQuestion(courseId, questionId){
     unsavedIds.push(questionId);
     $("#addQuestion" + courseId).append("" +
            "<div class='form-group' id='question" + questionId + "'>" +
            "<input type='text' class='form-control' id='Question' placeholder='Question'>" +
            "<div id='ChoiceBox1'>" +
                "<input type='text' class='choice' id='Choice1' placeholder='Choice 1'>" +
                "<div class='radio-inline'><label><input id='radioYes' class='choiceSelector' type='radio' name='optradio1'>Yes</label></div>" +
                "<div class='radio-inline'><label><input id='radioNo' class='choiceSelector' type='radio' name='optradio1'>No</label></div>" +
            "</div>" +
            "<br>" +

            "<div id='ChoiceBox2'>" +
                "<input type='text' class='choice' id='Choice2' placeholder='Choice 2'>" +
                "<div class='radio-inline'><label><input id='radioYes' class='choiceSelector' type='radio' name='optradio2'>Yes</label></div>" +
                "<div class='radio-inline'><label><input id='radioNo' class='choiceSelector' type='radio' name='optradio2'>No</label></div>" +
            "</div>" +
            "<br>" +

            "<div id='ChoiceBox3'>" +
                 "<input type='text' class='choice' id='Choice3' placeholder='Choice 3'>" +
                 "<div class='radio-inline'><label><input id='radioYes' class='choiceSelector' type='radio' name='optradio3'>Yes</label></div>" +
                 "<div class='radio-inline'><label><input id='radioNo' class='choiceSelector' type='radio' name='optradio3'>No</label></div>" +
            "</div>" +
            "<br>" +

            "<div id='ChoiceBox4'>" +
                 "<input type='text' class='choice' id='Choice4' placeholder='Choice 4'>" +
                 "<div class='radio-inline'><label><input id='radioYes' class='choiceSelector' type='radio' name='optradio4'>Yes</label></div>" +
                 "<div class='radio-inline'><label><input id='radioNo' class='choiceSelector' type='radio' name='optradio4'>No</label></div>" +
            "</div>" +
            "<br>" +

            "</div>")
  };

  function addQuiz(btn){
      var courseId = 0
      var $this = btn;
      var id = $this.attr('id').slice(-1);

      if (courseId === 0){
          var quizName = $("#QuizInput" + id).val();
          if(!quizName){
              window.alert("Quiz name can not be empty. Insert a quiz name.")
              return;
          }

          var quiz = {quizTitle: quizName, courseId: id};
          SDK.Quiz.create(quiz, (err, quiz) => {
              if (err && err.xhr.status === 401) {
                  $(".form-group").addClass("has-error");
              }
              else if (err){
                  console.log("Bad stuff happened")
              } else {
                  alert("Quiz oprettet");
                  //window.location.href = "login.html";
              }
          });
      } else {

      }
      addQuestion(id, questionId);
      questionId++;
  }

  function saveAll(){
      let quizId = SDK.Storage.load("quizId");

      if(unsavedIds.length > 0){
          $.each(unsavedIds, function(i, e) {
              //save questions
              //get text by $("#question" + value).children("#Question").val()
              var questionTitle = $("#question" + e).children("#Question").val();
              var question = {questionTitle: questionTitle, quizId: quizId};
              //Saving question
              SDK.Question.create(question, (err, question) => {
                  if (err && err.xhr.status === 401) {
                      $(".form-group").addClass("has-error");
                  }
                  else if (err){
                      console.log("Bad stuff happened")
                  } else {
                      //window.location.href = "login.html";
                  }
              });

              //Get question Id
              let questionId = SDK.Storage.load("questionId");

              let choices = [];
              let choiceId = 1;

              $.each($(".choice"), function(elem) {
                  let answer;
                  let answerYes = $("#ChoiceBox" + choiceId).find("#radioYes").is(":checked");
                  let answerNo = $("#ChoiceBox" + choiceId).find("#radioNo").is(":checked");
                  if (answerYes) {
                      answer = 1;
                  } else if (answerNo) {
                      answer = 0;
                  }
                  let choice = {choiceTitle: $("#Choice" + choiceId).val(), questionId: questionId, answer: answer};
                  console.log(choice);
                  choiceId++;

                  //Save Choices
                  SDK.Choice.create(choice, (err, choice) => {
                      if (err && err.xhr.status === 401) {
                          $(".form-group").addClass("has-error");
                      }
                      else if (err){
                          console.log("Bad stuff happened")
                      } else {
                          alert("Quiz oprettet");
                          //window.location.href = "login.html";
                      }
                  });

              });

          });
      }
      SDK.Storage.remove("questionId");
      SDK.Storage.remove("quizId");
      SDK.Storage.remove("quizTitle");
      SDK.Storage.remove("courseId");

  }

});

