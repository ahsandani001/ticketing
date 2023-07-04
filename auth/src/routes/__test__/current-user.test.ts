import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
    const cookie = await global.signin();
    
    /* const signupResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test1234'
        })
        .expect(201); */
    // const cookie = signupResponse.get('Set-Cookie');

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);
        
    expect(response.body.currentUser.email).toEqual('test@test.com');
})

it('responds with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(401);

    expect(response.body).toEqual({errors: [{message: 'Not Authorized'}]});
})