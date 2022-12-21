import React, { Suspense } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";



const LoginPage = React.lazy(() => import("./pages/Login/Login"))
const RegisterPage = React.lazy(() => import("./pages/Register/Register"))
const HomePage = React.lazy(() => import("./pages/TasksView/TasksView"))
const TaskView = React.lazy(() => import("./pages/TaskView/TaskView"))
const TaskEdit = React.lazy(() => import("./pages/TaskEdit/TaskEdit"))

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div></div>}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/:task_id" element={<TaskView />} />
                    <Route path="/edit/:task_id" element={<TaskEdit />} />
                    <Route path="/add" element={<TaskEdit />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
