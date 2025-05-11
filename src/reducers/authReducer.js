const initialState = {
  isAuthenticated: localStorage.getItem("user") ? true : false,
  user: JSON.parse(localStorage.getItem("user")) || null, // cuando esté el backend, excluir de localStorage
  token: localStorage.getItem("token") || null,
};
 
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        token: action.payload.token,
      };

    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    default:
      return state;
  }
};

export { initialState, authReducer };
