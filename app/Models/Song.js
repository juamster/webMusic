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
  // TODO: make this a cool template


  get SearchTemplate() {
    return `
      <div class="card-body container-fluid text-center">
        <div class="card shadow-none" onclick="app.songsController.getSong('${this._id}')"  >
          <div class="row">
            <div class="col">
                <img src="${this.albumArt}" class="card-img-top" width="10%">
            </div>
          
            <div class="col">
                <h5 class="card-title">${this.title}</h5>
                <hr>
                <h7 class="card-text">${this.album}</h7>
            </div>
          </div>
        </div>  
      </div>
    `;
  }

  get PlayListTemplate() {
    return `
      <div class="card">
        <div class="card-body border container-fluid text-center">
          <div class="row">
            <div class="col">
                <h5 class="card-title">${this.title}</h5>
                <hr>
                <h7 class="card-subtitle mb-2 text-muted">${this.album}</h7>
            </div>

            <div class="col">
              <i class="far fa-trash-alt fa-2x" onclick="app.songsController.removeSong('${this._id}')"></i>
            </div>  

          </div>
        </div>  
      </div>
    `;
  }



  get songCardTemplate() {
    let button =
      `<button class="btn btn-danger" onclick="app.songsController.addSong('${this._id}')">
      Add to playlist
      </button>
      `;
    return /* html */ `
    <div class="card shadow">
      <div class="card-body container-fluid">
        <audio controls>
          <source src="${this.preview}" type="audio/mp3">
          Your browser does not support the audio element.
        </audio>
        <img src="${this.albumArt}" class="card-img-top">
          <h5 class="card-title">${this.title}</h5>
          <h6 class="card-album">${this.album}</h6>
          
            <p class="card-text">
              <span>
                Artist Name: ${this.artist}  Price: ${this.price} 
              </span>
            </p>
            ${button}
      </div>
    </div>
    `;
  }

  get playlistTemplate() {
    return `

        `;
  }
}
