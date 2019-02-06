Download POSTMAN or ARC
Start server with "npm start" (need nodejs/express/mongod installed)
Open POSTMAN
For POST requests, click Body->raw->JSON application and enter POSTS as such

===REGISTERING A USER===
ROUTE: http://localhost:3000/user/register    <= POST REQUEST
{
	"username": "admin",
	"password": "password"
}

OUTPUT:
{
    "_id": "5c522a8885ce7b04304d742d", <- Copy this _id for future instances of adding/getting/deleting contacts (will be known as userId from now on)
    "message": "User created"
}

===LOGGING IN A USER===
ROUTE: http://localhost:3000/user/login     <= POST REQUEST
INPUT:
{
	"username": "admin",
	"password": "password"
}

===DELETING A USER===
ROUTE: http://localhost:3000/<userId>     <= DELETE REQUEST (don't worry about this one)
OUTPUT: 
{
    "message": "User deleted"
}

=== ADDING A CONTACT === <= POST REQUEST
ROUTE: http://localhost:3000/contacts/addContact
INPUT:
{
	"userId": "5c538d4c694ded1cac263f58", <---- put the _id you got from registering here
	"firstName": "Test", 
	"lastName": "Contact", 
	"phoneNumber": "123"
}
OUTPUT:
{
    "message": "Contact added.",
    "contactId": "5c548dc6af08471b04c10cfb" <--- you will need to copy this contactId for get/deletes for contacts
}

=== GETTING A CONTACT === <= POST REQUEST
ROUTE: http://localhost:3000/contacts/getContact
INPUT:
{
	"userId": "5c538d4c694ded1cac263f58", <-- _id copied from registering
	"contactId": "5c548850cda9ab15009fa823" <-- contactId copied from adding contact
}

=== GETTING ALL CONTACTS === <= POST REQUEST
ROUTE: http://localhost:3000/contacts/getAllContacts
INPUT:
{
	"userId": "5c538d4c694ded1cac263f58" <-- _id copied from registering user
}


=== DELETING A CONTACT === <= POST REQUEST
ROUTE: http://localhost:3000/contacts/deleteContact
INPUT:
{
	"userId": "5c538d4c694ded1cac263f58", <-- ""
	"contactId": "5c5393b92aaa600bb44b74f3" <-- ""
}
