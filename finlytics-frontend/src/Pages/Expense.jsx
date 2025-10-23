import Dashboard from "../Components/Dashboard.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../Util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../Util/apiEndPoints.js";
import {toast} from "react-hot-toast";
import {Plus} from "lucide-react";
import IncomeOverview from "../Components/IncomeOverview.jsx";
import IncomeList from "../Components/IncomeList.jsx";
import Modal from "../Components/Modal.jsx";
import DeleteAlert from "../Components/DeleteAlert.jsx";
import AddExpenseForm from "../Components/AddExpenseForm.jsx";
import ExpenseOverview from "../Components/ExpenseOverview.jsx";
import ExpenseList from "../Components/ExpenseList.jsx";

const Expense = () => {
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if (response.status === 200) {
                console.log("Expense details fetched successfully:", response.data);
                setExpenseData(response.data);
            }
        } catch (error) {
            console.error("Error fetching expense details:", error);
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchExpenseCategory = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) {
                console.log("Expense categories fetched successfully:", response.data);
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Error fetching expense categories:", error);
            toast.error(error.data.message || "Failed To Fetch Expense Categories");
        }
    }

    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.log('Error deleting expense', error);
            toast.error(error.response?.data?.message || "Failed to delete expense");
        }
    }

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategory();
    }, []);

    const handleAddExpense = async (expense) => {
        const {name, amount, date, icon, categoryId} = expense;
        if (!name.trim()) {
            toast.error("Expense Name is required");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Valid Expense Amount is required");
            return;
        }
        if (!date) {
            toast.error("Expense Date is required");
            return;
        }
        const today = new Date().toISOString().split("T")[0];
        if (date > today) {
            toast.error("Expense Date cannot be in the future");
            return;
        }
        if (!categoryId) {
            toast.error("Expense Category is required");
            return;
        }
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            })
            if (response.status === 201) {
                toast.success("Expense Added Successfully");
                fetchExpenseDetails();
                setAddExpenseModalOpen(false);
            }
        } catch (error) {
            console.error("Error adding expense:", error);
            toast.error(error.response?.data?.message || "Failed To Add Expense");
        }
    }

    return (
        <Dashboard activeMenu="Expense">
            <div className="p-6 space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Expense Dashboard</h2>
                        <p className="text-sm text-gray-500 mt-1">Track and manage your expenses</p>
                    </div>
                    <button
                        className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-orange-700 hover:shadow-lg transition-all duration-200 cursor-pointer font-medium"
                        onClick={() => setAddExpenseModalOpen(true)}
                    >
                        <Plus size={20}/> Add Expense
                    </button>
                </div>

                {/* Overview Chart Section */}
                <div className="w-full">
                    <ExpenseOverview transactions={expenseData}/>
                </div>

                {/* Expense List Section */}
                <div className="w-full">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                        </div>
                    ) : (
                        <ExpenseList
                            transactions={expenseData}
                            onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                        />
                    )}
                </div>

                {/* Add Expense Modal */}
                <Modal
                    isOpen={addExpenseModalOpen}
                    onClose={() => setAddExpenseModalOpen(false)}
                    title="Add New Expense"
                >
                    <AddExpenseForm
                        onAddIncome={(expense) => handleAddExpense(expense)}
                        categories={categories}
                    />
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({show: false, data: null})}
                    title="Delete Expense Confirmation"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this expense? This action cannot be undone."
                        onDelete={() => deleteExpense(openDeleteAlert.data)}
                        onCancel={() => setOpenDeleteAlert({show: false, data: null})}
                    />
                </Modal>
            </div>
        </Dashboard>
    );
}
export default Expense;