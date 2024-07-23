import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const Landing = () => {
  const { username, admin, id } = useAuth()

  const content = (
    <section className="landing">
      <h1>Welcome {username}!</h1>
      <p>
        <Link to="/dash/properties">View Properties</Link>
      </p>
      <p>
        <Link to="/dash/salesManagers">View Sales Managers</Link>
      </p>
      <p>
        {admin ? (
          <Link to="/dash/users">View Users</Link>
        ) : (
          <Link to={`/dash/users/${id}`}>Edit Account</Link>
        )}
      </p>
    </section>
  )

  return content
}
export default Landing
