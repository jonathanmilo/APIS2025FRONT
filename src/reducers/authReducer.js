const initialState = {
  isAuthenticated: localStorage.getItem("user") ? true : false,
  user: JSON.parse(localStorage.getItem("user")) || null, // TODO: eliminar del localStorage cuando se integre Spring Boot
  token: localStorage.getItem("token") || null, // TODO: almacenar en cookie HttpOnly cuando se integre Spring Boot
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
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

    case "UPDATE_USER":
      const updatedUser = { ...state.user, ...action.payload.user };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return {
        ...state,
        user: updatedUser,
      };

    default:
      return state;
  }
};

export { initialState, authReducer };
