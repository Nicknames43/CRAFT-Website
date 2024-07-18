import PropTypes from "prop-types"

function FeatureTenants({ property, featured }) {
  return (
    <div className="feature-tenants">
      <h1 className="feature-tenants__title">Feature Tenants</h1>
      <ul className="feature-tenants__list">
        {featured.map((tenant) => {
          return (
            <li key={`${property}_${tenant}`}>
              <p className="feature-tenants__tenant">{tenant}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

FeatureTenants.propTypes = {
  featured: PropTypes.arrayOf(PropTypes.string).isRequired,
  property: PropTypes.string.isRequired,
}

export default FeatureTenants
