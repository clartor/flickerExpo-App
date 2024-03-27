> Why do I have a folder named ".expo" in my project?
The ".expo" folder is created when an Expo project is started using "expo start" command.
> What do the files contain?
- "devices.json": contains information about devices that have recently opened this project. This is used to populate the "Development sessions" list in your development builds.
- "settings.json": contains the server configuration that is used to serve the application manifest.
> Should I commit the ".expo" folder?
No, you should not share the ".expo" folder. It does not contain any information that is relevant for other developers working on the project, it is specific to your machine.
Upon project creation, the ".expo" folder is already added to your ".gitignore" file.

# Filmflicker 

A movie-picking mobile application swipeable cards enabling users to indicate their preferences by swiping left or right. 
Adding friends and creating groups where approved titles should go. 

Next movie night is going to be so much easier. 

Featuring React Native Reanimation and gesture handler.

`npm start` 
