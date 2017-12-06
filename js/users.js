$(document).ready(() => {

  SDK.User.loadNav();
  const $userTbody = $("#users-tbody");


$userTbody.html("")
  SDK.User.findAll((err, users) =>{

      users.forEach((user)=> {

        $userTbody.append(`<tr data-id="${user.userId}"> <td>${user.userId}</td> <td>${user.username}</td> <td>${user.firstName}</td> <td>${user.lastName}</td> <tr/>`);

      });

   });

 });