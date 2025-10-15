import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import Input from "../Components/Input.jsx";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/*    Background Image With Blur*/}
            <img src={assets.login_bg} alt="Background" className="
            absolute inset-0 w-full h-full object-cover blur-sm"/>
            <div className="relative z-10 w-full max-w-lg px-6">
                <div
                    className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Create An Account
                    </h3>
                    <p className="text-slate-700 text-center mb-8">
                        Start Tracking Your Spending By Joining With Us!
                    </p>
                    <form className="space-x-4">
                        <div className="flex justify-center mb-6">
                            <img src={assets.logo} alt="Logo" className="h-16 w-16"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                label="Full Name"
                                placeholder="John Doe"
                                type="text"/>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                placeholder="fullname@example.com"
                                type="email"/>
                            <div className="col-span-2">
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label="Password"
                                    placeholder="**********"
                                    type="password"/>
                            </div>
                        </div>
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}
                        <button type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 cursor-pointer">
                            SIGN UP
                        </button>
                        <p className="text-sm text-slate-600 text-center mt-6">
                            Already have an account?{" "}
                            <span
                                onClick={() => navigate("/login")}
                                className="text-blue-600 hover:underline cursor-pointer font-semibold">
                                Log In
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;