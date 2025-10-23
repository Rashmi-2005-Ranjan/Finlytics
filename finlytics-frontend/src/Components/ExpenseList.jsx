import {Download, Loader2, Mail} from "lucide-react";
import TransactionInformationCard from "./TransactionInformationCard.jsx";
import moment from "moment";
import axiosConfig from "../Util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../Util/apiEndPoints.js";
import {toast} from "react-hot-toast";
import {useState} from "react";

const ExpenseList = ({transactions, onDelete}) => {
    const [downloading, setLoading] = useState(false);
    const [emailing, setEmailLoader] = useState(false);

    const handleDownloadExpenseDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {responseType: "blob"});
            let fileName = "expense_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Expense details downloaded successfully");
        } catch (error) {
            console.error("Error downloading expense details:", error);
            toast.error(error.response?.data?.message || "Failed to download expense details");
        } finally {
            setLoading(false)
        }
    }

    const handleEmailExpenseDetails = async () => {
        setEmailLoader(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE_DETAILS);
            if (response.status === 200) {
                toast.success("Expense details emailed successfully");
            }
        } catch (error) {
            console.error("Error emailing expense details:", error);
            toast.error(error.response?.data?.message || "Failed to email expense details");
        } finally {
            setEmailLoader(false)
        }
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <h5 className="text-xl font-semibold text-gray-800">Expense Sources</h5>
                    <span className="text-sm text-red-600 bg-red-100 px-3 py-1 rounded-full font-medium">
                        {transactions?.length || 0} {transactions?.length === 1 ? 'Transaction' : 'Transactions'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        disabled={emailing}
                        onClick={handleEmailExpenseDetails}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 border border-gray-300 hover:border-red-300 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        {emailing ? (
                            <>
                                <Loader2 size={18} className="animate-spin text-red-600"/>
                                <span>Emailing...</span>
                            </>
                        ) : (
                            <>
                                <Mail size={18}/>
                                <span>Email</span>
                            </>
                        )}
                    </button>
                    <button
                        disabled={downloading}
                        onClick={handleDownloadExpenseDetails}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 border border-gray-300 hover:border-red-300 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        {downloading ? (
                            <>
                                <Loader2 size={18} className="animate-spin text-red-600"/>
                                <span>Downloading...</span>
                            </>
                        ) : (
                            <>
                                <Download size={18}/>
                                <span>Download</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {transactions?.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <Download className="text-red-500" size={32}/>
                    </div>
                    <p className="text-gray-500 text-sm">
                        No expense transactions yet. Add your first expense to see it listed here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {transactions?.map((expense) => (
                        <TransactionInformationCard
                            key={expense.id}
                            icon={expense.icon}
                            title={expense.name}
                            date={moment(expense.date).format('Do MMM YYYY')}
                            amount={expense.amount}
                            type="expense"
                            onDelete={() => onDelete(expense.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExpenseList;