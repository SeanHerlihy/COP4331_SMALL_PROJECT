
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
      cancelSaveDivObj.innerHTML ="<button type='submit' id = 'CancelEditButton' onclick='removeEditIcons();'>Cancel</button> <button type='submit' id = 'SaveEditButton' onclick='saveNewInfo();'>Save</button>";

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

		let finalFirstName = firstNameInfo.textContent;
		let finalLastName = lastNameInfo.textContent;
		let finalPhone = phoneInfo.textContent;
		let finalEmail = emailInfo.textContent;
		let finalBirth = birthInfo.textContent;

    document.getElementById('EditDeleteHeader').firstChild =  '<button class="clickableAwesomeFont" id="EditButton" title="Edit Contact" alt="edit contact icon" onclick="insertEditIcons(false)"> <i class="far fa-edit fa-3x"></i> </button>';
    let args = {FirstName:finalFirstName, LastName:finalLastName, Email:finalEmail, Phone:finalPhone, BirthDay:finalBirth, UserID:userId, ID:ID};
    editContact(args);
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
        <input type="text" id = "FirstName" placeholder = "First Name" class = "round-borders">
        <h3 class="fieldText"> Last Name: </h3>
        <input type="text" id = "LastName" placeholder = "Last Name" class = "round-borders">
      </div>
      <h3 class="fieldText"> E-mail Address: </h3>
      <input type="text" id = "Email" placeholder = "E-mail" class = "round-borders">
      <h3 class="fieldText"> Phone Number: </h3>
      <input type="text" id = "PhoneNumber" placeholder = "Phone #" class = "round-borders">
      <h3 class="fieldText"> Date of Birth (mm/dd/yyyy): </h3>
      <input type="text" id = "Birthday" placeholder = "mm/dd/yyyy" class = "round-borders">
      <div id = "contains-buttons">
        <button type="submit" id = "CancelButton">Cancel</button>
        <button type="submit" id = "CreateButton">Create</button>
      </div>
    </div>
  </div>
</div>`;

  let displayScreen = document.getElementById("inner-screen");
  displayScreen.lastElementChild.remove();
  displayScreen.innerHTML += htmlString;
}

function displayMainWelcomeScreen()
{

  let displayScreen = document.getElementById("inner-screen");
  displayScreen.lastElementChild.remove();
  displayScreen.innerHTML += `<div id="info">
  <div id = "WelcomeInsideDiv">
    <p id = "WelcomeMSG">Welcome back to SUPER AWESOME CONTACT MANAGER 3000</p>
    <p id = "welcomeDivUserName"> @Person Logged-in!!!!</p>
    <img src="https://i.ibb.co/VwpYLdc/Shitty-Logo2-Transparent.png" id = WelcomePic alt ="https://i.ibb.co/vzWSRXY/Screenshot-594.png"></img>
  </div>
</div>`;

}
