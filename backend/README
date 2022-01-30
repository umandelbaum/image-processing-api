1. INTRODUCTION AND FILE STRUCTURE

This readme introduces my Image Processing API.

1.1 THE BACKEND DIRECTORY

To start the server, enter the 'backend' directory.

Install all dependencies with "npm i"

From the backend, directory:
	The server can be started with "npm start" and accessed at http://localhost:300/api
	Linting is performed with "npm run lint"
	Tests are run with "npm run test"
	The build is created with "npm run build"

TO REPEAT: THE SERVER ADDRESS IS http://localhost:300/api

1.2 THE STORAGE DIRECTORY

Images and thumbnails are stored in the 'storage' directory.  
The project was supposed to have a front end which could independtly access the storage directory.
Unfortunately I couldn't figure out the front end.

1.3 LICENSES

Currently there are five images in the directory.  All images are taken from Unsplash.com which is completely free to re-use.  The full license is below:

"Unsplash grants you an irrevocable, nonexclusive, worldwide copyright license to download, copy, modify, distribute, perform, and use photos from Unsplash for free, including for commercial purposes, without permission from or attributing the photographer or Unsplash. This license does not include the right to compile photos from Unsplash to replicate a similar or competing service."

Photo included are by Braden Jarvis, Mohammed Alizade, Omer Salom, and Paul Gilmore.

2. ENDPOINT OVERVIEW

2.1. api
-Returns the message "main api route"

2.2. api/images
-Returns a list of all files in the /storage/images directory as a JSON object of strings

2.3. api/images/<filename>
-Returns a relative path of the file, pointing to the /storage/images directory.  
-Intended to be used by the frontend to load a full-size image from storage
-Returns 404 if the file can't be found
-Example: api/images/image1.jpg returns "../storage/images/image1.jpg"

2.4. api/thumbs
-Returns a list of all files in the /storage/thumbs directory as a JSON object of strings

2.5. api/thumbs/<filename>?width=INTEGER&height=INTEGER
-Returns a relative path to a thumbnail file of a file in /storage/images
-If the thumbnail already exists, simply returns the relative path
-If the thumbnail doesn't exist, creates the thumbnail using Sharp, defaulting to 600x400
-Stores created thumbnails in /storage/thumbs and appends the resolution to the end of the name
-Can create any size thumbnail if 'width' and 'height' are filled in, overriding the defaults
-Returns 404 if the file doesn't exist in /storage/images
-Example: api/thumbs/image1.jpg returns "../storage/images/image1600x400.jpg"
-Example: api/thumbs/image1.jpg?width=300&height=200 returns "../storage/images/image1300x200.jpg"

3. ACKNOWLEDGMENTS

Helper code is taken from the Sharp API documention and the Filesystem documention

Photos, as mentioned above, are taken from Unsplash.com