// client/src/components/ClientList.js
import React from 'react';

const ClientList = ({ clients, onClientClick }) => {
  return (
    <ul>
      {clients.map((client) => (
        <li key={client._id} onClick={() => onClientClick(client._id)}>
          {client.name}
        </li>
      ))}
    </ul>
  );
};

export default ClientList;
