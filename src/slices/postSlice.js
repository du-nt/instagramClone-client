import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  header: { "content-type": "multipart/form-data" },
};

const initialState = {
  feedPost: [],
  post: {},
};

const post = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getFeedPostSuccess: (state, { payload }) => {
      state.feedPost = payload;
    },
    getPostSuccess: (state, { payload }) => {
      state.post = payload;
    },
    addPostSuccess: (state, { payload }) => {
      return { ...state, feedPost: [payload, ...state.feedPost] };
    },
    toggleLikePostSuccess: (state, { payload }) => {
      return {
        ...state,
        feedPost: state.feedPost.map((post) => {
          if (post._id === payload._id) {
            if (post.isLiked) {
              return {
                ...post,
                isLiked: false,
                likesCount: post.likesCount - 1,
                likes: post.likes.filter(
                  (like) => like.userName !== payload.user.userName
                ),
              };
            } else {
              return {
                ...post,
                isLiked: true,
                likesCount: post.likesCount + 1,
                likes: [payload.user, ...post.likes],
              };
            }
          }
          return post;
        }),
      };
    },
    toggleLikePostDetailSuccess: (state, { payload }) => {
      if (state.post.isLiked) {
        return {
          ...state,
          post: {
            ...state.post,
            isLiked: false,
            likesCount: state.post.likesCount - 1,
            likes: state.post.likes.filter(
              (like) => like.userName !== payload.userName
            ),
          },
        };
      } else {
        return {
          ...state,
          post: {
            ...state.post,
            isLiked: true,
            likesCount: state.post.likesCount + 1,
            likes: [payload, ...state.post.likes],
          },
        };
      }
    },
    toggleSaveSuccess: (state, { payload }) => {
      state.feedPost.map((post) => {
        if (post._id === payload) {
          post.isSaved = !post.isSaved;
        }
        return post;
      });
    },
    toggleSaveDetailPostSuccess: (state) => {
      state.post.isSaved = !state.post.isSaved;
    },
    addCommentSuccess: (state, { payload }) => {
      state.feedPost.map((post) => {
        if (post._id === payload._id) {
          post.newComments.push(payload.comment);
        }
        return post;
      });
    },
    addCommentOnDetailPostSuccess: (state, { payload }) => {
      state.post.comments.push(payload);
    },
  },
});

export const getPosts = (setPosts, setLoading) => async () => {
  try {
    const { data } = await axios.get("/posts");
    setPosts(data);
    setLoading(false);
  } catch (error) {}
};

export const addPost = (formData, { resetForm, onResetFile }) => async (
  dispatch
) => {
  try {
    const { data } = await axios.post("/posts/addPost", formData, config);
    data.isLiked = false;
    data.isSaved = false;
    data.newComments = [];
    dispatch(addPostSuccess(data));
    resetForm();
    onResetFile();
  } catch (error) {
    // setErrors(error.response.data);
    console.log(error.message);
  }
};

export const getFeed = (setLoading) => async (dispatch) => {
  try {
    const { data } = await axios.get("/users/feed");
    dispatch(getFeedPostSuccess(data));
    setLoading(false);
  } catch (error) {
    console.log(error.response.data);
  }
};

export const toggleLike = (_id, user, setTwoPlaces) => async (dispatch) => {
  try {
    await axios.get(`/posts/${_id}/toggleLike`);
    dispatch(toggleLikePostSuccess({ _id, user }));
    if (setTwoPlaces) {
      dispatch(toggleLikePostDetailSuccess(user));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const toggleLikeDetailPost = (_id, user) => async (dispatch) => {
  try {
    await axios.get(`/posts/${_id}/toggleLike`);
    dispatch(toggleLikePostDetailSuccess(user));
  } catch (error) {
    console.log(error.message);
  }
};

export const toggleSave = (id) => async (dispatch) => {
  try {
    await axios.get(`/posts/${id}/toggleSave`);
    dispatch(toggleSaveSuccess(id));
  } catch (error) {}
};

export const toggleSaveDetailPost = (id, setTwoPlaces) => async (dispatch) => {
  try {
    await axios.get(`/posts/${id}/toggleSave`);
    dispatch(toggleSaveDetailPostSuccess());
    if (setTwoPlaces) {
      dispatch(toggleSaveSuccess(id));
    }
  } catch (error) {}
};

export const addComment = (_id, values, resetForm) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/posts/${_id}/addComment`, values);
    dispatch(addCommentSuccess({ _id, comment: data }));
    resetForm();
  } catch (error) {
    console.log(error.message);
  }
};

export const addCommentOnDetailPost = (
  _id,
  values,
  currentUser,
  resetForm,
  scrollToBottom,
  setTwoPlaces
) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/posts/${_id}/addComment`, values);
    const newComment = { _id: data._id, text: values.text, user: currentUser };
    dispatch(addCommentOnDetailPostSuccess(newComment));
    resetForm();
    scrollToBottom();
    if (setTwoPlaces) {
      dispatch(addCommentSuccess({ _id, comment: data }));
    }
  } catch (error) {}
};

export const getPost = (postId, setLoading, setIsDead) => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await axios.get(`/posts/${postId}`);
    const { isAuthenticated, user } = getState().auth;
    if (isAuthenticated) {
      data.isLiked = data.likes.some((like) => like._id === user._id);
      data.isSaved = user.savedPosts.some((_id) => _id === data._id);
    }
    dispatch(getPostSuccess(data));
    setLoading(false);
  } catch (error) {
    setIsDead(true);
  }
};

export const getMorePosts = (_id, postId, setPosts) => async () => {
  try {
    const { data } = await axios.get(`/posts/${_id}/morePosts/${postId}`);
    setPosts(data);
  } catch (error) {}
};

const { reducer, actions } = post;
export const {
  getFeedPostSuccess,
  toggleLikePostSuccess,
  toggleLikePostDetailSuccess,
  addPostSuccess,
  getPostSuccess,
  toggleSaveSuccess,
  toggleSaveDetailPostSuccess,
  addCommentOnDetailPostSuccess,
  addCommentSuccess,
} = actions;
export default reducer;
