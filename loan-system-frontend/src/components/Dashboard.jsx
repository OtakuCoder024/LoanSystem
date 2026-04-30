import { useEffect, useState } from 'react';
import '../styles/Dashboard.css';

function Dashboard() {
    const [loans, setLoans] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [amount, setAmount] = useState('');
    const [term, setTerm] = useState(3);

    // fetch loans from backend
    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/loans');
                const data = await res.json();
                setLoans(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchLoans();
    }, []);
    const handleApply = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/loans', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: Number(amount),
                    term
                })
            });

            const data = await res.json();

            console.log(data);

            // refresh loans list
            setLoans(prev => [...prev, data]);

            // reset form
            setAmount('');
            setTerm(3);
            setShowForm(false);

        } catch (err) {
            console.error(err);
        }
    };

    const handleStatus = async (loanId, status) => {
        try{
            const res = await fetch('http://localhost:5000/api/loans/status', {
                method: 'PATCH',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({loanId, status})
            });

            const updated = await res.json();

            setLoans(prev =>
                prev.map(l => 
                    l.id === loanId ? { ...l,
                        status: updated.status
                    } : l
                )
            );
        }
        catch(error){
            console.error(error);
        }
    }

    return (
        <div className="dashboard-layout">
            <nav className="topbar">
                <h3>Loan System</h3>
            </nav>

            <div className="main">
                <aside className="sidebar">
                    <p className="active">Dashboard</p>
                    <p>Users</p>
                    <p>Settings</p>
                </aside>

                <div className="content">
                    <div className="main-header">
                        <h2>Dashboard</h2>
                        <button onClick={() => setShowForm(true)}>
                            Apply for Loans
                        </button>
                    </div>

                    <div className="cards">
                        <div>
                            <h6>Approved Loans</h6>
                            <h2>
                                {loans.filter(l => l.status === 'APPROVED').length}
                            </h2>
                        </div>
                        <div>
                            <h6>Total Borrowed</h6>
                            <h2>
                                {loans
                                    .filter(l => l.status === 'APPROVED')
                                    .reduce((sum, l) => sum + l.amount, 0)
                                }
                            </h2>
                        </div>
                    </div>

                    <div className="table">
                        <h2>Loans</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Amount</th>
                                    <th>Term</th>
                                    <th>Rate</th>
                                    <th>Monthly</th>
                                    <th>Repayment</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loans.map((loan) => (
                                    <tr key={loan.id}>
                                        <td>{loan.id}</td>
                                        <td>{loan.amount}</td>
                                        <td>{loan.term}</td>
                                        <td>{loan.rate}</td>
                                        <td>{loan.monthly.toFixed(2)}</td>
                                        <td>{loan.total}</td>
                                        <td>{loan.status}</td>
                                        <td>
                                        {loan.status === 'PENDING' ? (
                                            <div className='action-buttons'>
                                            <button 
                                            className='approve-btn'
                                            onClick={() => handleStatus(loan.id, 'APPROVED')}>
                                                Approve
                                            </button>

                                            <button 
                                            className='reject-btn'
                                            onClick={() => handleStatus(loan.id, 'REJECTED')}>
                                                Reject
                                            </button>
                                            </div>
                                        ) : (
                                            <span className={`status ${loan.status.toLowerCase()
                                            }`}>
                                                {loan.status}
                                            </span>
                                        )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                    {showForm && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <h3>Apply Loan</h3>

                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />

                                <select
                                    value={term}
                                    onChange={(e) => setTerm(Number(e.target.value))}
                                >
                                    <option value={3}>3 months</option>
                                    <option value={6}>6 months</option>
                                    <option value={12}>12 months</option>
                                </select>

                                <div className="modal-actions">
                                    <button onClick={handleApply}>Submit</button>
                                    <button className="cancel" onClick={() => setShowForm(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;