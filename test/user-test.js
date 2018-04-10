// during test set env variable to test
process.env.NODE_ENV = 'test';

let mongo = require('mongoose');
let User = require('../models/users-model');

// require dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http'); // needed for REST calls
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
var expect = chai.expect;

// Users block
describe('Users Tests', () => {
    
    /************************************/
    // clear test DB before every test
    /************************************/

    after((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    /************************************/
    // TEST add user with all required fields
    /************************************/

    describe('Add user, all required fields', () => {
        it('it should POST a new user with all required fields', (done) => {
            let user = {
                firstName: "Thomas",
                lastName: "Jefferson",
                email: "tom@foundingfathers.com",
                password: "S@lly#3m!"
            }
            chai.request(server)
            .post('/user')
            .send(user)
            .end((error,response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have
                  .property("message")
                    .and.to.be.eql("User added successfully.");
                done();
            });
        });
    });


    /************************************/
    // TESTS find routes
    // Note: add one user only, then test all "find" endpoints
    /************************************/

    describe('Find user by firstName', () => {
        it('it should find user by firstName', (done) => {
            chai.request(server)
            .post('/user/firstName')
            .send({firstName:'Thomas'})
            .end((error,response) => {
                response.should.have.status(200);
                response.should.be.a('object');
                response.body.should.be.eql(
                    [
                        {
                            "firstName": "Thomas",
                            "lastName": "Jefferson",
                            "email": "tom@foundingfathers.com",
                            "favorites": [],
                            "myProjects": [],
                            "__v": 0
                        }
                    ]
                );
                    done();
            });
        });
    });


    describe('Find user by partial firstName', () => {
        it('it should find user by partial firstName', (done) => {
            chai.request(server)
            .post('/user/firstName')
            .send({firstName:'Thom'})
            .end((error,response) => {
                response.should.have.status(200);
                response.should.be.a('object');
                response.body.should.be.eql(
                    [
                        {
                            "firstName": "Thomas",
                            "lastName": "Jefferson",
                            "email": "tom@foundingfathers.com",
                            "favorites":[],
                            "myProjects":[],
                            "__v": 0
                        }
                    ]
                );
                    done();
            });
        });
    });

    describe('Find user with wrong string in firstName', () => {
        it('it should not find a user with wrong firstName', (done) => {
            chai.request(server)
            .post('/user/firstName')
            .send({firstName:'Tom'})
            .end((error,response) => {
                response.should.have.status(200);
                expect(response.body.message).to.include("Failed to find user.");
                expect(response.body.success).to.be.false;
                done();
            });
        });
    });



    describe('Find user by lastName', () => {
        it('it should find user by lastName', (done) => {
            chai.request(server)
            .post('/user/lastName')
            .send({lastName:'Jefferson'})
            .end((error,response) => {
                response.should.have.status(200);
                response.should.be.a('object');
                response.body.should.be.eql(
                    [
                        {
                            "firstName": "Thomas",
                            "lastName": "Jefferson",
                            "email": "tom@foundingfathers.com",
                            "favorites":[],
                            "myProjects":[],
                            "__v": 0
                        }
                    ]
                );
                    done();
            });
        });
    });


    describe('Find user by partial lastName', () => {
        it('it should find user by partial lastName', (done) => {
            chai.request(server)
            .post('/user/lastName')
            .send({lastName:'Jeff'})
            .end((error,response) => {
                response.should.have.status(200);
                response.should.be.a('object');
                response.body.should.be.eql(
                    [
                        {
                            "firstName": "Thomas",
                            "lastName": "Jefferson",
                            "email": "tom@foundingfathers.com",
                            "favorites":[],
                            "myProjects":[],
                            "__v": 0
                        }
                    ]
                );
                    done();
            });
        });
    });

    describe('Find user with wrong string in lastName', () => {
        it('it should not find a user with wrong lastName', (done) => {
            chai.request(server)
            .post('/user/firstName')
            .send({larstName:'Jeffrson'})
            .end((error,response) => {
                response.should.have.status(200);
                expect(response.body.message).to.include("Failed to find user.");
                expect(response.body.success).to.be.false;
                done();
            });
        });
    });


    describe('Add user, all fields', () => {
        it('it should POST a new user with all required fields', (done) => {
            let user = {
                firstName: "Thomas",
                lastName: "Jefferson",
                email: "tom@foundingfathers.com",
                password: "S@lly#3m!",
                title: "President",
                favorites: "5abbeddc27799d969054b989",
                role: "user"
            }
            chai.request(server)
            .post('/user')
            .send(user)
            .end((error,response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have
                  .property("message")
                    .and.to.be.eql("User added successfully.");
                done();
            });
        });
    });


   describe('Add user with missing firstName should fail', () => {
     it('it should respond that "firstName is required"', (done) => {
        let user = {
            firstName: "",
            lastName: "Jefferson",
            email: "tom@foundingfathers.com",
            password: "S@lly#3m!"
        }
        chai.request(server)
        .post('/user')
        .send(user)
        .end((error,response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            expect(response.body.message).to.include("`firstName` is required");
            expect(response.body.success).to.be.false;
            done();
        });
     });
  });


  describe('Add user with missing lastName should fail', () => {
    it('it should respond that "lastName is required"', (done) => {
       let user = {
           firstName: "Thomas",
           lastName: "",
           email: "tom@foundingfathers.com",
           password: "S@lly#3m!"
       }
       chai.request(server)
       .post('/user')
       .send(user)
       .end((error,response) => {
           response.should.have.status(200);
           response.body.should.be.a('object');
           expect(response.body.message).to.include("`lastName` is required");
           expect(response.body.success).to.be.false;
           done();
       });
    });
 });

 describe('Add user with missing email should fail', () => {
    it('it should respond that "email is required"', (done) => {
       let user = {
           firstName: "Thomas",
           lastName: "Jefferson",
           email: "",
           password: "S@lly#3m!"
       }
       chai.request(server)
       .post('/user')
       .send(user)
       .end((error,response) => {
           response.should.have.status(200);
           response.body.should.be.a('object');
           expect(response.body.message).to.include("Failed to create a new user. Error: Emails may not be empty or contain whitespace.");
           expect(response.body.success).to.be.false;
           done();
       });
    });
 });
    
 describe('Add user with empty password should fail', () => {
    it('it should respond that "Passwords may not be empty or contain whitespace."', (done) => {
       let user = {
           firstName: "Thomas",
           lastName: "Jefferson",
           email: "tom@foundingfathers.com",
           password: ""
       }
       chai.request(server)
       .post('/user')
       .send(user)
       .end((error,response) => {
           response.should.have.status(200);
           response.body.should.be.a('object');
           expect(response.body.message).to.include("Passwords may not be empty or contain whitespace.");
           expect(response.body.success).to.be.false;
           done();
       });
    });
 });

 describe('Add user with password < 8 chars should fail', () => {
    it('it should respond that "Passwords must be at least 8 characters long."', (done) => {
       let user = {
           firstName: "Thomas",
           lastName: "Jefferson",
           email: "tom@foundingfathers.com",
           password: "asdf"
       }
       chai.request(server)
       .post('/user')
       .send(user)
       .end((error,response) => {
           response.should.have.status(200);
           response.body.should.be.a('object');
           expect(response.body.message).to.include("Passwords must be at least 8 characters long.");
           expect(response.body.success).to.be.false;
           done();
       });
    });
 });

 describe('Get all users', () => {
    it('it should get all users', (done) => {
        chai.request(server)
        .post('/users')
        .end((error,response) => {
            response.should.have.status(200);
            response.should.be.a('object');
            done();
        });
    });
});


});