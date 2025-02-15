import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import user_svg from '../../../assets/Images/Images/user_svg.svg'
import product_svg from '../../../assets/Images/Images/product_svg.svg'
import order_svg from '../../../assets/Images/Images/order_svg.svg'
import { useEffect } from "react";
import './Dashboard.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCount, fetchProductCount, fetchOrderCount } from '../../../Store/adminDashSlice'; // Path to your slice

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const dispatch = useDispatch();
    const { userCount, productCount, orderCount, status } = useSelector((state) => state.dashboard);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUserCount());
            dispatch(fetchProductCount());
            dispatch(fetchOrderCount());
        }
    }, [dispatch, status]);

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
        <div className="container mt-5 pt-5 d-flex justify-content-center align-items-center flex-column">
            <h1 className="text-center mb-4">Admin Dashboard</h1>

            {/* Cards Section */}
            <div className="row dashboard-row w-100 justify-content-center align-items-center">
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                    <div className="dashboard-card card shadow text-center">
                        <div className="card-body d-flex justify-content-center flex-column align-items-center">
                            <div className="w-75 h-75">
                                <img className="w-75 h-75" src={user_svg} />
                            </div>
                            <h5 className="card-title text-black">Total Users</h5>
                            <p className="card-text fs-4 text-black">{userCount}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                    <div className="dashboard-card card shadow text-center">
                        <div className="card-body d-flex justify-content-center flex-column align-items-center">
                            <div className="w-75 h-75">
                                <img className="w-75 h-75 mb-2" src={product_svg} alt="" />
                            </div>

                            <h5 className="card-title text-black">Total Products</h5>
                            <p className="card-text fs-4 text-black">{productCount}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                    <div className="dashboard-card card shadow text-center">
                        <div className="card-body d-flex justify-content-center flex-column align-items-center">
                            <div className="w-75 h-75">
                                <img className="w-75 h-75" src={order_svg} alt="" />
                            </div>

                            <h5 className="card-title text-black">Total Orders</h5>
                            <p className="card-text fs-4 text-black">{orderCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="mt-5 d-flex justify-content-center align-items-center flex-column w-100">
                <h3 className="text-center mb-4">Sales and Revenue Chart</h3>
                <div className="chart-container">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
