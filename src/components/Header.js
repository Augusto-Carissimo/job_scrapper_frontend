function Header() {
  return (
    <thead>
      <tr>
        <th style={{ width: '50%' }} class_name='position_column'>
          Position
        </th>
        <th style={{ width: '20%' }} class_name='company_column'>
          Company
        </th>
        <th style={{ width: '20%' }} class_name='website_column'>
          Website
        </th>
        <th style={{ width: '10%' }} class_name='website_created_at'>
          Found
        </th>
      </tr>
    </thead>
  )
}

export default Header