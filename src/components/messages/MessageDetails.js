import React, { Component } from 'react'
import moment from "moment";

import { connect } from "react-redux";
import { getFirestore, addComment, getComments } from "../../store/actions/messageActions";

class MessageDetails extends Component {
  state = {
    commentBox: false,
    commentPost: ""
  }

  componentDidMount() {
    this.props.getFirestore()
    this.props.getComments()
  }

  handleChange = (e) => {
    this.setState({commentPost: e.target.value})
  }

  submitComment = (e) => {
    e.preventDefault()
    const authData = JSON.parse(localStorage.getItem("authData"))
    console.log(authData)
    const { addComment, filteredData } = this.props; 
    filteredData && 
    addComment({
      firstName: authData.firstName,
      lastName: authData.lastName,
      comment: this.state.commentPost, 
      id: filteredData[0].id
    })
    e.target.reset()
  }

  render() {
    const { filteredData, filteredComments } = this.props;
    
    if(filteredData) {
      return (
        <div className="project-details container section" >
          <div className="card z-depth-3">
            <div className="card-content">
              <span className="card-title">{filteredData[0].data.title}</span>
              <h5>{filteredData[0].data.content}</h5>
            </div>
            <div className="card-action grey lighten-4 grey text">
              <div>Posted by {filteredData[0].data.authorFirstName} {filteredData[0].data.authorLastName}</div>
              <div>{moment(filteredData[0].data.createdAt.toDate()).calendar()}</div>
            </div>
          </div>
          
          <div className="btn waves-effect waves-light grey darken-3" 
            onClick={() => {this.setState({commentBox: true})}} >Post comment</div>

        { this.state.commentBox && 
          <form onSubmit={this.submitComment} className="white" style={{marginTop: "30px"}}  >
            <div className="input-field" style={{marginTop: "1px", marginBottom: "1px"}} >
              <label htmlFor="text">Your comment</label>
              <textarea className="materialize-textarea" style={{padding: "0.7rem"}} id="text" onChange={this.handleChange}  />
              <button 
                className="btn pink lighten-1 z-depth-0" 
                style={{margin: "10px"}} >Post</button>
            </div>
          </form>
        }

          <div className="grey lighten-3" style={{marginTop: "30px", padding: "10px"}}>
            <div className="card-title" ><h5>Commments</h5></div> 
              {filteredComments && filteredComments.map(comment => (
                <div key={comment.id} className="comment-box card z-depth-0" >
                  <div className="card-content grey-text text-darken-3">
                    <span className="card-content" style={{wordWrap: "break-word", fontSize: "20px"}} >{comment.data.comment}</span>
                    <p className="right grey-text">{comment.data.firstName} {comment.data.lastName}, {moment(comment.data.createdAt.toDate()).calendar()}</p> 
                  </div>
                </div>
              ))}
          </div>
        

        </div>
      )
    } else {
      return (
        <div className="progress">
          <div className="indeterminate white"></div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const data = state.message.getMessages
  const filteredData = data ? data.filter(message => message.id === id) : null

  const commentsData = state.message.comments
  const filteredComments = commentsData ? commentsData.filter(comment => comment.data.commentId === id) : null

  return {
    filteredData: filteredData,
    filteredComments: filteredComments
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFirestore: () => dispatch(getFirestore()),
    addComment: (id) => dispatch(addComment(id)),
    getComments: () => dispatch(getComments())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetails);