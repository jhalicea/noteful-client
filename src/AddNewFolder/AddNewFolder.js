import React from 'react'
import config from '../config'
import ApiContext from '../ApiContext'
import PropTypes from 'prop-types'
import './AddNewFolder.css'


export default class AddNewFolder extends React.Component {
    // state = {
    //     value: ''
    // }

    // static defaultProps ={
    //     onNewFolder: () => {},
    //   }

      static contextType = ApiContext;
      

    // handleChange = (e) => {
    //     this.setState({value: e.target.value});
    //   }

    handleFormSubmit = e => {
      e.preventDefault()
      const folderName = e.target.name.value
      const options = {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({name: folderName})
      }
      fetch(`${config.API_ENDPOINT}/folders`, options)
        .then(resp => {
          if(!resp.ok) {
            throw new Error('Something went wrong, please try again')
          }
          return resp.json()
        })
        .then(data => {
          this.context.addFolder(data)
          this.props.history.push('/')
        })
        .catch(err => console.log(err.message))
    }

    render () {
      console.log(this.context, 'this is my context')
        return (
          <div className="folder-form-wrapper">
            <h2 className='folder-title'>Create New Folder</h2>
            <form className='folder-form'onSubmit={(e) => this.handleFormSubmit(e)}>
             
              <label htmlFor="name">Folder Name:</label>
              <input id="name" name="name" required />
              
              <button className='button-add-new-folder' type="submit">Add folder</button>
            </form>
          </div>
            // <form onSubmit={this.handleNewFolder}>
            // <div className='new-folder'>
            // <label htmlFor='new-folder'>Enter Name Of New Folder:</label>
            // <input id='new-folder' type='text'value={this.state.value} onChange={this.handleChange} placeholder='Folder Name' />
            // <button type='submit' value='submit' className='Noteful-form'>Submit</button>
            // </div>
            // </form>
        )
    }
}

AddNewFolder.defaultProps = {
  name: "No Name Provided"
}

AddNewFolder.propTypes = {
  name: PropTypes.string.isRequired
};