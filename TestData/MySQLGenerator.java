import java.util.*;
import java.io.*;
import java.io.File;

public class MySQLGenerator
{
	private static final int userID = 37;
	private static final int numLines = 500;

	public static void main(String [] args) throws IOException
	{
		Scanner input = new Scanner(new File("firstNames.txt"));
		ArrayList<String> firstNames = new ArrayList<>();

		while (input.hasNext())
			firstNames.add(input.next());

		input = new Scanner(new File("lastNames.txt"));
		ArrayList<String> lastNames = new ArrayList<>();

		while (input.hasNext())
			lastNames.add(input.next());

		input = new Scanner(new File("words.txt"));
		ArrayList<String> words = new ArrayList<>();

		while (input.hasNext())
			words.add(input.next());

		String [] topLevelDomains = {"com", "net", "org", "io"};

		// Generate strings
		String temp = "";
		FileWriter output = new FileWriter(new File("testContacts.txt"));

		for (int i = 0; i < numLines; i++)
		{
			temp = "INSERT INTO Contacts (FirstName, LastName, Email, Phone, BirthDay, UserID, PhotoID) VALUES('";

			// FirstName
			temp += firstNames.get((int)(Math.random() * firstNames.size())) + "', '";

			// LastName
			temp += lastNames.get((int)(Math.random() * lastNames.size())) + "', '";

			// Email
			temp += words.get((int)(Math.random() * words.size()))
			                + words.get((int)(Math.random() * words.size())) + "@"
						 + words.get((int)(Math.random() * words.size())) + "."
			                + topLevelDomains[(int)(Math.random() * topLevelDomains.length)] + "', '";
			// Phone
			temp += (int)(Math.random() * 1000) + "-" + (int)(Math.random() * 1000) + "-"
			                + (int)(Math.random() * 10000) + "', '";

			// Birthday
			temp += (int)(Math.random() * 100) + "/" + (int)(Math.random() * 100) + "/"
			                + (int)(Math.random() * 10000) + "', '";

			// UserID
			temp += userID + "', '";

			// PhotoID
			temp += (int)(Math.random() * 21) + "');\n";

			output.write(temp);
		}


	}

}
