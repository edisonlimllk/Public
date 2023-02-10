var moduleList;
async function yourModules() {
  console.log("Welcome, reached get your modules!");
  try {
    const result = await fetch(
      routes["baseurl"] + "modules/email/" + sessionStorage.getItem("email"),
      {
        method: "GET",
      }
    ).then((response) => response.json());
    let html = "";
    console.log(result);
    moduleList = result;
    for (const i in result) {
      html +=
        "<div class='col'>" +
        "<div class='card'>" +
        "<h5 class='card-header'>" +
        result[i].school +
        " - " +
        result[i].field +
        "</h5>" +
        " <div class='card-body'>" +
        "<h5 class='card-title'>" +
        result[i].module_name +
        "</h5>" +
        "<p class='card-text'>" +
        result[i].credits_given +
        " credits" +
        "</p>" +
        "<a onclick='viewDetails(" +
        i +
        ")' class='btn btn-primary'>" +
        "View Details" +
        " </a>" +
        "   </div>" +
        "   </div>" +
        "   </div>";
    }
    document.getElementById("modulesGrid").innerHTML = html;
    $("#placeholder").css("display", "none");
  } catch (e) {
    console.log(e);
    alert("Error. Unable to get your modules.");
  }
}

async function viewDetails(i) {
  let info = "Information on this module is currently not available.";
  let assessmentshtml = "";
  if (moduleList[i].info) {
    info = moduleList[i].info;
  }
  assessments = await getAssessmentsByModule(moduleList[i].id).then((response) => response);
  for (const i in assessments) {
    
    console.log(assessments[i]);
    assessmentshtml+="<li class='nav-item'>" +
    "  <a class='nav-link ' style='color: black;' tabindex='-1'>"+assessments[i].assessment_name+"</a>" +
    " </li>";
  }
  html =
    "<div class='card text' style='margin-left: 2%;margin-right: 2%;'>" +
    "<div class='card-header'>" +
    "<ul class='nav nav-tabs card-header-tabs'>" +
    "<li class='nav-item'>" +
    " <a class='nav-link active' aria-current='true' href='#'>Module Info</a>" +
    " </li>" + assessmentshtml+
    "</ul>" +
    " </div>" +
    "<div class='card-body'>" +
    " <h1 class='card-title text-center' style='margin-bottom: 3%;'>" +
    moduleList[i].module_name +
    "</h1>" +
    " <h4 class='card-text-start'style='margin-bottom: 2%;margin-left:1%;'>Credits Given: " +
    moduleList[i].credits_given +
    "</h4>" +
    " <h4 class='card-text-start'style='margin-bottom: 2%;margin-left:1%;'>Module Info: " +
    info +
    "</h4>" +
    "<h4 class='card-text-start'style='margin-bottom: 2%;margin-left:1%;'>Lecturer: " +
    moduleList[i].teacher +
    "</h4>" +
    "<h4 class='card-text-start'style='margin-bottom: 2%;margin-left:1%;'>School: " +
    moduleList[i].school +
    "</h4>" +
    "<h4 class='card-text-start'style='margin-bottom: 2%;margin-left:1%;'>Field: " +
    moduleList[i].field +
    "</h4>" +
    "<h5 class='card-text-end'style='margin-bottom: 1%;margin-left:80%;color:grey'>Students Enrolled: " +
    moduleList[i].students.split(',').length 
    "</h5>" +
    "</div>" +
    " </div>";
  $("#modulesGrid").css("display", "none");
  document.getElementById("viewDetails").innerHTML = html;
}
