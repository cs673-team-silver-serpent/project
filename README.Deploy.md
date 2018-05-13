### Deploying the Server

#### Procure a Digital Ocean "Droplet"

Project Portal is hosted on a Ubuntu 14.04 "Droplet" on Digital Ocean.

#### Building the MEAN stack
Once the service is procured, you must build the MEAN stack on the droplet. Follow the steps on How to Install a MEAN.JS Stack on an Ubuntu 14.04 Server.
Install MongoDB and Node, meaning follow the instructions up to the point of the section "Install the Rest of the Components with NPM, Git, and Bower." DO NOT install the sample project described in "Install the Rest . . . "; proceed to "Clone Project Portal 'Prod'" Branch below.

#### Clone Project Portal "Prod" Branch

The next step is to install the "prod" branch of Project Portal. SSH into Digital Ocean, or open a console from within your DO droplet dashboard. (NOTE: You must have Git installed to do this step.) The steps to do this are:

1.  Change directory to `opt` (`cd /opt`)
2. `git clone https://github.com/cs673-team-silver-serpent/project.git`
3. `git checkout prod`
4. Change directory to `project`. (`cd ./project`)
5. `npm install`

#### Configure MongoDB

##### Establish a dedicated MongoDB owner
Do not run MongoDB as root. Create a dedicated user to do this. For example, 'bob'. Then make sure that bob owns the MongoDB database file.

1. `useradd bob`
2. `sudo chown bob /data/db`

##### Set up user authentication in MongoDB

1. Import project-portal database: `mongoimport --db project-portal-test --collection projects project-portal-test.data.json`
2. Start mongo without access control `mongod --port 27017 --dbpath /data/db`
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
5. Kill Mongo instance and log back in as user administrator:
   `mongod --auth --port 27017 --dbpath /data/db`
6. Connect to Mongo as user administrator:
   `mongo --port 27017 -u "userAdministrator" -p "abc123" --authenticationDatabase "project-portal-test"`
7. Create projects admin user:
  ```
  use projects
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
`mongo --port 27017 -u "projectsAdmin" -p "xyz123" --authenticationDatabase "projects"`

##### Edit DB connections file

Change the DB connection file at `/opt/project/config/default.json` to read:

```
{
    "dbHost" : "mongodb://projectAdmin:xyz123@67.207.83.83:27017/project-portal-test?authSource=project-portal-test"
}
```

MongoDB is no ready to run with user authenticationDatabase

##### Restart Mongo with user authenticationDatabase

1. Kill the current instance of MongoDB.
2. Switch user, in order not to run Mongo DB as as root: `su bob`
2. Start Mongo with user authentication:
`mongod --auth --port 27017 --dbpath /data/db`


### Start the server

From within `\opt\project`, run `npm start.` The server is now up and running.

<!-- links -->
[Digital Ocean]: (https://www.digitalocean.com/products/droplets/)
[How to Install a MEAN.JS Stack on an Ubuntu 14.04 Server]: (https://www.digitalocean.com/community/tutorials/how-to-install-a-mean-js-stack-on-an-ubuntu-14-04-server)
