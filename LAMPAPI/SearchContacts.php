<?php

	$inData = getRequestInfo();

	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "Admin", "immediatesilenceliquid2", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("select * from Contacts where ((FirstName like ?) or (LastName like ?)) and UserID=?");
		$contactName = "%" . $inData["search"] . "%";
		$contactName2 = "%" . $inData["search"] . "%";
		$stmt->bind_param("sss", $contactName, $contactName2, $inData["UserID"]);
		$stmt->execute();

		$result = $stmt->get_result();

		$searchResults = '{"results":[';

		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;

			$thisJSONObject = '{"First":"' . $row["FirstName"] . '","Last":"' . $row["LastName"]
				          . '","Phone":"' . $row["Phone"] . '","Email":"' . $row["Email"]
						. '","BirthDay":"' . $row["BirthDay"] . '","UserID":"' . $row["UserID"] . '"}';
			$searchResults .= $thisJSONObject;
			//echo $thisJSONObject;
		}

		$searchResults .= ']}';

		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}

		$stmt->close();
		$conn->close();
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>