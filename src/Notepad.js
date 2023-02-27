import './Notepad.css';

import React from 'react';

class Notepad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      mediaFiles: [],
      noteText: '',
    };

    this.handleNoteTextChange = this.handleNoteTextChange.bind(this);
    this.handleMediaUpload = this.handleMediaUpload.bind(this);
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  handleNoteTextChange(event) {
    this.setState({ noteText: event.target.value });
  }

  handleMediaUpload(event) {
    this.setState({ mediaFiles: [...this.state.mediaFiles, ...event.target.files] });
  }

  addNote() {
    const { notes, mediaFiles, noteText } = this.state;
    const newNote = {
      text: noteText,
      media: mediaFiles,
      id: Date.now(),
    };
    this.setState({
      notes: [...notes, newNote],
      mediaFiles: [],
      noteText: '',
    });
  }

  deleteNote(id) {
    const filteredNotes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes: filteredNotes });
  }

  render() {
    const { notes, mediaFiles, noteText } = this.state;

    return (
      <div className="notepad-container">
        <h1>Notepad</h1>
        <h5>(Tip - Enter a name for your media files before you add)</h5>
        <form onSubmit={(e) => { e.preventDefault(); this.addNote(); }}>
          <input type="text" value={noteText} onChange={this.handleNoteTextChange} placeholder="Enter a note" required/>
          <input type="file" accept="image/*,video/*" multiple onChange={this.handleMediaUpload} />
          <button type="submit">Add Note</button>
        </form>
        <ul className="note-list">
          {notes.map((note) => (
            <li className="note-item" key={note.id}>
              <div className="note-text">{note.text}</div>
              {note.media.map((mediaFile) => (
                <div className="media-container" key={mediaFile.name}>
                  {mediaFile.type.startsWith('image/') && <img className="media-item" src={URL.createObjectURL(mediaFile)} alt={mediaFile.name} />}
                  {mediaFile.type.startsWith('video/') && <video className="media-item" src={URL.createObjectURL(mediaFile)} controls />}
                </div>
              ))}
              <button className="delete-button" onClick={() => this.deleteNote(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Notepad;

