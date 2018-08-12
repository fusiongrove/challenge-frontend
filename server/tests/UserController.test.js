import { expect } from 'chai';
import request from 'supertest';
import app from './../index';
import {
    UserModel
} from './../models';

const user1 = {
    first_name: 'Apache',
    last_name: 'Linux',
    address: 'Colombo 04',
    country_code: '+94',
    phone: '777610577',
    dob: '1990/12/24',
    email: 'dilum.dar@gmail.com'
};
const user2 = {
    first_name: 'Alice',
    last_name: 'Bob',
    address: 'Colombo 03',
    country_code: '+61',
    phone: '+94777610578',
    dob: '1990/12/24',
    email: 'dilum@gmail.com'
};

let createdUser1 = {};
let createdUser2 = {};

describe('UserController test', () => {
    before((done) => {
        done();
    });

    after((done) => {
        done();
    });

    beforeEach((done) => {
        // runs before each test in this block
        done();
    });

    afterEach((done) => {
        // runs after each test in this block
        done();
    });

    describe('User Creation test >> ', () => {
        it('should create a new user', (done) => {
            request(app)
                .post('/api/user')
                .send({ user: user1 })
                .end((err, res) => {
                    createdUser1 = res.body.result;
                    expect(res.status).to.be.equal(200);
                    done();
                });
        });
        it('should get an error on duplicate user', (done) => {
            request(app)
                .post('/api/user')
                .send({ user: user1 })
                .end((err, res) => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body.error).to.be.equal('User already exists!');
                    done();
                });
        });
    });

    describe('User Update test >> ', () => {
        it('should update user', (done) => {
            const newUser = {
                first_name: 'Alice'
            };

            request(app)
                .put('/api/user')
                .send({ user: newUser, id: createdUser1._id })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.result.first_name).to.equal('Alice');
                    done();
                });
        });
        it('should not allow to update to existing email', (done) => {
            const newUser = {
                email: 'dilum.dar@gmail.com'
            };

            request(app)
                .post('/api/user')
                .send({ user: user2 })
                .end((err, res) => {
                    createdUser2 = res.body.result;
                    request(app)
                        .put('/api/user')
                        .send({ user: newUser, id: createdUser2._id })
                        .end((err, res) => {
                            expect(res.status).to.be.equal(400);
                            done();
                        });
                });
        });
    });

    describe('Get all users test >> ', () => {
        it('should get all users', (done) => {
            request(app)
                .get('/api/users')
                .send()
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.result).to.be.an('array');
                    done();
                });
        });
    });
    
    describe('User Delete test >> ', () => {
        it('should delete user', (done) => {
            request(app)
                .delete('/api/user')
                .send({ id: createdUser1._id })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    done();
                });
        });
        it('should delete second user', (done) => {
            request(app)
                .delete('/api/user')
                .send({ id: createdUser2._id })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    done();
                });
        });
    });

});
