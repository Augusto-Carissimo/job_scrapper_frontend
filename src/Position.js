import React from 'react';

function Position(prop) {
  return (
    <div>
      <table>
        <tr>
          <td>
            {prop.title}
          </td>

          <td>
            {prop.company}
          </td>

          <td>
            <a href={prop.link}>Link</a>
          </td>

          <td>
            {prop.website}
          </td>
        </tr>
      </table>
    </div>
  )
}

export default Position