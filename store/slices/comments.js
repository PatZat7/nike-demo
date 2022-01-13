import { createSlice, createSelector } from "@reduxjs/toolkit";
import { mockComments } from "../api";
import _ from 'lodash';

//slice name 
export const name = "comment";
export const initialState = {
    commentList: mockComments,
    loading: false,
    hasErrors: false,
    comments: [],
    topThreeCommenters: []
};

const commentSlice = createSlice({
    //state
    name,
    initialState,
    //reducers
    reducers: {
        //old static list
        getCommentList(state) {
            return state.commentList
        },
        getComments: state => {
            state.loading = true
        },
        getCommentsSuccess: (state, { payload }) => {
            state.comments = payload
            state.loading = false
            state.hasErrors = false
        },
        getTopThree: (state, { payload }) => {
            state.topThreeCommenters = getMostFrequent(payload);
        },
        getCommentsFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
        addComment(state, action) {
            //dont need with RTK -> return [...state.commentList, addComment]
            state.comments.push(action.payload)
            state.topThreeCommenters = getMostFrequent(state.comments);
        },
        setNumPerPage(state, action) {
            state.comments.slice(0, action.payload)
        },
    },
});

const getSlice = (state) => state[name] || {};

export const commentsSelector = createSelector(
    getSlice,
    (slice) => slice.comments
);
export const topThreeSelector = createSelector(
    getSlice,
    (slice) => slice.topThreeCommenters
);

export const { getCommentList, setNumPerPage, addComment, getComments, getCommentsSuccess, getCommentsFailure, getTopThree } = commentSlice.actions;

export default commentSlice.reducer;

export function fetchComments() {
    return async dispatch => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments')
            const data = await response.json()
            dispatch(getCommentsSuccess(data))
            dispatch(getTopThree(data))
        } catch (error) {
            dispatch(getCommentsFailure())
        }
    }
}

const getMostFrequent = (arr) => {
    let mappedArray = [];
    let hashmap = [];
    mappedArray = arr.map(com => com.email); //map to new arrary so I just have the names (or in this case emails)
    //create hashmap of each commenter and number of times commenting
    hashmap = mappedArray.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1
        return acc
    }, {})
    let hashEntries = Object.entries(hashmap).map(([k, v]) => ({ email: k, count: v })); //build a nice array to sort
    let sortedArr = _.orderBy(hashEntries, 'count', 'desc'); //sort that array from highest to lowest
    let slicedArrary = sortedArr.slice(0, 3); //take top three commenters from hashmap off the top and only show those
    return slicedArrary;
}

const getNumPerPage = (arr, num) => {
    let shortList = arr.slice(0, num)
}