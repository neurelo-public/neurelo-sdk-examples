# Custom Query for Actor

## Query Name:

`aggActorsCaseInsensitive`

## Query Method:

`GET`

## Query Body:

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

## Variable Definitions:

- firstName: `string`
- lastName: `string`
