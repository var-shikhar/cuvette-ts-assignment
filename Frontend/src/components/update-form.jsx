import { useState } from "react"
import { Button } from "react-bootstrap"

// eslint-disable-next-line react/prop-types
const UpdateStatusForm = ({ handleSubmit, currentStatus }) => {
  const [newStatus, setNewStatus] = useState(currentStatus)
  return (
    <div className="form-wrapper">
      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          className="form-select"
          id="status"
          name="status"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <Button
        type="button"
        className="w-100"
        onClick={() => handleSubmit(newStatus)}
      >
        Update Status
      </Button>
    </div>
  )
}

export default UpdateStatusForm
