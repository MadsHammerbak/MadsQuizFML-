$(document).ready(() => {

    const currentUser = SDK.User.current();

    if (currentUser.type === 2){

        $(".adminMenu").show();

    }

    else {
        $(".adminMenu").hide();

    }



    $(".OpretAdmin").hide();

    $("#visOpretAdmin").click(() => {

        $(".OpretAdmin").toggle();

    });

    $("#opret-admin").click(() => {


        const username = $("#signupUsername").val();
        const password = $("#signupPassword").val();
        const firstname = $("#signupFirstname").val();
        const lastname = $("#signupLastname").val();



        SDK.User.createAdmin(username, password, firstname, lastname, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err){
                console.log("Bad stuff happened")
            } else {
                alert("Admin bruger oprettet")
                window.location.href = "login.html";
            }

        });





    });












});







