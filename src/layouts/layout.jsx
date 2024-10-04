import Topbar from "../components/home/home"
import Sidebar from "../components/sidebar/sidebar"



const MainLayout = ({ children }) => {
    return (
        <div style={style.layout} className="h-screen w-screen">
            <Sidebar />
            <Topbar />
            <div style={style.mainContent}>
                {children}
            </div>
        </div>
    )
}

export default MainLayout

const style = {
    mainContent: {
        padding: '0 35px',
        width: 'calc(100% - 300px)',
        marginLeft: '300px',
    },
    layout: {
        backgroundColor: '#F1F5FF',
    }
}

