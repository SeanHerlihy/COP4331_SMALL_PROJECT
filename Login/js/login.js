const urlBase = 'http:/http://www.superawesomecontactmanager3000.com/LAMPAPI';
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
	console.log( login );
	let password = document.getElementById("Password").value;
	console.log( password );
	document.getElementById("loginResult").innerHTML = "";
}

function saveCookie()
{

}

function readCookie()
{

}
