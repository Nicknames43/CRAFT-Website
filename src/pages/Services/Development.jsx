import "../../assets/development.scss"

function Development() {
  return (
    <div className="development">
      <h1 className="development__title">DEVELOPMENT</h1>
      <div className="development__columns">
        <p className="development__text">
          CRAFT typically acquires vacant land (no improvements or
          infrastructure) and develops it with required roads, servicing, and
          grading together with flexible covenants and entitlements.
        </p>
        <ul className="development__list">
          <li className="development__item">
            <p className="development__item-text">
              Infrastructure improvements provide a base for further development
              and value creation.
            </p>
          </li>
          <li className="development__item">
            <p className="development__item-text">
              Covenants define the context in which future development may take
              place (often in the form of deed restrictions)
            </p>
          </li>
          <li className="development__item">
            <p className="development__item-text">
              Entitlements are secured legal permissions from regulatory bodies
              (typically in the form of official plan or zoning approvals and
              ultimately a building permit).
            </p>
          </li>
        </ul>
        <p className="development__text">
          Once these improvements have been made to the raw land, it is
          typically leased, and then developed to tenant specifications.
        </p>
        <ul className="development__list">
          <li className="development__item">
            <p className="development__item-text">Acquisitions</p>
          </li>
          <li className="development__item">
            <p className="development__item-text">Sale and Leasebacks</p>
          </li>
          <li className="development__item">
            <p className="development__item-text">
              Investor and Equity Development
            </p>
          </li>
          <li className="development__item">
            <p className="development__item-text">Brownfield Developments</p>
          </li>
          <li className="development__item">
            <p className="development__item-text">Retail Redevelopment</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Development
