import React, { Component } from 'react';

import {Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input} from 'reactstrap';
import Widget02 from '../../components/Widgets/Widget02';
import { connect } from 'react-redux'
import dashboardActions from "../../redux/dashboardRedux";
import { RingLoader } from 'react-spinners';
//Random Numbers
// function random(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }



class Dashboard extends Component {
  componentDidMount(){
    this.props.getDocuments('/');
  }
  constructor(props) {
    super(props);

    this.state = {
        deleteModalState: false,
        fileToDelete:null,

        renameModalState: false,
        fileToRename: null,

        newDocName: ''
    };
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.openFolder = this.openFolder.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }
  isFolder(filename){
    //let extension = null;
      var a = filename.split(".");
      if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
          //extension = "";
          return true;
      }else{
          //extension = a.pop();
          return false;
      }
  }
  getDirectoryOrFileName(absolutePath){
      const pathSections = absolutePath.split("/");
      return pathSections[pathSections.length - 1];
  }
  toggleRenameModal(absolutePath) {
      absolutePath = absolutePath || null;
      this.setState({renameModalState: !this.state.renameModalState, fileToRename: absolutePath});
  }

  toggleDeleteModal(absolutePath) {
      absolutePath = absolutePath || null;
      this.setState({deleteModalState: !this.state.deleteModalState, fileToDelete: absolutePath});
  }
  downloadFile(absolutePath){
    this.props.downloadFile(absolutePath);
  }
  openFolder(absolutePath){
      this.props.getDocuments(absolutePath);
  }

  render() {
      const { documents } = this.props.dashboard;

      let docs = [];
      if(documents){

          docs = documents.map((file, index)=>{
              return this.isFolder(file) ?
                  <Col key={index} xs="12" sm="6" lg="3">
                      <Widget02 key={index+'fo'} link={file} toggleRenameModal={this.toggleRenameModal.bind(this)} openFolder={this.openFolder} header="" mainText={this.getDirectoryOrFileName(file)} icon="fa fa-folder" color="info"/>
                  </Col>
                  :
                  <Col key={index} xs="12" sm="6" lg="3">
                      <Widget02 downloadFile={this.downloadFile} footer toggleRenameModal={this.toggleRenameModal.bind(this)} toggleDeleteModal={this.toggleDeleteModal} link={file} key={index+'fi'} header="" mainText={this.getDirectoryOrFileName(file)} icon="fa fa-file" color="primary"/>
                  </Col>
          });
      }
    return (
      <div className="animated fadeIn">
          <Modal isOpen={this.state.deleteModalState}>
              <ModalHeader toggle={this.toggleDeleteModal}>Delete file</ModalHeader>
              <ModalBody>
                  Confirm Delete
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={() => this.props.deleteDocument(this.state.fileToDelete)}>Yes</Button>{' '}
                  <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
              </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.renameModalState}>
              <ModalHeader toggle={this.toggleRenameModal.bind(this)}>Rename file</ModalHeader>
              <ModalBody>
                  <InputGroup className="mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-create"></i>
                        </span>
                      </div>
                      <Input onChange={(event)=>{this.setState({newDocName: event.target.value})}} type="text" value={this.state.newDocName}/>
                  </InputGroup>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={() => this.props.renameDocument(this.state.fileToRename, this.state.newDocName)}>Save</Button>{' '}
                  <Button color="secondary" onClick={() => this.toggleRenameModal()}>Cancel</Button>
              </ModalFooter>
          </Modal>

          <center><RingLoader loading={this.props.dashboard.fetching} /></center>


        <Row>
            {docs? docs: false}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDocuments: directory => dispatch(dashboardActions.dashboardDocumentsRequest(directory)),
        deleteDocument: directory => dispatch(dashboardActions.dashboardDeleteDocumentsRequest(directory)),
        downloadFile: path => dispatch(dashboardActions.dashboardDownloadDocumentsRequest(path)),
        renameDocument: (directory, newDirectory) => dispatch(dashboardActions.dashboardRenameDocumentsRequest(directory, newDirectory))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
