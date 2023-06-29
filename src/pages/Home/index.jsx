import SearchBar from "../../components/SearchBar"
import TrustInterested from "./TrustInterested"
import Questions from "./Questions"
import Welcome from "./Welcome"

function Home() {
  return (
    <>
      <Welcome />
      <SearchBar />
      <TrustInterested />
      <Questions />
    </>
  )
}

export default Home