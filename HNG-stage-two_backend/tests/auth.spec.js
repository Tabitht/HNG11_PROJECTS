const request = require('supertest');
const app = require('../app/app');

describe('POST /api/organisations/:orgId/users', () => {
  it('should add a user to the organisation successfully', async () => {
    const res = await request(app)
      .post('/api/organisations/org123/users')
      .set('Authorization', 'Bearer valid_jwt_token')
      .send({ userId: 'user456' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('message', 'User added to organisation successfully');
  });

  it('should return 404 if the user to be added does not exist', async () => {
    const res = await request(app)
      .post('/api/organisations/org123/users')
      .set('Authorization', 'Bearer valid_jwt_token')
      .send({ userId: 'nonexistentUser' });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body).toHaveProperty('message', 'User not found');
  });

  it('should return 403 if the authenticated user does not have access to the organisation', async () => {
    const res = await request(app)
      .post('/api/organisations/org123/users')
      .set('Authorization', 'Bearer valid_jwt_token_without_access')
      .send({ userId: 'user456' });

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body).toHaveProperty('message', 'Access denied to the organisation');
  });

  it('should return 422 if the userId is not provided in the request body', async () => {
    const res = await request(app)
      .post('/api/organisations/org123/users')
      .set('Authorization', 'Bearer valid_jwt_token')
      .send({});

    expect(res.statusCode).toEqual(422);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'userId',
          message: 'User ID is required'
        })
      ])
    );
  });
});

