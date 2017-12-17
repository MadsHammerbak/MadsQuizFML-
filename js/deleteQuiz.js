$(document).ready(() => {

    SDK.User.loadNav();


   const $quizesTbody = $("#quizes-tbody");


    SDK.Courses.getCourses((err, courses) => {
        courses.forEach(function (course) {
            $("#courseDiv").append("<div class='col-md-3' id=" + course.courseId + "></div>");
            $("#" + course.courseId).append("<div id='courseBtn" + course.courseId + "' class='btn btn-default'>" + course.courseTitel + "</div>")
            $("#courseBtn" + course.courseId).click(function () {
                $("#course" + course.courseId + "Name").text(course.courseTitel);

                let courseId = course.courseId;
                $quizesTbody.html("");
                SDK.Quiz.findAll(courseId, (err, quiz) => {

                    quiz.forEach((quiz) => {

                        $quizesTbody.append(`<tr data-id="${quiz.quizId}"> <td>${quiz.quizId}</td><td>${quiz.quizTitle}</td> 
                        <td><div class="btn btn-primary-ld" role="group" id="${quiz.quizId}">Slet quiz</div></td>`);



                    });

                });
            });
        });
    });
   /* $("#deleteQuiz").click(() => {

        var deletionId = current.userId;


        SDK.User.delete(deletionId, (err) => {

            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err) {
                console.log("Bad stuff happened")
            } else {
                alert("Din bruger er nu slettet")
                window.location.href = "login.html";
                SDK.Storage.remove("userId");
                SDK.Storage.remove("userName");
                SDK.Storage.remove("userType");
            }



        });
    });*/





});



