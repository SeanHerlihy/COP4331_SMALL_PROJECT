const urlBase = 'http://superawesomecontactmanager3000.com/signUp.html';
const extension = 'php';

function createAccount()
{
	userId = 0;
	document.getElementById("CreateError").innerHTML = "";

	var login = document.getElementById("CreateLogin").value;
	var pass = document.getElementById("CreatePass").value;
	var fName = document.getElementById("FirstName").value;
	var lName = document.getElementById("LastName").value;
	var confirmPass = document.getElementById("CreateConfirmPass").value;

	if(login == "")
	{
		document.getElementById("CreateError").innerHTML = "Please enter a user name.";
		return;
	}
	else
	{
		/*
		test if email is valid if we wanna bother
		if(!valid)
		{
			document.getElementById("createError").innerHTML = "Please enter a valid email.";
			return;
		}
		*/
	}

	if(pass != confirmPass)
	{
		document.getElementById("CreateError").innerHTML = "Passwords do not match.";
		return;
	}

	var jsonPayload = JSON.stringify({FirstName:fName,LastName:lName,Login:login,Password:pass});
	var url = urlBase + 'LAMPAPI/CreateAccount.' + extension;

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
				let jsonObject = JSON.parse( xhr.responseText );

				// this if statement could be could be wrong but I think its functional
				if(jsonObject.error.length > 0)
				{
					document.getElementById("CreateError").innerHTML = jsonObject.error;
					return;
				}

				document.getElementById("CreateError").innerHTML = "Account created successfully!";

				// force login after account creation can be removed if needed
				login(login, pass);
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("CreateError").innerHTML = err.message;
	}
}

function login(login, pass)
{
	if(login == null || pass == null)
	{
		login = document.getElementById("LoginUserName").value;
		pass = document.getElementById("LoginPass").value;
	}
}
