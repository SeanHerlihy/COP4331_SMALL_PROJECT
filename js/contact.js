const urlBase = 'http://superawesomecontactmanager3000.com/';
const extension = 'php';

let userId = 0;
let uFName = "";
let uLName = "";
let dataDic = {};
let offset = 0;
let searchFlag = new Boolean(false);

function login()
{
	readCookie();
	document.getElementById("welcometext").innerHTML = "Welcome, " + uFName + " " + uLName + "!";
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

function htmlGetData()
{
  args = {UserID:userId, Offset:offset};
  temp = getData(args);
  for(let i = 0; i < temp.length; i++)
  {
	dataDic[offset++] = temp[i];
  }
}

function getData(args)
{
  let jsonPayload = JSON.stringify(args);
  let url = urlBase + 'LAMPAPI/LoadContacts.' + extension;

  let temp = [];

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange() = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse( xhr.responseText );

				if(jsonObject.hasOwnProperty('error'))
				{
					document.getElementById("contactError").innerHTML = "Error creating contact";
					console.log(jsonObject.error);
					return;
				}

       			jsonObject = jsonObject.results;

				for(let i=0; i < jsonObject.results.length; i++)
        		{
         			 temp += jsonObject.results[i];
        		}

				return temp;
			}
		};
	}
	catch(err)
	{
		// ???
	}
}

function htmlSearchData()
{
  dataDic = {};
  offset = 0;
  args = {UserID:userId, search:document.getElementById("searchInput").value, Offset:offset};
  temp = searchData(args);
  for(let i = 0; i < temp.length; i++)
  {
      dataDic[offset++] = temp[i];
  }
}

function searchData(args)
{
  let jsonPayload = JSON.stringify(args);
	let url = urlBase + 'LAMPAPI/LoadContacts.' + extension;

  let temp = [];

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

				if(jsonObject.hasOwnProperty('error'))
				{
					document.getElementById("contactError").innerHTML = "Error creating contact";
					console.log(jsonObject.error);
					return;
				}

        		jsonObject = jsonObject.results;

				for(let i=0; i < jsonObject.results.length; i++)
				{
					temp += jsonObject.results[i];
				}

				return temp;
			}
		};
	}
	catch(err)
	{
		// ???
	}
}


