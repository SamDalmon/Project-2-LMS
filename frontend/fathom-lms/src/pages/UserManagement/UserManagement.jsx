import './UserManagement.css'
import UserCard from '../../components/UserCard/UserCard';
import EditUserCard from '../../components/EditUserCard/EditUserCard';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { useEffect, useState } from 'react';
import { usersApi } from '../../api/usersAPI';
import { isRequestCanceled } from '../../api/apiClient';
import { useAuth } from '../../context/AuthContext';

export default function UserManagement () {
  const { user, fetchCurrentUser } = useAuth()
  const currentUserId = user.pk
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUsers() {
      setLoading(true)
      setError(null)

      try {
        const data = await usersApi.getAllUsers(controller.signal)
        setUsers(data)
    
      } catch (err) {
        if (!isRequestCanceled(err)) {
          setError(err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()

    return () => controller.abort
  }, [])

  const handleUserUpdate = ( updatedUser ) => {
    setUsers(( prevUsers ) => {
      return prevUsers.map((user) => {
        return user.pk === updatedUser.pk ? updatedUser : user
      })
    })
  }

  const handleApprove = async ( user ) => {
    try {
      await usersApi.approveUser(user)
      handleUserUpdate({...user, status: 'ACTIVE'})
    } catch (error) {
      console.error(`Approving user ${user.first_name} ${user.last_name} failed for ${error}`)
    }
  }

  const handleReject = async ( user ) => {
    try {
      await usersApi.rejectUser(user)
      handleUserUpdate({...user, status: 'REJECTED'})
    } catch (error) {
      console.error(`Rejecting user ${user.first_name} ${user.last_name} failed for ${error}`)
    }
  }

  const handleUserEdit = async ( updatedUser ) => {
    console.log(JSON.stringify(updatedUser))
    try {
      await usersApi.updateUser(updatedUser)
      handleUserUpdate(updatedUser)
      setEditingId('')
    } catch (error) {
      console.error(`Editing user ${updatedUser.username} failed for ${error}`)
    }

    if (updatedUser.pk === user.pk){
      fetchCurrentUser()
    }
  }

  const handleCancel = () => setEditingId('')

  if (loading) return <h2>Loading Users...</h2>
  if (error) return <h2>Error: {error}</h2>

  return (
    <MainLayout content= {(
      <div className='users-container'>
        {
          users.map(user => 
            editingId !== user.pk ? (
              <UserCard 
                key={ user.pk } 
                user={ user }
                setEditingId={ setEditingId }
                handleApprove={ handleApprove }
                handleReject={ handleReject }
                isCurrentUser={ currentUserId === user.pk }
              />
            ) : (
              <EditUserCard 
                key={ user.pk } 
                initialUser={ user }
                handleSave={ handleUserEdit }
                handleCancel={ handleCancel }
                isCurrentUser={ currentUserId === user.pk }
              />
            )
          )
        }
      </div>
    )}/>
  )
}