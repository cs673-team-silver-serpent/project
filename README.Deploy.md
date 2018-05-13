### Deploying the Server

#### Procure a Digital Ocean "Droplet"

Project Portal is hosted on a Ubuntu 14.04 "Droplet" on <a href="https://www.digitalocean.com/products/droplets/">Digital Ocean</a>.

#### Building the MEAN stack
Once the service is procured, you must build the MEAN stack on the droplet. Follow the steps from <a href="https://www.digitalocean.com/community/tutorials/how-to-install-a-mean-js-stack-on-an-ubuntu-14-04-server">How to Install a MEAN.JS Stack on an Ubuntu 14.04 Server</a>. Install MongoDB and Node, meaning follow the instructions up to the point of the section "Install the Rest of the Components with NPM, Git, and Bower." DO NOT install the sample project described in "Install the Rest . . . "; proceed to "Clone Project Portal 'Prod' Branch" below.

#### Clone Project Portal "Prod" Branch

The next step is to install the "prod" branch of Project Portal. SSH into Digital Ocean, or open a console from within your DO droplet dashboard. (NOTE: You must have Git installed to do this step.) The steps to do this are:

1.  Change directory to `opt` (`cd /opt`)
2. `git clone https://github.com/cs673-team-silver-serpent/project.git`
3.  Change directory to `project`. (`cd ./project`)
4. `git checkout prod`
5. `npm install`

#### Configure MongoDB

##### Establish a dedicated MongoDB owner
Do not run MongoDB as root. Create a dedicated user to do this. For example, 'bob'. Then make sure that bob owns the MongoDB database file.

1. `useradd bob`
2. `sudo chown bob /data/db`
3. `su bob`

##### Set up user authentication in MongoDB

1. Import the project-portal database:
   `mongoimport --db project-portal-test --collection projects project-portal-test.data.json`
2. Start mongo without access control
   `mongod --port 27017 --dbpath /data/db`
3. Connect to Mongo: `mongo --port 27017`
4. Create the user administrator:
```
use project-portal-test
db.createUser(
  {
    user: "userAdministrator",
    pwd: "abc123",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```
5. Kill mongod instance, and the run it with user authentication:
   `mongod --auth --port 27017 --dbpath /data/db`
6. Connect to Mongo as user administrator:
   `mongo --port 27017 -u "userAdministrator" -p "abc123" --authenticationDatabase "admin"`
7. Create projects admin user:
  ```
  use project-portal-test
  db.createUser(
    {
      user: "projectsAdmin",
      pwd: "xyz123",
      roles: [ { role: "readWrite", db: "test" },
               { role: "read", db: "reporting" } ]
    }
  )
  ```
8. To test if user is active:
`mongo --port 27017 -u "projectsAdmin" -p "xyz123" --authenticationDatabase "project-portal-test"`

##### Edit DB connections file

Change the DB connection file at `/opt/project/config/default.json` to read:

```
{
    "dbHost" : "mongodb://projectAdmin:xyz123@67.207.83.83:27017/project-portal-test?authSource=project-portal-test"
}
```

MongoDB is no ready to run with user authenticationDatabase

##### Restart Mongo with user authenticationDatabase

1. Kill the current instance of mongod.
2. Make sure that you are logged in as 'bob': `su bob`
2. Start Mongo with user authentication:
`mongod --auth --port 27017 --dbpath /data/db`


### Start the server

From within `\opt\project`, run `nohup npm start &`. The server is now up and running (the `nohup` command will keep it running even when you log out of the shell).
