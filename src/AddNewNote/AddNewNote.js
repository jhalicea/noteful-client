import React from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import PropTypes from "prop-types";
import "./AddNewNote.css";

export default class AddNewNote extends React.Component {
  state = { error: null, name: { value: "", touched: false } };

  setName = (name) => {
    this.setState({ name: { value: name, touched: true } });
  };
  
  static contextType = ApiContext;

  validateName = () => {
    let name = this.state.name.value;
    if (name.length === 0) {
      return (
        <div style={{ color: "red" }} className="validationError">
          *Note Name Is Required
        </div>
      );
    }
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const NoteName = e.target.name.value;
    const content = e.target.content.value;
    const folderId = e.target.folder.value;
    const modifiedDate = new Date();

    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: NoteName,
        modified: modifiedDate,
        folderId: folderId,
        content: content,
      }),
    };
    fetch(`${config.API_ENDPOINT}/notes`, options)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Something went wrong, please try again");
        }
        return resp.json();
      })

      .then((data) => {
        this.context.addNote(data);
        this.props.history.push("/");
      })
      .catch((err) => this.setState({ error: err.message }));
  };
  render() {
    const dropdown = this.context.folders.map((folder) => {
      return (
        <option key={folder.id} value={folder.id}>
          {folder.name}
        </option>
      );
    });

    return (
      <div className="Note-form-wrapper">
        <h2>Create A New Note</h2>
        <form className="note-form" onSubmit={(e) => this.handleFormSubmit(e)}>

          <div className='add-note-name inputs'>
            <label htmlFor="name">Note Name</label>
            <input
              id="name"
              name="name"
              value={this.state.name.value}
              onChange={(e) => this.setName(e.target.value)}
            />
          </div>

          {this.state.name.touched && this.validateName()}

          <div className='add-note-content inputs'>
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" required />
          </div>

          <div className='add-note-folder inputs'>
            <label htmlFor="folder">Folder</label>
            <select id="folder" name="folder" required>
              <option value="">...</option>
              {dropdown}
            </select>
          </div>

          <button className='button-add-note' type="submit" disabled={this.validateName()}>
            Add note
          </button>
        </form>
        {this.state.error && (
          <div style={{ color: "red" }} className="formError">
            {this.state.error}
          </div>
        )}
      </div>
    );
  }
}

AddNewNote.defaultProps = {
  folderId: "",
  content: "",
  name: "",
  modified: ""
}

AddNewNote.propTypes = {
  folderId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired

};
