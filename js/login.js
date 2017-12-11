$(document).ready(() => {

  SDK.User.loadNav();

    $(".OpretBruger").hide();

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
        window.location.href = "adminUser.html";
      }
    });




  });

  $("#opret-bruger").click(() => {

      $(".OpretBruger").toggle();

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
              window.location.href = "adminUser.html";
          }

    });





  });

});


