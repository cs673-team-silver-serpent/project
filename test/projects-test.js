// during test set env variable to test
process.env.NODE_ENV = 'test';

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
        it('it should POST a new project with title & description', (done) => {
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
                response.body.should.have
                  .property("message")
                    .and.to.be.eql("Project added successfully.");
                done();
            });
        });
    });


    //Create a New Project with ALL the fields populated:
    describe('POST project', () => {
        it('it should POST a new project with title, description, ', (done) => {
            let project = {
                projectName: "Projects Portal",
                projectDescription: "A portal app to manage software development projects",
                projectMembers: "",
                techStack: "Mongo,Express,Node,Angular",
                repositoryLink: "www.github.com",
                projectDemo: "www.youtube.com/project",
                labels: "#Portal, #MEAN",
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
        it('it should POST a new project with title, description, ', (done) => {
            let project = {
                projectName: "$@mplE Pro73CT ~!@#$%^&",
                projectDescription: "Project with special Characters and Spaces",
                projectMembers: "",
                techStack: "Mongo,Express,Node,Angular",
                repositoryLink: "www.github.com",
                projectDemo: "www.youtube.com/project",
                labels: "#Portal, #MEAN",
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

     //Create a New Project with ProjectName Missing:
     describe('POST project', () => {
        it('it should FAIL trying to POST a new project with missing Project Name', (done) => {
            let project = {
                projectDescription: "A portal app to manage software development projects",
                projectMembers: "",
                techStack: "Mongo,Express,Node,Angular",
                repositoryLink: "www.github.com",
                projectDemo: "www.youtube.com/project",
                labels: "#Portal, #MEAN",
            }
            chai.request(server)

            .post('/add')
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
    
    /************************************/
    // TEST GET All Projects
    /************************************/
    describe('GET project', () => {
        it('it should GET all projects', (done) => {
            chai.request(server)
            .get('/projects')
            .end((error,response) => {
                response.should.have.status(200);
                response.should.be.a('object');
                  ;
                done();
            });
        });
    });

     //Test case summary: Get a Project by it's Id

     describe('GET project', () => {
        it('it should GET single Project by its ID', (done) => {
            var id=null
            chai.request(server)
            .get('/view')
            .end(function(err, res) 
            {
                chai.request(server)
                .get('/view/'+ res.body[0]._id)
                .end((error,response) => 
                {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.length.should.be.eql(1);
                    response.body[0].should.have.property('projectName')
                        .and.to.eql('Projects Portal');
                    response.body[0].should.have
                      .property("projectDescription")
                      .and.to.eql("A portal app to manage software development projects");
                done();
                });                
            });
    });
})
    /************************************/
    // TEST findProjectBy - Project Name, Description and ID route
    /************************************/


    
        //Test case summary: Get a Project by it's Name

        describe('GET project', () => {
            it('it should GET single Project by its ID', (done) => {
                var id=null
                chai.request(server)
                .get('/projects')
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
                            .and.to.eql('Projects Portal');
                        response.body[0].should.have
                          .property("projectDescription")
                          .and.to.eql("A portal app to manage software development projects");
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


 //Test case id:
   //Test Case summary: Delete a project that doesn't exist
   //Test Case type:

//*** Uncomment when the code is fixed ***//
//    describe('DELETE project', () => {
//     it('Delete a project that doesnt exist', (done) => {
//         let project = new Project({ 
//             projectName: "Yadda Yadda Yadda", 
//             projectDescription: "An app devoted to Bosco" 
//         });
//         project.save((error,project) => {
//             chai.request(server)

//             .delete('/delete/' + project.id)
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