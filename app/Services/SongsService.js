import Song from "../Models/Song.js";
import store from "../store.js";

// @ts-ignore
//TODO Change YOURNAME to your actual name
let _sandBoxUrl = "//bcw-sandbox.herokuapp.com/api/Judy/songs/";

class SongsService {
  constructor() {
    // NOTE this will get your songs on page load
    this.getMySongs();
  }

  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  async getMusicByQuery(query) {
    // NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?&term=" + query;
    let response = await fetch(url);
    let data = await response.json();

    // I added this... how else will we put the data in the store

    // Reset the Song Search List
    store.resetSearchList();
    let aSong;
    data.results.forEach(element => {
      aSong = new Song(element);
      // console.log("this is a piece of data" + aSong.album);
      store.state.songs.push(aSong);
    });
  }

  /**
   * This is called by the controller to get a song that the user
   * has clicked on from the search list.  At this point the id has
   * not been changed.
   * @param {*} id 
   */
  async getSong(id) {

    let song = store.state.songs.find(p => p._id == id);
    // console.log("Active song is: ", song)
    // console.log("GetSong - Search id: " + id);
    store.state.activeSong = song;
  }

  async resetActiveSong(id) {

    let song = store.state.mySongs.find(p => p._id == id);
    // console.log("Active song is: ", song)
    // console.log("GetSong - Search id: " + id);
    store.state.activeSong = song;
  }


  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    let response = await fetch(_sandBoxUrl);
    let data = await response.json();
    store.state.mySongs = data.data.map(songData => new Song(songData));

    // console.log("MY SONGS", data.data);
    // console.log("My Song List Length:", store.state.mySongs.length)
  }

  /**
   * Adds the active song to the users list
   * Afterwords it will update the store to reflect saved info
   * 
   */
  async addSong() {

    let activeSong = store.state.activeSong;
    let song = store.state.mySongs.find(p => p.title == activeSong.title);

    if (song) {
      alert("You have already added this song! pick another");
      throw new Error("you already have this song");
    }

    let response = await fetch(_sandBoxUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(activeSong)
    });
    let data = await response.json();
    let aSong = new Song(data.data);
    store.state.mySongs.push(aSong);
    store.state.activeSongs = aSong;
    // console.log("New Song Added with id: " + aSong._id);
  }


  /**
   * This will remove a song from the server and also from the store
   * @param {*} id 
   */
  async removeSong(id) {

    await fetch(_sandBoxUrl + id, {
      method: "DELETE"
    });
    let i = store.state.mySongs.findIndex(p => p._id == id);
    // let i = store.state.mySongs.findIndex(p => p.title == title);
    if (i != -1) {
      store.state.mySongs.splice(i, 1);
      console.log("removing song from MyList at " + i);
    }
    console.log("myList length: " + store.state.mySongs.length);
  }
}

const service = new SongsService();
export default service;
