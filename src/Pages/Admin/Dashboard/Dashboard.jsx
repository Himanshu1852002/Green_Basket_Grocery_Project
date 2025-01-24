import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserAlt, FaBox, FaCartPlus } from "react-icons/fa"; // Importing icons

// Import Chart.js and required components
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register the components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    // Dummy data (Replace this with your API data)
    const totalUsers = 120;
    const totalProducts = 50;
    const totalOrders = 300;
    // Chart Data
    const chartData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Sales",
                data: [3000, 4000, 3500, 5000, 7000, 8000],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Revenue",
                data: [10000, 12000, 9000, 15000, 20000, 25000],
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center mb-4">Admin Dashboard</h1>

            {/* Cards Section */}
            <div className="row">
                <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card shadow text-center" style={{ background: "linear-gradient(135deg, #28a745, #ff7f00)" }}>
                        <div className="card-body">
                            <FaUserAlt size={40} color="white" />
                            <h5 className="card-title text-white">Total Users</h5>
                            <p className="card-text fs-3 text-white">{totalUsers}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card shadow text-center" style={{ background: "linear-gradient(135deg, #ff7f00, #28a745)" }}>
                        <div className="card-body">
                            <FaBox size={40} color="white" />
                            <h5 className="card-title text-white">Total Products</h5>
                            <p className="card-text fs-3 text-white">{totalProducts}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card shadow text-center" style={{ background: "linear-gradient(135deg, #28a745, #ff7f00)" }}>
                        <div className="card-body">
                            <FaCartPlus size={40} color="white" />
                            <h5 className="card-title text-white">Total Orders</h5>
                            <p className="card-text fs-3 text-white">{totalOrders}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="mt-5">
                <h3 className="text-center mb-4">Sales and Revenue Chart</h3>
                <div style={{ height: "400px" }}>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
