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
                $quizesTbody.html("")
                SDK.Quiz.findAll(courseId, (err, quiz) => {

                    quiz.forEach((quiz) => {

                        $quizesTbody.append(`
                                <tr data-id="${quiz.quizId}"> 
                                <td> ${quiz.quizId}</td>
                                <td class="quizTitle"> ${quiz.quizTitle}</td>
                                <td><button class="chosenQuiz"role="group" data-id="${quiz.quizId}">Tag quiz</button></td>
                       `);

                    });
                    $(".chosenQuiz").on('click',function() {
                        let title = $(this).closest('tr').find('td:eq(1)').text();
                        let id = $(this).data("id");
                        console.log(title)
                        SDK.Storage.persist("quizId", id)
                        SDK.Storage.persist("quizTitle", title)
                        window.location.href = "takeQuiz.html";



                    });
                });
            });
        });
    });





})