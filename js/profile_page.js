if (sessionStorage.getItem('role') == 'student') {
  $("#fullNameField").css('display', 'none');
  $("#exploreModulesNavItem").attr('href', './student_page.html');
}
if (sessionStorage.getItem('role') == 'teacher') {
  $("#exploreModulesNavItem").attr('href', './teacher_page.html');
}

async function loadProfileData(edit) {
  if (sessionStorage.getItem("role")=="student") {
    $("#fullName1").text(sessionStorage.getItem("username"))
  }else{
    $("#fullName1").text(sessionStorage.getItem("full_name"))
  }
  try {
    const result = await fetch(routes["baseurl"] + "user", {
      method: "GET",
      headers: {
        token: sessionStorage.getItem("token"),
      },
    }).then((response) => response.json());
    console.log(result.Items[0]);
    if (sessionStorage.getItem('role') == 'teacher') {
    getProfilePicture(result.Items[0].email);
    }
    for (let key in result.Items[0]) {
      if (result.Items[0].hasOwnProperty(key)) {
        sessionStorage.setItem(key, result.Items[0][key]);
      }
    }
    if (edit == 'edit') {
      return displayEditData()
    }
    else{
      return displayData();
    }
  } catch (e) {
    return console.log(e);
     
  }
}

let picture = "";

async function getProfilePicture(email) {
  if(sessionStorage.getItem("profile_picture")!="") {
    try {
      const result = await fetch(routes["baseurl"] + "profilepicture/" + email, {
        method: "GET",
      }).then((response) => response.json());
      if (result.body){
        picture = result.body;
        return $("#output").attr("src", "data:image/jpeg;base64,"+picture);
      }
      else{
        return console.log(result);
      }
    } catch (e) {
      console.log(e);
      return console.log("Error. Unable to get picture.");
    }
  }
  
}

function displayData() {
  $("#userType").text(sessionStorage.getItem("role"))
  $("#fullName2").text(sessionStorage.getItem("full_name"))
  $("#username").text(sessionStorage.getItem("username"))
  $("#email").text(sessionStorage.getItem("email"))
  $("#school_name").text(sessionStorage.getItem("school_name"))
}
function displayEditData() {
  document.querySelector('label[for="dropdown"]').textContent = sessionStorage.getItem("school_name");
  $("#userType").text(sessionStorage.getItem("role"))
  $("#fullName2").attr('placeholder', sessionStorage.getItem("full_name"))
  $("#username").attr('placeholder', sessionStorage.getItem("username"))
  $("#email").attr('placeholder', sessionStorage.getItem("email"))
}

