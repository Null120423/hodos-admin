import Home from "../../components/home/home";
import MainLayout from "../../layouts/layout";
import './dashboard.scss';

const Dashboard = () => {
 
    return (
        <MainLayout>
           <h1 className="text-white text-3xl">
             hello
           </h1>
            <Home />
        </MainLayout>
    );
}


export default Dashboard;