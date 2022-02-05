var isInserted = false;

function insertEditIcons()
{
    if (isInserted == false)
    {
      var nameEditObj = document.getElementById("NameEditDiv");
      var phoneEditObj = document.getElementById("PhoneEditDiv");
      var emailEditObj = document.getElementById("EmailEditDiv");
      var birthEditObj = document.getElementById("BirthEditDiv");
      var cancelSaveDivObj = document.getElementById("CancelSaveButtonDiv");

      nameEditObj.innerHTML +="<i id='NameEditIcon' class='fas fa-pen fa-2x editPenIcon'></i>";
      phoneEditObj.innerHTML +="<i id='PhoneEditIcon' class='fas fa-pen fa editPenIcon'></i>";
      emailEditObj.innerHTML +="<i id='EmailEditIcon' class='fas fa-pen fa editPenIcon'></i>";
      birthEditObj.innerHTML +="<i id='BirthEditIcon' class='fas fa-pen fa editPenIcon'></i>";
      cancelSaveDivObj.innerHTML +="<button type='submit' id = 'CancelEditButton' onclick='removeEditIcons();'>Cancel</button> <button type='submit' id = 'SaveEditButton'>Save</button>";

      isInserted = true;
    }
}

function removeEditIcons()
{
  if (isInserted == true)
  {
    var nameEditObj = document.getElementById("NameEditIcon");
    var phoneEditObj = document.getElementById("PhoneEditIcon");
    var emailEditObj = document.getElementById("EmailEditIcon");
    var birthEditObj = document.getElementById("BirthEditIcon");
    var cancelEditBtn = document.getElementById("CancelEditButton");
    var saveEditBtn = document.getElementById("SaveEditButton");

    nameEditObj.remove();
    phoneEditObj.remove();
    emailEditObj.remove();
    birthEditObj.remove();
    cancelEditBtn.remove();
    saveEditBtn.remove();

    isInserted = false;
  }

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
     <button class="clickableAwesomeFont" id="EditButton" title="Edit Contact" alt="edit contact icon" onclick="insertEditIcons()"> <i class="far fa-edit fa-3x"></i> </button>
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
     <div id="PhoneNumberDiv">
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

     <div id="BirthdayDiv">
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
