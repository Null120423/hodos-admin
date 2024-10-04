import Sidebar from "../components/sidebar/sidebar"
import TopBar from "../components/topbar/topbar"



const MainLayout = ({ children }) => {
    return (
        <div className="h-screen w-screen">
             <TopBar/>
          <div className="flex w-full">
             <div className="flex flex-col ">
             <Sidebar />
           </div>
            <div className="h-full w-full p-4 flex justify-center items-center ml-auto mr-auto">
                {children}
            </div>
          </div>
        </div>
    )
}

export default MainLayout



