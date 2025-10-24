import Dashboard from "../Components/Dashboard.jsx";
import {Search, RotateCcw, Loader} from "lucide-react";
import {useState} from "react";
import axiosConfig from "../Util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../Util/apiEndPoints.js";
import {toast} from "react-hot-toast";
import TransactionInformationCard from "../Components/TransactionInformationCard.jsx";
import moment from "moment";

const Filter = () => {
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortField, setSortField] = useState("Select");
    const [sortOrder, setSortOrder] = useState("Select");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder
            })
            setTransactions(response.data);
            console.log(response.data);
            toast.success("Filtered transactions fetched successfully");
        } catch (err) {
            console.error("Error fetching filtered transactions:", err);
            toast.error("Failed to fetch filtered transactions");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setType(type);
        setStartDate("");
        setEndDate("");
        setKeyword("");
        setSortField("Select");
        setSortOrder("Select");
        setTransactions(transactions)
    };

    return (
        <Dashboard activeMenu="Filters">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Filter Transactions</h2>
                    <p className="text-gray-600 mt-1">Filter and search your transactions</p>
                </div>

                {/* Filter Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit}>
                        {/* Filter Inputs - All in One Line */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                            {/* Type Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="type">
                                    Type
                                </label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    id="type"
                                    disabled={loading}
                                    className="w-full border cursor-pointer border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="Select" disabled>Select Field</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>

                            {/* Start Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="startdate">
                                    Start Date
                                </label>
                                <input
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    id="startdate"
                                    type="date"
                                    disabled={loading}
                                    className="w-full border cursor-pointer border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* End Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="enddate">
                                    End Date
                                </label>
                                <input
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    id="enddate"
                                    type="date"
                                    disabled={loading}
                                    min={startDate}
                                    className="w-full border cursor-pointer border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Sort Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="sortfield">
                                    Sort By
                                </label>
                                <select
                                    value={sortField}
                                    onChange={(e) => setSortField(e.target.value)}
                                    id="sortfield"
                                    disabled={loading}
                                    className="w-full border cursor-pointer border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="Select" disabled>Select Field</option>
                                    <option value="date">Date</option>
                                    <option value="amount">Amount</option>
                                </select>
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="sortorder">
                                    Sort Order
                                </label>
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    id="sortorder"
                                    disabled={loading}
                                    className="w-full border cursor-pointer border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="Select" disabled>Select Field</option>
                                    <option value="desc">Descending</option>
                                    <option value="asc">Ascending</option>
                                </select>
                            </div>
                        </div>

                        {/* Search and Action Buttons - Bottom Row */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search Input */}
                            <div className="flex-1">
                                <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Search
                                </label>
                                <input
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    id="keyword"
                                    type="text"
                                    disabled={loading}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Search by description, amount..."
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 sm:items-end">
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="flex-1 sm:flex-none px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600"
                                >
                                    {loading ? (
                                        <>
                                            <Loader className="animate-spin" size={20}/>
                                            <span>Searching...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Search size={20}/>
                                            <span>Search</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
                                >
                                    <RotateCcw size={20}/>
                                    <span>Reset</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Results Section */}
                {transactions.length > 0 && (
                    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                        <h3 className="text-xl font-semibold mb-4">
                            Results ({transactions.length})
                        </h3>
                        <div className="text-gray-600">
                            {transactions.map((transaction) => (
                                <TransactionInformationCard
                                    key={transaction.id}
                                    transaction={transaction}
                                    title={transaction.name}
                                    icon={transaction.icon}
                                    amount={transaction.amount}
                                    type={type}
                                    date={moment(transaction.date).format('Do MMM YYYY')}
                                    hideDeleteBtn
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* No Results */}
                {!loading && transactions.length === 0 && (type || startDate || endDate || keyword) && (
                    <div className="bg-white rounded-lg shadow-md p-12 mt-6 text-center">
                        <div className="text-gray-400 mb-2">
                            <Search size={48} className="mx-auto"/>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-1">No transactions found</h3>
                        <p className="text-gray-500">Try adjusting your filters</p>
                    </div>
                )}
            </div>
        </Dashboard>
    );
};

export default Filter;