const urlBase = 'http://superawesomecontactmanager3000.com/';
const extension = 'php';

function signIn()
{
	var userName = document.getElementById("UserName").value;
	var pass = document.getElementById("Password").value;
	
	if (userName == "")
	{
		document.getElementById("CreateError").innerHTML = "Please enter a user name.";
			return;
	}
	
	var jsonPayload = JSON.stringify(email:userName, password:pass);

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

				document.getElementById("CreateError").innerHTML = "Login Successful";

			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("CreateError").innerHTML = err.message;
	}
}