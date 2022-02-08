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
		$stmt = $conn->prepare("UPDATE Contacts SET FirstName = (?), LastName = (?), Email = (?), Phone = (?), BirthDay = (?), PhotoID = (?) WHERE UserID = (?) AND ID = (?);");
		$stmt->bind_param("ssssssss", $inData["FirstName"], $inData["LastName"], $inData["Email"], $inData["Phone"], $inData["BirthDay"], $inData["PhotoID"], $inData["UserID"], $inData["ID"]);
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
