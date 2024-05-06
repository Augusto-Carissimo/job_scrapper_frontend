import React from 'react';
import '../index.css';

function Header() {
  return (
    <tr>
      <th className="position_column">Position</th>
      <th className="company_column">Company</th>
      <th className="website_column">Website</th>
      <th className="website_created_at">Found</th>
    </tr>
  );
}

export default Header;
