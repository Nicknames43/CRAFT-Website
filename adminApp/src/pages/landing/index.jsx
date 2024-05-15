import { Link } from "react-router-dom"

const Landing = () => {
  const content = (
    <section className="landing">
      <h1>Welcome!</h1>
      <p>
        <Link to="/dash/properties">View properties</Link>
      </p>
      <p>
        <Link to="/dash/users">View Users</Link>
      </p>
    </section>
  )

  return content
}
export default Landing
