import { useEffect, useState } from "react"

const useApplicationList = () => {
  const [loading, setLoading] = useState(true)
  const [modalToggle, setModalToggle] = useState(false)

  const [filterOptions, setFilterOptions] = useState({
    status: "All",
    date: {
      start: "",
      end: "",
    },
  })
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [applicationList, setApplicationList] = useState([])
  const [filteredList, setFilteredList] = useState(applicationList)
  const [formErrors, setFormErrors] = useState({})
  const [applicationForm, setApplicationForm] = useState({
    companyName: "",
    jobRole: "",
    applicationStatus: "",
    dateOfApplication: "",
    applicationLink: "",
  })

  // Fetch the Application List from the backend
  useEffect(() => {
    function fetchData() {
      fetch(`${import.meta.env.VITE_APP_BE_URL}/job-application`)
        .then((res) => res.json())
        .then((data) => setApplicationList(data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }

    loading && fetchData()
  }, [loading])

  // Set the Filtered List to the Application List
  useEffect(() => {
    if (applicationList.length > 0) setFilteredList(applicationList)
  }, [applicationList])

  // Filtering the Application List based of Status and Date
  useEffect(() => {
    let tempList = [...applicationList]

    if (tempList.length > 0) {
      // Filter by status
      if (filterOptions.status !== "All") {
        tempList = tempList.filter(
          (item) => item.status === filterOptions.status
        )
      }

      // Filter by Start date
      if (filterOptions.date.start) {
        const start = new Date(filterOptions.date.start)
        start.setHours(0, 0, 0, 0)

        tempList = tempList.filter(
          (item) => new Date(item.dateOfApplication) >= start
        )
      }

      // Filter by End date
      if (filterOptions.date.end) {
        const end = new Date(filterOptions.date.end)
        end.setHours(23, 59, 59, 999)

        tempList = tempList.filter(
          (item) => new Date(item.dateOfApplication) <= end
        )
      }

      setFilteredList(tempList)
    }
  }, [applicationList, filterOptions])

  // Modal Toggle
  function handleModalToggle(id = null) {
    setModalToggle(!modalToggle)
    setSelectedApplication(id)
  }

  //  Function for Updating the Status of the Application
  function updateApplicationStatus(status) {
    fetch(`${import.meta.env.VITE_APP_BE_URL}/job-application/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: selectedApplication, status }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Job Application status updated successfully!")
          setFilteredList(
            applicationList.map((item) =>
              item.id === selectedApplication ? { ...item, status } : item
            )
          )
          setSelectedApplication(null)
          setModalToggle(false)
        }
      })
      .catch((err) => console.log(err))
  }

  // Delete Application
  function deleteApplication(id) {
    fetch(`${import.meta.env.VITE_APP_BE_URL}/job-application/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Job Application deleted successfully!") {
          alert("Job Application deleted successfully!")
          setFilteredList(applicationList.filter((item) => item.id !== id))
        }
      })
  }

  // Create New Job Application
  function createNewApplication() {
    const errors = validateForm()
    setFormErrors(errors)
    if (Object.keys(errors).length === 0) {
      fetch(`${import.meta.env.VITE_APP_BE_URL}/job-application`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: applicationForm.companyName,
          jobRole: applicationForm.jobRole,
          applicationStatus: applicationForm.applicationStatus,
          dateOfApplication: applicationForm.dateOfApplication,
          applicationLink: applicationForm.applicationLink,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            alert("Job Application has added successfully!")
            setModalToggle(false)
            setLoading(true)
            setApplicationForm({
              companyName: "",
              jobRole: "",
              applicationStatus: "",
              dateOfApplication: "",
              applicationLink: "",
            })
          }
        })
        .catch((err) => console.log(err))
    } else {
      alert("Please fix the following errors")
    }
  }

  // Handle Form Values
  function handleFormValues(e) {
    const { name, value } = e.target
    setApplicationForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing again
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }))
  }

  // Handle Form Errors
  const validateForm = () => {
    const errors = {}

    if (!applicationForm.companyName.trim()) {
      errors.companyName = "Company name is required."
    }

    if (!applicationForm.jobRole.trim()) {
      errors.jobRole = "Job role is required."
    }

    if (!applicationForm.applicationStatus) {
      errors.applicationStatus = "Please select an application status."
    }

    if (!applicationForm.dateOfApplication) {
      errors.dateOfApplication = "Date of application is required."
    } else {
      const inputDate = new Date(applicationForm.dateOfApplication)
      const today = new Date()
      if (inputDate > today) {
        errors.dateOfApplication = "Date cannot be in the future."
      }
    }

    const urlRegex = /^https?:\/\/.+/
    if (!applicationForm.applicationLink.trim()) {
      errors.applicationLink = "Application link is required."
    } else if (!urlRegex.test(applicationForm.applicationLink)) {
      errors.applicationLink = "Enter a valid URL (must start with http/https)."
    }

    return errors
  }

  return {
    filteredList,
    modalToggle,
    setModalToggle,
    selectedApplication,
    applicationForm,
    filterOptions,
    setFilterOptions,
    handleModalToggle,
    updateApplicationStatus,
    deleteApplication,
    handleFormValues,
    createNewApplication,
    formErrors,
  }
}

export default useApplicationList
