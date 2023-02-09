async function resetPassword() {
  let token = "";
  const url = new URL(window.location.toLocaleString()).searchParams;
  token = url.get("token");
  let jsonData = {
    newpassword: $("#newpassword").val(),
    user: userType + "s",
  };

  if (jsonData.newpassword != $("#confirmpassword").val()) {
    alert("Password and confirm password must be the same!");
    return;
  }
  if (jsonData.user == "s") {
    alert("Select a user type");
    return;
  }
  console.log(token);

    try {
      const result = await fetch(routes["baseurl"] + "resetpassword/" + token, {
        method: "PUT",
        body: JSON.stringify(jsonData),
      }).then((response) => response.json());
      if (result.message == "password changed") {
        return alert("Password changed successfully!");
      }
      if (result.message == "We cannot find a user with this email account and this user type! Check that the user type and email fields have been inputted correctly") {
        return alert("We cannot find a user with this email account and this user type! Check that the user type and email fields have been inputted correctly");
      }
      return alert("Unable to reset password");
    } catch (e) {
      console.log(e);
      alert("Error. Unable to reset password.");
    }
}

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
