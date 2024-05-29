# Custom Query for Actor

### Query Name:

`aggActorsCaseInsensitive`

### Query Method:

`GET`

### Query Body:

```json
{
  "aggregate": "actor",
  "pipeline": [
    {
      "$match": {
        "$or": [
          {
            "firstName": {
              "$regex": {{firstName}},
              "$options": "i"
            }
          },
          {
            "lastName": {
              "$regex": {{lastName}},
              "$options": "i"
            }
          }
        ]
      }
    },
    {
      "$group": {
        "_id": null,
        "totalCount": {
          "$sum": 1
        }
      }
    }
  ],
  "cursor": {}
}
```

### Variable Definitions:

- firstName: `string`
- lastName: `string`


# Custom Query for Film

### Query Name:

`aggFilmsCaseInsensitive`

### Query Method:

`GET`

### Query Body:

```json
{
  "aggregate": "film",
  "pipeline": [
    {
      "$match": {
        "$or": [
          {
            "title": {
              "$regex": {{title}},
              "$options": "i"
            }
          },
          {
            "description": {
              "$regex": {{description}},
              "$options": "i"
            }
          }
        ]
      }
    },
    {
      "$group": {
        "_id": null,
        "totalCount": {
          "$sum": 1
        }
      }
    }
  ],
  "cursor": {}
}
```

### Variable Definitions:

- title: `string`
- description: `string`
