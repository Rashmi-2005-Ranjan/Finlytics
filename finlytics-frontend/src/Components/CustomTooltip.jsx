import {addThousandsSeparator} from "../Util/Util.js";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
                <p className="text-sm font-semibold text-purple-600 mb-2">{payload[0].name}</p>
                <p className="text-sm text-gray-700">
                    Amount: <span className="text-base font-bold text-gray-900">&#8377;{addThousandsSeparator(payload[0].value)}</span>
                </p>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;