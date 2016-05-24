##Refactor Your Two Resource App to use Directives and add Sass

1. Open a terminal and type 'npm install'
2. Type 'mongod' in your terminal to engage MongoDB.
3. Open another terminal, in the root directory and type 'gulp' to engage webpack and compile your app.  Then type 'node server.js' to initiate your client server.
4. Open another terminal, go to the server folder and type 'node index.js' to initiate the back-end server.
5. Open your browser and type 'localhost:5000' to your browser address bar.
6. CRUD operations are performed by clicking the 'Create', 'Edit', 'Update' and 'Delete' buttons.
7. To ensure data are being saved in the database, open a new terminal and type 'mongo'.  Type 'show dbs', then type 'use db'. Type 'show collections', then type 'db.jawas.find()' to list jawas documents or 'db.droids.find()' to list droids documents.

##First run by typing 'gulp' - make you are in the 'aliforman' folder
- Type 'gulp' to run all tests. Make sure to press 'control C' in order to close MongoDb and the servers properly.

##Add Karma to run unit tests only - make you are in the 'aliforman' folder
- Type 'gulp webpack:karma' for unit testing.
- Then type 'karma start'.

#### Please note that you may occasionally have an ECONNREFUSED error on the selenium server when running a test. To terminate the selenium server, make sure to type 'ps ax | grep selenium' on the terminal, then type ' kill 4752' (the number from your grep) before performing another test.
