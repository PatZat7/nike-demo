import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from '@reduxjs/toolkit'
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Box, Typography, TextField, Button } from "@material-ui/core";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {addComment, getTopThree} from "store/slices/comments";
//import mockComments from "../store/api";

import {
  closeCommentsModal,
  getViewCommentsModalOpen,
} from "store/slices/view";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
 
}));

const CommentModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isOpen = useSelector(getViewCommentsModalOpen);
  const handleClose = () => dispatch(closeCommentsModal());

  const [comName, setComName] = useState('');
  const [commentText, setCommentText] = useState('');

  const handleName = e => setComName(e.target.value);
  const handleCommentText = e => setCommentText(e.target.value);

  const handleSubmit = () => {
    if (comName && commentText) {
      dispatch(
        addComment({
          id: nanoid(),
          name: comName,
          email: comName,
          body: commentText
        })
      )

      setComName('')
      setCommentText('')
      
    }
    
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className="box">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add A Comment
        </Typography>
        <form className="flexcol addCom" noValidate autoComplete="off">
          <TextField onChange={handleName} value={comName} className="nameField" id="standard-basic" label="Email" />
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            defaultValue="add your comment here"
            className="comField"
            onChange={handleCommentText}
            value={commentText}
          />
        </form>
        <Button onClick={handleSubmit}  className={classes.main} variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default CommentModal;
