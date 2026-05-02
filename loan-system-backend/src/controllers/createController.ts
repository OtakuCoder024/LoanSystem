import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const applyLoan = async (req: Request, res: Response) => {
  try {
    let { userId, amount, term } = req.body;

    // convert to numbers
    const amountNum = Number(amount);
    const termNum = Number(term);

    // validation
    if (!amountNum || !termNum || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let rate = 0;

    if (termNum === 3) rate = 0.03;
    else if (termNum === 6) rate = 0.06;
    else if (termNum === 12) rate = 0.12;
    else {
      return res.status(400).json({ message: 'Invalid loan term' });
    }

    const interest = amountNum * rate;
    const total = amountNum + interest;
    const monthly = total / termNum;

    const loan = await prisma.loan.create({
      data: {
        amount: amountNum,
        term: termNum,
        rate,
        monthly,
        total,
        status: 'PENDING',
        userId
      }
    });

    return res.status(201).json(loan);

  } catch (error) {
    console.error("APPLY LOAN ERROR:", error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const getLoans = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.query;

    let loans;

    if (role === 'ADMIN') {
      loans = await prisma.loan.findMany();
    } else {
      loans = await prisma.loan.findMany({
        where: {
          userId: Number(userId)
        }
      });
    }

    return res.json(loans);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const updateLoanStatus = async (req: Request, res: Response) => {
  try {
    const { loanId, status } = req.body;

    const updated = await prisma.loan.update({
      where: { id: loanId },
      data: { status }
    });

    return res.json(updated);

  } catch (err: any) {

    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Loan not found' });
    }

    console.error("UPDATE LOAN STATUS ERROR:", err);
    return res.status(500).json({ message: 'Server error' });
  }
};
