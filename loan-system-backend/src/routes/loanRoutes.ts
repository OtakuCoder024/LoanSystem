// routes/loanRoutes.ts
import { Router } from 'express';
import { applyLoan, getLoans, updateLoanStatus } from '../controllers/createController';

const router = Router();

router.post('/loans', applyLoan);
router.get('/loans', getLoans);
router.patch('/loans/status', updateLoanStatus);


export default router;