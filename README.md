# Essboard 
## invite member module

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
"email": "qpdiam@gmail.com"}, "project": { "name": "Clinica UNMSM"} }
' 
```