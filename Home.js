import React, { useState, useEffect } from 'react';
import './Home.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

function Home() {
  const [orderNumber, setOrderNumber] = useState('');
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [user, setUser] = useState();
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const logoutUser = () => {
    setUser(null);
    Cookies.remove("cookieconstant");
    setRedirect(true);
  };

  useEffect(() => {
    fetch('/vehicle.json')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customer data:', error));
  }, []);

  const handleCustomerChange = (event) => {
    const customerID = event.target.value;
    setOrderNumber(customerID);
    const customer = customers.find(cust => cust.customerID === customerID);
    setSelectedCustomer(customer);
    setSelectedOrders(customer ? customer.orders : []);
    setSelectedOrder(null); // Reset the selected order
  };

  const handleOrderChange = (event) => {
    const orderId = event.target.value;
    const order = selectedOrders.find(order => order.orderId === orderId);
    setSelectedOrder(order);
  };

  const handleSubmit = () => {
    if (selectedOrder) {
      navigate('/vehiclelist', { state: { order: selectedOrder } });
    } else {
      alert("Please select an order before searching.");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="order-tracker">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <p className="title">Order Tracker</p>
        </div>
      </nav>
      <div className="search-bar">
        <div className="customer-select">
          <p>Customer:</p>
          <select value={orderNumber} onChange={handleCustomerChange}>
            <option value="" disabled>Select Customer</option>
            {customers.map((customer, index) => (
              <option key={index} value={customer.customerID}>
                {customer.customerName}
              </option>
            ))}
          </select>
        </div>

        {selectedCustomer && (
          <div className="order-select">
            <p>Order:</p>
            <select value={selectedOrder ? selectedOrder.orderId : ''} onChange={handleOrderChange}>
              <option value="" disabled>Select Order</option>
              {selectedOrders.map(order => (
                <option key={order.orderId} value={order.orderId}>
                  {order.orderId}
                </option>
              ))}
            </select>
          </div>
        )}

        <button onClick={handleSubmit}>Click to Search</button>
      </div>

      <Outlet context={{ user, setUser, logoutUser }} />
      <div className="mt-10">
        <button onClick={logoutUser} className="btn">Logout</button>
      </div>
    </div>
  );
}

export default Home;
