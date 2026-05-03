
function isValidLoanStatus(status:string) : boolean{
    const allowedStatuses = ['APPROVED', 'REJECTED', 'PENDING'];

    if(!allowedStatuses.includes(status)){
        return false;
    }

    return true;
}
export default isValidLoanStatus;