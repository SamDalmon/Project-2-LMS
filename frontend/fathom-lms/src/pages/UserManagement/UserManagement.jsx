import './UserManagement.css'
import UserCard from '../../components/UserCard/UserCard';
import MainLayout from '../../layouts/MainLayout/MainLayout';

export default function UserManagement () {
  const users = [
    { 
      firstName: 'Liam', 
      lastName: 'Bennett',
      email: 'liam.bennett@fmail.com',
      role: 'teacher',
      status: 'pending'
    },
    { 
      firstName: 'Maya', 
      lastName: 'Lin',
      email: 'maya.lin@fmail.com',
      role: 'student',
      status: 'active'
    },
    { 
      firstName: 'Noah', 
      lastName: 'Patel',
      email: 'noah.patel@fmail.com',
      role: 'admin',
      status: 'active'
    },
    { 
      firstName: 'Clara', 
      lastName: 'Vance',
      email: 'clara.vance@fmail.com',
      role: 'teacher',
      status: 'active'
    },
    { 
      firstName: 'Julian', 
      lastName: 'Santos',
      email: 'julian.santos@fmail.com',
      role: 'teacher',
      status: 'rejected'
    },
    { 
      firstName: 'Nora', 
      lastName: 'Kim',
      email: 'nora.kim@fmail.com',
      role: 'student',
      status: 'active'
    },
  ]

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