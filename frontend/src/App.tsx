import { Routes, Route, BrowserRouter } from "react-router";
import SignInPage from "./pages/authPages/SignInPage";
import SignUpPage from "./pages/authPages/SignUpPage";
import HomePage from "./pages/protectedPages/HomePage";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/auth/protectedRoute";
export function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* private routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>




        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
