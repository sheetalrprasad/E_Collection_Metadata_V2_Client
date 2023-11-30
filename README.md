# Getting Started with Metadata App

### Running Code on Local 
1. Start Server Before this Client. (<a href="https://github.com/sheetalrprasad/E_Collection_Metadata_V2_Server">Server</a>)
2. Install Node and NPM (https://nodejs.org/en/download)
3. Check installation 
    
    `node -v`
    
    `npm -v`
4. Clone this repository and To get the latest code run `git pull` then Go to the project directory
5. Run `npm install` or `npm i` to install on dependency
6. Run command `npm run start`


### Changes for Production/Local
1. Once the code is ready for deployment, change the base URL in `/api`, file: `axios.js` to reflect the URL where the backend is deployed
2. Add the same URL in the package.json for `allowedHosts` and the front-end deployment link as `homepage`
3. For local keep it `http://localhost:PORT`
4. Backend PORT is assigned `3001` and frontend port is `3000`


### Adding Columns
1. Every Table display has it's own folder
2. In the home page of each folder a `<td>` tag can be added for new columns in the `<table>` tag
3. The Edit and Add form within these folders can be edited to add the new field in the submit `<form>`
