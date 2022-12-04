import { React, useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import {
  ThumbUp,
  ThumbDown,
  ExpandMore,
  ExpandLess,
  Add,
} from '@mui/icons-material';
import { CurrentModal, GlobalStoreContext } from '../store';
import SongCard from './SongCard';
import './PlaylistCard.css';

const PlaylistCard = (props) => {
  let { playlist } = props;
  const [selected, setSelected] = useState(false);
  const [editListNameActive, setEditListNameActive] = useState(false);
  const [listName, setListName] = useState(playlist.name);
  const { store } = useContext(GlobalStoreContext);

  let className = 'playlist-card';
  if (store.openedList !== null && store.openedList._id === playlist._id)
    className = 'playlist-card selected';
  else className = 'playlist-card';

  useEffect(() => {
    if (store.selectedList === null || store.selectedList._id !== playlist._id)
      setSelected(false);
    else if (store.selectedList._id === playlist._id) setSelected(true);
  }, [store.selectedList]);

  const handleOpenList = () => {
    store.openList(playlist);
  };

  const handleToggleList = (event) => {
    event.stopPropagation();
    if (!selected) store.selectList(playlist);
    else store.selectList(null);
    // setSelected(!selected);
  };

  const toggleEditName = () => {
    setEditListNameActive(!editListNameActive);
  };

  const handleToggleEditListName = (event) => {
    event.stopPropagation();
    toggleEditName();
  };

  const handleUpdateListName = (event) => {
    setListName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.code === 'Enter') {
      store.changeListName(playlist, listName);
      toggleEditName();
    }
  };

  const handleAddSong = () => {
    store.addNewSong();
  };

  const handleDeletePlaylist = () => {
    store.setModal(CurrentModal.DELETE_LIST);
  };

  const handleUndo = () => {
    store.undo();
  };

  const handleRedo = () => {
    store.redo();
  };

  const handlePublishList = () => {
    store.publishList();
  };
  let listNameComponent = '';
  if (editListNameActive)
    listNameComponent = (
      <TextField
        fullWidth
        size='small'
        onBlur={toggleEditName}
        onKeyPress={handleKeyPress}
        onChange={handleUpdateListName}
        value={listName}
        inputProps={{ style: { fontSize: 24 } }}
        autoFocus
      />
    );
  else {
    listNameComponent = (
      <Typography onDoubleClick={handleToggleEditListName}>
        {playlist.name}
      </Typography>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ bgcolor: '#ffffff', pt: 1, px: 2, m: 2, borderRadius: '15px' }}
      className={className}
      onClick={handleOpenList}
    >
      <Grid item xs={6}>
        <Box>
          {listNameComponent}
          <Typography>By: {playlist.ownerUsername}</Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        {playlist.isPublished && (
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <Box sx={{ mr: 1, display: 'flex' }}>
              <ThumbUp />
              <Typography sx={{ ml: '2px' }}>{playlist.likesCount}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <ThumbDown />
              <Typography sx={{ ml: '2px' }}>
                {playlist.dislikesCount}
              </Typography>
            </Box>
          </Box>
        )}
      </Grid>
      {selected && (
        <Grid item xs={12}>
          {!playlist.isPublished && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  bgcolor: '#f6f6f6',
                  mb: 2,
                  p: 1,
                  borderRadius: '15px',
                }}
              >
                <IconButton onClick={handleAddSong}>
                  <Add />
                </IconButton>
              </Box>
              {playlist.songs.map((song, index) => (
                <SongCard index={index} song={song} />
              ))}
            </>
          )}
          {playlist.isPublished && (
            <List
              sx={{
                bgcolor: '#f6f6f6',
                mb: 2,
                p: 1,
                borderRadius: '15px',
              }}
            >
              {playlist.songs.map((song, index) => (
                <ListItem>
                  {index + 1}. {song.title} by {song.artist}
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
      )}
      {selected && (
        <>
          <Grid item xs={6}>
            {!playlist.isPublished && (
              <>
                <Button
                  variant='contained'
                  disabled={!store.canUndo()}
                  onClick={handleUndo}
                  sx={{ mr: 2 }}
                >
                  Undo
                </Button>
                <Button
                  variant='contained'
                  disabled={!store.canRedo()}
                  onClick={handleRedo}
                >
                  Redo
                </Button>
              </>
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right' }}>
            {!playlist.isPublished && (
              <Button
                variant='contained'
                sx={{ mr: 2 }}
                onClick={handlePublishList}
              >
                Publish
              </Button>
            )}
            <Button
              variant='contained'
              onClick={handleDeletePlaylist}
              sx={{ mr: 2 }}
            >
              Delete
            </Button>
            <Button variant='contained' sx={{ mr: 2 }}>
              Duplicate
            </Button>
          </Grid>
        </>
      )}
      <Grid item xs={10}>
        {playlist.isPublished && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Published: {playlist.publishDate}</Typography>
            <Typography>Listens: {playlist.listensCount}</Typography>
          </Box>
        )}
      </Grid>
      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'right' }}>
        <IconButton onClick={handleToggleList}>
          {selected ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default PlaylistCard;
