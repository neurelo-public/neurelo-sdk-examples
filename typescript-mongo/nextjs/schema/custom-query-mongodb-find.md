# Custom Query for Actor

### Query Name:

`findActorsCaseInsensitive`

### Query Method:

`GET`

### Query Body:

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

### Variable Definitions:

- firstName: `string`
- lastName: `string`
- limit: `number`
- offset: `number`


# Custom Query for Film

### Query Name:

`findFilmsCaseInsensitive`

### Query Method:

`GET`

### Query Body:

```json
{
  "find": "film",
  "filter": {
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
  },
  "limit": {{limit}},
  "skip": {{skip}}
}
```

### Variable Definitions:

- title: `string`
- description: `string`
- limit: `number`
- offset: `number`
