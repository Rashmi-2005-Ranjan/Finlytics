import {useEffect, useState} from "react";
import {prepareIncomeLineChartData} from "../Util/Util.js";
import CustomLineChartIncome from "./CustomLineChartIncome.jsx";

const IncomeOverview = ({transactions}) => {
    //Prepare data for line chart
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions)
        console.log(result)
        setChartData(result)
    }, [transactions])

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h5 className="text-xl font-semibold text-gray-800">
                        Income Overview
                    </h5>
                    <p className="text-sm text-gray-500 mt-1">
                        Track Your Earnings Over Time and Analyze Income Trends
                    </p>
                </div>
            </div>
            <div className="mt-10">
                {/*    Create Line Chart*/}
                <CustomLineChartIncome data={chartData}/>
            </div>
        </div>
    )
}
export default IncomeOverview;