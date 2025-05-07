const initialState = {
    isAuthenticated: localStorage.getItem("user") ? true : false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload));
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case "LOGOUT":
            localStorage.removeItem("user");
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

export { initialState, authReducer };