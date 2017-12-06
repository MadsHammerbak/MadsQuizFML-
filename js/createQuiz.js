$(document).ready(() => {

  SDK.User.loadNav();

  $("#quiz").hide();

  $(".course").click(function() {
    $("#quiz").show();
    $this = $(this);
    var courseName = $this.text();
    $("#courseName").text(courseName);
    $parent = $this.parent();
    $quiz = $parent.siblings("#quiz");
    nameQuiz($quiz, courseName);
  });

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
  }));
});

