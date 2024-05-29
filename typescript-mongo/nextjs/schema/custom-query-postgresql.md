# Custom Query for Actor

## Query Name:

`findActorsCaseInsensitive`

## Query Method:

`GET`

## Query Body:

```sql
SELECT
  *,
  (SELECT COUNT(*) FROM (
    SELECT *
    FROM actor
    WHERE actor.first_name ILIKE {{first_name}}
      OR actor.last_name ILIKE {{last_name}}) dt)
    AS total_count
FROM
  actor
WHERE
  actor.first_name ILIKE {{first_name2}}
  OR actor.last_name ILIKE {{last_name2}}
GROUP BY
  actor_id
LIMIT
  {{ limit }}
OFFSET
  {{ offset }}
```

## Variable Definitions:

- first_name: `string`
- last_name: `string`
- first_name2: `string`
- last_name2: `string`
- limit: `number`
- offset: `number`
