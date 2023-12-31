# 🚀 Test your front-end with a Real API
## Books-Api is a Dummy/Fake API that provides JSON data to use in your Development or in Testing.

* 🔥 Fake data: No more sample data creation. We've got it covered.
* 🔥 Always-on: The API is deployed in an Amazon EC2 Virtual Server. You get 24/7 free access.
* 🔥 Real responses: GET, POST, PUT & DELETE requests are supported.

## How to run locally

You don't need to run the project locally. If you just want to make calls to the API, jump to the next section.

1. Install MongoDB v5.0 or newer on your local machine.
1. Clone the current repo in a local folder.
1. Add a .env file at the root of the project with the following env variables:
```
MONGODB_URI=YOUR_MONGODB_URI
TOKEN_SECRET_STRING=YOUR_TOKEN_SECRET_STRING
COOKIES_SECRET_STRING=YOUR_COOKIES_SECRET_STRING
```
4. Update the app settings in the appConfig.json file, according to your preferences.
5. Run `npm install` inside your project folder.
6. Run `npm run dev` to run the development server on the port indicated in appConfig.json

## How to make calls to the Public API on the Web.

1. The current base API URL is the following:
```
http://ec2-44-202-5-84.compute-1.amazonaws.com:4000
```
2. Every endpoint will be mounted after the base URL, as follows:
```
http://ec2-44-202-5-84.compute-1.amazonaws.com:4000/api/genres?page=4&limit=5
```
3. You can use fetch, axios or any other library to make requests.

## API REFERENCE

### 🥇 Resource: Genres

#### GET /api/genres

Query params: `page` and `limit`

> Note: All results based on lists are paginated. The response will include the results in a "docs" array, along with pagination info. Page and limit params are optional. If you don't send these params, the response will default to page=1 and limit=max_limit. max_limit is defined in the appConfig.json file of the project. Any limit param higher than max_limit will be set to max_limit.  

Example:
```
<Base API URL>/api/genres?page=4&limit=5
```

<details>
  <summary>Response:</summary>

```jsonc
{
    "error": null,
    "ok": true,
    "status": 200,
    "message": "Success",
    "data": {
        "genres": {
            "docs": [
                {
                    "_id": "651876f3c4893be07f069ea7",
                    "name": "Travel",
                    "createdAt": "2023-09-30T19:28:51.596Z",
                    "updatedAt": "2023-09-30T19:28:51.596Z",
                    "__v": 0,
                    "id": "651876f3c4893be07f069ea7"
                },
                {
                    "_id": "651876f8c4893be07f069eab",
                    "name": "Humor",
                    "createdAt": "2023-09-30T19:28:56.366Z",
                    "updatedAt": "2023-09-30T19:28:56.366Z",
                    "__v": 0,
                    "id": "651876f8c4893be07f069eab"
                },
                {
                    "_id": "651878d86e745ce093109bbf",
                    "name": "Personal Development",
                    "createdAt": "2023-09-30T19:36:56.931Z",
                    "updatedAt": "2023-09-30T19:36:56.931Z",
                    "__v": 0,
                    "id": "651878d86e745ce093109bbf"
                }
            ],
            "totalDocs": 18,
            "limit": 5,
            "totalPages": 4,
            "page": 4,
            "pagingCounter": 16,
            "hasPrevPage": true,
            "hasNextPage": false,
            "prevPage": 3,
            "nextPage": null
        }
    }
}
```

</details>

#### POST /api/genres/new

Request body params:
```javascript
{
	name: string
}
```

Example:
```javascript
const { data } = await axios.post('<Base API URL>/api/genres/new', {
	name: 'Custom Genre'
});
```
<details>
  <summary>Response:</summary>

```jsonc
{
    "error": null,
    "ok": true,
    "status": 200,
    "message": "Success",
    "data": {
        "genre": {
            "name": "Custom Genre",
            "_id": "651b09786b9439626581e78e",
            "createdAt": "2023-10-02T18:18:33.004Z",
            "updatedAt": "2023-10-02T18:18:33.004Z",
            "__v": 0,
            "id": "651b09786b9439626581e78e"
        }
    }
}
```

</details>

> Note: Duplicated genre names are not allowed and will return a validation error.

***

### 🥇 Resource: Publishers

#### GET /api/publishers

Query params: `page` and `limit`

Example:
```
<Base API URL>/api/publishers?page=3&limit=5
```
<details>
  <summary>Response:</summary>

```jsonc
{
    "error": null,
    "ok": true,
    "status": 200,
    "message": "Success",
    "data": {
        "publishers": {
            "docs": [
                {
                    "_id": "651873284e3c7c3a726b2ae3",
                    "name": "Drawn and Quarterly",
                    "createdAt": "2023-09-30T19:12:41.156Z",
                    "updatedAt": "2023-09-30T19:12:41.156Z",
                    "__v": 0,
                    "id": "651873284e3c7c3a726b2ae3"
                },
                {
                    "_id": "651873324e3c7c3a726b2ae7",
                    "name": "Akashic Books",
                    "createdAt": "2023-09-30T19:12:50.872Z",
                    "updatedAt": "2023-09-30T19:12:50.872Z",
                    "__v": 0,
                    "id": "651873324e3c7c3a726b2ae7"
                },
                {
                    "_id": "651873424e3c7c3a726b2aeb",
                    "name": "Copper Canyon Press",
                    "createdAt": "2023-09-30T19:13:06.700Z",
                    "updatedAt": "2023-09-30T19:13:06.700Z",
                    "__v": 0,
                    "id": "651873424e3c7c3a726b2aeb"
                },
                {
                    "_id": "6518734d4e3c7c3a726b2aef",
                    "name": "Unnamed Press",
                    "createdAt": "2023-09-30T19:13:17.518Z",
                    "updatedAt": "2023-09-30T19:13:17.518Z",
                    "__v": 0,
                    "id": "6518734d4e3c7c3a726b2aef"
                },
                {
                    "_id": "651873574e3c7c3a726b2af3",
                    "name": "CSIRO Publishing",
                    "createdAt": "2023-09-30T19:13:27.943Z",
                    "updatedAt": "2023-09-30T19:13:27.943Z",
                    "__v": 0,
                    "id": "651873574e3c7c3a726b2af3"
                }
            ],
            "totalDocs": 20,
            "limit": 5,
            "totalPages": 4,
            "page": 3,
            "pagingCounter": 11,
            "hasPrevPage": true,
            "hasNextPage": true,
            "prevPage": 2,
            "nextPage": 4
        }
    }
}
```

