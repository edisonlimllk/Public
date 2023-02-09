let currentThing = "school";

function fields() {
  currentThing = "field";
  $("#title").text("Manage Fields");
  $("#animation").removeClass("start-home");
  $("#animation").removeClass("start-blog");
  $("#animation").addClass("start-about");
  $("#addPlaceholder").attr("placeholder", "Field Name...");
  $("#tablelabel").text("Field Name");
  $("#school_table")
    .children()
    .each(function () {
      for (let i = this.children.length - 1; i >= 1; i--) {
        this.children[i].parentNode.removeChild(this.children[i]);
      }
    });
  listFields();
}

function schools() {
  currentThing = "school";
  $("#title").text("Manage Schools");
  $("#animation").removeClass("start-about");
  $("#animation").removeClass("start-blog");
  $("#animation").addClass("start-home");
  $("#addPlaceholder").attr("placeholder", "School Name...");
  $("#tablelabel").text("School Name");
  $("#school_table")
    .children()
    .each(function () {
      for (let i = this.children.length - 1; i >= 1; i--) {
        this.children[i].parentNode.removeChild(this.children[i]);
      }
    });
  listSchools();
}

async function addThing() {
  console.log(currentThing);
  let jsonData = {
    school_name: $("#addPlaceholder").val(),
    field_name: $("#addPlaceholder").val(),
  };
  if ($("#addPlaceholder") == "") {
    alert(currentThing + " name required!");
    return;
  }

  try {
    const result = await fetch(routes["baseurl"] + currentThing, {
      method: "POST",
      body: JSON.stringify(jsonData),
    }).then((response) => response.json());
    if (result.message == "school added") {
      return window.location.reload();
    }
    if (result.message == "school already exists!") {
      return alert("school already exists!");
    }
    if (result.message == "field already exists!") {
      return alert("Field already exists!");
    }
    if (result.message == "field added") {
      return window.location.reload();
    }

    return alert("Unable to add");
  } catch (e) {
    console.log(e);
    alert("Error. Unable to add.");
  }
}

async function deleteThing(index) {
  let thingId = "" + currentThing + index;
  console.log(
    $("#" + thingId)
      .text()
      .replace("%20", " ")
  );
  let route_name =
    routes["baseurl"] +
    currentThing +
    "/" +
    $("#" + thingId)
      .text()
      .replace("%20", " ");
  console.log(route_name);
  try {
    const result = await fetch(route_name, {
      method: "DELETE",
      headers: {
        token: sessionStorage.getItem("token"),
      },
    }).then((response) => response.json());
    if (result.message == "field deleted") {
      console.log(result.message);
      return window.location.reload();
    }
    if (result.message == "school deleted") {
      console.log(result.message);
      return window.location.reload();
    }
    console.log(result);
    return alert("Unable to delete");
  } catch (e) {
    console.log(e);
    alert("Error. Unable to delete.");
  }
}

function logout() {
  $("#title").text("Logging out...");
  $("#animation").removeClass("start-about");
  $("#animation").addClass("start-blog");
  $("#animation").removeClass("start-home");
  sessionStorage.clear();
  window.location.replace("./index.html");
}

$("#addSchoolButton").on("click", () => {
  $("#addSchoolButton").toggleClass("pressed");
  if ($("#addSchoolButton").hasClass("pressed")) {
    $("#addSchoolButton").css(
      "boxShadow",
      "0 0px 0px #ffffffa0, 0 0 0 9px #ffffffeb"
    );
  } else {
    $("#addSchoolButton").css(
      "boxShadow",
      "0 8px 8px #114ec9a0, 0 0 0 9px #ffffffeb"
    );
  }
});
async function listFields() {
  const fields = await getAllFields().then((result) => result);
  console.log(fields.Items);
  let html = "";
  let animation = 0;
  for (let i = 1; i < fields.Items.length; i++) {
    animation += 0.1;
    html +=
      "<tr class='restaurant-content' style='animation-delay: " +
      animation +
      "s;'>" +
      "<td>" +
      i +
      "</td>" +
      "<td id='field" +
      i +
      "'>" +
      fields.Items[i].field_name +
      "</td>" +
      "<td>" +
      "<div onclick='deleteThing(" +
      i +
      ");' id='app-cover'>" +
      "<input type='checkbox' id='checkbox'>" +
      "<div id='bin-icon'>" +
      "<div id='lid'></div>" +
      "<div id='box'>" +
      "<div id='box-inner'>" +
      "<div id='bin-lines'></div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "<div id='layer'></div>" +
      "</div>" +
      "</td>" +
      "</tr>";
  }
  $("#school_table").append(html);
}

async function listSchools() {
  const schools = await getAllSchools().then((result) => result);
  let html = "";
  let animation = 0;
  for (let i = 1; i < schools.Items.length; i++) {
    animation += 0.1;
    html +=
      "<tr class='restaurant-content' style='animation-delay: " +
      animation +
      "s;'>" +
      "<td>" +
      i +
      "</td>" +
      "<td id='school" +
      i +
      "'>" +
      schools.Items[i].school_name +
      "</td>" +
      "<td>" +
      "<div onclick='deleteThing(" +
      i +
      ");' id='app-cover'>" +
      "<input type='checkbox' id='checkbox'>" +
      "<div id='bin-icon'>" +
      "<div id='lid'></div>" +
      "<div id='box'>" +
      "<div id='box-inner'>" +
      "<div id='bin-lines'></div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "<div id='layer'></div>" +
      "</div>" +
      "</td>" +
      "</tr>";
  }
  $("#school_table").append(html);
}
