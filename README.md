     _____                      ____  _ _                  ____                             _   
    |_   _|__  __ _ _ __ ___   / ___|(_) |_   _____ _ __  / ___|  ___ _ __ _ __   ___ _ __ | |_
      | |/ _ \/ _` | '_ ` _ \  \___ \| | \ \ / / _ \ '__| \___ \ / _ \ '__| '_ \ / _ \ '_ \| __|
      | |  __/ (_| | | | | | |  ___) | | |\ V /  __/ |     ___) |  __/ |  | |_) |  __/ | | | |_
      |_|\___|\__,_|_| |_| |_| |____/|_|_| \_/ \___|_|    |____/ \___|_|  | .__/ \___|_| |_|\__|
                                                                          |_|                   

# Projects Portal
 _**Projects Portal**_ (working title), aims to help Computer Science students and instructors to keep track of software development projects. This repository contains Team Silver Serpent's class project for BU Met College CS672 (Spring 2018).

## Software Stack
1. ### Front-end
   Angular 2 (to create a sleek, responsive front-end)
2. ### Middleware
   Express (for routing and REST calls)
3. ### Back-end
   MongoDB
4. ### Runtime
   Node.js
5. ### Testing Framework
   Mocha + Chai
6. ### UI Component Framework
   AngularJS Material

## Software Installation

1. ### Create a local project folder
   For example, Han Solo, a Windows 10 user, might create a folder at `C:\Users\hsolo\Documents\project_portal`, whereas Chewbacca, a Mac enthusiast, decides to create his at `/Users/chewie/Desktop/project_portal`.
2. ### Install Node.js & NPM
   Requires Node 8.9.4. (NPM is bundled with Node.)
   See [Node.js].
3. ### Install MongoDB
   Requires MongoDB ^3.6.0. (_^_ means  "_at least_ version 3.6.0.")
   See [MongoDB]. Use all defaults, including port 27017.
   After starting the mongo server, load the test data by typing
   `mongoimport --db project-portal-test --collection projects -file project-portal-test.data.json`.
4. ### Install Git
   See [Atlassian Git Tutorial].
5. ### Change directory into your project folder from the command line.
   Han fires up his Command Prompt and types `chdir C:\Users\hsolo\Documents\projects_portal`. Chewie enters `cd ~\Desktop\project_portal`.
6. ### Clone the [Projects Portal] repository in your project folder
   Both Han and Chewie, from the command line, type `git clone https://github.com/cs673-team-silver-serpent/project.git`.  
7. ### Install npm dependencies
   After the repository cloning finishes, our fearless heroes type `npm install` from inside of their project folders. This will download all of dependent modules that the backend currently uses. They'll then change directory into `project-angular-src`, and do another `npm install` to install the frontend dependencies.
8. ### Start MongoDB
   Until this step is automated, you must start MongoDB manually or at startup on your machine. See [MongoDB] for platform-specific instructions.
9. ### Start the backend server
   Inside of this project folder, Chewie types `npm start`. Then accept the self signed cert error and you should see the "Welcome to Projects Portal!" message from `https:\\127.0.0.1:3000`.
10. ### Start the frontend server
    Chewie changes directory into `project-angular-src`, and fires up the dev server by typing `ng serve`. He can then see the project portal&mdash;with its two records and admittedly simple stylesheet&mdash;on `http://localhost:4200`.

    

<!-- links -->
[AngularJS Material]: https://material.angular.io/
[Atlassian Git Tutorial]: https://www.atlassian.com/git/tutorials/install-git
[MongoDB]: https://docs.mongodb.com/manual/administration/install-community/
[Node.js]: https://nodejs.org/en/
[Projects Portal]: https://github.com/cs673-team-silver-serpent/project.git
