# NODE JS SQL Package

## What is this ?
This is a package for working with sql databases! It has some methods (which will increase in future) to help you connect with your database and operate your actions.

## How to use ? 
- Clone it to your project

```cmd
git clone https://github.com/Codidodido/nodejs-sql.git
```

- Require the config file and new it

```js
const SQL = require (path/config)
const sql = new SQL({
    host: 'YourHost',
    user: 'YourUser',
    password: 'YourPassword',
    database: 'YourDatabase'
})
```

Use methods. It is easy to understand.