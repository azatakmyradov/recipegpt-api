# Recipe Api using text-davinci-002

## Features
Recipe API that generates recipe suggestions using user input and makes a recipe

- Create Recipe suggestions
- Create Recipe for specific meal

---

## Installation

Update .env file with your credentials. 
When APP_ENV is in dev mode it will ignore
CORS. CORS_ALLOWED should include all white listed
origins for production like this:
```
...
CORS_ALLOWED="http://example.com,http://example.xyz"
...
```
```console
cp .env.example .env
```

Install npm packages:
```
npm install
```

Start application on PORT 3000
```
node index.js
```

---

## Configuration

Don't forget to add API KEY and API ORG to the .env file


---
# Contact
Reach out at azat@akmyradov.me