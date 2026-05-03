type LoanCalculation = {
    rate: number;
    total: number;
    monthly: number;
}
function calculateLoan(amount:number, term:number): LoanCalculation | null{
    let rate = 0;

    if (term === 3) rate = 0.03;
    else if (term === 6) rate = 0.06;
    else if (term === 12) rate = 0.12;
    else {
      return null;
    }

    const interest = amount * rate;
    const total = amount + interest;
    const monthly = total / term;

    return{
        rate,
        total,
        monthly,
    }
}

export default calculateLoan;