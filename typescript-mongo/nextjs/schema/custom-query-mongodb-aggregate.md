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
            "first_name": {
              "$regex": {{first_name}},
              "$options": "i"
            }
          },
          {
            "last_name": {
              "$regex": {{last_name}},
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

- first_name: `string`
- last_name: `string`
