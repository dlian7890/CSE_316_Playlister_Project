import jsTPS_Transaction from '../common/jsTPS.js';

export default class DeleteSong_Transaction extends jsTPS_Transaction {
  constructor(initStore, initIndex, initSong) {
    super();
    this.store = initStore;
    this.index = initIndex;
    this.song = initSong;
  }

  doTransaction() {
    this.store.deleteSong(this.index);
  }

  undoTransaction() {
    this.store.createSong(this.index, this.song);
  }
}
