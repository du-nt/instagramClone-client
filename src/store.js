import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import userReducer from "./slices/userSlice";

const rootReducer = {
	auth: authReducer,
	post: postReducer,
	user: userReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
