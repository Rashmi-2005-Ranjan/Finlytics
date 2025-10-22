import Dashboard from "../Components/Dashboard.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../Util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../Util/apiEndPoints.js";
import {toast} from "react-hot-toast";
import IncomeList from "../Components/IncomeList.jsx";
import Modal from "../Components/Modal.jsx";
import {Plus} from "lucide-react";
import AddIncomeForm from "../Components/AddIncomeForm.jsx";
import DeleteAlert from "../Components/DeleteAlert.jsx";
import IncomeOverview from "../Components/IncomeOverview.jsx";

const Income = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addIncomeModalOpen, setAddIncomeModalOpen] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });
    const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) {
                console.log("Income details fetched successfully:", response.data);
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error("Error fetching income details:", error);
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_CATEGORY_BY_TYPE("income"));
            if (response.status === 200) {
                console.log("Income categories fetched successfully:", response.data);
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Error fetching income categories:", error);
            toast.error(error.data.message || "Failed To Fetch Income Categories");
        }
    }

    const deleteIncome = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Income deleted successfully");
            fetchIncomeDetails();
        } catch (error) {
            console.log('Error deleting income', error);
            toast.error(error.response?.data?.message || "Failed to delete income");
        }
    }

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    }, []);

    const handleAddIncome = async (income) => {
        const {name, amount, date, icon, categoryId} = income;
        if (!name.trim()) {
            toast.error("Income Source Name is required");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Valid Income Amount is required");
            return;
        }
        if (!date) {
            toast.error("Income Date is required");
            return;
        }
        const today = new Date().toISOString().split("T")[0];
        if (date > today) {
            toast.error("Income Date cannot be in the future");
            return;
        }
        if (!categoryId) {
            toast.error("Income Category is required");
            return;
        }
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            })
            if (response.status === 201) {
                toast.success("Income Added Successfully");
                fetchIncomeDetails();
                setAddIncomeModalOpen(false);
            }
        } catch (error) {
            console.error("Error adding income:", error);
            toast.error(error.response?.data?.message || "Failed To Add Income");
        }
    }

    return (
        <Dashboard activeMenu="Income">
            <div className="p-6 space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Income Dashboard</h2>
                        <p className="text-sm text-gray-500 mt-1">Track and manage your income sources</p>
                    </div>
                    <button
                        className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transition-all duration-200 cursor-pointer font-medium"
                        onClick={() => setAddIncomeModalOpen(true)}
                    >
                        <Plus size={20}/> Add Income
                    </button>
                </div>

                {/* Overview Chart Section */}
                <div className="w-full">
                    <IncomeOverview transactions={incomeData}/>
                </div>

                {/* Income List Section */}
                <div className="w-full">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        </div>
                    ) : (
                        <IncomeList
                            transactions={incomeData}
                            onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                        />
                    )}
                </div>

                {/* Add Income Modal */}
                <Modal
                    isOpen={addIncomeModalOpen}
                    onClose={() => setAddIncomeModalOpen(false)}
                    title="Add New Income"
                >
                    <AddIncomeForm
                        onAddIncome={(income) => handleAddIncome(income)}
                        categories={categories}
                    />
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({show: false, data: null})}
                    title="Delete Income Confirmation"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this income? This action cannot be undone."
                        onDelete={() => deleteIncome(openDeleteAlert.data)}
                        onCancel={() => setOpenDeleteAlert({show: false, data: null})}
                    />
                </Modal>
            </div>
        </Dashboard>
    );
}
export default Income;