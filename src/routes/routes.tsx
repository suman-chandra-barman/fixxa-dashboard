
import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import NotFoundPage from "../pages/NotFoundPage"
import DashboardPage from "../pages/DashboardPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
    ],
  },
])

export default router
