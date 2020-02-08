import Song from "./Models/Song.js";

class Store {
  /**
   * Provides access to application state data
   */
  resetSearchList() {
    this.state.songs = [];
  }
  state = {
    songs: [],
    activeSong: new Song(),
    mySongs: []
  };

}

const store = new Store();
export default store;
