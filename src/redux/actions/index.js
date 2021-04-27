import axios from "axios";
const getAccessToken = localStorage.getItem("jwtToken");

export const registerUser = (user, history) => (dispatch) => {
  axios
    .post("http://6f608c56145c.ngrok.io/api/user/signup", user)
    .then((res) => (window.location = "/"))
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    });
};

export const loginUser = (user, history) => (dispatch) => {
  axios
    .post("http://6f608c56145c.ngrok.io/api/user/login", user)
    .then((res) => {
      console.log(res);
      const token = res.data.token;
      window.location = "/crud";
      localStorage.setItem("jwtToken", token);
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    });
};

export const createTodo = (user, history) => (dispatch) => {
  axios
    .post("http://6f608c56145c.ngrok.io/api/todo/add", user, {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => console.log("Working", res.data))
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    });
};

export const getAllTodo = (user, history) => (dispatch) => {
  axios
    .get("http://6f608c56145c.ngrok.io/api/todo/all", user, {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) =>
      dispatch({
        type: "SUCCESS_TODO",
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    });
};

export const deleteTodo = (index, history) => (dispatch) => {
  axios
    .delete(`http://6f608c56145c.ngrok.io/api/todo/${index}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) =>
      dispatch({
        type: "SUCCESS_TODO",
        payload: res,
      })
    )
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    });
};
