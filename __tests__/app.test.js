const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// Dummy user for testing
const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: 'asdfg',
};
// create registerAndLogin that will check for whether use pw match
// const registerAndLogin = async (userProps = {}) => {
//   const password = userProps.password ?? mockUser.password;

//   // create agent to store cookies between requests
//   const agent = request.agent(app);
//   // create user to sign in with
// }
// sign in

describe('top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { firstName, lastName, email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });
});
