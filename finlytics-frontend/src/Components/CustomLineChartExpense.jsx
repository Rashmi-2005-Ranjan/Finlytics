import {addThousandsSeparator} from "../Util/Util.js";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const CustomLineChartExpense = ({ data }) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload;

            // Group items by category for the tooltip display
            const groupedItemsForTooltip = dataPoint.items.reduce((acc, item) => {
                const { categoryName, amount } = item;
                if (!acc[categoryName]) {
                    acc[categoryName] = {
                        categoryName: categoryName,
                        totalAmount: 0,
                    };
                }
                acc[categoryName].totalAmount += amount;
                return acc;
            }, {});

            // Convert grouped object to array for mapping
            const categoriesInTooltip = Object.values(groupedItemsForTooltip);

            return (
                <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
                    {/* Display the formatted date at the top of the tooltip */}
                    <p className="text-sm font-semibold text-gray-800 mb-2">{label}</p>
                    <hr className="my-2 border-gray-200" />
                    {/* Display the total amount for the date */}
                    <p className="text-sm text-gray-700 font-bold mb-3">
                        Total: <span className="text-red-600">&#8377;{addThousandsSeparator(dataPoint.totalAmount)}</span>
                    </p>

                    {/* Iterate over the newly grouped categories for a consolidated view */}
                    {categoriesInTooltip && categoriesInTooltip.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs font-semibold text-gray-600 mb-2">Details:</p>
                            {categoriesInTooltip.map((groupedItem, index) => (
                                <div key={index} className="flex justify-between text-xs text-gray-700 py-1">
                                    <span className="font-medium">{groupedItem.categoryName}:</span>
                                    <span className="text-red-600 font-semibold">&#8377;{addThousandsSeparator(groupedItem.totalAmount)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-4 rounded-lg">
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#dc2626" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#dc2626" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 13, fill: "#6b7280", fontWeight: 500 }}
                        stroke="#e5e7eb"
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 13, fill: "#6b7280", fontWeight: 500 }}
                        stroke="#e5e7eb"
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip/>} cursor={{ stroke: '#dc2626', strokeWidth: 1, strokeDasharray: '5 5' }} />

                    <Area
                        type="monotone"
                        dataKey="totalAmount"
                        stroke="#dc2626"
                        fill="url(#expenseGradient)"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#dc2626", strokeWidth: 2, stroke: "#fff" }}
                        activeDot={{ r: 6, fill: "#dc2626", strokeWidth: 2, stroke: "#fff" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChartExpense;