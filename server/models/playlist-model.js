const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: String, required: true },
    songs: {
      type: [
        {
          title: String,
          artist: String,
          youTubeId: String,
        },
      ],
      required: true,
    },
    isPublished: { type: Boolean, required: true },
    publishDate: { type: String, required: true },
    listensCount: { type: Number, required: true },
    likesCount: { type: Number, required: true },
    dislikesCount: { type: Number, required: true },
    comments: { type: [{ userName: String, text: String }], required: true },
    interactedUsers: { type: [], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Playlist', playlistSchema);
