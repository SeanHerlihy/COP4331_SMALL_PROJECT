const urlBase = 'http://superawesomecontactmanager3000.com/';
const extension = 'php';

let userId = -2;
let uFName = "";
let uLName = "";
let dataDic = {};
let offset = 0;
let searchFlag = new Boolean(false);
let ICONCOUNT = 20;
let alreadyRunning = false;

function login()
{
	readCookie();
  displayName();
	
}

function displayName()
{
	document.getElementById("welcometextNavBar").textContent = "Welcome, " + uFName + " " + uLName + "!";
  document.getElementById("topBarIcons").src = `./css/images/pic${Math.floor(Math.random() * ICONCOUNT)}.png`; 
  //selectPhotoId(photoId, "topBarIcons");
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
		else if( tokens[0] == "UserID" )
		{
			userId = parseInt( tokens[1].trim() );
			
		}
	}

	if( userId <= 0 )
	{
		window.location.href = "index.html";
	}
	
}

function htmlGetData()
{
  let args = {UserID:userId, Offset:offset};
  let temp = getData(args);

}

function getData(args)
{
  let jsonPayload = JSON.stringify(args);
  let url = urlBase + 'LAMPAPI/LoadContacts.' + extension;
  let returnObj;

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
				

       	jsonObject = jsonObject.results;

        if (jsonObject === undefined)
          return;
				jsonObject = jsonObject[0].results;

				setReturnData(jsonObject, false);

				
			}
		};
		
		xhr.send(jsonPayload);
		
	}
	catch(err)
	{
		console.log(err);
		return -20000;
	}

}

function setReturnData(arr, isSearchBool)
{
  if (arr === undefined)
    return;

	for(let i = 0; i < arr.length; i++)
  	{
		//dataDic[arr[i]['ID']] = arr[i];
      offset++;
		  appendUserContactsToSideBar(arr[i]['First'], arr[i]['Last'], arr[i]['Email'], arr[i]['BirthDay'], arr[i]['Phone'], arr[i]['ID'], arr[i]['PhotoID']);
  	}

  if (offset % 25 == 0)
  {
    appendLoadContactDivToSideBar(isSearchBool);
  }
	
}

function searchData(args)
{
  let jsonPayload = JSON.stringify(args);
	let url = urlBase + 'LAMPAPI/SearchContacts.' + extension;

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

        jsonObject = jsonObject.results;

        if (jsonObject === undefined)
          return;

				jsonObject = jsonObject[0].results;

				setReturnData(jsonObject, true);
			}
		};

    xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log(err);
	}
}


function createContact(args)
{
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


function editContact(args)
{
	let jsonPayload = JSON.stringify(args);
	let url = urlBase + 'LAMPAPI/EditContact.' + extension;

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

    xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log(err);
	}
}

function deleteClick(contactID, username)
{
  let args = {ID:contactID, UserID:userId};

  if (confirm("Are you sure you want to delete this contact?"))
  {
    deleteContact(args);
    document.getElementById(`${username}`).remove();
    displayMainWelcomeScreen();

  }
}

