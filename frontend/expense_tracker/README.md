<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

########################################################################################
# Introduction 
EXPENSETRACKER

# Technology Stack
1.  React / Redux / Hook / Trunk / MUI
2.  node.js / Express
3.  Docker

# Setup Development Environment
1.  node.js
2.  Docker Desktop and Docker Compose
3.  VS Code
4.  SQL Server Management Studio

# Build and Test
1.  Initialize database (First time only)

    1.  (First time only) Create Persistent Volume for Database
    
        ```docker volume create dev-db-vol```

    2.  Start Local MS SQL Database 

        ```
        docker run --rm \
          -v dev-db-vol:/var/opt/mssql \
          -p 1433:1433 \
          -e ACCEPT_EULA=Y \
          -e SA_PASSWORD='!SqlPass1234' \
          --name dev-db \
          mcr.microsoft.com/mssql/server:2019-CU8-ubuntu-16.04
        ```

    3.  Connect to local development database using SSMS:

        ```
        Server Name: localhost,1433
        Authentication: SQL Server Authentication
        Login: sa
        Password: !SqlPass1234
        ```

    4.  (First time only) Create database for this app via SSMS:
    
        ```create database EXPENSETRACKER```

    5.  If the database schema is updated, apply the patches stored under the ```mssql/```  directory.

        Note: consider automatic schema migration when team size grows, or the code will be deployed by user themselves.

    6.  The database can be stopped by issuing Ctrl-C from the terminal that runs step 1.2, or by running this command:

        ```
        docker stop dev-db
        ```


2.  Run database

        ```
        docker run --rm \
          -v dev-db-vol:/var/opt/mssql \
          -p 1433:1433 \
          -e ACCEPT_EULA=Y \
          -e SA_PASSWORD='!SqlPass1234' \
          --name dev-db \
          mcr.microsoft.com/mssql/server:2019-CU8-ubuntu-16.04
        ```

3.  Restore packages (First time only)

    1.  Execute ```npm ci``` in the backend/ folder.
    2.  Execute ```npm ci``` in the frontend_admin/ folder.
    3.  Execute ```npm ci``` in the frontend_user/ folder.

4.  Run backend.

    Change to the backend/ folder.

    Backend can be executed by ```npm run adminapp``` or ```npm run userapp``` via ts-node without compilation.

    Backend source code can be linted by ```npm run build```.

    Customize the ```DOTENV_CONFIG_PATH``` to customize environment for development. During development, the backend is expected to listen localhost port 8080 (non-ssl), and browser will reach frontend directly, and proxy API requests to backend.

    ```
    cd backend/
    DOTENV_CONFIG_PATH=./.env.dev npm run adminapp
    ```

    ```
    cd backend/
    DOTENV_CONFIG_PATH=./.env.dev npm run userapp
    ```

5.  Run frontend.

    There are two frontend projects.

    Frontend for administrative operations is located under frontend_admin/ . Frontend for end users (customers) is located under frontend_user/ . They are built and run separately.

    Under the desired frontend project folder, running  ```npm start``` will build project automatically. For example, do this to start the development server for admin frontend:

    ```
    cd frontend_admin/
    npm start
    ```

    During development, the frontend is expected to listen localhost port 3000 (non-ssl), and proxy API requests to backend (localhost:8080, non-ssl).

    In production, frontends are served by backend express.js directly. The backend project is 

# Package and Deploy

1.  Build and package docker image using docker build. The single Dockerfile includes executables for admin web app, user web app and console jobs.

    ```docker build . -f Dockerfile -t mern-ncs-ri```

2.  Push to Azure Container Registry

    Built images are pushed to ```polyuitsncsts.azurecr.io/itsncs-mernri```. Build and push steps are automated in Azure Pipeline.

3.  Deploy to OpenShift

    Deploy the application to openshift using openshift/kubernetes configuration files. A sample configuration file for admin web app in UAT environment is included in the openshift/ folder. Customize it to fit for the application. -->


start backend server

-> cd to backend folder
-> npm run dev
-> runs at port 8080
