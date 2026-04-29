import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {

    try{
        const { name, email, password, confirmPassword } = req.body;

        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({message: 'All fields are required'});
        }

        if(password === confirmPassword){
            const existingUser = await prisma.user.findUnique({
                where: {email}
        })

            if(existingUser){
                return res.status(400).json({message: 'Email already exists'});
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword
                }
            })

            res.status(201).json(user);
        }
        else{
            return res.status(400).json({message: 'Password do not match'});
        }
        
        
    }
    catch(error){
        res.status(500).json({message: 'Server Error'});
    };
};

export const login = async (req: Request, res: Response) => {

    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }

        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(!user){
            return res.status(401).json({message: 'User not found'})
        }
        const verifiedPassword = await bcrypt.compare(password, user.password);
        if(!verifiedPassword){
            return res.status(401).json({message: 'Password is not correct.'})
        }

        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({message: 'Server Error'});
    };

};