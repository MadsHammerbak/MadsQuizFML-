$(document).ready(() => {

  SDK.User.loadNav();

  $(".courseGroup").hide();

  SDK.Courses.getCourses((err, courses) => {
      console.log(courses)
      courses.forEach(function (course) {
          $("#courseDiv").append("<div class='col-md-3' id=" + course.courseId + "></div>");
          $("#" + course.courseId).append("<div id='courseBtn" + course.courseId + "' class='btn btn-default'>" + course.courseTitel + "</div>")
          $("#courseBtn" + course.courseId).click(function () {
            $("#course" + course.courseId + "Name").text(course.courseTitel);
            $(".courseGroup").hide();
            $("#course" + course.courseId).show();
            $("#course" + course.courseId).append("<div class='btn btn-primary' id='addQuestion" + course.courseId + "'>Add Choices</div>")



          });

  });

/*
  $("#C1").hide();
  $("#C2").hide();
  $("#C3").hide();
  $("#C4").hide();
  $("#courseName").hide();

  $(".course").click(function() {
      $this = $(this);
      var courseName = $this.text();
      var courseId = $this.attr("id");

      $("#courseName").text(courseName);
      console.log(courseId);

*/




    /* $("#quiz").show();
    $this = $(this);
    $("#courseName").text(courseName);
    var courseName = $this.text();
    $parent = $this.parent();
    $quiz = $parent.siblings("#quiz");
    nameQuiz($quiz, courseName);*/
  });


  /*
  function nameQuiz(elem, courseName) {

    elem.append("<h1 id='courseName'>" + courseName + "</h1>");
    elem.append("<input type='text' class='form-control' id='quizName' placeholder='quizName'>");
    elem.append("<div class='btn btn-default' id='addQuestion'>Add question</div>");

    if(elem.children().length < 1) {

    } else {
      elem.empty();
      elem.append("<h1 id='courseName'>" + courseName + "</h1>");
      elem.append("<input type='text' class='form-control' id='quizName' placeholder='quizName'>");
      elem.append("<div class='btn btn-default' id='addQuestion'>Add question</div>");
    }
  }

  $("#addQuestion").on("click", (function(elem) {
    var elem = $(this);
    console.log(elem);
    var addQuestion = elem.children("#addQuestion").detach();
    elem.append("<input type='text' class='form-control' id='question' placeholder='Input your question here'>");
    elem.append("<input type='text' class='form-control' id='question1' placeholder='Answer 1'>");
    elem.append("<input type='text' class='form-control' id='question2' placeholder='Answer 2'>");
    elem.append("<input type='text' class='form-control' id='question3' placeholder='Answer 3'>");
    elem.append("<input type='text' class='form-control' id='question4' placeholder='Answer 4'>");
    elem.append(addQuestion);
  }));*/

});