function deleteContact(args)
{
	let jsonPayload = JSON.stringify(args);
	let url = urlBase + 'LAMPAPI/DeleteContact.' + extension;

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

    xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log(err);
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
      document.getElementById("btn-profile-pic").setAttribute( "onClick", "changeBackgroundImage('create-profile-pic')");

      nameEditObj.innerHTML =`<button type = "button" id='NameEditIcon' onclick="editInfo('FirstName', false); editInfo('LastName', false)" class='fas fa-pen fa-2x editPenIcon'></button>`;
      phoneEditObj.innerHTML =`<button type = "button" id='PhoneEditIcon' onclick="editInfo('Phone', false)" class='fas fa-pen fa-sm editPenIcon'></button>`;
      emailEditObj.innerHTML =`<button type = "button" id='EmailEditIcon' onclick="editInfo('Email', false)" class='fas fa-pen fa-sm editPenIcon'></button>`;
      birthEditObj.innerHTML =`<button type = "button" id='BirthEditIcon' onclick="editInfo('Birth', false)" class='fas fa-pen fa-sm editPenIcon'></button>`;
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
    if (infoType == "FirstName" || infoType == "LastName")
    {
      infoDiv.innerHTML += `<input type='text' id = 'input${infoType}' required placeholder=' Please enter ${infoType}' title='Enter ${infoType}'>`;
      document.getElementById(`NameEditDiv`).innerHTML = `<button id='NameEditIcon' onclick="editInfo('${infoType}', true)" class='fas fa-pen fa-2x editPenIcon'></button>`;
    }
    else if (infoType == "Birth")
    {
      infoDiv.innerHTML += `<input type='Date' id = 'input${infoType}' required placeholder=' Please enter ${infoType}'>`;
      document.getElementById(`${infoType}EditDiv`).innerHTML = `<button id='${infoType}EditIcon' onclick="editInfo('${infoType}', true)" class='fas fa-pen fa-sm editPenIcon'></button>`;
    }
    else if (infoType == "Phone")
    {
      infoDiv.innerHTML += `<input type='Text' id = 'input${infoType}' required placeholder=' Please enter ${infoType}' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">`;
      document.getElementById(`${infoType}EditDiv`).innerHTML = `<button id='${infoType}EditIcon' onclick="editInfo('${infoType}', true)" class='fas fa-pen fa-sm editPenIcon'></button>`;
    }
    else
    {
      infoDiv.innerHTML += `<input type='${infoType}' id = 'input${infoType}' required placeholder=' Please enter ${infoType}'>`;
      document.getElementById(`${infoType}EditDiv`).innerHTML = `<button id='${infoType}EditIcon' onclick="editInfo('${infoType}', true)" class='fas fa-pen fa-sm editPenIcon'></button>`;
    }
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

    var firstNameTextBox = document.getElementById("inputFirstName")
    var firstNameInfo = document.getElementById("FirstNameInfoText");

    var lastNameTextBox = document.getElementById("inputLastName")
    var lastNameInfo = document.getElementById("LastNameInfoText");

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
    if (firstNameTextBox != null)
      firstNameTextBox.remove();

    if (lastNameTextBox != null)
      lastNameTextBox.remove();

    if (phoneTextBox != null)
      phoneTextBox.remove();

    if (emailTextBox != null)
      emailTextBox.remove();

    if (birthTextBox != null)
      birthTextBox.remove();

    firstNameInfo.style.display="block";
    lastNameInfo.style.display="block";
    phoneInfo.style.display="block";
    emailInfo.style.display="block";
    birthInfo.style.display="block";

    document.getElementById("btn-profile-pic").setAttribute( "onClick", "");
    let num = document.getElementById("currentContactphoto").textContent;
    document.getElementById("storesProfilePicNum").textContent = num;
    document.getElementById("create-profile-pic").src = `./css/images/pic${num}.png`;

    document.getElementById('EditDeleteHeader').firstChild =  '<button class="clickableAwesomeFont" id="EditButton" title="Edit Contact" alt="edit contact icon" onclick="insertEditIcons(false)"> <i class="far fa-edit fa-3x"></i> </button>';
}

