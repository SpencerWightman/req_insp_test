export const Main = ({ homePage }) => {
  if (!homePage) {
    return (
      <div id="main">
        <h3>Getting Started</h3>
        <ul>
          <li className="instructions">Click "New Inspector" to create a bin.</li>
          <li className="instructions">Use "Webhook URL" as the endpoint for a webhook provider.</li>
          <li className="instructions">Watch webhook requests come into the sidebar.</li>
          <li className="instructions">Click on a request to view its headers and body.</li>
        </ul>
      </div>
    )
  }

  const headers = Object.keys(JSON.parse(homePage.header))
  const values = Object.values(JSON.parse(homePage.header))

  return (
    <div id="main">
      <table>
        <tbody>
          <tr key="-1">
            <td className="header-info header-title">Header</td>
            <td className="header-info header-title">Value</td>
          </tr>
          {headers.map((header, idx) =>
            <tr key={idx}>
              <td className="header-info">"{header}"</td>
              <td className="header-info">"{values[idx]}"</td>
            </tr>
          )}
        </tbody>
      </table>
      <table id="body-table">
        <tbody>
          <tr key="-1">
            <td className="header-info header-title">Body</td>
          </tr>
            <tr id="body-row">
              <td className="header-info">{homePage.body}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}