import React from 'react'
import './location.scss'
import landmark81 from '../../assets/landmark81.jpg';
function location() {
    return (
        <div className="recommend-location">
            <div className="title">
                <h2> Location</h2>
            </div>
            <div className="list-box-location">
                <div className="box-location">
                    <div className="image-location">
                        <img src={landmark81} alt="loading..." />
                    </div>
                    <div className="location-information">
                        <h3>Landmark 81</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quod.
                        </p>
                        <div className="action">
                            <button>Order</button>
                            <button>View</button>
                        </div>
                    </div>
                </div>
                <div className="box-location">
                    <div className="image-location">
                        <img src={landmark81} alt="loading..." />
                    </div>
                    <div className="location-information">
                        <h3>Landmark 81</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quod.
                        </p>
                        <div className="action">
                            <button>Order</button>
                            <button>View</button>
                        </div>
                    </div>
                </div>
                <div className="box-location">
                    <div className="image-location">
                        <img src={landmark81} alt="loading..." />
                    </div>
                    <div className="location-information">
                        <h3>Landmark 81</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quod.
                        </p>
                        <div className="action">
                            <button>Order</button>
                            <button>View</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default location