function createContact(args)
{
	console.log('MADE iT');
	let jsonPayload = JSON.stringify(args);
	let url = urlBase + 'LAMPAPI/CreateContact.' + extension;

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

		xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log(err);
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

		xhr.onreadystatechange = function()
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

function deleteClick()
{
	let ID = document.getElementById("DeleteID").value;

	let args = {ID:ID, UserID:userId};
	editContact(args);
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

		xhr.onreadystatechange = function()
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


// CODE FOR HTML

function insertEditIcons(isInsertedBool)
{
    if (isInsertedBool == false)
    {
      var nameEditObj = document.getElementById("NameEditDiv");
      var phoneEditObj = document.getElementById("PhoneEditDiv");
      var emailEditObj = document.getElementById("EmailEditDiv");
      var birthEditObj = document.getElementById("BirthEditDiv");
      var cancelSaveDivObj = document.getElementById("CancelSaveButtonDiv");

      nameEditObj.innerHTML ="<button id='NameEditIcon' class='fas fa-pen fa-2x editPenIcon'></button>";
      phoneEditObj.innerHTML =`<button id='PhoneEditIcon' onclick="editInfo('Phone', false)" class='fas fa-pen fa-sm editPenIcon'></button>`;
      emailEditObj.innerHTML =`<button id='EmailEditIcon' onclick="editInfo('Email', false)" class='fas fa-pen fa-sm editPenIcon'></button>`;
      birthEditObj.innerHTML =`<button id='BirthEditIcon' onclick="editInfo('Birth', false)" class='fas fa-pen fa-sm editPenIcon'></button>`;
      cancelSaveDivObj.innerHTML ="<button type='submit' id = 'CancelEditButton' onclick='removeEditIcons();'>Cancel</button> <button type='submit' id = 'SaveEditButton'>Save</button>";

      document.getElementById('EditDeleteHeader').firstChild =  '<button class="clickableAwesomeFont" id="EditButton" title="Edit Contact" alt="edit contact icon" onclick="insertEditIcons(true)"> <i class="far fa-edit fa-3x"></i> </button>'
    }
}

function editInfo(infoType, alreadyClickedBool)
{
  let infoDiv = document.getElementById(`${infoType}Div`);
  let infoText = document.getElementById(`${infoType}InfoText`);
  let editBtn = document.getElementById(`${infoType}EditIcon`);

  let oldInfo =infoText.innerHTML;
  infoText.style.display = "none";

  if (alreadyClickedBool == false)
  {
    infoDiv.innerHTML += `<input type='text' id = 'input${infoType}' placeholder=' Please enter new info'>`;
    document.getElementById(`${infoType}EditDiv`).innerHTML = `<button id='${infoType}EditIcon' onclick="editInfo('${infoType}', true)" class='fas fa-pen fa-sm editPenIcon'></button>`;
  }
  
}

function removeEditIcons()
{
  
    var nameEditObj = document.getElementById("NameEditIcon");
    var phoneEditObj = document.getElementById("PhoneEditIcon");
    var emailEditObj = document.getElementById("EmailEditIcon");
    var birthEditObj = document.getElementById("BirthEditIcon");
    var cancelEditBtn = document.getElementById("CancelEditButton");
    var saveEditBtn = document.getElementById("SaveEditButton");

    var phoneTextBox = document.getElementById("inputPhone");
    var phoneInfo = document.getElementById("PhoneInfoText");

    var emailTextBox = document.getElementById("inputEmail");
    var emailInfo = document.getElementById("EmailInfoText");

    var birthTextBox = document.getElementById("inputBirth");
    var birthInfo = document.getElementById("BirthInfoText");


    // removes all edit icons
    nameEditObj.remove();
    phoneEditObj.remove();
    emailEditObj.remove();
    birthEditObj.remove();
    cancelEditBtn.remove();
    saveEditBtn.remove();


    // removes input boxes
    if (phoneTextBox != null)
      phoneTextBox.remove();

    if (emailTextBox != null)
      emailTextBox.remove();

    if (birthTextBox != null)
    birthTextBox.remove();

    phoneInfo.style.display="block";
    emailInfo.style.display="block";
    birthInfo.style.display="block";

    document.getElementById('EditDeleteHeader').firstChild =  '<button class="clickableAwesomeFont" id="EditButton" title="Edit Contact" alt="edit contact icon" onclick="insertEditIcons(false)"> <i class="far fa-edit fa-3x"></i> </button>'
  

}

// adds a div to the side bar with a user's picture and name
function appendUserContactsToSideBar()
{
  // firstName, lastName

  let firstName = "Mr.";
  let lastName = "Patrick";

  let username = firstName + " " + lastName;

	let htmlString = `<button id = '${username}' class ="img-responsive userContactSideBarDiv" onclick = "displayContactInfo('${firstName}', '${lastName}');">
	<img src = "https://i.ibb.co/n6ps4Cx/l60Hf.png" id = "profilePicture">
	<p id = "contactFullName"> ${username} </p>
    </button>`;

	let sideBarDiv = document.getElementById("scroll-bar");

	sideBarDiv.innerHTML += htmlString;

}


// clicking a contact on the side bar will pull from the hashMap and display a user's info
function displayContactInfo(firstName, lastName)
{
   let htmlString = `    <div id="info">
   <h1 id="EditDeleteHeader">
     <button class="clickableAwesomeFont" id="EditButton" title="Edit Contact" alt="edit contact icon" onclick="insertEditIcons(false)"> <i class="far fa-edit fa-3x"></i> </button>
     <button class="clickableAwesomeFont" id="DeleteButton" title="Delete Contact" alt="delete contact icon"> <i class="far fa-trash-alt fa-3x"></i> </button>
   </h1>
   <div id="top-info">
     <img id="profile-pic" src="https://i.ibb.co/QbzfxWp/relaxing-cat-1.jpg" alt="">
     <h2 id="profileNameFirst">${firstName}</h2>
     <h2 id = "profileNameSecond"> ${lastName}</h2>
     <div id="NameEditDiv" class="editIconDiv">
     </div>
   </div>
   <hr class = white-page-line>
   <div id="secondary-info">
     <div id="PhoneDiv">
       <div id="PhoneEditDiv" class="editIconDiv">
       </div>
       <p class="infoLabels" id="phoneLabel"> <i class="fas fa-phone"></i> Phone </p>
       <p id = "PhoneInfoText">FAKE PHONE </p>
     </div>
     <hr>

     <div id="EmailDiv">
       <div id="EmailEditDiv"class="editIconDiv">
       </div>
       <p class="infoLabels" id="emailLabel"> <i class="far fa-envelope"></i> E-mail </p>
       <p id = "EmailInfoText">FAKE EMAIL </p>
     </div>
     <hr>

     <div id="BirthDiv">
       <div id="BirthEditDiv"class="editIconDiv">
       </div>
       <p class="infoLabels" id="birthLabel"> <i class="fas fa-birthday-cake"></i> Birthday </p>
       <p id = "BirthInfoText">FAKE B-DAY </p>
     </div>
     <div id = "CancelSaveButtonDiv">
     </div>
   </div>
   <hr class = white-page-line>
 </div>`

  let displayScreen = document.getElementById("inner-screen");
  displayScreen.lastElementChild.remove();
  displayScreen.innerHTML += htmlString;

}


// displays the create a new contact page
function displayCreateUserPage()
{
  let htmlString = `<div id=CreateAccountDiv>
  <div id="top-info">
    <img id="create-profile-pic" src="https://i.ibb.co/n6ps4Cx/l60Hf.png" alt="">
    <h2 id="profile-name"></h2>
  </div>
  <div id="secondary-info">
    <div class="inputContainer">
      <div id = "containsNames">
        <h3 class="fieldText"> First Name: </h3>
        <input type="text" id = "FirstNameCreateInput" placeholder = "First Name" class = "round-borders">
        <h3 class="fieldText"> Last Name: </h3>
        <input type="text" id = "LastNameCreateInput" placeholder = "Last Name" class = "round-borders">
      </div>
      <h3 class="fieldText"> E-mail Address: </h3>
      <input type="text" id = "EmailCreateInput" placeholder = "E-mail" class = "round-borders">
      <h3 class="fieldText"> Phone Number: </h3>
      <input type="text" id = "PhoneNumberCreateInput" placeholder = "Phone #" class = "round-borders">
      <h3 class="fieldText"> Date of Birth (mm/dd/yyyy): </h3>
      <input type="text" id = "BirthdayCreateInput" placeholder = "mm/dd/yyyy" class = "round-borders">
      <div id = "contains-buttons">
        <button type="submit" id = "CancelButton" onclick = 'displayMainWelcomeScreen()'>Cancel</button>
        <button type="submit" id = "CreateButton" onclick = 'grabUserInfoForCreateClick()'>Create</button>
      </div>
    </div>
  </div>
</div>`;

  let displayScreen = document.getElementById("inner-screen");
  displayScreen.lastElementChild.remove();
  displayScreen.innerHTML += htmlString;
}

function grabUserInfoForCreateClick()
{
  let firstName = document.getElementById('FirstNameCreateInput').value;
  let lastName = document.getElementById('LastNameCreateInput').value;
  console.log(document.getElementById('EmailCreateInput').value);
  console.log(document.getElementById('PhoneNumberCreateInput').value);
  console.log(document.getElementById('BirthdayCreateInput').value);

  let args = {FirstName: firstName, LastName: lastName, Email:document.getElementById('EmailCreateInput').value, Phone:document.getElementById('PhoneNumberCreateInput').value, BirthDay:document.getElementById('BirthdayCreateInput').value, UserID: userId};

  console.log(args);
  createContact(args);
  displayContactInfo(firstName, lastName);
}

function displayMainWelcomeScreen()
{
  let displayScreen = document.getElementById("inner-screen");
  displayScreen.lastElementChild.remove();
  displayScreen.innerHTML += `<div id="info">
  <div id = "WelcomeInsideDiv">
    <p id = "WelcomeMSG">Welcome back to SUPER AWESOME CONTACT MANAGER 3000</p>
    <p id = "welcomeDivUserName"> @Person Logged-in!!!!</p>
    <img src="https://i.ibb.co/QbzfxWp/relaxing-cat-1.jpg" id = WelcomePic alt ="https://i.ibb.co/vzWSRXY/Screenshot-594.png"></img>
  </div>
</div>`;
  
}

