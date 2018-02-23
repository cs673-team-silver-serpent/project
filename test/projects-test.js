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
            .post('/add')
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
    // TEST GET All Projects
    /************************************/
    describe('GET project', () => {
        it('it should GET all projects', (done) => {
            chai.request(server)
            .get('/view')
            .end((error,response) => {
                response.should.have.status(200);
                response.should.be.a('object');
                response.body.length.should.be.eql(1);
                response.body[0].should.have.property('projectName')
                    .and.to.eql('Projects Portal');
                response.body[0].should.have
                  .property("projectDescription")
                  .and.to.eql(
                    "A portal app to manage software development projects"
                  );
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
            .delete('/delete/' + project.id)
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