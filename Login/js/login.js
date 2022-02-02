const urlBase = 'http://www.superawesomecontactmanager3000.com/LAMPAPI';
const extension = 'php';

let userId = 0;
let fName = "";
let lName = "";

function doLogin()
{
	userId = 0;
	fName = "";
	lName = "";

	let login = document.getElementById("UserName").value;
	let password = document.getElementById("Password").value;
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {Login:login,Password:password};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.ID;

				if( userId < 1 )
				{
					document.getElementById("loginResult").innerHTML = "Username & password combination is incorrect.";
					return;
				}

				fName = jsonObject.FirstName;
				lName = jsonObject.LastName;

				saveCookie();

				window.location.href = "ContactManager.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "FirstName=" + fName + ",LastName=" + lName + ",UserID=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++)
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "FirstName" )
		{
			ftName = tokens[1];
		}
		else if( tokens[0] == "LastName" )
		{
			lName = tokens[1];
		}
		else if( tokens[0] == "UserId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}

	if( userId <= 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("UserName").innerHTML = "Logged in as " + fName + " " + lName;
	}
}
