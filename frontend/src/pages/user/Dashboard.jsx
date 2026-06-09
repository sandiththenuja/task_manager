import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import DashboardLayout from '../../components/layout/DashboardLayout'

const Dashboard = () => {
  useUserAuth()

  const {user} = useContext(UserContext)
  return (
    <DashboardLayout>
      <div>Dashboard
    </div>
    </DashboardLayout>
    
  )
}

export default Dashboard