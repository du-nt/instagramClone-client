import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "/api/";
axios.defaults.baseURL =
  "https://api-instagramclone-yaokaoya.herokuapp.com/api/";
axios.defaults.withCredentials = true;

const config = {
  header: { "content-type": "multipart/form-data" },
};

const initialState = {
  isAuthenticated: false,
  user: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.isAuthenticated = true;
      state.user = payload;
    },
    logoutSuccess: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    changePhotoSuccess: (state, { payload }) => {
      state.user.avatar = payload;
    },
    followSuccess: (state, { payload }) => {
      state.user.following.push(payload);
      state.user.followingCount += 1;
    },
    unFollowSuccess: (state, { payload }) => {
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter((id) => id !== payload),
          followingCount: state.user.followingCount - 1,
        },
      };
    },
  },
});

export const register = (
  values,
  toLogin,
  { setErrors, resetForm }
) => async () => {
  try {
    await axios.post("/auth/register", values);
    resetForm();
    toLogin();
  } catch (error) {
    setErrors(error.response.data);
  }
};

export const login = (
  values,
  goBack,
  setIsRedirect,
  { setErrors, resetForm }
) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/login", values);
    resetForm();
    setIsRedirect(false);
    dispatch(setCurrentUser(data));
    goBack();
  } catch (error) {
    setErrors(error.response.data);
  }
};

export const changePassword = (
  values,
  toast,
  { setErrors, resetForm }
) => async () => {
  try {
    await axios.post("/auth/changePassword", values);
    resetForm();
    toast.success("Password changed", {
      position: "top-right",
      autoClose: 2000,
    });
  } catch (error) {
    setErrors(error.response.data);
    toast.error("Error!", {
      position: "top-right",
      autoClose: 2000,
    });
  }
};

export const forgotPassword = (
  values,
  { setErrors, resetForm },
  setMailSent
) => async () => {
  try {
    await axios.get(`/auth/resetPassword/user/${values.email}`);
    resetForm();
    setMailSent(true);
  } catch (error) {
    setErrors({ email: error.response.data.error });
  }
};

export const resetPassword = (
  values,
  { userId, token },
  { setErrors, resetForm },
  setConfirmed
) => async () => {
  try {
    await axios.post(`/auth/receiveNewPassword/${userId}/${token}`, values);
    resetForm();
    setConfirmed(true);
  } catch (error) {
    setErrors({ email: error.response.data });
  }
};

export const logout = (history, handleMenuClose) => async (dispatch) => {
  try {
    await axios.get("/auth/logout");
    handleMenuClose();
    dispatch(logoutSuccess());
    history.push("/login");
  } catch (error) {
    handleMenuClose();
    history.push("/");
  }
};

export const getCurrentUser = (setLoading) => async (dispatch) => {
  try {
    const { data } = await axios.get("/auth");
    dispatch(setCurrentUser(data));
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};

export const editUser = (values, toast, { setErrors, resetForm }) => async (
  dispatch
) => {
  try {
    const { data } = await axios.post("/users/editUser", values);
    dispatch(setCurrentUser(data));
    resetForm();
    toast.success("Profile saved", {
      position: "top-right",
      autoClose: 2000,
    });
  } catch (error) {
    setErrors(error.response.data);
  }
};

export const changePhoto = (data, toast) => async (dispatch) => {
  try {
    const res = await axios.post("/users/changePhoto", data, config);
    dispatch(changePhotoSuccess(res.data.avatar));
    toast.success("Profile photo changed", {
      position: "top-right",
      autoClose: 2000,
    });
  } catch (error) {
    toast.error("Error!", {
      position: "top-right",
      autoClose: 2000,
    });
  }
};

export const removePhoto = (toast) => async (dispatch) => {
  try {
    const res = await axios.get("users/removePhoto");
    dispatch(changePhotoSuccess(res.data.avatar));
    toast.success("Profile photo removed", {
      position: "top-right",
      autoClose: 2000,
    });
  } catch (error) {
    toast.error("Error!", {
      position: "top-right",
      autoClose: 2000,
    });
  }
};

export const follow = (_id) => async (dispatch) => {
  try {
    dispatch(followSuccess(_id));
    await axios.get(`/users/user/${_id}/follow`);
  } catch (error) {
    console.log(error);
  }
};

export const unFollow = (_id) => async (dispatch) => {
  try {
    dispatch(unFollowSuccess(_id));
    await axios.get(`/users/user/${_id}/unFollow`);
  } catch (error) {
    console.log(error);
  }
};

const { reducer, actions } = auth;
export const {
  logoutSuccess,
  setCurrentUser,
  changePhotoSuccess,
  followSuccess,
  unFollowSuccess,
} = actions;

export default reducer;
