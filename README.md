# Project Title: Library Management System with Local JSON Database

Context: You have been assigned to develop a Library Management System API using Node.js, Express, and JavaScript ES6. The API will provide endpoints for managing books in a library. In this project, you will incorporate a local JSON file as a simple database to store book data persistently. Your focus should be on designing efficient CRUD operations, proper error handling, middleware implementation, and database interactions.

### Project Requirements:

- Set up an Express server with the necessary dependencies.

- Create a local JSON file named "library.json" to store book data.
- Design the following endpoints:
  GET /books: Retrieve all books from the library.

  GET /books/:id: Retrieve a specific book by ID.

  POST /books: Add a new book to the library.

  PUT /books/:id: Update an existing book by ID. [*USING the splice method is forbidden here*]

  DELETE /books/:id: Delete a book from the library by ID.

- Implement appropriate request handlers and error handling for each endpoint.

- Implement sorting and filtering functionalities for the /books endpoint (e.g., sort by title, filter by author).
- Add pagination to the /books endpoint to limit the number of books returned per request.

- Use middleware functions to handle common tasks:
  - Implement a logger middleware that logs the details of each incoming request (intention, endpoint targeted, request’s hostname at least)
  - Create an authentication middleware to protect access to certain routes (only the DELETE one). It should act like the following : req.user should be populated in order to access the end point. Otherwise, we send back an error to the client.

# Requirementts

- Read and write book data from/to the "library.json" file for persistence.
- Write code to validate and sanitize incoming data for book creation and updates.
- Include error handling middleware to handle 404 (Not Found) and 500 (Internal Server Error) errors gracefully.
- Use ES6 syntax and features wherever applicable (arrow functions, destructuring, etc.).
- Organize your code into separate modules/files for better code management.
- Write clear and concise documentation for each endpoint, including expected request/response formats.
- Test your API using a REST client (e.g., Postman) to ensure the endpoints work as expected.
- Demonstrate proper error handling for edge cases, such as invalid requests or missing book entries.
- Only the async/await syntax is allowed to ensure a proper handling of the asynchronous code 

  Note: In this project, the local JSON file will serve as a basic database for simplicity. Focus on implementing the server-side functionality, efficient data retrieval and manipulation, middleware usage, and error handling.

