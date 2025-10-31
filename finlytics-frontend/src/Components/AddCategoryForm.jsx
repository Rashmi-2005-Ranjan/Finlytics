import {useEffect, useState} from "react";
import Input from "./Input.jsx";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import {Loader2Icon} from "lucide-react";

const AddCategoryForm = ({onAddCategory, initialCategoryData, isEditing}) => {
    const [loading, setLoading] = useState(false);
    const handleChange = (key, value) => {
        setCategory({...category, [key]: value});
    }
    const [category, setCategory] = useState({
        name: "",
        type: "",
        icon: ""
    });

    const categoryTypeOption = [
        {value: "income", label: "Income"},
        {value: "expense", label: "Expense"},
    ]

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onAddCategory(category);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory(initialCategoryData);
        } else {
            setCategory({
                name: "",
                type: "",
                icon: ""
            });
        }
    }, [isEditing, initialCategoryData]);

    return (
        <div className="p-4">
            <EmojiPickerPopup
                icon={category.icon}
                onSelect={(icon) => handleChange("icon", icon)}
            />
            <Input
                value={category.name}
                onChange={({target}) => handleChange("name", target.value)}
                label="Category Name"
                placeholder="e.g: Freelance, Salary, Groceries"
                type="text"
            />
            <Input
                value={category.type}
                onChange={({target}) => handleChange("type", target.value)}
                label="Category Type"
                isSelect={true}
                options={categoryTypeOption}
            />
            <div className="flex justify-center mt-6">
                <button
                    disabled={loading}
                    type="button"
                    onClick={handleSubmit}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 cursor-pointer flex">
                    {loading ? (
                        <>
                            <Loader2Icon size={20} className="w-4 h-4 animate-spin"/>
                            {isEditing ? " Updating..." : " Adding..."}
                        </>
                    ) : (<>
                        {isEditing ? "Update Category" : "Add Category"}
                    </>)}</button>
            </div>
        </div>
    );
}

export default AddCategoryForm;