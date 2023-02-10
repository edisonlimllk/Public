var moduleList = [];
var token = sessionStorage.getItem("token");
var student;

async function displayModules(role) {
  getUser(token);
  try {
    const result = await fetch(routes["baseurl"] + "modules", {
      method: "GET",
    }).then((response) => response.json());
    let html = "";
    let buttonhtml = "";
    for (const i in result) {
      if (role == "teacher") {
        buttonhtml = "";
      }
      else if (
        result[i].students &&
        result[i].students.includes(sessionStorage.getItem("email"))
      ) {
        buttonhtml =
          "<button disabled type='button' class='btn btn-primary' onclick='enrol(" +
          i +
          ")'>Enrolled</button>";
      } else {
        buttonhtml =
          "<button type='button' class='btn btn-primary' onclick='enrol(" +
          i +
          ")'>Enrol</button>";
      }
      moduleList = result;
      html +=
        "<div class='col'>" +
        "<div class='card'>" +
        "<div class='card-header'>" +
        result[i].school +
        "</div>" +
        "<img src='./images/brightauthimage.png' style='width:100%;height:180px;object-fit:cover' class='card-img-top' alt='...'></img>"+
        "<div class='card-body'>" +
        "<h5 class='card-title'>" +
        result[i].module_name +
        "</h5>" +
        "<p class='card-text'>" +
        result[i].field +
        "</p>";
      html += buttonhtml;
      html += "</div>" + "</div>"+"</div>";
      document.getElementById("modules").innerHTML = html;
    }
    return console.log(result);
  } catch (e) {
    console.log(e);
  }
}

async function enrol(i) {
  console.log(moduleList[i]);
  try {
    await addStudentToModule(i);
    try {
      await addModuleToStudent(i);
      assessments = await getAssessmentsByModule(moduleList[i].id).then(
        (response) => response
      );
      console.log(assessments);
      for (const assessment of assessments) {
        try {
          await startStepFunction(assessment);
        } catch (error) {
          return console.log(error);
        }
      }
    } catch (error) {
      return console.log(error);
    }
  } catch (error) {
    return console.log(error);
  }
  window.location.reload();
}

async function addStudentToModule(i) {
  //   console.log(moduleList[i]);
  let jsonData = moduleList[i];
  let students = jsonData.students;
  let studentEmail = sessionStorage.getItem("email");
  if (students.includes(studentEmail)) {
    return alert("You are already enrolled here.");
  }
  jsonData.students = jsonData.students + "," + studentEmail;
  try {
    const result = await fetch(
      routes["baseurl"] + "module/" + moduleList[i].id,
      {
        method: "PUT",
        body: JSON.stringify(jsonData),
        headers: {
          token: token,
        },
      }
    ).then((response) => response.json());

    return console.log(result);
  } catch (e) {
    console.log(e);
    alert("Error. Unable to add student to module.");
  }
}

async function addModuleToStudent(i) {
  modules = sessionStorage.getItem("modules");
  console.log(modules);
  if (modules.includes(moduleList[i].id)) {
    return alert("You are already enrolled here.");
  } else {
    modules += "," + moduleList[i].id;
  }
  let jsonData = {
    password: sessionStorage.getItem("password"),
    username: sessionStorage.getItem("username"),
    school_name: sessionStorage.getItem("school_name"),
    modules: modules,
  };
  try {
    const result = await fetch(routes["baseurl"] + "student", {
      method: "PUT",
      body: JSON.stringify(jsonData),
      headers: {
        token: token,
      },
    }).then((response) => response.json());

    return console.log(result);
  } catch (e) {
    console.log(e);
    alert("Error. Unable to add module to student.");
  }
}

async function startStepFunction(assessment) {
  date = new Date(assessment.deadline);
  let jsonData = {
    email: sessionStorage.getItem("email"),
    date: date,
    assignmentName: assessment.assessment_name,
    weightage: assessment.weightage,
  };
  try {
    const result = await fetch(routes["baseurl"] + "initstepfunction", {
      method: "POST",
      body: JSON.stringify(jsonData),
    }).then((response) => response.json());
    return console.log(result);
  } catch (e) {
    console.log(e);
    alert("Error. Unable to start step function.");
  }
}
