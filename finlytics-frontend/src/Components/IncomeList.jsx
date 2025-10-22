import {Download, LoaderPinwheelIcon, Mail} from "lucide-react";
import TransactionInformationCard from "./TransactionInformationCard.jsx";
import moment from "moment";
import axiosConfig from "../Util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../Util/apiEndPoints.js";
import {toast} from "react-hot-toast";
import {useState} from "react";

const IncomeList = ({transactions, onDelete}) => {
    const [downloading, setLoading] = useState(false);
    const [emailing, setEmailLoader] = useState(false);
    const handleDownloadIncomeDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {responseType: "blob"});
            let fileName = "income_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Income details downloaded successfully");
        } catch (error) {
            console.error("Error downloading income details:", error);
            toast.error(error.response?.data?.message || "Failed to download income details");
        } finally {
            setLoading(false)
        }
    }
    const handleEmailIncomeDetails = async () => {
        setEmailLoader(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME_DETAILS);
            if (response.status === 200) {
                toast.success("Income details emailed successfully");
            }
        } catch (error) {
            console.error("Error emailing income details:", error);
            toast.error(error.response?.data?.message || "Failed to email income details");
        } finally {
            setEmailLoader(false)
        }
    }
    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
                <h5 className="text-xl font-semibold text-gray-800">Income Sources</h5>
                <div className="flex items-center gap-2">
                    <button
                        disabled={emailing}
                        onClick={handleEmailIncomeDetails}
                        className="flex items-center justify-center p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 border border-gray-300 hover:border-purple-300 rounded-lg transition-all duration-200 cursor-pointer">
                        {emailing ? (
                            <>
                                <LoaderPinwheelIcon size={20} className="text-green-800"/>Emailing...
                            </>
                        ) : (
                            <>
                                <Mail className="text-green-800" size={18}/><span
                                className="text-green-800">Email</span>
                            </>
                        )}
                    </button>
                    <button
                        disabled={downloading}
                        onClick={handleDownloadIncomeDetails}
                        className="flex items-center justify-center p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 border border-gray-300 hover:border-purple-300 rounded-lg transition-all duration-200 cursor-pointer">
                        {downloading ? (
                            <>
                                <LoaderPinwheelIcon size={20} className="text-purple-800"/>Downloading...
                            </>
                        ) : (
                            <>
                                <Download className="text-purple-800" size={18}/><span
                                className="text-purple-800">Download</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((income) => (
                    <TransactionInformationCard
                        key={income.id}
                        icon={income.icon}
                        title={income.name}
                        date={moment(income.date).format('Do MMM YYYY')}
                        amount={income.amount}
                        type="income"
                        onDelete={() => onDelete(income.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default IncomeList;