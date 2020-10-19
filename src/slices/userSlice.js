import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { followSuccess, unFollowSuccess } from "./authSlice";

const initialState = {};

const post = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, { payload }) => {
      return payload;
    },
    followComplete: (state, { payload }) => {
      state.followers.push(payload);
      state.followersCount += 1;
    },
    unFollowComplete: (state, { payload }) => {
      state = {
        ...state,
        followersCount: state.followersCount - 1,
        followers: state.followers.filter((user) => user._id !== payload._id),
      };
      return state;
    },
  },
});
export const getProfile = (
  userNameParam,
  setLoading,
  isMountedRefCurrent,
  setIsDead
) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/users/user/${userNameParam}`);
    if (isMountedRefCurrent) {
      dispatch(setProfile(data));
      setLoading(false);
    }
  } catch (error) {
    if (setIsDead) setIsDead(true);
  }
};

export const followProfile = (_id, newUser) => async (dispatch) => {
  try {
    await axios.get(`/users/user/${_id}/follow`);
    dispatch(followComplete(newUser));
    dispatch(followSuccess(_id));
  } catch (error) {
    console.log(error);
  }
};

export const unFollowProfile = (_id, newUser) => async (dispatch) => {
  try {
    await axios.get(`/users/user/${_id}/unFollow`);
    dispatch(unFollowComplete(newUser));
    dispatch(unFollowSuccess(_id));
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getUsers = (setUsers, setLoading) => async () => {
  try {
    const { data } = await axios.get("/users");
    setUsers(data);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const search = (value, setDisplay, setUsers) => async () => {
  try {
    const search = value.trim();
    if (search) {
      const { data } = await axios.get(`/users/search?userName=${search}`);
      setUsers(data);
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  } catch (error) {
    setDisplay(false);
  }
};

const { reducer, actions } = post;
export const { setProfile, followComplete, unFollowComplete } = actions;
export default reducer;
