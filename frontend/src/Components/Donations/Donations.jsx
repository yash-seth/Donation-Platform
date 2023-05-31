import { React, useState } from "react";
import "./Donations.css";
import { completedOrders, transitOrders } from "../../Data";

function Donations() {
  const [dashboardView, setDashboardView] = useState("completed");

  function sendReminder(e) {
    alert("Reminder was sent for order with ID: " + e.target.value);
    let orderID = e.target.value;
    const templateId = process.env.REACT_APP_TEMPLATE_ID;
    // Note: currently works because orderID == index for the dummy data, if orderID does not align with index in data array, will not work
    sendFeedback(templateId, {
      message:
        "This is a reminder to send your courier for donation. Kindly do so at the earliest. Thanks!",
      reply_to: transitOrders[orderID].email,
      to_name: transitOrders[orderID].name,
    });
  }

  // function handleSubmit (event, orderID) {
  //   const templateId = 'template_iphgpdf';
  //   console.log(orderID)
  //   sendFeedback(templateId, {message: "This is a reminder to send your courier for donation. Kindly do so at the earliest. Thanks!", reply_to: transitOrders[orderID].email, to_name: transitOrders[orderID].name})
  //   }

  function sendFeedback(templateId, variables) {
    window.emailjs
      .send(process.env.REACT_APP_SERVICE_ID, templateId, variables)
      .then((res) => {
        console.log("Email successfully sent!");
      })
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  }

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
          <div className="donations-header">
            <h1>Completed Orders</h1>
          </div>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Order ID</th>
                {/* <th>Status</th> */}
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email Address</th>
                <th>Data of Completion</th>
              </tr>
            </thead>
            <tbody>
              {completedOrders.map((order) => {
                return (
                  <tr id={order.orderID} key={order.orderID}>
                    <td>{order.orderID}</td>
                    <td>{order.name}</td>
                    {/* <td>{order.status}</td> */}
                    <td>{order.contact}</td>
                    <td>{order.email}</td>
                    <td>{order.completedDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : dashboardView === "transit" ? (
        <div className="completedOrders">
          <div className="donations-header">
            <h1>Transit Orders</h1>
          </div>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Order ID</th>
                {/* <th>Status</th> */}
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email Address</th>
                <th>Initiated Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transitOrders.map((order) => {
                return (
                  <tr id={order.orderID} key={order.orderID}>
                    <td>{order.orderID}</td>
                    <td>{order.name}</td>
                    {/* <td>{order.status}</td> */}
                    <td>{order.contact}</td>
                    <td>{order.email}</td>
                    <td>{order.initiatedDate}</td>
                    <td>
                      <button
                        value={order.orderID}
                        onClick={(e) => sendReminder(e)}
                      >
                        Remind
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : dashboardView === "new" ? (
        <div>New Order</div>
      ) : (
        <div>Completed Orders</div>
      )}
    </div>
  );
}

export default Donations;
