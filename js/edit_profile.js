let base64String = "";

function openChangePassword() {
  $("#passwordChange").toggle();
  if ($("#toggleChangePasswordButton").text() != "Cancel Password Change") {
    $("#toggleChangePasswordButton").text("Cancel Password Change");
  } else {
    $("#toggleChangePasswordButton").text("Change Password");
  }
}

function changeProfilePicture(event) {
  console.log("clicked");
  let image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
  const reader = new FileReader();

  reader.onload = function () {
    base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

    imageBase64Stringsep = base64String;
  };
  if (event.target.files[0]) {
    reader.readAsDataURL(event.target.files[0]);
  }
}

async function changePassword(){
  if($("#changeNewPasswordInput").val() == ""||$("#changePasswordInput").val() == ""){
    return alert("Change passwords field cannot be empty!");
  }
  if ($("#changeNewPasswordInput").val() != $("#changePasswordInput").val()) {
    return alert("New password and confirm new password must be the same!");
  }
  const jsonData = {
    username: sessionStorage.getItem("username"),
    full_name: sessionStorage.getItem("full_name"),
    password: $("#changeNewPasswordInput").val(),
    school_name: sessionStorage.getItem("school_name"),
    modules: sessionStorage.getItem("modules"),
  };
  // changing password
  try {
    const result = await fetch(
      routes["baseurl"] + sessionStorage.getItem("role"),
      {
        method: "PUT",
        headers: {
          token: sessionStorage.getItem("token"),
        },
        body: JSON.stringify(jsonData),
      }
    ).then((response) => response.json());
    if (result) {
      console.log(result);
    }
    return alert("Unable to change password");
  } catch (e) {
    console.log(e);
    alert("Error. Unable to change password.");
  }
  
}

async function updateProfile() {
  let username,
    full_name,
    school_name = "";

  if ($("#fullName2").val() == "") {
    full_name = sessionStorage.getItem("full_name");
  } else {
    full_name = $("#fullName2").val();
  }

  if ($("#username").val() == "") {
    username = sessionStorage.getItem("username");
  } else {
    username = $("#username").val();
  }

  if (document.querySelector('label[for="dropdown"]').textContent == "") {
    school_name = sessionStorage.getItem("school_name");
  } else {
    school_name = document.querySelector('label[for="dropdown"]').textContent;
  }

  const jsonData = {
    username: username,
    full_name: full_name,
    password: sessionStorage.getItem("password"),
    school_name: school_name,
    modules: sessionStorage.getItem("modules"),
  };

  console.log(jsonData);


  updateProfilePicture();
  console.log(sessionStorage.getItem("token"));
  // changing profile details
  try {
    const result = await fetch(
      routes["baseurl"] + sessionStorage.getItem("role"),
      {
        method: "PUT",
        headers: {
          token: sessionStorage.getItem("token"),
        },
        body: JSON.stringify(jsonData),
      }
    ).then((response) => response.json());
    if (result) {
      console.log(result);
    }
    return alert("Unable to set profile details");
  } catch (e) {
    console.log(e);
    alert("Error. Unable to update profile.");
  }
  
}

async function updateProfilePicture() {
  //changing profile picture
  if (base64String) {
    let pictureJsonData = {
      picture: base64String,
    };
    try {
      const result = await fetch(routes["baseurl"] + "profilepicture", {
        method: "POST",
        headers: {
          token: sessionStorage.getItem("token"),
        },
        body: JSON.stringify(pictureJsonData),
      }).then((response) => response.json());
      if (result.message == "Successfully set profile picture") {
        return alert("Successfully set profile picture");
      }
      return alert("Unable to get picture.");
    } catch (e) {
      console.log(e);
      alert("Error. Unable to get picture.");
    }
  }
}
