
import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import NotFoundPage from "../pages/NotFoundPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    // children: [
    //   {
    //     path: "/",
    //     element: <App />,
    //   },
    // ],
  },
])

export default router
