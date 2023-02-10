async function initForm() {
  schools = await getAllSchools().then((response) => response);
  let html = "";
  console.log(schools);
  for (const element of schools.Items) {
    html +=
      "<li><a onclick=\"selectSchool('" +
      element.school_name +
      "')\">" +
      element.school_name +
      "</a></li>";
  }
  document.getElementById("schoolList").innerHTML = html;
  fields = await getAllFields().then((response) => response);
  html = "";
  console.log(fields);
  for (const element of fields.Items) {
    html +=
      "<li><a onclick=\"selectField('" +
      element.field_name +
      "')\">" +
      element.field_name +
      "</a></li>";
  }
  document.getElementById("fieldList").innerHTML = html;
}

function selectSchool(school_name) {
  document.getElementById("schoolname").textContent = school_name;
}
function selectField(field_name) {
  document.getElementById("fieldname").textContent = field_name;
}

async function createModule() {
  if (
    $("#moduleName").val() == "" ||
    $("#creditsGiven").val() == "" ||
    $("#schoolname").text() == "" ||
    $("#fieldname").text() == ""
  ) {
    alert("All fields are required!");
    return;
  }
  let jsonData = {
    module_name: $("#moduleName").val(),
    credits_given: $("#creditsGiven").val(),
    info: $("#exampleFormControlTextarea1").val(),
    school: $("#schoolname").text(),
    field: $("#fieldname").text(),
  };
  console.log(jsonData);
  console.log("Welcome, reached create module!");
  try {
    const result = await fetch(routes["baseurl"] + "module", {
      method: "POST",
      headers: {
        token: sessionStorage.getItem("token"),
      },
      body: JSON.stringify(jsonData),
    }).then((response) => response.json());
    console.log(result);
    if (result.insertId) {
      jsonData = {
        password: sessionStorage.getItem("password"),
        username:  sessionStorage.getItem("username"),
        school_name:  sessionStorage.getItem("school_name"),
        modules:  sessionStorage.getItem("modules")+","+result.insertId,
        full_name:  sessionStorage.getItem("full_name"),
      };
      try {
        const result = await fetch(routes["baseurl"] + "teacher", {
          method: "PUT",
          headers:{
            token: sessionStorage.getItem('token'),
          },
          body: JSON.stringify(jsonData)
        }).then((response) => response.json());
        return console.log(result);
        return window.location.replace('./your_modules_page.html');
      } catch (e) {
        console.log(e);
        return alert("Error. Unable to update teacher.");
      }
    }
    return result;
  } catch (e) {
    return console.log(e);
  }
}
