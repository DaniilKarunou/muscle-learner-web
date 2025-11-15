import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MuscleSystemScreen from "./ui/MuscleSystemScreen";
import MuscleRegionScreen from "./ui/MuscleRegionScreen";
import MuscleSubGroupScreen from "./ui/MuscleSubGroupScreen";
import MuscleDetail from "./ui/MuscleDetail";
import QuizScreen from "./ui/QuizScreen";
import QuizResultScreen from "./ui/QuizResultScreen";
import Layout from "./ui/Layout";

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<MuscleSystemScreen />} />
                    <Route path="/region/:regionId" element={<MuscleRegionScreen />} />
                    <Route path="/subgroup/:subGroupId" element={<MuscleSubGroupScreen />} />
                    <Route path="/detail/:muscleId" element={<MuscleDetail />} />
                    <Route path="/quiz/:scope/:id" element={<QuizScreen />} />
                    <Route path="/quizResult/:score/:total" element={<QuizResultScreen />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;