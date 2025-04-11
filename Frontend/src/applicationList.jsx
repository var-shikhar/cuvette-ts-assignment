import { Button } from "react-bootstrap"
import DeleteIcon from "./assets/delete.png"
import EditIcon from "./assets/edit.png"
import FilterOptions from "./components/filter-options"
import ApplicationForm from "./components/form"
import ModalWrapper from "./components/modal"
import UpdateStatusForm from "./components/update-form"
import useApplicationList from "./hooks/use-application"

const ApplicationList = () => {
  const {
    applicationForm,
    createNewApplication,
    deleteApplication,
    filterOptions,
    setFilterOptions,
    handleFormValues,
    handleModalToggle,
    modalToggle,
    selectedApplication,
    updateApplicationStatus,
    filteredList,
    setModalToggle,
    formErrors,
  } = useApplicationList()
  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h3>Application List</h3>
          <small>
            View all applications at a place and manage them easily.
          </small>
        </div>
        <Button type="button" size="sm" onClick={() => handleModalToggle(null)}>
          Create New Application
        </Button>
      </div>
      {/* Page Filters */}
      <div className="page-filters">
        <div> Filter Applications</div>
        <FilterOptions
          defaultValues={filterOptions}
          filterValues={setFilterOptions}
        />
      </div>

      {/* Page Content */}
      {filteredList.length > 0 ? (
        <div className="row mx-0">
          {filteredList?.map((item) => (
            <div
              className="col-12 col-md-4 col-lg-3 card-wrapper"
              key={item.id}
            >
              <div className="card">
                <div className="card-action">
                  <img
                    src={EditIcon}
                    alt="edit"
                    className="icon"
                    onClick={() => handleModalToggle(item.id)}
                  />
                  <img
                    src={DeleteIcon}
                    alt="delete"
                    className="icon"
                    onClick={() => deleteApplication(item.id)}
                  />
                </div>
                <div className="cs-card-header">
                  <div className="text-truncate">{item.role}</div>
                  <small>{item.company}</small>
                </div>
                <small className="cs-card-footer">
                  <span className="status">{item.status}</span>
                  <span className="fw-bold">
                    {new Date(item.dateOfApplication).toLocaleDateString(
                      "en-GB"
                    )}
                  </span>
                </small>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Application Found</div>
      )}

      {/* Modal */}
      <ModalWrapper
        toggle={modalToggle}
        setToggle={setModalToggle}
        title={
          selectedApplication
            ? "Edit Application Status"
            : "Create New Application"
        }
      >
        <div>
          {selectedApplication ? (
            <UpdateStatusForm
              handleSubmit={updateApplicationStatus}
              currentStatus={
                filteredList.find((item) => item.id === selectedApplication)
                  .status ?? ""
              }
            />
          ) : (
            <ApplicationForm
              handleFormValues={handleFormValues}
              values={applicationForm}
              handleSubmit={createNewApplication}
              errors={formErrors}
            />
          )}
        </div>
      </ModalWrapper>
    </div>
  )
}

export default ApplicationList
