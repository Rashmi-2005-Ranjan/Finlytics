import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import CustomTooltip from "./CustomTooltip.jsx";
import CustomLegend from "./CustomLegend.jsx";

const CustomPieChart = ({data, label, totalAmount, showTextAnchor, colors}) => {

    return (
        <div className="bg-white p-4 rounded-lg">
            <ResponsiveContainer width="100%" height={380}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        innerRadius={100}
                        labelLine={false}
                        strokeWidth={2}
                        stroke="#fff"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Legend content={<CustomLegend/>}/>

                    {showTextAnchor && (
                        <>
                            <text
                                x="50%"
                                y="50%"
                                dy={-20}
                                textAnchor="middle"
                                fill="#6b7280"
                                fontSize="14px"
                                fontWeight="500"
                            >
                                {label}
                            </text>
                            <text
                                x="50%"
                                y="50%"
                                dy={15}
                                textAnchor="middle"
                                fill="#1f2937"
                                fontSize="28px"
                                fontWeight="700"
                            >
                                {totalAmount}
                            </text>
                        </>
                    )}
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomPieChart;