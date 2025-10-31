import {useState} from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./Input.jsx";
import {Loader2Icon} from "lucide-react";

const AddExpenseForm = ({onAddIncome, categories}) => {
    const [loading, setLoading] = useState(false);
    const [expense, setExpense] = useState({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: ""
    })
    const handleChange = (key, value) => {
        setExpense((prev) => ({
            ...prev,
            [key]: value
        }))
    }
    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name
    }))
    const handleAddExpense = async () => {
        setLoading(true);
        try {
            await onAddIncome(expense);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input
                value={expense.name}
                onChange={({target}) => handleChange("name", target.value)}
                label="Expense Source"
                placeholder="e.g: Salary, Freelancing, etc."
                type="text"
            />
            <Input
                label="Category"
                value={expense.categoryId}
                onChange={({target}) => handleChange("categoryId", target.value)}
                placeholder="Select Category"
                options={categoryOptions}
                isSelect={true}
            />
            <Input
                label="Amount"
                value={expense.amount}
                onChange={({target}) => handleChange("amount", target.value)}
                placeholder="e.g: 5000"
                type="number"
            />
            <Input
                label="Date"
                value={expense.date}
                onChange={({target}) => handleChange("date", target.value)}
                type="date"
            />
            <div className="flex justify-center mt-6">
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleAddExpense}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 cursor-pointer flex">
                    {loading ? (
                        <>
                            <Loader2Icon className="animate-spin mr-2"/> Adding...
                        </>
                    ) : (
                        <>
                            Add Expense
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm;