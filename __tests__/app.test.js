const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
// Dummy user for testing
const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: 'asdfg',
};
// create registerAndLogin that will check for whether use pw match
const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  // create agent to store cookies between requests
  const agent = request.agent(app);
  // create user to sign in with
  const user = await UserService.create({ ...mockUser, ...userProps });
  // sign in
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates new user', async () => {
    const res = await request(app).post('/api/v1/auth/signup').send(mockUser);
    const { firstName, lastName, email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  it('signs in existing user', async () => {
    const user = await registerAndLogin();

    const res = await request(app).post('/api/v1/auth/signin');
  });
});
