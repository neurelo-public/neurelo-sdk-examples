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
  },
  "limit": {{limit}},
  "skip": {{skip}}
}
```

## Variable Definitions:

- firstName: `string`
- lastName: `string`
- limit: `number`
- offset: `number`
