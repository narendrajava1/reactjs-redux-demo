import { useState } from 'react'
import { addEmployee, updateEmployee } from '../redux/employeeActions'
import { useDispatch } from 'react-redux'

export const EmployeeAdd = () => {
  const dispatch = useDispatch()
  const [employee, setEmployee] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (employee.id) {
      dispatch(updateEmployee(employee.id, employee))
    } else {
      dispatch(addEmployee(employee))
    }
  }
  //   {
  // 	"name":"Narendra Kumar Kolli",
  // 	"email":"kolli7571@gmail.com",
  // 	"address":"Kotcherla",
  // 	"deptName":"Maths",
  // 	"desc":"He is best maths teacher"
  // }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="address"
          value={employee.address}
          onChange={(e) =>
            setEmployee({ ...employee, address: e.target.value })
          }/>
        <input
          type="text"
          placeholder="department"
          value={employee.deptName}
          onChange={(e) =>
            setEmployee({ ...employee, deptName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="description"
          value={employee.desc}
          onChange={(e) =>
            setEmployee({ ...employee, desc: e.target.value })
          }
        />
        <button type="submit">{employee.id ? 'Update' : 'Add'} Employee</button>
      </form>
      );
    </div>
  )
}
