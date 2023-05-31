import { React, useState } from "react";
import "./Donations.css";
import { completedOrders, transitOrders } from "../../Data";
import axios from 'axios'

function Donations() {
  const [dashboardView, setDashboardView] = useState("completed");
  const [orderData, setOrderData] = useState({status: 'pending'})

  function handleFormData(e) {
    const key = e.target.name;
    const val = e.target.value;
    setOrderData((orderData) => ({...orderData, [key]:val}))
    let date = new Date().toLocaleDateString();
    setOrderData((orderData) => ({...orderData, ['date']: date}))
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    // let date = new Date().toLocaleDateString();
    // setOrderData((orderData) => ({...orderData, ['date']: date}))
    alert("Form was submitted and order was added.")
    console.log(orderData)

    await axios.post("http://localhost:5000/add-order", {
      ...orderData
    }).then((res) => {
      try{
        console.log(res.data.msg)
      } catch(err) {
        console.log("There was some error.")
      }
    })
  }

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

  function markCompleted(e) {
    alert("Order was completed");
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
                      <button onClick={(e) => markCompleted(e)}>
                        Complete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : dashboardView === "new" ? (
        <div className="completedOrders">
          <div className="donations-header">
            <h1>New Order</h1>
          </div>
          <form onSubmit={handleFormSubmit} id="order_form">
            <label htmlFor="name">Name: </label>
            <input name="name" id="name" onChange={handleFormData}/><br/>
            <label htmlFor="contact">Contact Number: </label>
            <input name="contact" id="contact" onChange={handleFormData}/><br/>
            <label htmlFor="email">Email: </label>
            <input name="email" id="email" onChange={handleFormData}/><br/>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Donations;
