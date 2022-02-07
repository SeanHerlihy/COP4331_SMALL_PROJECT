<?php header('Access-Control-Allow-Origin: http://www.superawesomecontactmanager3000.com'); ?>
<?php
	$inData = getRequestInfo();
	$conn = new mysqli("localhost", "Admin", "immediatesilenceliquid2", "COP4331");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT INTO Contacts (ID, FirstName, LastName, Email, Phone, BirthDay, UserID, PhotoID) VALUES(?,?,?,?,?,?,?,?)");
		$stmt->bind_param("ssssssss", $inData["ID"], $inData["FirstName"], $inData["LastName"], $inData["Email"], $inData["Phone"], $inData["BirthDay"], $inData["UserID"], $inData["PhotoID"]);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
