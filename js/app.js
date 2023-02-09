const users = ["student", "admin", "teacher"];
const boxShadow = "0 4px 8px 0 rgb(0 0 0 / 9%), 0 6px 15px 0 rgb(0 0 0 / 9%)";
const boxShadowTransition = "box-shadow ease 0.5s";

let userType = "";
let routes = {
  studentlogin:
    "https://3ao9jhcio6.execute-api.us-east-1.amazonaws.com/api/authstudent",
  teacherlogin:
    "https://3ao9jhcio6.execute-api.us-east-1.amazonaws.com/api/authteacher",
  adminlogin:
    "https://3ao9jhcio6.execute-api.us-east-1.amazonaws.com/api/authadmin",
  studentregister:
    "https://3ao9jhcio6.execute-api.us-east-1.amazonaws.com/api/student",
  teacherregister:
    "https://3ao9jhcio6.execute-api.us-east-1.amazonaws.com/api/teacher",
  adminregister:
    "https://3ao9jhcio6.execute-api.us-east-1.amazonaws.com/api/admin",
  baseurl: "https://3ao9jhcio6.execute-api.us-east-1.amazonaws.com/api/"
};

async function getAllSchools() {
  try {
    const result = await fetch(
      "https://3ao9jhcio6.execute-api.us-east-1.amazonaws.com/api/schools",
      {
        method: "GET",
      }
    ).then((response) => response.json());
    return result;
  } catch (e) {
    console.log(e);
    alert("Error. Unable to get schools.");
  }
}

async function getAllFields() {
  console.log("Welcome, reached get all fields!");
  try {
    const result = await fetch(
      "https://3ao9jhcio6.execute-api.us-east-1.amazonaws.com/api/fields",
      {
        method: "GET",
      }
    ).then((response) => response.json());
    return result;
  } catch (e) {
    console.log(e);
    alert("Error. Unable to get fields.");
  }
}

async function decodeToken(token) {
  console.log(token);
  try {
    const result = await fetch(
      "https://3ao9jhcio6.execute-api.us-east-1.amazonaws.com/token",
      {
        method: "GET",
        headers: {
          token: token,
        },
      }
    ).then((response) => response.json());

    return result;
  } catch (e) {
    console.log(e);
    alert("Error. Unable to get token.");
  }
}

async function getUser(token) {
  console.log(sessionStorage.getItem("user"));
  try {
    const result = await fetch(
      "https://3ao9jhcio6.execute-api.us-east-1.amazonaws.com/api/user",
      {
        method: "GET",
        headers: {
          token: token,
        },
      }
    ).then((response) => response.json());
    for (let key in result.Items[0]) {
      if (result.Items[0].hasOwnProperty(key)) {
        sessionStorage.setItem(key, result.Items[0][key]);
      }
    }
    return result;
  } catch (e) {
    console.log(e);
    alert("Error. Unable to get token.");
  }
}

async function getAssessmentsByModule(id){
  try {
    const result = await fetch(
      routes["baseurl"] + "assessments/" + id,
      {
        method: "GET"
      }
    ).then((response) => response.json());
    return result;
  } catch (e) {
    console.log(e);
    alert("Error. Unable to get assessments.");
  }
}