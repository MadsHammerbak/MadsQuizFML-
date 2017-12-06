$(document).ready(() => {

  SDK.User.loadNav();

    $(".Opret").hide();

  $("#login-button").click(() => {

    const username = $("#inputUsername").val();
    const password = $("#inputPassword").val();

    SDK.User.login(username, password, (err, data) => {
      if (err && err.xhr.status === 401) {
        $(".form-group").addClass("has-error");
      }
      else if (err){
        console.log("Bad stuff happened")
      } else {
        window.location.href = "../users.html";
      }
    });




  });

  $("#opret-bruger").click(() => {

      $(".Opret").toggle();

  });

  $("#signup-button").click(() => {


    const username = $("#signupUsername").val();
    const password = $("#signupPassword").val();
    const firstname = $("#signupFirstname").val();
    const lastname = $("#signupLastname").val();


     SDK.User.create(username, password, firstname, lastname, (err, data) => {
          if (err && err.xhr.status === 401) {
              $(".form-group").addClass("has-error");
          }
          else if (err){
              console.log("Bad stuff happened")
          } else {
              window.location.href = "login.html";
          }

    });





  });

});


