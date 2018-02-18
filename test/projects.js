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
    * Test /GET route
    */

    describe('/GET project', () => {
        it('it should GET all projects', (done) => {
            chai.request(server)
            .get('/')
            .end((error,response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eql(3);
            });
        });
    });

});