const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    name: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    ownerUsername: { type: String, required: true },
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
    publishDate: { type: Date, required: false },
    listensCount: { type: Number, required: true },
    likesCount: { type: Number, required: true },
    dislikesCount: { type: Number, required: true },
    comments: { type: [{ username: String, text: String }], required: true },
    interactedUsers: {
      type: [{ username: String, liked: Boolean }],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Playlist', playlistSchema);