function saveNewInfo()
{
    var nameEditObj = document.getElementById("NameEditIcon");
    var phoneEditObj = document.getElementById("PhoneEditIcon");
    var emailEditObj = document.getElementById("EmailEditIcon");
    var birthEditObj = document.getElementById("BirthEditIcon");
    var cancelEditBtn = document.getElementById("CancelEditButton");
    var saveEditBtn = document.getElementById("SaveEditButton");

    var firstNameTextBox = document.getElementById("inputFirstName")
    var firstNameInfo = document.getElementById("FirstNameInfoText");

    var lastNameTextBox = document.getElementById("inputLastName")
    var lastNameInfo = document.getElementById("LastNameInfoText");

    var phoneTextBox = document.getElementById("inputPhone");
    var phoneInfo = document.getElementById("PhoneInfoText");

    var emailTextBox = document.getElementById("inputEmail");
    var emailInfo = document.getElementById("EmailInfoText");

    var birthTextBox = document.getElementById("inputBirth");
    var birthInfo = document.getElementById("BirthInfoText");

    let initialFirst = firstNameInfo.textContent.trim();
    let initialLast = lastNameInfo.textContent.trim();

    // removes all edit icons
    nameEditObj.remove();
    phoneEditObj.remove();
    emailEditObj.remove();
    birthEditObj.remove();
    cancelEditBtn.remove();
    saveEditBtn.remove();

    // removes input boxes and stores input data
    if (firstNameTextBox != null)
    {
      firstNameInfo.textContent = document.getElementById("inputFirstName").value;
      firstNameTextBox.remove();
    }

    if (lastNameTextBox != null)
		{
			lastNameInfo.textContent = document.getElementById("inputLastName").value;
      lastNameTextBox.remove();
		}

    if (phoneTextBox != null)
		{
			phoneInfo.textContent = document.getElementById("inputPhone").value;
			phoneTextBox.remove();
		}

    if (emailTextBox != null)
		{
			emailInfo.textContent = document.getElementById("inputEmail").value;
			emailTextBox.remove();
		}

    if (birthTextBox != null)
		{
			birthInfo.textContent = document.getElementById("inputBirth").value;
			birthTextBox.remove();
		}

    firstNameInfo.style.display="block";
    lastNameInfo.style.display="block";
    phoneInfo.style.display="block";
    emailInfo.style.display="block";
    birthInfo.style.display="block";

		let finalFirstName = firstNameInfo.textContent.trim();
		let finalLastName = lastNameInfo.textContent.trim();
		let finalPhone = phoneInfo.textContent;
		let finalEmail = emailInfo.textContent;
		let finalBirth = birthInfo.textContent;
    let finalContactId = document.getElementById("currentContactId").textContent;
    let finalphotoId = document.getElementById("storesProfilePicNum").textContent;

    document.getElementById("btn-profile-pic").setAttribute( "onClick", "");

    document.getElementById('EditDeleteHeader').firstChild =  '<button class="clickableAwesomeFont" id="EditButton" title="Edit Contact" alt="edit contact icon" onclick="insertEditIcons(false)"> <i class="far fa-edit fa-3x"></i> </button>';
    document.getElementById("currentContactphoto").textContent = finalphotoId;

    let contactBtn = document.getElementById(`${initialFirst + " " + initialLast}`);
    contactBtn.innerHTML = `<img src = "./css/images/pic${finalphotoId}.png" id = "profilePicture">
    <p id = "contactFullName"> ${finalFirstName + " " + finalLastName}</p>`;
    contactBtn.setAttribute( "onClick", `displayContactInfo('${finalFirstName}', '${finalLastName}', '${finalEmail}', '${finalBirth}', '${finalPhone}', '${finalContactId}', ${finalphotoId});` ); 
    contactBtn.id =`${finalFirstName + " " + finalLastName}`;

    let args = {FirstName:finalFirstName, LastName:finalLastName, Email:finalEmail, Phone:finalPhone, BirthDay:finalBirth, UserID:userId, ID:finalContactId, PhotoID:finalphotoId};
	  editContact(args);
}

// adds a div to the side bar with a user's picture and name
function appendUserContactsToSideBar(firstName, lastName, email, birthday, phoneNum, contactId, photoId)
{
  // firstName, lastName
  firstName = firstName.trim();
  lastName = lastName.trim();

  	let username = firstName + " " + lastName;

    if (photoId >= ICONCOUNT || photoId < 0)
      photoId = ICONCOUNT - 1;


	let htmlString = `<button id = '${username}' class ="img-responsive userContactSideBarDiv" onclick = "displayContactInfo('${firstName}', '${lastName}', '${email}', '${birthday}', '${phoneNum}', '${contactId}', '${photoId}');">
	<img src = "./css/images/pic${photoId}.png" id = "profilePicture">
	<p id = "contactFullName"> ${username} </p>
    </button>`;

	let sideBarDiv = document.getElementById("contactListBox");

	sideBarDiv.innerHTML += htmlString;

}

