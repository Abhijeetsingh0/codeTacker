'use client'
import withAuth from '../components/withAuth'; // Adjust the import path as needed

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is a protected page.</p>
    </div>
  );
};

export default withAuth(Dashboard);