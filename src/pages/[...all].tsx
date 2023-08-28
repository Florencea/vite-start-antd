import { Navigate } from "../router";

export default function NotFound() {
  return <Navigate to="/" replace />;
}
