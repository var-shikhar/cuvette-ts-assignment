/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap"

const ApplicationForm = ({
  handleFormValues,
  values,
  handleSubmit,
  errors,
}) => {
  return (
    <div className="form-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            name="companyName"
            value={values.companyName}
            onChange={handleFormValues}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="jobRole" className="form-label">
            Job Role
          </label>
          <input
            type="text"
            className="form-control"
            id="jobRole"
            name="jobRole"
            value={values.jobRole}
            onChange={handleFormValues}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="applicationStatus" className="form-label">
            Application Status
          </label>
          <select
            className="form-select"
            id="applicationStatus"
            name="applicationStatus"
            value={values.applicationStatus}
            onChange={handleFormValues}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dateOfApplication" className="form-label">
            Date of Application
          </label>
          <input
            type="date"
            className="form-control"
            id="dateOfApplication"
            name="dateOfApplication"
            value={values.ApplicationForm}
            onChange={handleFormValues}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="applicationLink" className="form-label">
            Job Link
          </label>
          <input
            type="url"
            className="form-control"
            id="applicationLink"
            name="applicationLink"
            value={values.applicationLink}
            onChange={handleFormValues}
          />
        </div>

        <Button type="submit" className="w-100">
          Create Application
        </Button>
      </form>
      <div className="d-flex flex-column gap-2">
        {Object.keys(errors).length > 0 && (
          <div className="text-danger">
            {Object.keys(errors).map((key) => (
              <div key={key}>{errors[key]}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationForm
