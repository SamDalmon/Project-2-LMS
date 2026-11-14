import './UserManagement.css'
import UserCard from '../../components/UserCard/UserCard';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { useEffect, useState } from 'react';
import { usersApi } from '../../api/usersAPI';
import { isRequestCanceled } from '../../api/apiClient';

export default function UserManagement () {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
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

  if (loading) return <h2>Loading Users...</h2>
  if (error) return <h2>Error: {error}</h2>

  return (
    <MainLayout content= {(
      <div className='users-container'>
        {
          users.map((user, index) => (
            <UserCard key={ index } user={ user }/>
          ))
        }
      </div>
    )}/>
  )
}