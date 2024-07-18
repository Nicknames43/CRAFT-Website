import PropTypes from "prop-types"
import ButtonLink from "../../components/ButtonLink"

function PropertyListing({ property, address }) {
  let displayedFeatured = []
  if (property.type !== "Residential") {
    if (property.propDetails.featured.length === 3) {
      displayedFeatured = [...property.propDetails.featured]
    } else if (property.propDetails.featured.length < 3) {
      displayedFeatured = [...property.propDetails.featured]
      for (let i = displayedFeatured.length; i < 3; i++) {
        displayedFeatured.push(<br />)
      }
    } else {
      let temp = [...property.propDetails.featured]
      for (let i = 0; i < 3; i++) {
        let idx = Math.floor(Math.random() * temp.length)
        displayedFeatured.push(temp[idx])
        temp.splice(idx, 1)
      }
    }
  }

  const col1 =
    property.type === "Residential" ? (
      <></>
    ) : (
      <div className="property-listing__col1">
        <p className="property-listing__text_bold property-listing__text">
          {property.type}
        </p>
        <br />
        <p className="property-listing__text">{`${property.address.streetNum} ${property.address.streetName}`}</p>
        <p className="property-listing__text">{`${property.address.city}, ${property.address.province}`}</p>
        <p className="property-listing__text">{property.address.postalCode}</p>
        <br />
        <p className="property-listing__text_bold property-listing__text">{`${property.propDetails.totSize} sq ft total`}</p>
      </div>
    )

  const col2 =
    property.type === "Residential" ? (
      <></>
    ) : (
      <>
        <p className="property-listing__text_bold property-listing__text">
          Feature Tenants
        </p>
        <br />
        {displayedFeatured.map((tenant, index) => {
          return (
            <p
              key={`${property.name}-featured-${index}`}
              className="property-listing__text"
            >
              {tenant}
            </p>
          )
        })}
        <br />
        <ButtonLink
          text="MORE INFO"
          page={`Properties/${address}`}
          w="20vw"
          h="3.2vw"
        />
      </>
    )

  return (
    <div className="property-listing">
      <img
        src={property.images[0]}
        alt="No Preview Image"
        className="property-listing__img"
      />
      {col1}
      <div className="property-listing__col2">{col2}</div>
    </div>
  )
}

PropertyListing.propTypes = {
  address: PropTypes.string.isRequired,
  property: PropTypes.exact({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    salesManager: PropTypes.oneOf([
      PropTypes.string.isRequired,
      PropTypes.exact({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
    ]),
    address: PropTypes.exact({
      country: PropTypes.string.isRequired,
      province: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      streetName: PropTypes.string.isRequired,
      streetNum: PropTypes.string.isRequired,
      postalCode: PropTypes.string.isRequired,
    }).isRequired,
    status: PropTypes.arrayOf(PropTypes.string).isRequired,
    propDetails: PropTypes.oneOfType([
      PropTypes.exact({
        totSize: PropTypes.number.isRequired,
        leaseSize: PropTypes.number.isRequired,
        siteArea: PropTypes.number,
        tenantMix: PropTypes.string.isRequired,
        featured: PropTypes.arrayOf(PropTypes.string),
        buildings: PropTypes.objectOf(
          PropTypes.arrayOf(
            PropTypes.exact({
              unit: PropTypes.string.isRequired,
              tenant: PropTypes.string.isRequired,
              space: PropTypes.number.isRequired,
              lease: PropTypes.bool.isRequired,
            }).isRequired
          ).isRequired
        ).isRequired,
      }),
      PropTypes.exact({
        totNumHomes: PropTypes.number.isRequired,
        purchasable: PropTypes.bool.isRequired,
        totNumSingle: PropTypes.number,
        totNumSemi: PropTypes.number,
        totNumTownHome: PropTypes.number,
        totNumCondo: PropTypes.number,
        siteArea: PropTypes.number,
        phases: PropTypes.objectOf(
          PropTypes.exact({
            numHomes: PropTypes.number.isRequired,
            numSingle: PropTypes.number,
            numSemi: PropTypes.number,
            numTownHome: PropTypes.number,
            numCondo: PropTypes.number,
            phaseArea: PropTypes.number,
          })
        ).isRequired,
      }),
    ]).isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}

export default PropertyListing
