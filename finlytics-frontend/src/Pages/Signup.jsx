import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import Input from "../Components/Input.jsx";
import {validateEmail} from "../Util/Validation.js";
import axiosConfig from "../Util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../Util/apiEndPoints.js";
import {toast} from "react-hot-toast";
import {LoaderCircle} from "lucide-react";
import ProfilePhotoSelector from "../Components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../Util/uploadProfileImage.js";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [profilePhoto, setProfilePhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let profileImageUrl = "";
            if(profilePhoto){
                // Await image upload if it's async
                profileImageUrl = await uploadProfileImage(profilePhoto);
            }
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            });
            if(response.status === 201) {
                toast.success("Profile Created Successfully! Please Login.");
                navigate("/login");
            }
        } catch(err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
    };

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
                    <form onSubmit={handleSubmit} className="space-x-4">
                        <div className="flex justify-center mb-6">
                            <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto}/>
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
                        <button disabled={loading} type="submit"
                                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 cursor-pointer flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
                            {loading ? <>
                                <LoaderCircle className="animate-spin w-5 h-5"/>
                                Signing Up...</> : "SIGN UP"}
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