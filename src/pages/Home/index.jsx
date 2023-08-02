import SearchBar from "../../components/SearchBar"
import TrustInterested from "./TrustInterested"
import Questions from "./Questions"
import Welcome from "./Welcome"
import FeatureProperties from "./FeatureProperties"

export function Home() {
  return (
    <>
      <Welcome />
      <FeatureProperties />
      <SearchBar />
      <TrustInterested />
      <Questions />
    </>
  )
}