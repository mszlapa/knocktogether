Here are the steps to get it working:

To install necessary software: 
1. install  node from http://nodejs.org/ - there is one click windows installer available
    if installed node via Visual Studio it might be a very old version 

2. One time install of dependencies, run 2 commands:
     npm install -g gulp 
     npm install 
   in the DynamicFormsDirectory. npm binary comes with nodejs, it should be added to your PATH by installer    

To run it after you installed just run:
     gulp 
   in the DynamicForms Directory   
   
   local browser runs at http://localhost:4000
   
   
If it does not work, make sure that the following directory is in your PATH:

C:\Users\username\AppData\Roaming\npm