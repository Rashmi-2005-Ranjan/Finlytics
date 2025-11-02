import {useContext} from "react";
import {AppContext} from "../Context/AppContext.jsx";
import {User} from "lucide-react";
import {SIDE_BAR_DATA} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";

const Sidebar = ({activeMenu}) => {
    const {user} = useContext(AppContext)
    const navigate = useNavigate()

    return (
        <div
            className="w-64 h-[calc(100vh-61px)] bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 p-6 sticky top-[61px] z-20 shadow-sm">
            <div className="flex flex-col items-center justify-center gap-4 mt-4 mb-8">
                {user?.profileImageUrl ? (
                    <div className="relative group">
                        <img
                            src={user.profileImageUrl}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-purple-100 shadow-lg transition-transform duration-300 group-hover:scale-105"
                        />
                        <div
                            className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"/>
                    </div>
                ) : (
                    <div className="relative group">
                        <div
                            className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center border-4 border-purple-200 shadow-lg transition-transform duration-300 group-hover:scale-105">
                            <User className="w-12 h-12 text-purple-600"/>
                        </div>
                        <div
                            className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"/>
                    </div>
                )}
                {user?.fullName && (
                    <h5 className="text-gray-950 font-medium leading-6">
                        {user.fullName.toUpperCase()}
                    </h5>
                )}
            </div>
            {SIDE_BAR_DATA.map((item, index) => (
                <button
                    onClick={() => navigate(item.path)}
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer transition-all duration-200 hover:bg-purple-50 ${
                        activeMenu === item.label
                            ? "text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-md"
                            : "text-gray-700 hover:text-purple-600"
                    }`}>
                    <item.icon className="text-2xl"/>
                    {item.label}
                </button>
            ))}
        </div>
    )
}
export default Sidebar;