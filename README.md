# NextNowBackEnd
Backend for NextNow project.Versus Virus Hackathon 

###Requirements 
- NodeJS and NPM: https://nodejs.org/en/download/ 
- MySQL database

###How to run
- Use `npm install` to install all the dependencies
- Add a `.env` file with the following entries:  
    MYSQL_USER=\<database user name>  
    MYSQL_PASSWORD=\<database user password>  
    MYSQL_PATH=\<localhost>  
    MYSQL_DATABASE=\<database name>  
    JWT_SECRET=\<and random string would work>  
    PORT=\<port for the server to run. e.g. 3000>
- `npm start dev` to run the server in development mode


###How to contribute:
- Create a new branch from master with the name of the feature: `git checkout -b <feauture_name>`
- When done, add your changes with `git add <filename>`
- Commit your changes with `git commit` and add a description of your changes
- Push your changes to remote: `git push`
- Open a pull request to master.