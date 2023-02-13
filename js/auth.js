function selectUserType(id, event) {
  for (const element of users) {
    let items = [...document.getElementsByClassName(element)];
    items.forEach((item) => {
      item.classList.remove("clicked");
      item.style.boxShadow = boxShadow;
      item.style.transition = boxShadowTransition;
    });
  }
  $("#" + id).addClass("clicked");
  $("#" + id).css("boxShadow", "0 0px 0px 0");

  userType = id.toLowerCase().slice(6);
  event.preventDefault();
}

// $("#forgotPasswordLink").

$("#signUpAdmin").click(function () {
  $("#signup-sec-center").hide();
  $("#signupfullnamediv").hide();
  $("#signupusernamediv").hide();
});
$("#signUpTeacher").click(function () {
  $("#signup-sec-center").show();
  $("#signupfullnamediv").show();
  $("#signupusernamediv").show();
});
$("#signUpStudent").click(function () {
  $("#signupfullnamediv").hide();
  $("#signup-sec-center").show();
  $("#signupusernamediv").show();
});

function switchForm(form) {
  $("#signInWrapper").toggleClass("is-active");
  $("#signUpWrapper").toggleClass("is-active");
  if (form == "signin") {
    $("#signUpButton").css("opacity", "0");
    $("#signInButton").css("opacity", "1");
  } else {
    $("#signUpButton").css("opacity", "1");
    $("#signInButton").css("opacity", "0");
  }
}

function dropDownClicked(event) {
  $("#for-dropdown").toggleClass("open");
  if (
    $(".for-dropdown").hasClass("open") ||
    document.querySelector('label[for="dropdown"]').textContent != "School"
  ) {
    $("#for-dropdown").css("boxShadow", "0 0px 0px 0");
  } else {
    $("#for-dropdown").css("boxShadow", boxShadow);
  }
  if (document.getElementById("for-dropdown").classList.contains("open")) {
    $("#schoolDropDown").css("display", "block");
  } else {
    $("#schoolDropDown").css("display", "none");
  }
}
async function register() {
  var response = "";
  let jsonData = {};
  if (userType == "student") {
    jsonData = {
      email: $("#signup-email").val(),
      password: $("#signup-password").val(),
      username: $("#signup-username").val(),
      modules: "",
      school_name: document.querySelector('label[for="dropdown"]').textContent,
    };
  }
  if (userType == "teacher") {
    jsonData = {
      email: $("#signup-email").val(),
      password: $("#signup-password").val(),
      username: $("#signup-username").val(),
      full_name: $("#signup-fullname").val(),
      modules: "",
      school_name: document.querySelector('label[for="dropdown"]').textContent,
    };
  }
  if (userType == "admin") {
    jsonData = {
      email: $("#signup-email").val(),
      password: $("#signup-password").val(),
    };
  }
  if (userType == "student") {
    if (jsonData.username == "" || jsonData.school_name == "School") {
      alert("All fields are required!");
      return;
    }
  }

  if (jsonData.password == "" || jsonData.email == "") {
    alert("All fields are required!");
    return;
  }
  if (jsonData.password != $("#signup-password-confirm").val()) {
    alert("Password and confirm password must be the same!");
    return;
  }

  try {
    const result = await fetch(routes[userType + "register"], {
      method: "POST",
      body: JSON.stringify(jsonData),
    }).then((response) => response.json());
    console.log(result);
    if (result.message == "user added") {
      alert("User added successfully!");
      return;
    }
    return alert("Unable to register");
  } catch (e) {
    console.log(e);
    alert("Error. Unable to register.");
  }
}

async function getSchools() {
  console.log("Welcome, reached get schools!");
  try {
    const result = await fetch(
      "https://3ao9jhcio6.execute-api.us-east-1.amazonaws.com/api/schools",
      {
        method: "GET",
      }
    ).then((response) => response.json());
    let html = "";
    console.log(result);
    for (const element of result.Items) {
      html +=
        "<a href='#' onclick=\"selectSchool('" +
        element.school_name +
        "')\">" +
        element.school_name +
        "<i class='uil uil-arrow-right'></i></a>";
    }
    document.getElementById("schoolDropDown").innerHTML = html;
  } catch (e) {
    console.log(e);
    alert("Error. Unable to get schools.");
  }
}

function selectSchool(school_name) {
  if (document.getElementById("for-dropdown").classList.contains("open")) {
    document.querySelector('label[for="dropdown"]').textContent = school_name;
  }
}

async function auth() {
  let response = "";

  let jsonData = {
    email: document.getElementById("login-email").value,
    password: document.getElementById("login-password").value,
  };

  if (jsonData.email == "" || jsonData.password == "" || userType == "") {
    return alert("All fields are required!");
  }

  console.log(jsonData);

  try {
    const result = await fetch(routes[userType + "login"], {
      method: "POST",
      body: JSON.stringify(jsonData),
    }).then((response) => response.json());
    console.log(result.token);
    if (result.token) {
      response = await decodeToken(result.token);
      for (let key in response) {
        if (response.hasOwnProperty(key)) {
          sessionStorage.setItem(key, response[key]);
        }
      }
      sessionStorage.setItem("token", result.token);
      window.location.replace("./" + userType + "_page.html");
    }
    if (result.message) {
      console.log(result.message);
      alert("Wrong credentials provided.");
    }
  } catch (e) {
    console.log(e);
    alert("Error. Unable to login.");
  }
}
