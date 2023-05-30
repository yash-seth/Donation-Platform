import { React, useState } from "react";
import "./Donations.css";
import { completedOrders } from "../../Data";

function Donations() {
  const [dashboardView, setDashboardView] = useState("completed");
  return (
    <div className="donations">
      <div className="sidemenu">
        <button
          className="sidemenu-btns"
          onClick={() => setDashboardView("completed")}
        >
          Completed Donations
        </button>
        <button
          className="sidemenu-btns"
          onClick={() => setDashboardView("transit")}
        >
          In transit
        </button>
        <button
          className="sidemenu-btns"
          onClick={() => setDashboardView("new")}
        >
          New Donation
        </button>
      </div>
      {dashboardView === "completed" ? (
        <div className="completedOrders">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Order ID</th>
                {/* <th>Status</th> */}
                <th>Name</th>
                <th>Contact Number</th>
                <th>Contact Number</th>
            </tr>
            </thead>
            <tbody>
              {completedOrders.map((order) => {return (
                <tr id={order.orderID}>
                  <td>{order.orderID}</td>
                  <td>{order.name}</td>
                  {/* <td>{order.status}</td> */}
                  <td>{order.contact}</td>
                  <td>{order.email}</td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      ) : dashboardView === "transit" ? (
        <div>Transit Orders</div>
      ) : dashboardView === "new" ? (
        <div>New Order</div>
      ) : (
        <div>Completed Orders</div>
      )}
    </div>
  );
}

export default Donations;
