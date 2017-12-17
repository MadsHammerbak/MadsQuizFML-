$(document).ready(() => {

  SDK.User.loadNav();

  let questionId = 1;
  let unsavedIds = [];
  $(".courseGroup").hide();
  $(".hiddenBtn").hide();

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

  $("#createQuiz1").click(function(){
     createQuiz($(this));
  });
  $("#createQuiz2").click(function(){
      createQuiz($(this));
  });
  $("#createQuiz3").click(function(){
    createQuiz($(this));
  });
  $("#createQuiz4").click(function(){
    createQuiz($(this));
  });

  $("#addQuestionBtn1").click(function(){
      var id = $(this).attr('id').slice(-1)
      addQuiz(id);
  });

  $("#addQuestionBtn2").click(function(){
      var id = $(this).attr('id').slice(-1)
      addQuiz(id);
  });

  $("#addQuestionBtn3").click(function(){
      var id = $(this).attr('id').slice(-1)
      addQuiz(id);
  });

  $("#addQuestionBtn4").click(function(){
      var id = $(this).attr('id').slice(-1)
      addQuiz(id);
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

  function addQuestion(courseId){
     unsavedIds.push(questionId);
     $("#addQuestion" + courseId).append("" +
            "<div class='form-group' id='question" + questionId + "'>" +
            "<input type='text' class='form-control' id='Question' placeholder='Question'>" +
            "<div id='ChoiceBox1'>" +
                "<input type='text' class='choice' id='Choice1" + questionId + "' placeholder='Choice 1'>" +
                "<div class='radio-inline'><label><input id='radioYes' class='choiceSelector' type='radio' name='optradio1" + questionId + "'>Yes</label></div>" +
                "<div class='radio-inline'><label><input id='radioNo' class='choiceSelector' type='radio' name='optradio1" + questionId +"'>No</label></div>" +
            "</div>" +
            "<br>" +

            "<div id='ChoiceBox2'>" +
                "<input type='text' class='choice' id='Choice2" + questionId + "' placeholder='Choice 2'>" +
                "<div class='radio-inline'><label><input id='radioYes' class='choiceSelector' type='radio' name='optradio2" + questionId + "'>Yes</label></div>" +
                "<div class='radio-inline'><label><input id='radioNo' class='choiceSelector' type='radio' name='optradio2" + questionId + "'>No</label></div>" +
            "</div>" +
            "<br>" +

            "<div id='ChoiceBox3'>" +
                 "<input type='text' class='choice' id='Choice3" + questionId + "' placeholder='Choice 3'>" +
                 "<div class='radio-inline'><label><input id='radioYes' class='choiceSelector' type='radio' name='optradio3" + questionId + "'>Yes</label></div>" +
                 "<div class='radio-inline'><label><input id='radioNo' class='choiceSelector' type='radio' name='optradio3" + questionId + "'>No</label></div>" +
            "</div>" +
            "<br>" +

            "<div id='ChoiceBox4'>" +
                 "<input type='text' class='choice' id='Choice4" + questionId + "' placeholder='Choice 4'>" +
                 "<div class='radio-inline'><label><input id='radioYes' class='choiceSelector' type='radio' name='optradio4" + questionId + "'>Yes</label></div>" +
                 "<div class='radio-inline'><label><input id='radioNo' class='choiceSelector' type='radio' name='optradio4" + questionId + "'>No</label></div>" +
            "</div>" +
            "<br>" +

            "</div>")
  };

  function addQuiz(courseId){
      addQuestion(courseId, questionId);
      questionId++;
  }

  function createQuiz(btn){
      var $this = btn;
      var id = $this.attr('id').slice(-1);

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

      $this.hide();
      $("#hiddenBtn" + id).show();
  }

  function saveAll(){
      let quizId = SDK.Storage.load("quizId");
      //let choiceId = 1;

      if(unsavedIds.length > 0){
          $.each(unsavedIds, function(i, e) {
              //save questions
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

              let choices = $("#question" + e).find($(".choice"));


              $.each(choices, function(index, choice) {

                  let answer;
                  let answerYes = $(this).siblings().find("#radioYes").is(":checked");

                  let answerNo = $(this).siblings().find("#radioNo").is(":checked");

                  console.log($(this).siblings().find("#radioNo"));
                  if (answerYes) {
                      answer = 1;
                  } else if (answerNo) {
                      answer = 0;
                  }
                  let choiceDb = {choiceTitle: $(this).val(), questionId: questionId, answer: answer};



                  //Save Choices
                  SDK.Choice.create(choiceDb, (err, choiceDb) => {
                      if (err && err.xhr.status === 401) {
                          $(".form-group").addClass("has-error");
                      }
                      else if (err){
                          console.log("Bad stuff happened")
                      } else {

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

