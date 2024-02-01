import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./components/Auth"
import Tasks from "./components/Tasks"
import Test from "./components/testTheme"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App