type ValidationResult = {
    valid: boolean;
    message?: string;
}
function validateLoanApplication (userId:number, amountNum: number, termNum: number) : ValidationResult{
    
    if(!userId){
        return{
            valid: false,
            message: 'All fields are required'
        }
    }

    if(Number.isNaN(amountNum)){
        return{
            valid: false,
            message: 'Amount must be a valid number'
        }
    }

    if(Number.isNaN(termNum)){
        return{
            valid: false,
            message: 'Term must be a valid number'
        }
    }

    if(amountNum <= 0){
        return{
            valid: false,
            message: 'Amount must be greater than zero'
        }
    }

    return{
        valid: true
    }
}

export default validateLoanApplication;