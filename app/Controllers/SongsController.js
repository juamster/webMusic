import store from "../store.js";
import SongService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {

  let template = "";
  // console.log("the size of the song list is: " + store.state.songs.length)
  store.state.songs.forEach(song => {
    template += song.SearchTemplate;
    // console.log("we have songs in the store");
  });
  document.getElementById("songs").innerHTML = template;
}

function _drawSongCard() {
  console.log("You picked song with id: " + store.state.activeSong._id);

  document.getElementById("song-card").innerHTML = store.state.activeSong.songCardTemplate;

}
/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = "";

  store.state.mySongs.forEach(song => {
    template += song.newPlayListTemplate;
    console.log("we have songs in our playlist");
  });
  document.getElementById("playlist").innerHTML = template;
}



//Public
export default class SongsController {
  constructor() {
    // TODO load your playlist
    this.getMySongs()

  }
  /**
   * Just a little private function that can remove all of the playlist at one 
   * time.  
   */
  deleteAllPlaylist() {
    console.log("deleting all songs");
    store.state.mySongs.forEach(song => {
      this.removeSong(song._id);
    });
    _drawPlaylist();
  }
  async getMySongs() {
    try {
      await SongService.getMySongs();
      _drawPlaylist();
    } catch (error) {
      console.error(error);

    }
  }
  /**Takes in the form submission event and sends the query to the service */
  async search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      await SongService.getMusicByQuery(e.target.query.value);
      _drawResults();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addSong(id) {
    try {
      await SongService.addSong();
      _drawPlaylist();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Takes in a song title to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  async removeSong(id) {

    try {
      await SongService.removeSong(id);
      _drawPlaylist();
    } catch (error) {
      console.error(error);
    }
  }


  async getSong(id) {
    try {
      await SongService.getSong(id);
      _drawSongCard();
    } catch (error) {
      console.log(error);
    }

  }
}
