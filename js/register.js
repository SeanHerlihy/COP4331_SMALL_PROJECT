const urlBase = 'http://superawesomecontactmanager3000.com/';
const extension = 'php';

function doRegister()
{
	document.getElementById("CreateError").innerHTML = "";

	var login = document.getElementById("CreateLogin").value;
	var pass = document.getElementById("CreatePass").value;
	var fName = document.getElementById("FirstName").value;
	var lName = document.getElementById("LastName").value;
	var confirmPass = document.getElementById("CreateConfirmPass").value;

	if(fName == "")
	{
		document.getElementById("CreateError").innerHTML = "* Please enter a first name.";
		return;
	}

	if(lName == "")
	{
		document.getElementById("CreateError").innerHTML = "* Please enter a last name.";
		return;
	}
	if(login == "")
	{
		document.getElementById("CreateError").innerHTML = "* Please enter a user name.";
		return;
	}

	if(pass == "")
	{
		document.getElementById("CreateError").innerHTML = "* Please enter a password.";
		return;
	}

	if(pass != confirmPass)
	{
		document.getElementById("CreateError").innerHTML = "* Passwords do not match.";
		return;
	}

	var jsonPayload = JSON.stringify({FirstName:fName,LastName:lName,Login:login,Password:pass});
	var url = urlBase + 'LAMPAPI/RegisterUser.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.send(jsonPayload);

		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse(xhr.responseText);

				if(jsonObject.error.length > 0)
				{
					document.getElementById("CreateError").innerHTML = jsonObject.error;
					return;
				}

				document.getElementById("CreateError").innerHTML = "Account created successfully!";
				window.location.href = "index.html";
			}
		};
		xhr.send(jsonPayload);

	}
	catch(err)
	{
		document.getElementById("CreateError").innerHTML = err.message;
	}
}
