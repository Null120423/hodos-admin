
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function lineUpChecking() {
    return (
        <div className='line-up-container'>
            <div className="title">
                <h3>Task checking</h3>
                <p>(26 September)</p>
            </div>
            <div className="list-checking">
                <div className="list-child">
                    <img src="" alt="" />
                    <div className="content">
                        <div className="header">
                            <p>CBC Blood test</p>
                        </div>
                        <div className="details">
                            <p>at 10pm</p>
                        </div>
                    </div>
                    <input type="checkbox" name="" id="" />
                </div>
                <div className="list-child">
                    <img src="" alt="" />
                    <div className="content">
                        <div className="header">
                            <p>CBC Blood test</p>
                        </div>
                        <div className="details">
                            <p>at 10pm</p>
                        </div>
                    </div>
                    <input type="checkbox" name="" id="" />
                </div>
                <div className="list-child">
                    <img src="" alt="" />
                    <div className="content">
                        <div className="header">
                            <p>CBC Blood test</p>
                        </div>
                        <div className="details">
                            <p>at 10pm</p>
                        </div>
                    </div>
                    <input type="checkbox" name="" id="" />
                </div>
            </div>
            <div className="confirm-button">
                <p>(3 more)</p>
                <button className='btn-view-more'>
                    View More
                    <ArrowForwardIcon />
                </button>
            </div>
        </div>
    )
}

export default lineUpChecking
