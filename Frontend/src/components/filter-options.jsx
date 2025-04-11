/* eslint-disable react/prop-types */

const FilterOptions = ({ defaultValues, filterValues }) => {
  return (
    <div className="filter-options">
      <select
        className="form-select"
        id="status"
        name="status"
        value={defaultValues.status}
        onChange={(e) =>
          filterValues((prev) => ({ ...prev, status: e.target.value }))
        }
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <div className="d-flex gap-2">
        <input
          type="date"
          className="form-control"
          id="startDate"
          name="startDate"
          value={defaultValues.date.start}
          onChange={(e) =>
            filterValues((prev) => ({
              ...prev,
              date: { ...prev.date, start: e.target.value },
            }))
          }
        />
        <input
          type="date"
          className="form-control"
          id="endDate"
          name="endDate"
          value={defaultValues.date.end}
          onChange={(e) =>
            filterValues((prev) => ({
              ...prev,
              date: { ...prev.date, end: e.target.value },
            }))
          }
        />
      </div>
    </div>
  )
}

export default FilterOptions
