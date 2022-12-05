import { React, useContext, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { GlobalStoreContext } from '../store';

const Comments = () => {
  const { store } = useContext(GlobalStoreContext);
  const [comment, setComment] = useState('');

  let comments = '';
  let commentsVisible = false;
  if (store.openedList !== null) {
    commentsVisible = store.openedList.isPublished;
    comments = (
      <Box>
        {store.openedList.comments.map((comment) => (
          <Box sx={{ bgcolor: 'white', mb: 4, p: 2, borderRadius: '15px' }}>
            <Box>{comment.username}</Box>
            <Box>{comment.text}</Box>
          </Box>
        ))}
      </Box>
    );
  } else {
    comments = '';
  }

  const handleUpdateComment = (event) => {
    setComment(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.code === 'Enter') {
      store.addComment(comment);
    }
  };

  return (
    <Box>
      {commentsVisible && (
        <>
          {comments}
          <Box>
            <TextField
              fullWidth
              multiline
              size='small'
              sx={{ bgcolor: 'white' }}
              onKeyPress={handleKeyPress}
              onChange={handleUpdateComment}
              value={comment}
            ></TextField>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Comments;
