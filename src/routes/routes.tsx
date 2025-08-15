
import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import NotFoundPage from "../pages/NotFoundPage"
import DashboardPage from "../pages/DashboardPage"
import { UserListPage } from "../pages/UserListPage"
import { TransactionPage } from "../pages/Transaction"

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
      {
        path: "/users",
        element: <UserListPage />,
      },
      {
        path: "/transaction",
        element: <TransactionPage />,
      },
    ],
  },
])

export default router
