# Library management system: endpoint documentation

## GET all books

- Endpoint:`http://localhost:8000/library`

Fetches all the books contained in the database. Allows different query parameters:

- limit: If specified, request will return only the number of books given.
- sort: If specified, will sort the given field  in the given order.
    syntax: `[title]-[ASC or DSC]`. Asc -> A to Z, DSC -> Z to A
- title: If specified, will return only books with the given title
- author: If specified, will return only books with the given author
- nationality: If specified, will return only books with the given nationality

For exemple: `http://localhost:8000/library?limit=10&sort=title-ASC&author=Oscar%20Wilde` will return the first ten books written by Oscar Wilde with their titles in ascending alphabetical order.

Return schema:
```js
[
  {
    "id": 7,
    "title": "le conte de Monte Cristo",
    "author": "Alexandre Dumas",
    "nationality": "French"
  },
  {...}
]
```


## GET one book by id

- Endpoint:`http://localhost:8000/library:id`

Returns the book with the corresponding id.

Return schema:
```js
[
  {
    "id": 7,
    "title": "le conte de Monte Cristo",
    "author": "Alexandre Dumas",
    "nationality": "French"
  }
]
```

## POST one book

- Endpoint:`http://localhost:8000/library`

Adds one book to the database. Returns the created book object from the database.

Request body schema:
```js
{
  "title": "Au Bonheur des Dames",
  "author": "Emile Zola",
  "nationality": "French"
}
```

Return schema:
```js
{
  "id": 13,
  "title": "Au Bonheur des Dames",
  "author": "Emile Zola",
  "nationality": "French"
}
```

## PUT one book

- Endpoint:`http://localhost:8000/library/:id`

Updates the book with the corresponding id. Returns the updated book object from the database.


Request body schema:
```js
{
  "title": "The Metamorphosis",
  "author": "Franz Kafka",
  "nationality": "German"
}
```

Return schema:
```js
{
  "id": 6,
  "title": "The Metamorphosis",
  "author": "Franz Kafka",
  "nationality": "German"
}
```

## DELETE one book

- Endpoint:`http://localhost:8000/library/:id`

Deletes the book with the corresponding id. **Warning**: This is a protected route that can only be accessed with a bearer token (put anything in there, all that matters is that there is something).

Returns either "Book :id has been deleted" if you have the correct authorisation, or "Unauthorised access on protected route" if you don't.



