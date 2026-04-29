import '../styles/Dashboard.css'

function Dashboard(){

        return(

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
                            <button>Apply for Loans</button>
                        </div>
                        <div className="cards">
                            <div>
                                <h6>Approved Loans</h6>
                                <h2>Total Number</h2>
                            </div>
                            <div>
                                <h6>Total Borrowed</h6>
                                <h2>Total Number</h2>
                            </div>
                        </div>
                        <div className="table">
                            <h2>Loans</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Amount</th>
                                        <th>Term</th>
                                        <th>Rate</th>
                                        <th>Monthly</th>
                                        <th>Repayment</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Lance</td>
                                        <td>1234</td>
                                        <td>132</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123123</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        )
}

export default Dashboard;