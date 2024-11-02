import { Route, Routes } from "react-router-dom"
import "./index.css"
import AuthPage from "./pages/AuthPage"
import Dashboard from "./pages/MainPage"
function App() {
  
  return (
    <Routes>
      <Route path="auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
    </Routes>
  )
}

export default App
