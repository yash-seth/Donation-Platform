import { React, useState, useEffect } from "react";
import "./Donations.css";
import { completedOrders } from "../../Data";
import axios from "axios";

function Donations() {
  const [dashboardView, setDashboardView] = useState("completed");
  const [orderData, setOrderData] = useState({ status: "pending" });
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  const fetchPendingRecords = async () => {
    await axios
      .get("http://localhost:5000/get-pending-orders")
      .then((orders) => setPendingOrders(orders.data));
  };

  const fetchCompletedRecords = async () => {
    await axios
      .get("http://localhost:5000/get-completed-orders")
      .then((orders) => setCompletedOrders(orders.data));
  };


  const sync = async () => {
    fetchPendingRecords()
    fetchCompletedRecords()
  }
  // fetch records on first render
  useEffect(() => {
    fetchPendingRecords();
    fetchCompletedRecords();
  }, []);

  function handleFormData(e) {
    const key = e.target.name;
    const val = e.target.value;
    setOrderData((orderData) => ({ ...orderData, [key]: val }));
    let date = new Date().toLocaleDateString();
    setOrderData((orderData) => ({ ...orderData, ["date"]: date }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    alert("Form was submitted and order was added.");
    await axios
      .post("http://localhost:5000/add-order", {
        ...orderData,
      })
      .then((res) => {
        try {
          console.log(res.data.msg);
        } catch (err) {
          console.log("There was some error.");
        }
      });

    setOrderData({
      name: "",
      contact: "",
      email: "",
      date: "",
      status: "pending",
    });
  }

  function sendReminder(e) {
    alert("Reminder was sent for order with ID: " + e.target.value);
    let orderID = e.target.value;
    console.log(pendingOrders[orderID]);
    const templateId = process.env.REACT_APP_TEMPLATE_ID;
    sendFeedback(templateId, {
      message:
        "This is a reminder to send your courier for donation. Kindly do so at the earliest. Thanks!",
      reply_to: pendingOrders[orderID].email,
      to_name: pendingOrders[orderID].name,
    });
  }

  function sendFeedback(templateId, variables) {
    window.emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID,
        templateId,
        variables,
        process.env.REACT_APP_PUBLIC_KEY
      )
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

  async function markCompleted(e) {
    alert("Order " + e.target.value + " was completed");
    await axios.post("http://127.0.0.1:5000/complete-order", {
      orderID: e.target.value,
    });
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
            <button onClick={sync}>Sync Changes</button>
          </div>
          {completedOrders.length !== 0 ? (
            <>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Order ID</th>
                    {/* <th>Status</th> */}
                    <th>Name</th>
                    <th>Contact Number</th>
                    <th>Email Address</th>
                    <th>Data of Completion</th>
                  </tr>
                </thead>
                <tbody>
                  {completedOrders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{order._id}</td>
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
            </>
          ) : (
            <div>No Completed Orders</div>
          )}
        </div>
      ) : dashboardView === "transit" ? (
        <div className="completedOrders">
          <div className="donations-header">
            <div id="transitHeaders">
              <h1>Transit Orders</h1>
              <button onClick={sync}>Sync Changes</button>
            </div>
          </div>
          {pendingOrders.length !== 0 ? (
            <>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Index</th>
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
                  {pendingOrders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{order._id}</td>
                        <td>{order.name}</td>
                        {/* <td>{order.status}</td> */}
                        <td>{order.contact}</td>
                        <td>{order.email}</td>
                        <td>{order.date}</td>
                        <td>
                          <button
                            value={index}
                            onClick={(e) => sendReminder(e)}
                          >
                            Remind
                          </button>
                          <button
                            value={order._id}
                            onClick={(e) => markCompleted(e)}
                          >
                            Complete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <div>No pending orders</div>
          )}
        </div>
      ) : dashboardView === "new" ? (
        <div className="completedOrders">
          <div className="donations-header">
            <h1>New Order</h1>
          </div>
          <form onSubmit={handleFormSubmit} id="order_form">
            <label htmlFor="name">Name: </label>
            <input
              name="name"
              id="name"
              onChange={handleFormData}
              value={orderData.name}
            />
            <br />
            <label htmlFor="contact">Contact Number: </label>
            <input
              name="contact"
              id="contact"
              onChange={handleFormData}
              value={orderData.contact}
            />
            <br />
            <label htmlFor="email">Email: </label>
            <input
              name="email"
              id="email"
              onChange={handleFormData}
              value={orderData.email}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div className="completedOrders">
          <div className="donations-header">
            <h1>Completed Orders</h1>
            <button onClick={sync}>Sync Changes</button>
          </div>
          {completedOrders.length !== 0 ? (
            <>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Order ID</th>
                    {/* <th>Status</th> */}
                    <th>Name</th>
                    <th>Contact Number</th>
                    <th>Email Address</th>
                    <th>Data of Completion</th>
                  </tr>
                </thead>
                <tbody>
                  {completedOrders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{order._id}</td>
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
            </>
          ) : (
            <div>No Completed Orders</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Donations;
