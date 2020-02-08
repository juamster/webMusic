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
        <div>
          <div onclick="app.songsController.getSong('${this._id}')">
            <h5>${this.title}</h5>
          </div>
        </div>

        `;
  }

  get newSearchTemplate() {
    return `
      <div class="card shadow" onclick="app.songsController.getSong('${this._id}')" style="width:50%" >
        <div class="card-body container-fluid text-center">
            <img src="${this.albumArt}" class="card-img-top" width="10%">
            <h5 class="card-title">${this.title}</h5>
            <h6 class="card-text">${this.album}</h6>
        </div>
       
      </div>
    `;
  }

  get PlayListTemplate() {
    return `
        <div>
            <h5>${this.title}</h5>
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
