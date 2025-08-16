import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../pages/NotFoundPage";
import DashboardPage from "../pages/DashboardPage";
import { UserListPage } from "../pages/UserListPage";
import { TransactionPage } from "../pages/Transaction";
import SettingsPage from "../pages/Settings";
import { PersonalInformationPage } from "../pages/PersonalInformationPage";
import { ChangePasswordPage } from "../pages/ChangePasswordPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import EditPrivacyPolicyPage from "../pages/EditPrivacyPolicyPage";
import SignInPage from "../pages/SigninPage";

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
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/settings/personal-information",
        element: <PersonalInformationPage />,
      },
      {
        path: "/settings/change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "/settings/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/settings/privacy-policy/edit",
        element: <EditPrivacyPolicyPage />,
      },
    ],
  },
    {
        path: "/signin",
        element: <SignInPage />,
      },
]);

export default router;
