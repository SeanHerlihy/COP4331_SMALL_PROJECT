const urlBase = 'http://superawesomecontactmanager3000.com/';
const extension = 'php';

let userId = 0;
let uFName = "";
let uLName = "";

function login()
{
	readCookie();
	document.getElementById("welcometext").innerHTML = "Welcome, " + uFName + " " + uLName + "!";
}

function createClick()
{
	let fName = document.getElementById("FirstName").value;
	let lName = document.getElementById("LastName").value;
	let email = document.getElementById("Email").value;
	let pNumber = document.getElementById("PhoneNumber").value;
	let dob = document.getElementById("Birthday").value;

	let args = {FirstName:fName, LastName:lName, Email:email, Phone:pNumber, BirthDay:dob, UserID:userId};
	createContact(args);
}

function createContact(args)
{
	let jsonPayload = JSON.stringify(args);
	let url = urlBase + 'LAMPAPI/addContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.send(jsonPayload);

		xhr.onreadystatechange() = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse( xhr.responseText );


				if(jsonObject.contactId < 0 || !jsonObject.hasOwnProperty('contactId'))
				{
					document.getElementById("contactError").innerHTML = "Error creating contact";
					console.log(jsonObject.error);
					return;
				}

				document.getElementById("contactError").innerHTML = "Contact created successfully!";

				return jsonObject.contactId;
			}
		};
	}
	catch(err)
	{
		// ???
	}
}

function editClick()
{
	let ID = document.getElementById("EditID").value;
	let fName = document.getElementById("EditFirstName").value;
	let lName = document.getElementById("EditLastName").value;
	let email = document.getElementById("EditEmail").value;
	let pNumber = document.getElementById("EditPhoneNumber").value;
	let dob = document.getElementById("EditBirthday").value;

	let args = {FirstName:fName, LastName:lName, Email:email, Phone:pNumber, BirthDay:dob, UserID:userId, ID:ID};
	editContact(args);
}

function editContact(args)
{
	let jsonPayload = JSON.stringify(args);
	let url = urlBase + 'LAMPAPI/editContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.send(jsonPayload);

		xhr.onreadystatechange() = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse( xhr.responseText );

				// should work
				if(jsonObject.error.length > 0)
				{
					document.getElementById("contactError").innerHTML = "Error updating contact";
					console.log(jsonObject.error);
					return;
				}

				document.getElementById("contactError").innerHTML = "Contact updated successfully";
				console.log("Contact updated successfully");

				return;
			}
		};
	}
	catch(err)
	{
		// still dont know
	}
}

function deleteContact(contactId)
{
	let tmp = {userId:userId, contactId:contactId};
	let jsonPayload = JSON.stringify(tmp);
	let url = urlBase + 'LAMPAPI/deleteContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.send(jsonPayload);

		xhr.onreadystatechange() = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse( xhr.responseText );

				// should work
				if(jsonObject.error.length > 0)
				{
					document.getElementById("contactError").innerHTML = "Error deleting contact";
					console.log(jsonObject.error);
					return;
				}

				document.getElementById("contactError").innerHTML = "Contact deleted successfully";
				console.log("Contact deleted successfully");

				return;
			}
		};
	}
	catch(err)
	{
		// still dont know
	}
}

function doLogout()
{
	document.cookie = "";
	window.location.href = "index.html";
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(let i = 0; i < splits.length; i++)
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "FirstName" )
		{
			uFName = tokens[1];
		}
		else if( tokens[0] == "LastName" )
		{
			uLName = tokens[1];
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
		document.getElementById("UserName").innerHTML = "Logged in as " + uFName + " " + uLName;
	}
}
