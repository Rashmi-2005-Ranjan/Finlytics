import {useEffect, useState} from "react";
import {prepareExpenseLineChart} from "../Util/Util.js";
import CustomLineChartExpense from "./CustomLineChartExpense.jsx";

const ExpenseOverview = ({transactions}) => {
    //Prepare data for line chart
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChart(transactions)
        console.log(result)
        setChartData(result)
    }, [transactions])

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h5 className="text-xl font-semibold text-gray-800">
                        Expense Overview
                    </h5>
                    <p className="text-sm text-gray-500 mt-1">
                        Track Your Spending Over Time and Analyze Expense Trends
                    </p>
                </div>
            </div>
            <div className="mt-4">
                {/*    Create Line Chart*/}
                <CustomLineChartExpense data={chartData}/>
            </div>
        </div>
    )
}
export default ExpenseOverview;