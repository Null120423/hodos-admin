;
import ImageGif from '../../assets/welcome_animated.gif';
import Food from '../../components/food/food';
import Location from '../../components/location/location';
import './dashboard.scss';
function DashBoard() {
    return (
            <div className='home-container '>
                <div className="title">
                    <h1>Dashboard</h1>
                </div>
                <div className="content">
                    <div className="home-main">
                        <div className="welcome">
                            <div className="information">
                                <h2>Welcome back, <span className='text-animated'>Daniel Hodos... </span></h2>
                                <p>Here you can manage all your data and make changes to the website</p>
                            </div>
                            <img src={ImageGif} alt="Loading..." />
                        </div>
                        <Food />
                        <Location />
                    </div>
                </div>
            </div>
    )
}

export default DashBoard
