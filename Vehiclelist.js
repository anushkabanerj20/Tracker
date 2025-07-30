import {React , useEffect, useState} from 'react';
import { useLocation, useNavigate,  } from 'react-router-dom';
import './Vehiclelist.css';

function Vehiclelist() {
  const location = useLocation();
  const { order } = location.state || {};


  useEffect(() => {
    fetch('/vehicle.json')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customer data:', error));
  }, []);
  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();
  
  const handleMap = (invoice) => {
    const currentCustomer = customers.find(customer => customer.orders.some(o=> o.orderId=== order.orderId));
    console.log(currentCustomer);
     
    if (currentCustomer) {
   
      const data = {
        source: { lat: parseFloat(currentCustomer.sourceLat), long: parseFloat(currentCustomer.sourceLong) },
        destination: { lat: parseFloat(currentCustomer.destinationLat), long: parseFloat(currentCustomer.destinationLong) },
        currentLocation: { lat: parseFloat(invoice.lat), long: parseFloat(invoice.long) }
      };

      console.log(data);
      navigate('/Leafletmap', { state: data });
    }
  };
return (
    <div className="container">
      <nav className="navbar fixed-top bg-body-tertiary">
        <div className="container-fluid">
          <h2 id="nav">Select a customer from list below</h2>
        </div>
      </nav>
      <div className='title'>
        <p className="subtitle">
          Found {order?.inovoices?.length || 0} invoices for Order #{order?.orderId}
        </p>
      </div>
      <div className="vehicle-list">
        {order && order.inovoices.map((invoice, index) => (
          <div key={index} className="vehicle-item">
            <div className="vehicle-info">
              <h3 className="vehicle-number">{invoice.vehicleNo}</h3>
              <p className="current-location">
                Current Location: {invoice.currentLocation}
              </p>
              <p className="destination">
                ETA: {invoice.ETA}
              </p>
              <p className="invoice-number">
                Invoice Number: {invoice.invoiceno}
              </p>
              <p className="invoice-date">
              Invoice Number: {invoice.invoiceno}
              </p>
              <p className="invoice-date">
                Invoice Date: {invoice.invoiceDate}
              </p>
              <p className="order-number">
                Status: {invoice.status}
              </p>
              <p className="delivery-date">
                Delivery Date: {invoice.deliveryDate}
              </p>
            </div>
            <div className="vehicle-actions">
              <button className="view-on-map" onClick={() => handleMap(invoice)}>View on map</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehiclelist;