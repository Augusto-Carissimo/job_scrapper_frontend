import React from 'react';

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
    </tr>
  )
}

export default Position