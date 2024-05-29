# Custom Query for Actor

## Query Name:

`findActorsCaseInsensitive`

## Query Method:

`GET`

## Query Body:

```json
{
  "find": "actor",
  "filter": {
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
  },
  "limit": {{limit}},
  "skip": {{skip}}
}
```

## Variable Definitions:

- first_name: `string`
- last_name: `string`
- limit: `number`
- offset: `number`
