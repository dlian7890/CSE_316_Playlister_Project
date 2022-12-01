import jsTPS_Transaction from '../common/jsTPS.js';

export default class EditSong_Transaction extends jsTPS_Transaction {
  constructor(initStore, initIndex, initOldSongData, initNewSongData) {
    super();
    this.store = initStore;
    this.index = initIndex;
    this.oldSongData = initOldSongData;
    this.newSongData = initNewSongData;
  }

  doTransaction() {
    this.store.editSong(this.index, this.newSongData);
  }

  undoTransaction() {
    this.store.editSong(this.index, this.oldSongData);
  }
}