</details>

#### POST /api/publishers/new

Request body params:
```javascript
{
	name: string
}
```

Example:
```javascript
const { data } = await axios.post('<Base API URL>/api/publishers/new', {
	name: 'Jo Fletcher Books'
});
```
<details>
  <summary>Response:</summary>

```jsonc
{
    "error": null,
    "ok": true,
    "status": 200,
    "message": "Success",
    "data": {
        "publisher": {
            "name": "Jo Fletcher Books",
            "_id": "651debea403ab79e54994662",
            "createdAt": "2023-10-04T22:49:14.644Z",
            "updatedAt": "2023-10-04T22:49:14.644Z",
            "__v": 0,
            "id": "651debea403ab79e54994662"
        }
    }
}
```

</details>

> Note: Duplicated publisher names are not allowed and will return a validation error.

***

### 🥇 Resource: Books

#### GET /api/books

Query params: `page` and `limit`

> Note: All results based on lists are paginated. The response will include the results in a "docs" array, along with pagination info. Page and limit params are optional. If you don't send these params, the response will default to page=1 and limit=max_limit. max_limit is defined in the appConfig.json file of the project. Any limit param higher than max_limit will be set to max_limit.  

Example:
```
<Base API URL>/api/books?page=2&limit=5
```

<details>
  <summary>Response:</summary>

```jsonc
{
    "error": null,
    "ok": true,
    "status": 200,
    "message": "Success",
    "data": {
        "books": {
            "docs": [
                {
                    "publishInfo": {
                        "date": "2022-10-25T00:00:00.000Z",
                        "publisher": {
                            "_id": "651872794e3c7c3a726b2ab6",
                            "name": "Text Publishing",
                            "createdAt": "2023-09-30T19:09:45.959Z",
                            "updatedAt": "2023-09-30T19:09:45.959Z",
                            "__v": 0,
                            "id": "651872794e3c7c3a726b2ab6"
                        },
                        "edition": 1
                    },
                    "_id": "65188992842790d77dc1db7d",
                    "isbn": "978-0593545768",
                    "title": "Sign Here",
                    "chapters": 18,
                    "pages": 416,
                    "genre": {
                        "_id": "651876f8c4893be07f069eab",
                        "name": "Humor",
                        "createdAt": "2023-09-30T19:28:56.366Z",
                        "updatedAt": "2023-09-30T19:28:56.366Z",
                        "__v": 0,
                        "id": "651876f8c4893be07f069eab"
                    },
                    "price": {
                        "$numberDecimal": "22.5"
                    },
                    "isRemovable": false,
                    "createdAt": "2023-09-30T20:48:18.968Z",
                    "updatedAt": "2023-09-30T20:48:18.968Z",
                    "__v": 0,
                    "id": "65188992842790d77dc1db7d"
                }
            ],
            "totalDocs": 6,
            "limit": 5,
            "totalPages": 2,
            "page": 2,
            "pagingCounter": 6,
            "hasPrevPage": true,
            "hasNextPage": false,
            "prevPage": 1,
            "nextPage": null
        }
    }
}
```

</details>

#### POST /api/books/new

Request body params:
```javascript
{
    "isbn": string,
    "title": string,
    "chapters": number,
    "pages": number,
    "genre": genreId,
    "publishInfo": {
        "date": string,
        "publisher": publisherId,
        "edition": number
    },
    "price": number
}
```

Example:
```javascript
const { data } = await axios.post('<Base API URL>/api/books/new', {
    "isbn": "9781447268987",
    "title": "Station Eleven",
    "chapters": 12,
    "pages": 360,
    "genre": "6518769dc4893be07f069e8f",
    "publishInfo": {
        "date": "2014-09-01",
        "publisher": "651872674e3c7c3a726b2ab2",
        "edition": 2
    },
    "price": 25.99
});
```
<details>
  <summary>Response:</summary>

```jsonc
{
    "error": null,
    "ok": true,
    "status": 200,
    "message": "Success",
    "data": {
        "publisher": {
            "name": "Jo Fletcher Books",
            "_id": "651debea403ab79e54994662",
            "createdAt": "2023-10-04T22:49:14.644Z",
            "updatedAt": "2023-10-04T22:49:14.644Z",
            "__v": 0,
            "id": "651debea403ab79e54994662"
        }
    }
}
```

</details>

> Note: `genre` and `publisher` properties (in the request body params object) must be valid ids from `api/genres` and `api/publishers` endpoints. The `date` property must be a string with the `YYYY-MM-DD` format. All properties must have the right data types, otherwise the call will return a validation error.