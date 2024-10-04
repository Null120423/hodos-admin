
import BurgerImage from '../../assets/burger.jpg';
import './food.scss';

function food() {
    return (
        <div className="recommend-food">
            <div className="title">
                <h2>Food</h2>
            </div>
            <div className="list-box-food">
                <div className="box-food">
                    <div className="image-food">
                        <img src={BurgerImage} alt="loading..." />
                    </div>
                    <div className="food-information">
                        <h3>Chicken Burger</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quod.
                        </p>
                        <div className="action">
                            <button>Order</button>
                            <button>View</button>
                        </div>
                    </div>
                </div>
                <div className="box-food">
                    <div className="image-food">
                        <img src={BurgerImage} alt="loading..." />
                    </div>
                    <div className="food-information">
                        <h3>Chicken Burger</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quod.
                        </p>
                        <div className="action">
                            <button>Order</button>
                            <button>View</button>
                        </div>
                    </div>
                </div>
                <div className="box-food">
                    <div className="image-food">
                        <img src={BurgerImage} alt="loading..." />
                    </div>
                    <div className="food-information">
                        <h3>Chicken Burger</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quod.
                        </p>
                        <div className="action">
                            <button>Order</button>
                            <button>View</button>
                        </div>
                    </div>
                </div>
                <div className="box-food">
                    <div className="image-food">
                        <img src={BurgerImage} alt="loading..." />
                    </div>
                    <div className="food-information">
                        <h3>Chicken Burger</h3>
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

export default food
