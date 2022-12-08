import { React, useContext, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';

const Comments = () => {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [comment, setComment] = useState('');

  let comments = '';
  let commentsVisible = false;
  if (store.openedList !== null) {
    commentsVisible = store.openedList.isPublished;
    comments = (
      <Box sx={{ maxHeight: '55vh', height: '55vh', overflow: 'auto' }}>
        {store.openedList.comments.map((comment) => (
          <Box sx={{ bgcolor: 'white', mb: 4, p: 2, borderRadius: '15px' }}>
            <Box sx={{ color: 'rgb(32, 142, 252)' }}>{comment.username}</Box>
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
      {commentsVisible && <>{comments}</>}
      {auth.user !== null && commentsVisible && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            size='small'
            sx={{ bgcolor: 'white' }}
            onKeyPress={handleKeyPress}
            onChange={handleUpdateComment}
            value={comment}
          />
        </Box>
      )}
    </Box>
  );
};

export default Comments;
