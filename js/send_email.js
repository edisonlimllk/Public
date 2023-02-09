async function sendEmail(){

    let jsonData = {
        email: $("#email").val()
    }

    if (jsonData.email =="") {
        alert("Please provide a valid email address")
    }

    try {
        const result = await fetch(routes["baseurl"]+"forgotpassword", {
          method: "POST",
          body: JSON.stringify(jsonData),
        }).then((response) => response.json());
        console.log(result);
        if (result.message == "Bad Request") {
            return alert("Please provide a valid email address")
        }
        if (result.message == "email sent") {
            return alert("Email sent!")
        }
        return alert("Unable to send email");
      } catch (e) {
        console.log(e);
        alert("Error. Unable to send email.");
      }
}