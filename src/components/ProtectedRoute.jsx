import { Outlet } from "react-router-dom";
import { getToken } from "../Share/token";
import EmptyPage from "./EmptyPage";

function ProtectedRoute() {
  const token = getToken();

  // Si aucun token n'est trouvé, on redirige vers le login
  if (!token) {
    return <EmptyPage
      title="Accès refusé"
      message="Vous devez être connecté pour accéder à cette page."
      icon="🚫"
    />;
  }

  // Si le token existe, on affiche les routes enfants grâce à <Outlet />
  return <Outlet />;
}

export default ProtectedRoute;