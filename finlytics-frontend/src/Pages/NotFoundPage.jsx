import {useState, useEffect} from 'react';
import {Home, Search, TrendingDown, AlertCircle} from 'lucide-react';
import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [floatingNumbers, setFloatingNumbers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20 - 10,
                y: (e.clientY / window.innerHeight) * 20 - 10
            });
        };

        // Generate random floating numbers
        const numbers = Array.from({length: 20}, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 3 + Math.random() * 4
        }));
        setFloatingNumbers(numbers);

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative flex items-center justify-center">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute w-96 h-96 bg-red-600 rounded-full opacity-10 blur-3xl top-1/4 left-1/4 animate-pulse"
                    style={{
                        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                        transition: 'transform 0.3s ease-out'
                    }}
                />
                <div
                    className="absolute w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl bottom-1/4 right-1/4 animate-pulse"
                    style={{
                        transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
                        transition: 'transform 0.3s ease-out',
                        animationDelay: '1s'
                    }}
                />

                {/* Floating numbers */}
                {floatingNumbers.map((num) => (
                    <div
                        key={num.id}
                        className="absolute text-gray-700 text-opacity-30 font-bold text-6xl animate-pulse"
                        style={{
                            left: `${num.x}%`,
                            top: `${num.y}%`,
                            animationDelay: `${num.delay}s`,
                            animationDuration: `${num.duration}s`
                        }}
                    >
                        {Math.random() > 0.5 ? '4' : '0'}
                    </div>
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                {/* 404 Number */}
                <div
                    className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="relative inline-block mb-8">
                        <h1 className="text-9xl md:text-[12rem] font-black bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                            404
                        </h1>
                        <div
                            className="absolute inset-0 text-9xl md:text-[12rem] font-black text-red-500 opacity-20 blur-2xl">
                            404
                        </div>
                    </div>
                </div>

                {/* Icon */}
                <div
                    className={`flex justify-center mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="relative">
                        <div
                            className="w-24 h-24 bg-gradient-to-br from-red-600 to-purple-600 rounded-full flex items-center justify-center animate-bounce">
                            <TrendingDown className="w-12 h-12"/>
                        </div>
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-red-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"/>
                    </div>
                </div>

                {/* Message */}
                <div
                    className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
              Page Not Found
            </span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-4 max-w-md mx-auto">
                        Oops! Looks like this expense doesn't exist in our records.
                    </p>
                    <p className="text-gray-500 mb-12 flex items-center justify-center space-x-2">
                        <AlertCircle className="w-4 h-4"/>
                        <span>The page you're looking for has been moved or deleted.</span>
                    </p>
                </div>

                {/* Action buttons */}
                <div
                    className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <button
                        onClick={() => navigate("/")}
                        className="cursor-pointer group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 flex items-center space-x-2">
                        <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform"/>
                        <span>Back to Home</span>
                        <div
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur opacity-0 group-hover:opacity-75 transition-opacity -z-10"/>
                    </button>
                </div>


            </div>
        </div>
    );
};

export default NotFoundPage;