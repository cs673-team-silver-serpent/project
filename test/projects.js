// during test set env variable to test
process.env.NODE_ENV = 'test';

let mongo = require('mongoose');
let Project = require('../models/portal-model');

// require dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http'); // needed for REST calls
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

// Projects parent block
describe('Projects', () => {
    // empty test database before each test
    
    // beforeEach((done) => {
    //     Projects.remove({}, (err) => {
    //         done();
    //     });
    // });


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
            .post('/')
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


    /************************************/
    // TEST GET route
    /************************************/
    describe('GET project', () => {
        it('it should GET last project', (done) => {
            chai.request(server)
            .get('/')
            .end((error,response) => {
                response.should.have.status(200);
                response.should.be.a('object');
                response.body.length.should.be.eql(2);
                response.body[1].should.have.property('_id');
                response.body[1].should.have
                  .property("projectName")
                  .and.to.be.eql("Projects Portal");
                response.body[1].should.have
                  .property("projectDescription")
                  .and.to.be.eql("A portal app to manage software development projects");
                done();
            });
        });
    });

    /************************************/
    // TEST DELETE route
    /************************************/
   describe('DELETE project', () => {
    it('should DELETE last project', (done) => {
        let project = new Project({ 
            projectName: "Yadda Yadda Yadda", 
            projectDescription: "An app devoted to Bosco" 
        });
        project.save((error,project) => {
            chai.request(server)
            .delete('/' + project.id)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message')
                    .and.to.be.eql('Project deleted successfully.');
                response.body.should.have.property('success');
                done();
            });
        });
    });
   });


});