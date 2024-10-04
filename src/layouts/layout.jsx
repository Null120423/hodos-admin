import Sidebar from "../components/sidebar/sidebar"
import TopBar from "../components/topbar/topbar"



const MainLayout = ({ children }) => {
    return (
        <div className="h-screen w-screen overflow-hidden ">
             <TopBar/>
          <div className="flex w-full">
             <div className="flex flex-col ">
             <Sidebar />
           </div>
            <div className="h-screen overflow-x-hidden overflow-y-auto w-full p-4 flex justify-center items-start ">
                {children}
            </div>
          </div>
        </div>
    )
}

export default MainLayout



