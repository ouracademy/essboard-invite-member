# Essboard

## invite member module

Deployed on now. Using mjml

## Development

Install and run it `npm install && npm start`

And test it

```
curl \
-X POST "http://localhost:3000/" \
-H "Content-Type: application/json" \
-d '{
"from": { "name": "Arthur"},
"to": {
"email": "qpdiam@gmail.com"},
"project": { "name": "clinica UNMSM", "id": "5c8175d09d87be000f87851f" } }
'
```
