import request from 'supertest';
import app from '../app';
import { prisma } from '../lib/prisma';

jest.setTimeout(30000);

const cleanupTestData = async () => {
  try {
    const testUsers = await prisma.user.findMany({
      where: {
        email: { contains: '@example.com' }
      },
      select: { id: true }
    });

    const userIds = testUsers.map(u => u.id);

    await prisma.loan.deleteMany({
      where: {
        userId: { in: userIds }
      }
    });

    await prisma.user.deleteMany({
      where: {
        email: { contains: '@example.com' }
      }
    });
  } catch (err) {
    console.log("Cleanup error:", err);
  }
};

describe('Loan API', () => {
  beforeEach(async () => {
    await cleanupTestData();
  });

  afterEach(async () => {
    await cleanupTestData();
  });

  it('should create a loan', async () => {

    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
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

  it('should fail if missing fields', async () => {
    const res = await request(app).post('/api/loans').send({});

    expect(res.statusCode).toBe(400);
  });

  it('should update loan status', async () => {

    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: `test2-${Date.now()}@example.com`,
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

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('APPROVED');
  });

  it('should fail updating non-existing loan', async () => {
  const res = await request(app)
    .patch('/api/loans/status')
    .send({
      loanId: 999999,
      status: 'APPROVED'
    });

  expect(res.statusCode).toBe(404);
});

});

afterAll(async () => {
  await prisma.$disconnect();
});
