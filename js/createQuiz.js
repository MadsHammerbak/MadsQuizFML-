$(document).ready(() => {

  SDK.User.loadNav();


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
    var quizId = 0;
    var $this = $(this);
    var id = $this.attr('id').slice(-1);
    if (quizId === 0){
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
    addQuestion(id);

    //Add question to database
    //SDK.
  });

  $("#addQuestionBtn2").click(function(){
    var $this = $(this);
    var id = $this.attr('id').slice(-1);
    addQuestion(id);
  });

  $("#addQuestionBtn3").click(function(){
    var $this = $(this);
    var id = $this.attr('id').slice(-1);
    addQuestion(id);

  });

  $("#addQuestionBtn4").click(function(){
    var $this = $(this);
    var id = $this.attr('id').slice(-1);
    addQuestion(id);

  });

  $("#finishQuiz1").click(function(){

  });

  $("#finishQuiz2").click(function(){

  });

  $("#finishQuiz3").click(function(){

  });

  $("#finishQuiz4").click(function(){

  });

    function addQuestion(courseId){
        $("#addQuestion" + courseId).append("" +
            "<div class='form-group unsaved'>" +
            "<input type='text' class='form-control' id='' placeholder='Question'>" +
            "<input type='text' placeholder='Choice 1'>" +
            "<div class='radio-inline'><label><input type='radio' name='optradio'>Yes</label></div>" +
            "<div class='radio-inline'><label><input type='radio' name='optradio'>No</label></div>" +
            "<br>" +

            "<input type='text' placeholder='Choice 2'><br>" +
            "<input type='text' placeholder='Choice 3'><br>" +
            "<input type='text' placeholder='Choice 4'><br>" +
            "</div>")
    };

});

