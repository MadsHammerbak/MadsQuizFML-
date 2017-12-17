const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });

    },
    Courses: {

        getCourses: (cb) => {
            SDK.request({
                method: "GET",
                url: "/courses"
            }, (err, data) => {

                if (err) return cb(err);

                data = JSON.parse(data);

                cb(null, data);
            });
        },


        findAll: (cb) => {
            SDK.request({
                method: "GET",
                url: "/books",
                headers: {
                    filter: {
                        include: ["authors"]
                    }
                }
            }, cb);
        },
    },
    Quiz: {
        create: (quiz, cb) => {
            SDK.request({
                method: "POST",
                url: "/quiz",
                data: {
                    courseId: quiz.courseId,
                    quizTitle: quiz.quizTitle
                },
            },
                (err, data) => {

                if (err) return cb(err);

                data = JSON.parse(data);
                SDK.Storage.persist("courseId", data.courseId);
                SDK.Storage.persist("quizTitle", data.quizTitle);
                SDK.Storage.persist("quizId", data.quizId);

                cb(null, data);
            });
        },
        findAll: (id, cb) => {
            SDK.request({
                method: "GET",
                url: "/quiz/"+id,
            },(err, data) => {

                //On login-error
                if (err) return cb(err);

                data = JSON.parse(data);


                cb(null, data);

            });
        }
    },
    Question: {
        create: (question, cb) => {
            SDK.request({
                    method: "POST",
                    url: "/question",
                    data: {
                        quizId: question.quizId,
                        questionTitle: question.questionTitle
                    },
                },
                (err, data) => {

                    //On login-error
                    if (err) return cb(err);
                    data = JSON.parse(data);
                    SDK.Storage.persist("questionId", data.questionId);

                    cb(null, data);
                });
        },

    },
    Choice: {
        create: (choice, cb) => {
            SDK.request({
                    method: "POST",
                    url: "/choice",
                    data: {
                        questionId: choice.questionId ,
                        choiceTitle: choice.choiceTitle,
                        answer: choice.answer
                    },
                },
                (err, data) => {

                    //On login-error
                    if (err) return cb(err);


                    cb(null, data);
                });
        },

    },


    User: {
        findAll: (cb) => {
            SDK.request({method: "GET", url: "/user"}, cb);
        },

        create: (username, password, firstName, lastName, cb) => {
            SDK.request({
                method: "POST",
                url: "/user/",
                data: {
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    type: 1
                },

            },(err, data) => {

                //On login-error
                if (err) return cb(err);


                SDK.Storage.persist("userId", data.userId);
                SDK.Storage.persist("username", data.username);
                SDK.Storage.persist("userType", data.type);

                cb(null, data);
            });
        },
        createAdmin: (username, password, firstName, lastName, cb) => {
            SDK.request({
                method: "POST",
                url: "/user/",
                data: {
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    type: 2
                },

            },(err, data) => {

                //On login-error
                if (err) return cb(err);

                //SDK.Storage.persist("tokenId", data.id);
                SDK.Storage.persist("userId", data.userId);
                SDK.Storage.persist("username", data.username);
                SDK.Storage.persist("userType", data.type);

                cb(null, data);
            });
        },


        current: () => {
            return {

               userId: SDK.Storage.load("userId"),
               username: SDK.Storage.load("username"),
               type: SDK.Storage.load("userType")

        }

        },
        logOut: () => {
            SDK.Storage.remove("userId");
            SDK.Storage.remove("username");
            SDK.Storage.remove("userType");
            window.location.href = "index.html";
        },
        login: (username, password, cb) => {
            SDK.request({
                data: {
                    username: username,
                    password: password
                },
                url: "/user/login/",
                method: "POST"
            }, (err, data) => {

                //On login-error
                if (err) return cb(err);

                data = JSON.parse(data);
                SDK.Storage.persist("userId", data.userId);
                SDK.Storage.persist("username", data.username);
                SDK.Storage.persist("userType", data.type);

                cb(null, data);

            });
        },
        loadNav: (cb) => {
            $("#nav-container").load("nav.html", () => {
                const currentUser = SDK.User.current();
                if (currentUser.type === 2) {
                    $(".navbar-right").html(`
            <li><a href="createQuiz.html" >Create quiz</a></li>
            <li><a href="users.html" >Slet bruger</a></li>
            <li><a href="adminUser.html">Opret Admin</a></li>
            <li><a href="index.html" id="logout-link">Logout</a></li>

          `);
                } else {
                    $(".navbar-right").html(`
            <li><a href="login.html">Logout <span class="sr-only">(current)</span></a></li>
          `);
                }
                $("#logout-link").click(() => SDK.User.logOut());
                cb && cb();
            });
        }
    },

    Storage: {
        prefix: "Quiz",
        persist: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: (key) => {
            const val = window.localStorage.getItem(SDK.Storage.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        remove: (key) => {
            window.localStorage.removeItem(SDK.Storage.prefix + key);
        }

    },

    /**
     * Lavet med udgangspunkt i denne.
     * https://stackoverflow.com/questions/33137525/redirect-user-if-not-logged-in-in-html-with-jquery
     */
    restrictAccess: () => {
        let user = SDK.Storage.load("username");

        if (user == null ) {
            try {
                //stop most browsers loading
                window.stop();
            }
            catch (e) {
                //IE stop loading content
                document.execCommand('Stop');
            }
            document.location.replace("login.html");
        }

},



};
