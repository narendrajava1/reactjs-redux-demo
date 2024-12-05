import axios from 'axios';

// Action Types
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const GET_EMPLOYEES = "GET_EMPLOYEES";

const API_URL="http://localhost:9898/employee";

//Action creaters

export const getAllEmployees=()=>async (dispatch,getState)=>{
  const response = await axios.get(API_URL);
  const state=getState();
  dispatch({ type: GET_EMPLOYEES, payload: response.data });
};

export const addEmployee=(employee)=>async(dispatch)=>{
  const response = await axios.post(API_URL, employee);
  dispatch({ type: ADD_EMPLOYEE, payload: response.data });
};

export const updateEmployee = (id, employee) => async (dispatch) => {
  const response = await axios.put(`${API_URL}/${id}`, employee);
  dispatch({ type: UPDATE_EMPLOYEE, payload: response.data });
};

export const deleteEmployee = (id) => async (dispatch) => {
  await axios.delete(`${API_URL}/${id}`);
  dispatch({ type: DELETE_EMPLOYEE, payload: id });
};
/*

export const addEmployee=(employee)=>({
  type:ADD_EMPLOYEE,
  payload:employee
});

export const updateEmployee = (employee) => ({
  type: UPDATE_EMPLOYEE,
  payload: employee,
});

export const deleteEmployee = (id) => ({
  type: DELETE_EMPLOYEE,
  payload: id,
});
*/
