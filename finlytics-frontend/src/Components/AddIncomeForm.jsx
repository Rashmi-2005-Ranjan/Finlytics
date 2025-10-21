import {useState} from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./Input.jsx";
import {Loader2Icon} from "lucide-react";

const AddIncomeForm = ({onAddIncome, categories}) => {
    const [loading, setLoading] = useState(false);
    const [income, setIncome] = useState({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: ""
    })
    const handleChange = (key, value) => {
        setIncome((prev) => ({
            ...prev,
            [key]: value
        }))
    }
    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name
    }))
    const handleAddIncome = async () => {
        setLoading(true);
        try {
            await onAddIncome(income);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input
                value={income.name}
                onChange={({target}) => handleChange("name", target.value)}
                label="Income Source"
                placeholder="e.g: Salary, Freelancing, etc."
                type="text"
            />
            <Input
                label="Category"
                value={income.categoryId}
                onChange={({target}) => handleChange("categoryId", target.value)}
                placeholder="Select Category"
                options={categoryOptions}
                isSelect={true}
            />
            <Input
                label="Amount"
                value={income.amount}
                onChange={({target}) => handleChange("amount", target.value)}
                placeholder="e.g: 5000"
                type="number"
            />
            <Input
                label="Date"
                value={income.date}
                onChange={({target}) => handleChange("date", target.value)}
                type="date"
            />
            <div className="flex justify-center mt-6">
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleAddIncome}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 cursor-pointer flex">
                    {loading ? (
                        <>
                            <Loader2Icon className="animate-spin mr-2"/> Adding...
                        </>
                    ) : (
                        <>
                            Add Income
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm;