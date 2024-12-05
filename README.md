When you're using `combineReducers` in a plain Redux setup (without Redux Toolkit), and it’s not working as expected, it could be due to some common issues in the configuration. Let’s troubleshoot the issue and ensure your setup is correct.

---

### **Correct Setup for `combineReducers`**

#### **1. Verify Your File Structure**

Here’s an example structure:

```
src/
├── redux/
│   ├── actions.js            # Action types and creators
│   ├── reducers/
│   │   ├── employeeReducer.js # Employee-related reducer
│   │   ├── anotherReducer.js  # Another reducer for example
│   │   ├── index.js           # Combine reducers here
│   ├── store.js              # Redux store configuration
├── components/
├── App.js
├── index.js
```

---

#### **2. Implement Reducers**
Make sure your reducers are properly defined and have their own state slices.

##### `redux/reducers/employeeReducer.js`
```javascript
import { ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from "../actions";

const initialState = {
  employees: [
    { id: 1, name: "John Doe", position: "Manager" },
    { id: 2, name: "Jane Smith", position: "Developer" },
  ],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return { ...state, employees: [...state.employees, action.payload] };

    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };

    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };

    default:
      return state;
  }
};

export default employeeReducer;
```

##### `redux/reducers/anotherReducer.js`
For demonstration, here’s a second reducer:
```javascript
const initialAnotherState = {
  count: 0,
};

const anotherReducer = (state = initialAnotherState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

export default anotherReducer;
```

---

#### **3. Combine Reducers**
Use `combineReducers` to combine your reducers into a single root reducer.

##### `redux/reducers/index.js`
```javascript
import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";
import anotherReducer from "./anotherReducer";

const rootReducer = combineReducers({
  employees: employeeReducer, // State slice for employees
  another: anotherReducer,    // State slice for anotherReducer
});

export default rootReducer;
```

---

#### **4. Configure the Store**
Create the Redux store and pass the combined reducer.

##### `redux/store.js`
```javascript
import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Enable Redux DevTools
);

export default store;
```

---

#### **5. Connect Redux to React**
Make sure the store is provided to the React app.

##### `src/index.js`
```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

---

#### **6. Use `useSelector` Correctly in Components**

Each reducer is now a **slice** of the state. Access state slices using `useSelector`.

##### Example for Employee List
```javascript
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee } from "../redux/actions";

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees.employees); // Access the 'employees' slice
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  return (
    <div>
      <h2>Employee List</h2>
      {employees.map((employee) => (
        <div key={employee.id}>
          <p>
            {employee.name} - {employee.position}
          </p>
          <button onClick={() => handleDelete(employee.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
```

##### Example for Another Component
```javascript
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const AnotherComponent = () => {
  const count = useSelector((state) => state.another.count); // Access the 'another' slice
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
    </div>
  );
};

export default AnotherComponent;
```

---

### **Common Issues with `combineReducers`**

1. **Incorrect State Access**:
   - After combining reducers, each reducer’s state is nested under the key used in `combineReducers`. For example:
     - Access `employees` state using `state.employees`.
     - Access `anotherReducer` state using `state.another`.

2. **Forgot to Export Reducer**:
   - Ensure that all reducers and the root reducer are exported properly.

3. **Reducer Mutates State**:
   - Always return a **new state object** in reducers. Do not modify the existing state directly.

4. **Redux DevTools Not Working**:
   - Ensure you’ve added this line in `store.js`:
     ```javascript
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     ```

---

### **Final Verification**

- Use Redux DevTools to inspect the state.
- Ensure your `useSelector` calls match the structure of your combined state.
- If an error persists, share the specific error message or symptoms for further debugging.

Let me know how it goes!