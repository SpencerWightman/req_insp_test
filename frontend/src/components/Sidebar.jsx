import { Table } from 'react-bootstrap'

export const Sidebar = ({ pRequests, handleRequestClick }) => {
  if (!pRequests.requestData) {
    return (
      <div id="side-bar">
      <div id="sidebar-header">
        <p><strong>HTTP Method</strong></p>
        <p id="sidebar-header_path"><strong>Time of Request</strong></p>
      </div>
      <Table striped>
        <tbody></tbody>
      </Table>
    </div>
    )
  }
  return (
    <div id="side-bar">
      <div id="sidebar-header">
        <p><strong>HTTP Method</strong></p>
        <p id="sidebar-header_path"><strong>Time of Request</strong></p>
      </div>
      <Table striped>
        <tbody>
          {pRequests.requestData.map((request, idx) =>
            <tr key={idx}>
              <td
                className="sidebar-items"
                onClick={() => handleRequestClick(request.mongo_id)}
                key={request.id}>
                <div className="sidebar-container">
                  <span className="http-method">{request.http_method}</span>
                  <span>{request.recieved_at}</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}