export default class Song {
  constructor(data) {
    if (!data) {
      return;
    }
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  /**
   * template for the results from search
   */
  get SearchTemplate() {
    return `
      <div class="card ">
        <div class="card-body search-card-body container-fluid shadow-none" onclick="app.songsController.getSong('${this._id}')"  >
          <div class="row">
            <div class="col-4">
                <img class="card-img-top m-0" src="${this.albumArt}" >
            </div>
            <div class="col-8">
              <h7 class="card-title pt-1"><em>${this.title}</em></h7>
              <hr>
              <p class="card-text">${this.album}</p>
            </div>
          </div>
        </div>  
      </div>
    `;
  }

  /**
   * template for the playlist
   */
  get PlayListTemplate() {
    return `
      <div class="card">
        <div class="card-body container-fluid text-center search-card-body">
          <div class="row">
             
            <div class="col-2">
              <i class="fas fa-music" onclick="app.songsController.resetActiveSong('${this._id}')"></i>
            </div>  

            <div class="col-8">
                <h7 class="card-title"><em>${this.title}</em></h7>
                <p class="card-text text-muted">${this.album}</p>
            </div>
            <div class="col-2">
              <i class="fas fa-trash-alt fa-lg trash" onclick="app.songsController.removeSong('${this._id}')"></i>
            </div>  
          </div>
        </div>  
      </div>
    `;
  }


  /**
   * Template for the song card
   */
  get songCardTemplate() {
    let button =
      `<button class="btn btn-danger btn-block text-center" onclick="app.songsController.addSong('${this._id}')">
      Add to playlist
      </button>
      `;
    return /* html */ `
    <div class="card ">
      <div class="card-body play-card-body main-info container-fluid" >   
          <audio controls>
            <source src="${this.preview}" type="audio/mp3">
            Your browser does not support the audio element.
          </audio>
          <img src="${this.albumArt}" class="card-img-top">
          <h5 class="card-title">${this.title}</h5>
          <h6 class="card-subtitle" >${this.album}</h6>
          <br>
          <div class="card-text">
              <div>Artist Name: ${this.artist} </div>
              <div>Buy Now: ${this.price}</div>
          </div>    
        </div>
       
        <div >
          ${button}
        </div>  
    </div>
    `;
  }

}
