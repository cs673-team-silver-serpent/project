// during test set env variable to test
process.env.NODE_ENV = 'test';

let mongo = require('mongoose');
let Projects = require('../models/portal-model');

// require dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http'); // needed for routing
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


    /*
    * Test POST route
    */
    describe('POST project', () => {
        it('it should POST a new project with title & description', (done) => {
            let project = {
                projectName: "Yadda yadda yadda",
                projectDescription: "An app devoted to bosco"
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


    /*
    * Test GET route
    */
    describe('GET project', () => {
        it('it should GET all projects', (done) => {
            chai.request(server)
            .get('/')
            .end((error,response) => {
                response.should.have.status(200);
                response.should.be.a('object');
                response.body.length.should.be.eql(2);
                response.body[1].should.have.property('_id');
                response.body[1].should.have
                  .property("projectName")
                  .and.to.be.eql("Yadda yadda yadda");
                response.body[1].should.have
                  .property("projectDescription")
                  .and.to.be.eql("An app devoted to bosco");
                done();
            });
        });
    });


});