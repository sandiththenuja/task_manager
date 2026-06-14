import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { LuFile, LuFileSpreadsheet } from 'react-icons/lu'

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([])
  const [tabs, setTabs] = useState([])
  const [filterStatus, setFilterStatus] = useState("All")

  const navigate = useNavigate()

  const getAllTasks = async() => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus
        }
      })

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : [])

      const statusSummary = response.data?.statusSummary || {}

      const statusArray = [
        {label: "All", count: statusSummary.all || 0},
        {label: "Pending", count: statusSummary.pendingTasks || 0},
        {label: "In Progress", count: statusSummary.inProgressTasks || 0},
        {label: "Completed", count: statusSummary.completedTasks || 0}
      ]

      setTabs(statusArray)
    } catch (error) {
      console.error("Error getting users", error);
    }

  }

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, {state: {taskId: taskData._id}})
  }

  const handleDownloadReport = async() => {

  }

  useEffect(() => {
    getAllTasks(filterStatus)
    return () => {}
  }, [filterStatus])

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center gap-3 justify-between">
            <h5 className='text-xl font-medium'>My Tasks</h5>

            <button 
            className="flex lg:hidden download-btn"
            onClick={handleDownloadReport}>
              <LuFileSpreadsheet className='text-lg' />
              Download Report
            </button>
          </div>

          {allTasks?.length > 0 && (
            <div className="flex items-center gap-3">
              <TaskStatusTab
              tabs={tabs}
              avtiveTab={filterStatus}
              setActiveTab={setFilterStatus} />

              <button className="" onClick={handleDownloadReport}></button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageTasks