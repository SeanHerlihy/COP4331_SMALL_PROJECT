
function insertEditIcons(isInsertedBool)
{
    if (isInsertedBool == false)
    {
      var nameEditObj = document.getElementById("NameEditDiv");
      var phoneEditObj = document.getElementById("PhoneEditDiv");
      var emailEditObj = document.getElementById("EmailEditDiv");
      var birthEditObj = document.getElementById("BirthEditDiv");
      var cancelSaveDivObj = document.getElementById("CancelSaveButtonDiv");

      nameEditObj.innerHTML =`<button id='NameEditIcon' onclick="editInfo('FirstName', false); editInfo('LastName', false)" class='fas fa-pen fa-2x editPenIcon'></button>`;
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
    if (infoType == "FirstName" || infoType == "LastName")
    {
      infoDiv.innerHTML += `<input type='text' id = 'input${infoType}' placeholder=' Please enter ${infoType}' title='Enter ${infoType}'>`;
      document.getElementById(`NameEditDiv`).innerHTML = `<button id='NameEditIcon' onclick="editInfo('${infoType}', true)" class='fas fa-pen fa-2x editPenIcon'></button>`;
    }
    else
    {
      infoDiv.innerHTML += `<input type='text' id = 'input${infoType}' placeholder=' Please enter ${infoType}'>`;
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

    document.getElementById('EditDeleteHeader').firstChild =  '<button class="clickableAwesomeFont" id="EditButton" title="Edit Contact" alt="edit contact icon" onclick="insertEditIcons(false)"> <i class="far fa-edit fa-3x"></i> </button>';
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
