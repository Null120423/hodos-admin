import ImageGif from '../../assets/welcome_animated.gif';

import FoodList from '../../screens/admin/dashboard/components/food';
import LocationList from '../../screens/admin/location/components/location-list';
import './dashboard.scss';
function DashBoard() {
    return (
            <div className='home-container w-full'>
                <div className="content mt-10">
                    <div className="home-main">
                        <div className="welcome">
                            <div className="information">
                                <h2 className='text-3xl font-extrabold'>Welcome back, <span className='text-animated'>Daniel Hodos... </span></h2>
                                <p>Here you can manage all your data and make changes to the website</p>
                            </div>
                            <img src={ImageGif} alt="Loading..." />
                        </div>
                       <FoodList/>
                        <LocationList />
                    </div>
                </div>
            </div>
    )
}

export default DashBoard
