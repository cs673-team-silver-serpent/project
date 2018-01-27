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

## Software Installation

### [NOTE]: Angular is not yet set up. Detailed instructions to follow . . . .

1. ### Create a local project folder
   For example, Han Solo, a Windows 10 user, might create a folder at `C:\Users\hsolo\Documents\projects_portal`, whereas Chewbacca, a Mac enthusiast, decides to create his at `/Users/chewie/Desktop/project_portal`.
2. ### Install Node.js & NPM
   Requires Node 8.9.4. (NPM is bundled with Node.)
   See [Node.js].
3. ### Install MongoDB
   Requires MongoDB ^3.6.0. (_^_ means  "_at least_ version 3.6.0.")
   See [MongoDB]. Use all defaults, including port 27017.
4. ### Install Git
   See [Atlassian Git Tutorial].
5. ### Change directory into your project folder from the command line.
   Han fires up his Command Prompt and types `chdir C:\Users\hsolo\Documents\projects_portal`. Chewie enters `cd ~\Desktop\project_portal`.
6. ### Clone the [Projects Portal] repository in your project folder
   Both Han and Chewie, from the command line, type `git clone https://github.com/cs673-team-silver-serpent/project.git`.  
7. ### Install npm dependencies
   After the repository cloning finishes, our fearless heroes type `npm install`. This will download all of dependent modules that the project currently uses.
8. ### Test that the server is running
   If all goes well, Chewie will see the obligatory "Hello, world!" message when he types `http:\\127.0.0.1:3000` into his browser's address bar.
9. ### Start MongoDB
   Until this step is automated, you must start MongoDB manually or at startup on your machine. See [MongoDB] for platform-specific instructions.
10. ### (OPTIONAL) Test MongoDB / Express integration
    Download and install [Postman]. You should be able to POST a test product into the database and GET all of the projects in the database, using Postman and the URL `127.0.0.1:3000`. PUSH requires one key, `title`, in the body and takes an optional `description` key.

![GET in Postman][GET]
**Image 1: Using GET in Postman**

![POST in Postman][POST]
**Image 2: Using POST in Postman**

<!-- links -->
[Atlassian Git Tutorial]: https://www.atlassian.com/git/tutorials/install-git
[MongoDB]: https://docs.mongodb.com/manual/administration/install-community/
[Node.js]: https://nodejs.org/en/
[Projects Portal]: https://github.com/cs673-team-silver-serpent/project.git
[GET]: images/GET.png
[POST]: images/POST.png
[Postman]: https://www.getpostman.com/
