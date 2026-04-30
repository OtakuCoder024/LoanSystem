import request from 'supertest';
import app from '../app';
import { prisma } from '../lib/prisma';

describe('Loan API', () => {

  it('should create a loan', async () => {

    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed',
        role: 'USER'
      }
    });

    const res = await request(app).post('/api/loans').send({
      amount: 1000,
      term: 3,
      userId: user.id
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.amount).toBe(1000);
    expect(res.body.term).toBe(3);
    expect(res.body.status).toBe('PENDING');
  });

  afterEach(async () => {
    await prisma.loan.deleteMany();
    await prisma.user.deleteMany();
  });

  it('should fail if missing fields', async () => {
  const res = await request(app).post('/api/loans').send({});

  expect(res.statusCode).toBe(400);
});

it('should update loan status', async () => {

  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test2@example.com', // must be unique
      password: 'hashed',
      role: 'USER'
    }
  });

  const loan = await prisma.loan.create({
    data: {
      amount: 1000,
      term: 3,
      rate: 0.03,
      monthly: 343,
      total: 1030,
      userId: user.id  
    }

    
  });

const res = await request(app)
  .patch('/api/loans/status')
  .send({
    loanId: loan.id,
    status: 'APPROVED'
  });

console.log("STATUS:", res.statusCode);
console.log("BODY:", res.body);

expect(res.statusCode).toBe(200);
expect(res.body.status).toBe('APPROVED');
});

});



afterAll(async () => {
  await prisma.$disconnect();
});