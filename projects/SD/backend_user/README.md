Use the project created in SD1.2

Install additional packages using VSCode’s integrated terminal

Run the npm install command to install sequelize pg dotenv packages

Also install the dev dependencies using the command npm install --save-dev nodemon sequelize-cli

Initialize the project with the sequelize-cli using the command npx sequelize-cli init

This will create multiple folders ( models, migrations, seeders, config ) in your existing project

Create an account on Supabase & follow the steps shown in the video to create an organization & project

Create a new file named .env and populate the values from Supabase project settings

Edit the config.js file to use environment variables from the .env

Create a folder named /lib , add a new file sequelize.js to instantiate sequelize

Edit the package.json file to add development scripts
