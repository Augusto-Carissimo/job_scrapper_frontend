import React from 'react';
import '../index.css';

function Position(prop) {
  return (
    <tr>
      <td>
        <a href={prop.link} target='_blank' rel="noopener noreferrer"> {prop.title} </a>
      </td>
      <td>
        {prop.company}
      </td>
      <td>
        <a href={prop.website} target='_blank' rel="noopener noreferrer"> {prop.website} </a>
      </td>
      <td>
        {new Date(prop.created_at).toLocaleDateString('en-GB')}
      </td>
    </tr>
  );
}

export default Position;
