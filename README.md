# angular_CRUD_two_resourceAPI

1. Type 'mongod' in your terminal to engage MongoDB.
2. Open another terminal, in the root directory and type 'gulp' to engage webpack and compile your app.  Then type 'node server.js' to initiate your client server.
3. Open another terminal, go to the server folder and type 'node index.js' to initiate the back-end server.
4. Open your browser and type 'localhost:5000' to your browser address bar.
5. CRUD operations are performed by clicking the 'Create', 'Edit', 'Update' and 'Delete' buttons.
6. To ensure data are being saved in the database, open a new terminal and type 'mongo'.  Type 'show dbs', then type 'use db'. Type 'show collections', then type 'db.jawas.find()' to list jawas documents or 'db.droids.find()' to list droids documents.

#Add Protractor-Test and other linter tests
There is no need to initiate 'mongod', 'client server', and 'back-end server'.
- Simply type 'gulp test' for protractors tests.
- Type 'gulp build:dev' for webpack tests.
- Type ' gulp lint' for eslint tests.
- Or type 'gulp' to run all.
