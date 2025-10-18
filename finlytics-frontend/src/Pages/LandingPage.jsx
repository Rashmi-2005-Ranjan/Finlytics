import {useState, useEffect} from 'react';
import {TrendingUp, PieChart, Wallet, ArrowRight, BarChart3, Sparkles, Github} from 'lucide-react';
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20 - 10,
                y: (e.clientY / window.innerHeight) * 20 - 10
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const features = [
        {
            icon: <Wallet className="w-8 h-8"/>,
            title: "Track Expenses",
            description: "Monitor every transaction effortlessly"
        },
        {
            icon: <PieChart className="w-8 h-8"/>,
            title: "Visual Analytics",
            description: "Beautiful charts and insights"
        },
        {
            icon: <TrendingUp className="w-8 h-8"/>,
            title: "Smart Reports",
            description: "Understand your spending patterns"
        }
    ];

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl -top-48 -left-48 animate-pulse"
                    style={{
                        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                        transition: 'transform 0.3s ease-out'
                    }}
                />
                <div
                    className="absolute w-96 h-96 bg-blue-600 rounded-full opacity-20 blur-3xl -bottom-48 -right-48 animate-pulse"
                    style={{
                        transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
                        transition: 'transform 0.3s ease-out',
                        animationDelay: '1s'
                    }}
                />
                <div className="absolute w-full h-full bg-gradient-to-t from-black via-transparent to-transparent"/>
            </div>

            {/* Main content */}
            <div className="relative z-10 container mx-auto px-6 py-12">
                {/* Header */}
                <nav
                    className={`flex items-center justify-between mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                    <div className="flex items-center space-x-2">
                        <BarChart3 className="w-8 h-8 text-purple-500"/>
                        <span
                            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Finlytics
            </span>
                    </div>
                </nav>

                {/* Hero section */}
                <div className="flex flex-col items-center text-center mt-20 mb-32">
                    <div
                        className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div
                            className="inline-flex items-center space-x-2 bg-gray-800 bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-gray-700">
                            <Sparkles className="w-4 h-4 text-yellow-400"/>
                            <span className="text-sm text-gray-300">Your Financial Journey Starts Here</span>
                        </div>
                    </div>

                    <h1 className={`text-6xl md:text-7xl font-bold mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 bg-clip-text text-transparent">
              Master Your Money
            </span>
                        <br/>
                        <span className="text-white">With Intelligence</span>
                    </h1>

                    <p className={`text-xl text-gray-400 mb-12 max-w-2xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        Track, analyze, and optimize your expenses with powerful visualizations and smart insights. Take
                        control of your financial future today.
                    </p>

                    <button
                        onClick={() => navigate("/signup")}
                        className={`cursor-pointer group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg transition-all duration-1000 delay-700 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
            <span className="flex items-center space-x-2">
              <span>Let's Start</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
            </span>
                        <div
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur opacity-0 group-hover:opacity-75 transition-opacity -z-10"/>
                    </button>
                </div>

                {/* Features section */}
                <div
                    className={`grid md:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105 hover:bg-opacity-50"
                            style={{animationDelay: `${index * 100}ms`}}
                        >
                            <div
                                className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Stats section */}
                <div
                    className={`mt-32 grid grid-cols-3 gap-8 max-w-3xl mx-auto transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {[
                        {number: '100K+', label: 'Users'},
                        {number: '50M+', label: 'Transactions'},
                        {number: '99.9%', label: 'Uptime'}
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div
                                className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Contribute to Project Button */}
                <div
                    className={`flex justify-center mt-16 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-all duration-1000 delay-1200`}
                >
                    <a
                        href="https://github.com/Rashmi-2005-Ranjan/Finlytics" // Replace with your real GitHub repository URL
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-purple-600 hover:to-blue-600 transition border border-gray-700 text-white font-semibold shadow"
                    >
                        <Github className="w-6 h-6 mr-2"/>
                        <span>Contribute To Project</span>
                    </a>
                </div>
            </div>

            {/* Footer */}
            <div
                className={`relative z-10 text-center py-8 text-gray-500 text-sm transition-all duration-1000 delay-1300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <p>© 2025 Finlytics. Built with precision and care. By ❤️ Rashmi</p>
            </div>
        </div>
    );
};

export default LandingPage;