import { React, useState } from 'react'
import "./Donations.css"
import { completedOrders } from '../../Data'

function Donations() {
  const [dashboardView, setDashboardView] = useState("completed")
  return (
    <div className="donations">
      <div className='sidemenu'>
        <button className='sidemenu-btns' onClick={() => setDashboardView("completed")}>Completed Donations</button>
        <button className='sidemenu-btns' onClick={() => setDashboardView("transit")}>In transit</button>
        <button className='sidemenu-btns' onClick={() => setDashboardView("new")}>New Donation</button>
      </div>
      {dashboardView === "completed" ? (<div>Completed Orders</div>) 
      :
      dashboardView === "transit" ? (<div>Transit Orders</div>) 
      :
      dashboardView === "new" ? (<div>New Order</div>)
      : 
      (<div>Completed Orders</div>)}  
    </div>
  )
}

export default Donations