function appendLoadContactDivToSideBar(searchBool)
{

  let htmlString = `<div id = "scrollMoreContactDiv" style = "display:none;">${searchBool}</div>`;;

  let sideBarDiv = document.getElementById("contactListBox");

	sideBarDiv.innerHTML += htmlString;
}





// clicking a contact on the side bar will pull from the hashMap and display a user's info
function displayContactInfo(firstName, lastName, email, birthday, phoneNum, contactId, photoId)
{

  let username = firstName + " " + lastName;

   let htmlString = `    <div id="info">
   <h1 id="EditDeleteHeader">
     <button class="clickableAwesomeFont" id="EditButton" title="Edit Contact" alt="edit contact icon" onclick="insertEditIcons(false)"> <i class="far fa-edit fa-3x"></i> </button>
     <button class="clickableAwesomeFont" id="DeleteButton" title="Delete Contact" alt="delete contact icon" onclick = "deleteClick(${contactId}, '${username}')"> <i class="far fa-trash-alt fa-3x"></i> </button>
   </h1>
   <form action="#" onsubmit = 'saveNewInfo()'>
   <div id="top-info">
    <button id="btn-profile-pic" onclick = "" type = "button">
      <img id="create-profile-pic" src="./css/images/pic${photoId}.png" alt="">
      <p id ="storesProfilePicNum" style = "display:none;" >${photoId}</p>
    </button>
    <div id= "NameDiv">

       <div id="FirstNameDiv">
         <h2 id="FirstNameInfoText">${firstName}</h2>
       </div>

       <div id="LastNameDiv">
         <h2 id = "LastNameInfoText"> ${lastName}</h2>
       </div>

       <div id="NameEditDiv" class="editIconDiv">
       </div>

    </div>

   </div>
   <hr class =" white-page-line-displayContact">
   <div id="secondary-info">
     <div id="PhoneDiv">
       <div id="PhoneEditDiv" class="editIconDiv">
       </div>
       <p class="infoLabels" id="phoneLabel"> <i class="fas fa-phone"></i> Phone </p>
       <p id = "PhoneInfoText">${phoneNum} </p>
     </div>
     <hr>

     <div id="EmailDiv">
       <div id="EmailEditDiv"class="editIconDiv">
       </div>
       <p class="infoLabels" id="emailLabel"> <i class="far fa-envelope"></i> E-mail </p>
       <p id = "EmailInfoText">${email} </p>
     </div>
     <hr>

     <div id="BirthDiv">
       <div id="BirthEditDiv"class="editIconDiv">
       </div>
       <p class="infoLabels" id="birthLabel"> <i class="fas fa-birthday-cake"></i> Birthday </p>
       <p id = "BirthInfoText">${birthday} </p>
     </div>
     <div id = "CancelSaveButtonDiv">
     </div>
   </form>
   </div>
   <p id = "currentContactId" style = "display: none;">${contactId}</p>
   <p id = "currentContactphoto" style = "display: none;">${photoId}</p>
 </div>`

  let displayScreen = document.getElementById("inner-screen");
  displayScreen.lastElementChild.innerHTML = htmlString;
}



// displays the create a new contact page
function displayCreateUserPage()
{

  let randomNum = Math.floor(Math.random() * ICONCOUNT);
  
  let htmlString = `<div id=CreateAccountDiv>
  <div id="top-info-createContact">
    <button type = "button" id = "change-create-profile-pic" onclick = changeBackgroundImage("create-profile-pic") >
      <img id = "create-profile-pic" src = "./css/images/pic${randomNum}.png">
      <p id ="storesProfilePicNum" style = "display:none;" >${randomNum}</p>
    </button>
  </div>
  <div id="secondary-info-createContact">
    <form class="inputContainer" action="#" onsubmit = 'grabUserInfoForCreateClick()'">
      <div id = "containsNames">
        <h3 class="fieldText"> First Name: </h3>
        <input type="text" id = "FirstNameCreateInput" placeholder = "First Name" class = "round-borders" required>
        <h3 class="fieldText"> Last Name: </h3>
        <input type="text" id = "LastNameCreateInput" placeholder = "Last Name" class = "round-borders" required>
      </div>
      <h3 class="fieldText"> E-mail Address: </h3>
      <input type="email" id = "EmailCreateInput" placeholder = "E-mail" class = "round-borders" type = "email" required ">
      <h3 class="fieldText"> Phone Number: </h3>
      <input type="text" id = "PhoneNumberCreateInput" placeholder = "XXX-XXX-XXXX" class = "round-borders" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      required type = 'tel'>
      <h3 class="fieldText"> Date of Birth (mm/dd/yyyy): </h3>
      <input type="date" id = "BirthdayCreateInput" placeholder = "mm/dd/yyyy" class = "round-borders" required>
      <div id = "contains-buttons">
        <button type="submit" id = "CancelButton" onclick = 'displayMainWelcomeScreen()'>Cancel</button>
        <button type="submit" id = "CreateButton" >Create</button>
      </div>
    </form>
  </div>
</div>`;

  let displayScreen = document.getElementById("inner-screen");
  displayScreen.lastElementChild.innerHTML= htmlString
}

function changeBackgroundImage(idString)
{
  let imageBtnHTML = document.getElementById(idString);
  let currNumHTML = document.getElementById("storesProfilePicNum");
  let actualNum = currNumHTML.textContent;

  if (++actualNum >= ICONCOUNT)
  {
    actualNum = 0;
  }
  
  imageBtnHTML.src = `./css/images/pic${actualNum}.png`;


  document.getElementById("storesProfilePicNum").textContent = actualNum;

}

function grabUserInfoForCreateClick()
{

  let firstName = document.getElementById('FirstNameCreateInput').value.trim();
  let lastName = document.getElementById('LastNameCreateInput').value.trim();
  let email = document.getElementById('EmailCreateInput').value;
  let birthday = document.getElementById('BirthdayCreateInput').value;
  let phoneNum = document.getElementById('PhoneNumberCreateInput').value;
  let photoId =  document.getElementById("storesProfilePicNum").textContent;
  console.log(typeof photoId);
  console.log(photoId);
  
  
  let contactId = Math.floor(Math.random() * 2147483647);

  let args = {ID: contactId, FirstName: firstName, LastName: lastName, Email:email, Phone: phoneNum, BirthDay:birthday, UserID: userId, PhotoID: photoId};

  createContact(args);
  appendUserContactsToSideBar(firstName, lastName, email, birthday, phoneNum, contactId, photoId);
  displayContactInfo(firstName, lastName, email, birthday, phoneNum, contactId, photoId);
}

function displayMainWelcomeScreen()
{
  let displayScreen = document.getElementById("inner-screen");
  displayScreen.lastElementChild.innerHTML =`<div id="info">
  <div id = "WelcomeInsideDiv">
     <img src="./css/images/Logo.png" id = WelcomePic alt ="https://i.ibb.co/vzWSRXY/Screenshot-594.png"></img>
  </div>
</div>`;

}

function searchBarFunction()
{
  offset = 0;
	let input =  document.getElementById('searchInput').value;

  args = {UserID:userId, search:input, Offset:offset};

  let sideBarDiv = document.getElementById("contactListBox");
  sideBarDiv.innerHTML = "";

  searchData(args);

}

function addScrollBarLogic()
{
  document.getElementById("scroll-bar").addEventListener('scroll', () => {

    const 
    {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.getElementById("scroll-bar");
    
    if (scrollTop + clientHeight >= scrollHeight && !alreadyRunning) 
    {
      alreadyRunning = true;
      if (document.getElementById("scrollMoreContactDiv")== null)
      {
        alreadyRunning = false;
        return;
      }
      if (document.getElementById("scrollMoreContactDiv").innerHTML == "true")
      {
        console.log("MADE IT");
        setTimeout(searchData({UserID:userId, search:document.getElementById('searchInput').value, Offset:offset}), 0);
      }
      else
      {
        setTimeout(getData({UserID:userId, Offset:offset}), 0);
      }

      alreadyRunning = false;
    }

    
  
  }, { passive: true});
}

