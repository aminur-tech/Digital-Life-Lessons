import { Navigate } from "react-router";
import useRole from "../Hooks/useRole";
import Loading from "../Component/Loading/Loading";

export default function AdminRoute({ children }) {
  const { role, isLoading } = useRole();

  if (isLoading) return <Loading/>

  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
}
