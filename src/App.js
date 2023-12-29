// client/src/App.js
import React, { useState, useEffect } from 'react';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';

const App = () => {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);

  useEffect(() => {
    // Fetch clients from the backend and set them in state
    fetch('http://localhost:5000/clients')
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error('Error fetching clients:', error));
  }, []);

  const handleClientSubmit = (clientData) => {
    // Send client data to the backend to save
    fetch('http://localhost:5000/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    })
      .then((response) => response.json())
      .then((newClient) => setClients([...clients, newClient]))
      .catch((error) => console.error('Error creating client:', error));
  };

  const handleClientClick = (clientId) => {
    // Handle the click on a client, e.g., fetch client details from the backend
    fetch(`http://localhost:5000/clients/${clientId}`)
      .then((response) => response.json())
      .then((selectedClient) => setSelectedClientId(selectedClient._id))
      .catch((error) => console.error('Error fetching client details:', error));
  };

  return (
    <div>
      <h1>Client Management App</h1>
      <ClientForm onSubmit={handleClientSubmit} />
      <ClientList clients={clients} onClientClick={handleClientClick} />
      {selectedClientId && <p>Client details will go here for client ID: {selectedClientId}</p>}
    </div>
  );
};

export default App;