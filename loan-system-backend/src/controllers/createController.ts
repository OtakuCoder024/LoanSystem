import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const applyLoan = async (req: Request, res: Response) => {
  try {
    const { userId, amount, term } = req.body;

    // validation
    if (!amount || !term) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let rate = 0;

    if (term === 3) rate = 0.03;
    else if (term === 6) rate = 0.06;
    else if (term === 12) rate = 0.12;
    else {
      return res.status(400).json({ message: 'Invalid loan term' });
    }

    const interest = amount * rate;
    const total = amount + interest;
    const monthly = total / term;

    const loan = await prisma.loan.create({
      data: {
        amount,
        term,
        rate,
        monthly,
        total,
        status: 'PENDING',
        userId: userId || 1 // fallback if no auth yet
      }
    });

    return res.status(201).json(loan);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const getLoans = async (req: Request, res: Response) => {
  try {
    const loans = await prisma.loan.findMany();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateLoanStatus = async (req: Request, res: Response) => {
  try {
    const { loanId, status } = req.body;

    const updated = await prisma.loan.update({
      where: { id: loanId },
      data: { status }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};