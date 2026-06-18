import { Routes, Route } from "react-router-dom";
import Layout from "./ui/Layout";
import MuscleDetail from "./ui/MuscleDetail";
import MuscleRegionScreen from "./ui/MuscleRegionScreen";
import MuscleSubGroupScreen from "./ui/MuscleSubGroupScreen";
import MuscleSystemScreen from "./ui/MuscleSystemScreen";
import MuscleSystemDetailScreen from "./ui/MuscleSystemDetailScreen";
import QuizScreen from "./ui/QuizScreen";
import QuizResultScreen from "./ui/QuizResultScreen";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<MuscleSystemScreen />} />
                <Route path="/system/:systemId" element={<MuscleSystemDetailScreen />} />
                <Route path="/region/:regionId" element={<MuscleRegionScreen />} />
                <Route path="/subgroup/:subGroupId" element={<MuscleSubGroupScreen />} />
                <Route path="/detail/:muscleId" element={<MuscleDetail />} />
                <Route path="/quiz/:scope/:id" element={<QuizScreen />} />
                <Route path="/quiz/:scope/:id/:mode" element={<QuizScreen />} />
                <Route path="/quiz-result" element={<QuizResultScreen />} />
            </Routes>
        </Layout>
    );
}

export default App;
