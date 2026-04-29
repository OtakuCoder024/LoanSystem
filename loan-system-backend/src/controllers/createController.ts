import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const applyLoan = async (req: Request, res: Response) => {

    try{
        const { userId, amount, term } = req.body;

        let rate = 0.00;

        if(!amount || !term ){
            return res.status(400).json({message: 'All fields are required'});
        }

        if (term === 3) rate = 0.03;
        else if (term === 6) rate = 0.06;
        else if (term === 12) rate = 0.12;

        const interest = amount * rate;
        const total = amount + interest;
        const monthly = total / term;

        //const loan = await prisma.loan.create({

        //})
    }
    catch(error){

    }
}