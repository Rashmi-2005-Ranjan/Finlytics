import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Income from "./Pages/Income.jsx";
import Expense from "./Pages/Expense.jsx";
import Category from "./Pages/Category.jsx";
import Filter from "./Pages/Filter.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import {Toaster} from "react-hot-toast";

const App = () => {
    return (
        <>
            <Toaster/>
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<Home/>}/>
                    <Route path="/income" element={<Income/>}/>
                    <Route path="/expense" element={<Expense/>}/>
                    <Route path="/category" element={<Category/>}/>
                    <Route path="/filter" element={<Filter/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;