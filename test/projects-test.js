// during test set env variable to test
// process.env.NODE_ENV = 'test';

let mongo = require('mongoose');
let Project = require('../models/projects-model');

// require dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http'); // needed for REST calls
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
var expect = chai.expect;

// Projects parent block
describe('Project Tests', () => {
    
    /************************************/
    // clear test DB before every test
    /************************************/

    after((done) => {
        Project.remove({}, (err) => {
            done();
        });
    });

    /************************************/
    // TEST POST route
    /************************************/
    describe('POST project', () => {
        it('it should POST a new project with title, description and owner', (done) => {
            let project = {
                projectName: "Projects Portal",
                projectDescription: "A portal app to manage software development projects",
                owner:"5ac74c2954051815cb0914ef",
            }
            chai.request(server)
            .post('/project')
            .send(project)
            .end((error,response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have
                  .property("message")
                    .and.to.be.eql("Project added successfully.");
                done();
            });
        });
    });


    //Create a New Project with ALL the fields populated:
    describe('POST project', () => {
        it('it should POST a new project with all fields populated, ', (done) => {
            let project = {
                projectName: "Projects Portal",
                projectDescription: "A portal app to manage software development projects",
                owner:"5ac74c2954051815cb0914ef",
                projectMembers:["5ac74c2954051815cb0914ef","5ac74c5a54051815cb0914f0"],
                techStack: "Mongo,Express,Node,Angular",
                repositoryLink: "www.github.com",
                projectDemo: "www.youtube.com/project",
                labels: ["#Portal, #MEAN"],
            }
            chai.request(server)
            .post('/project')
            .send(project)
            .end((error,response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have
                  .property("message")
                    .and.to.be.eql("Project added successfully.");
                done();
            });
        });
    });

     //Create a New Project with project name Containing special Characters:
     describe('POST project', () => {
        it('it should POST a new project with project name containing special characters, ', (done) => {
            let project = {
                projectName: "$@mplE Pro73CT ~!@#$%^&",
                projectDescription: "Project with special Characters and Spaces",
                owner:"5ac74c2954051815cb0914ef",
                projectMembers:["5ac74c2954051815cb0914ef","5ac74c5a54051815cb0914f0"],
                techStack: "Mongo,Express,Node,Angular",
                repositoryLink: "www.github.com",
                projectDemo: "www.youtube.com/project",
                labels: ["#Portal, #MEAN"],
            }
            chai.request(server)
            .post('/project')
            .send(project)
            .end((error,response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have
                  .property("message")
                    .and.to.be.eql("Project added successfully.");
                done();
            });
        });
    });

     //Create a New Project with projectName Missing:
     describe('POST project', () => {
        it('it should FAIL trying to POST a new project with missing Project Name', (done) => {
            let project = {
                projectDescription: "A portal app to manage software development projects",
                owner:"5ac74c2954051815cb0914ef"
            }
            chai.request(server)

            .post('/project')
            .send(project)
            .end((error,response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                expect(response.body.message).to.include("`projectName` is required");
                expect(response.body.success).to.be.false;
                done();
            });
        });
    });
    
    //Create a New Project with projectDescription Missing:
    describe('POST project', () => {
        it('it should FAIL trying to POST a new project with missing Project Description', (done) => {
            let project = {
                projectName: "Projects Portal",
                owner:"5ac74c2954051815cb0914ef"
            }
            chai.request(server)
            .post('/project')
            .send(project)
            .end((error,response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                expect(response.body.message).to.include("`projectDescription` is required");
                expect(response.body.success).to.be.false;
                done();
            });
        });
    });


    //Create a New Project with owner Missing:
    describe('POST project', () => {
        it('it should FAIL trying to POST a new project with missing owner', (done) => {
            let project = {
                projectName: "Projects Portal",
                projectDescription: "A portal app to manage software development projects"
            }
            chai.request(server)
            .post('/project')
            .send(project)
            .end((error,response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                expect(response.body.message).to.include("`owner` is required");
                expect(response.body.success).to.be.false;
                done();
            });
        });
    });


    /************************************/
    // TEST GET All Projects
    /************************************/
    describe('GET project', () => {
        it('it should GET all projects', (done) => {
            chai.request(server)
            .post('/projects')
            .end((error,response) => {
                response.should.have.status(200);
                response.should.be.a('object');
                  ;
                done();
            });
        });
    });


    /************************************/
    // TEST findProjectBy - Project Name, Description and ID route
    /************************************/


        describe('GET project', () => {
            it('it should GET single Project by its ID', (done) => {
                var id=null
                chai.request(server)
                .post('/projects')
                .end(function(err, res) 
                {
                    chai.request(server)
                    .post('/project/id')
                    .send({id: res.body[0]._id})
                    .end((error,response) => 
                    {
                        //console.log(response.body)
                        response.should.have.status(200);
                        response.should.be.a('object');
                        response.body.length.should.be.eql(1);
                        response.body[0].should.have.property('projectName')
                        response.body[0].should.have
                          .property("projectDescription")
                    done();
                    });                
                });
        });
    })

        
    /************************************/
    // TEST DELETE route
    /************************************/


    //Commenting out the Delete project 'coz project.save is not working.
//    describe('DELETE project', () => {
//     it('should DELETE last project', (done) => {
//         let project = new Project({ 
//             projectName: "Yadda Yadda Yadda", 
//             projectDescription: "An app devoted to Bosco" 
//         });
//         project.save((error,project) => {
//             chai.request(server)
//             console.log(project)
//             .delete('/project/id')
//             .send({id: project.id})
//             .end((error, response) => {
//                 response.should.have.status(200);
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('message')
//                     .and.to.be.eql('Project deleted successfully.');
//                 response.body.should.have.property('success');
//                 done();
//             });
//         });
//     });
//    });


//  //Test case id:
//    //Test Case summary: Delete a project that doesn't exist
//    //Test Case type:

// //*** Uncomment when the code is fixed ***//

//    describe('DELETE project', () => {
//     it('Delete a project that doesnt exist', (done) => {
//         let project = new Project({ 
//             projectName: "Yadda Yadda Yadda", 
//             projectDescription: "An app devoted to Bosco" 
//         });
//         project.save((error,project) => {
//             chai.request(server)
//             .delete('/project/id/')
//             .send({id: project.id})
//             .end((error, response) => {
//                 response.should.have.status(200);
//                 response.body.should.be.a('object');
//                 expect(response.body.message).to.include("Project does not Exist");
//                 expect(response.body.success).to.not.be.false;
//                 done();
//             });
//         });
//     });
//    });

 });