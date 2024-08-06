import { useGetUsersQuery } from "../../app/api/usersApiSlice"
import { useNavigate } from "react-router-dom"
import User from "./User"
import useAuth from "../../hooks/useAuth"
import PulseLoader from "react-spinners/PulseLoader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  const navigate = useNavigate()
  const handleCreate = () => navigate(`/dash/users/new`)
  const { admin } = useAuth()

  if (!admin) {
    return <p className="errmsg">Unauthorized</p>
  }
  let content

  if (isLoading) content = <PulseLoader color={"#FFF"} />

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = users

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null

    content = (
      <>
        <button className="icon-button create-button" onClick={handleCreate}>
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
        <table className="table table--users">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th user__username">
                Username
              </th>
              <th scope="col" className="table__th user__admin">
                Admin
              </th>
              <th scope="col" className="table__th user__edit">
                Edit
              </th>
              <th scope="col" className="table__th user__delete">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </>
    )
  }

  return content
}
export default UsersList
