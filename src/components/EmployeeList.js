import { useDispatch, useSelector } from 'react-redux'
import { DELETE_EMPLOYEE, deleteEmployee } from '../redux/employeeActions'

const EmployeeList = () => {
  const dispatch = useDispatch()
  const employees = useSelector((state) => state.employees.employees)

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id))
  }

  return (
    <div>
      <h2>Employee List</h2>
      {employees.map((emp) => (
        <div key={emp.id}>
          <p>{emp.name}</p>
          <button onClick={() => handleDelete(emp.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
export default EmployeeList
