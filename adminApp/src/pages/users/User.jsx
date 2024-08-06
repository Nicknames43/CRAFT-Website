import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../app/api/usersApiSlice"
import { memo } from "react"

const User = ({ userId }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  })

  const [deleteUser] = useDeleteUserMutation()

  const navigate = useNavigate()

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`)

    const handleDelete = async () => {
      await deleteUser({ id: user.id })
    }

    return (
      <tr className="table__row user">
        <td className="table__cell user__username">{user.username}</td>
        <td className="table__cell user__admin">{user.admin ? "yes" : "no"}</td>
        <td className="table__cell table__button-container user__edit">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
        <td className="table__cell table__button-container user__delete">
          <button className="icon-button table__button" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </td>
      </tr>
    )
  } else return null
}

const memoizedUser = memo(User)
export default memoizedUser