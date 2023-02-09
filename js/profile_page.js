async function loadProfileData(edit) {
  try {
    const result = await fetch(routes["baseurl"] + "user", {
      method: "GET",
      headers: {
        token: sessionStorage.getItem("token"),
      },
    }).then((response) => response.json());
    console.log(result.Items[0]);
    getProfilePicture(result.Items[0].email);
    for (let key in result.Items[0]) {
      if (result.Items[0].hasOwnProperty(key)) {
        sessionStorage.setItem(key, result.Items[0][key]);
      }
    }
    if (edit == 'edit') {
      displayEditData()
    }
    else{
      displayData();
    }
  } catch (e) {
    console.log(e);
    alert("Error. Unable to login.");
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
        $("#output").attr("src", "data:image/jpeg;base64,"+picture);
      }
      else{
        alert(result);
      }
    } catch (e) {
      console.log(e);
      alert("Error. Unable to get picture.");
    }
  }
  
}

function displayData() {
  $("#fullName1").text(sessionStorage.getItem("full_name"))
  $("#userType").text(sessionStorage.getItem("role"))
  $("#fullName2").text(sessionStorage.getItem("full_name"))
  $("#username").text(sessionStorage.getItem("username"))
  $("#email").text(sessionStorage.getItem("email"))
  $("#school_name").text(sessionStorage.getItem("school_name"))
}
function displayEditData() {
  document.querySelector('label[for="dropdown"]').textContent = sessionStorage.getItem("school_name");
  $("#fullName1").text(sessionStorage.getItem("full_name"))
  $("#userType").text(sessionStorage.getItem("role"))
  $("#fullName2").attr('placeholder', sessionStorage.getItem("full_name"))
  $("#username").attr('placeholder', sessionStorage.getItem("username"))
  $("#email").attr('placeholder', sessionStorage.getItem("email"))
}
