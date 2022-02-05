var isInserted = false;

function insertEditIcons()
{
    if (isInserted == false)
    {
      var phoneEditObj = document.getElementById("PhoneEditDiv");
      var emailEditObj = document.getElementById("EmailEditDiv");
      var birthEditObj = document.getElementById("BirthEditDiv");
      var cancelSaveDivObj = document.getElementById("CancelSaveButtonDiv");

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
    var phoneEditObj = document.getElementById("PhoneEditIcon");
    var emailEditObj = document.getElementById("EmailEditIcon");
    var birthEditObj = document.getElementById("BirthEditIcon");
    var cancelEditBtn = document.getElementById("CancelEditButton");
    var saveEditBtn = document.getElementById("SaveEditButton");

    phoneEditObj.remove();
    emailEditObj.remove();
    birthEditObj.remove();
    cancelEditBtn.remove();
    saveEditBtn.remove();
  }

  isInserted = false;
}

function appendUserContactsToSideBar()
{
  // firstName, lastName
  //let username = firstName + " " + lastName;

  let username = "patrick";

	let htmlString = `<button id = "${username}" class ="img-responsive userContactSideBarDiv" onclick = "displayContactInfo(${username});">
	<img src = "https://i.ibb.co/n6ps4Cx/l60Hf.png" id = "profilePicture">
	<p id = "contactFullName"> ${username} </p>
    </button>`;

	let sideBarDiv = document.getElementById("scroll-bar");

	sideBarDiv.innerHTML += htmlString;

}
