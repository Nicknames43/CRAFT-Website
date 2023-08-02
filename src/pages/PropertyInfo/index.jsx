import PropTypes from "prop-types"
import PropertyTitle from "./PropertyTitle"
import DropDown from "../../components/DropDown"
import InquiriesContent from "./InquiriesContent"
import NonResidentialDetails from "./NonResidentialDetails"
import ResidentialDetails from "./ResidentialDetails"
import PropertyPhases from "./PropertyPhases"
import { useParams } from "react-router-dom"
import PropertyBuildings from "./PropertyBuildings"
import FeatureTenants from "./FeatureTenants"
import PropertyPhotos from "./PropertyPhotos"

export function PropertyInfo({ properties }) {
  const { property } = useParams()

  const purchaseable = properties[property].propDetails.purchasable ? (
    <div className="property-info__inquiries">
      <DropDown
        heading="SALE INQUIRIES"
        content={
          <InquiriesContent salesManager={properties[property].salesManager} />
        }
      />
    </div>
  ) : (
    <></>
  )

  const leaseable =
    properties[property].propDetails.leaseSize > 0 ? (
      <div className="property-info__inquiries">
        <DropDown
          heading="LEASING INQUIRIES"
          content={
            <InquiriesContent
              salesManager={properties[property].salesManager}
            />
          }
        />
      </div>
    ) : (
      <></>
    )

  const featured =
    "featured" in properties[property].propDetails ? (
      <div className="property-info__featured">
        <FeatureTenants
          property={property}
          featured={properties[property].propDetails.featured}
        />
      </div>
    ) : (
      <></>
    )

  const propInfo =
    properties[property].type === "Residential" ? (
      <>
        {purchaseable}
        <div className="property-info__details">
          <DropDown
            heading="PROPERTY DETAILS"
            content={
              <ResidentialDetails
                propDetails={properties[property].propDetails}
              />
            }
          />
        </div>
        <div className="property-info__breakdown">
          <DropDown
            heading="PHASES"
            content={
              <PropertyPhases
                property={property}
                phases={properties[property].propDetails.phases}
              />
            }
          />
        </div>
      </>
    ) : (
      <>
        {leaseable}
        <div className="property-info__details">
          <DropDown
            heading="PROPERTY DETAILS"
            content={
              <NonResidentialDetails
                propDetails={properties[property].propDetails}
              />
            }
          />
        </div>
        <div className="property-info__breakdown">
          <DropDown
            heading="BUILDINGS"
            content={
              <PropertyBuildings
                property={property}
                buildings={properties[property].propDetails.buildings}
              />
            }
          />
        </div>
      </>
    )

  return (
    <>
      <PropertyTitle
        name={properties[property].name}
        type={properties[property].type}
        address={properties[property].address}
      />
      <div className="property-info">
        {propInfo}
        {featured}
      </div>
      <PropertyPhotos
        property={property}
        photos={properties[property].images}
      />
    </>
  )
}

PropertyInfo.propTypes = {
  properties: PropTypes.objectOf(
    PropTypes.exact({
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
    })
  ).isRequired,
}
