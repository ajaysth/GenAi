import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import { AuthProvider } from "./features/auth/AuthContext/auth.provider"
import InterviewContextProvider from './features/interview/interview-context/InterviewContextProvider';

const App = () => {
  return (
    <AuthProvider>
      <InterviewContextProvider>
      <RouterProvider router={router} />
      </InterviewContextProvider>
    </AuthProvider>

  )
}

export default App