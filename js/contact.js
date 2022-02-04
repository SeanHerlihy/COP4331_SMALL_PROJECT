const urlBase = 'http://superawesomecontactmanager3000.com/';
const extension = 'php';

var userId = 0;

function createClick()
{
	var fName = document.getElementById("FirstName").value;
	var lName = document.getElementById("LastName").value;
	var email = document.getElementById("Email").value;
	var pNumber = document.getElementById("PhoneNumber").value;
	var dob = document.getElementById("Birthday").value;
	
	var args = {FirstName:fName, LastName:lName, Email:email, Phone:pNumber, BirthDay:dob, UserID:userId};
	createContact(args);
}

function createContact(args)
{
	var jsonPayload = JSON.stringify(args);
	var url = urlBase + 'LAMPAPI/addContact.' + extension;
	
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
		
				
				if(jsonObject.contactId < 0 || !jsonObject.hasOwnProperty('contactId')
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

function editContact(args)
{
	var tmp = {contactId:args[0], firstName:args[1], lastName:args[2], address:args[3], email:args[4], phone:args[5]};
	var jsonPayload = JSON.stringify(tmp);
	var url = urlBase + 'LAMPAPI/editContact.' + extension;
	
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
	var tmp = {userId:userId, contactId:contactId};
	var jsonPayload = JSON.stringify(tmp);
	var url = urlBase + 'LAMPAPI/deleteContact.' + extension;
	
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



















