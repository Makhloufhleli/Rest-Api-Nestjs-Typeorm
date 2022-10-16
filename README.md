# Rest-Api-Nestjs-Typeorm
This is a rest api with nodejs FrameWork nestjs using typeorm and mysql database
## Installation
```bash
$ yarn install
```
## Running the app
```bash
# development
$ yarn start
#development watch mode
$ yarn start:dev
# production mode
$ yarn start:prod
```

## Project Structure
 ```
 |-- dist (1)
 |-- node_modules (2)
 |-- src (3)
    |-- config (4)
    |-- constants (5)
    |-- controllers (6)
    |-- exceptions (7)
    |-- middlewares (8)
    |-- models (9)
    |-- repositories (10)
    |-- security (11)
    |-- services (12)
    |-- AppModule.ts (13)
    |-- main.ts (14)
|-- .env(15)
|-- .eslintrc
|-- .prettierrc
|-- .stylelintrc
|-- package.json(16)
|-- README.md
|-- tsconfig.json
|-- yarn.lock
```
(1) : This folder contains the compiled code of the project.

(2) : This folder contains all the dependencies of the project.

(3) : This folder contains all the source code of the project.

(4) : This folder contains all the configuration files of the project.

(5) : This folder contains all the constants of the project.

(6) : This folder contains all the controllers of the project.

(7) : This folder contains all the exceptions of the project.

(8) : This folder contains all the middlewares of the project.

(9) : This folder contains all the models of the project.

(10) : This folder contains all the repositories of the project.

(11) : This folder contains all the security files of the project.

(12) : This folder contains all the services of the project.

(13) : This file contains the root module of the project.

(14) : This file contains the entry point of the project.

(15) : This file contains all the environment variables of the project.

(16) : This file contains all the dependencies of the project.

---

## Technologies used
- [Nestjs](https://nestjs.com/)
- [Typeorm](https://typeorm.io/#/)
- [Mysql](https://www.mysql.com/)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)