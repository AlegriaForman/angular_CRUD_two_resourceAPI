##angular_CRUD_two_resourceAPI

1. Type 'mongod' in your terminal to engage MongoDB.
2. Open another terminal, in the root directory and type 'gulp' to engage webpack and compile your app.  Then type 'node server.js' to initiate your client server.
3. Open another terminal, go to the server folder and type 'node index.js' to initiate the back-end server.
4. Open your browser and type 'localhost:5000' to your browser address bar.
5. CRUD operations are performed by clicking the 'Create', 'Edit', 'Update' and 'Delete' buttons.
6. To ensure data are being saved in the database, open a new terminal and type 'mongo'.  Type 'show dbs', then type 'use db'. Type 'show collections', then type 'db.jawas.find()' to list jawas documents or 'db.droids.find()' to list droids documents.

##Add Protractor-Test and other linter tests
- Type 'gulp protractor:test'. Make sure to press 'control C' before running another test.

##Other tests
- Simply type 'gulp test' to run ['protractor:test', 'webpack:protractor']. Make sure to press 'control C' before running another test.
- Type 'gulp build:dev' to run ['webpack:dev', 'static:dev'].
- Type ' gulp lint' for eslint tests.
- Or type 'gulp' to run all. Make sure to press 'control C' before running another test.

####Please note that you may occasionally have an ECONNREFUSED error on the selenium server when running a test. To terminate the selenium server, make sure to type 'ps ax | grep selenium' on the terminal, then type ' kill 4752' (the number from your grep) before performing another test.
