import { Outlet } from "react-router-dom";
import { getToken } from "./session/Token";
import EmptyPage from "./ui/EmptyPage";

function ProtectedRoute() {
  const token = getToken();

  if (!token) {
    return <EmptyPage
      title="Access denied"
      message="You need to be signed in before entering the resume workspace."
      icon="🚫"
    />;
  }

  return <Outlet />;
}

export default ProtectedRoute;