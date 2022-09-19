import Cards from "../../Components/Common/Cards";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <>
      <DashboardLayout>
        <div className="dashboard">
          <div className="dashtitle">
            <h2>Dashboard</h2>
            <Cards />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
