import React, {Component} from 'react';
import { connect } from 'react-redux';
import {reactLocalStorage} from 'reactjs-localstorage'
import dashboardActions from '../../redux/dashboardRedux'
import Widget01 from '../../components/Widgets/Widget01';
import { RingLoader } from 'react-spinners';
import {
    Row,
    Col
} from 'reactstrap';
const TRASH_FOLDER = 'Trash';

class Trash extends Component {
    constructor(props){
        super(props);
        this.openFolder = this.openFolder.bind(this);
        this.restoreFileOrFolder = this.restoreFileOrFolder.bind(this);
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
        let pathSections = absolutePath.split("/");
        return pathSections[pathSections.length - 1];
    }
    openFolder(absolutePath){
        this.props.getDocuments(absolutePath);
    }
    restoreFileOrFolder(trashPath) {
        this.props.restoreFileOrFolder(trashPath);
    }
  componentDidMount(){
      let user = reactLocalStorage.getObject('user_token', {});

      let directory = user.user.email.replace(/\./g, '-')+'/'+TRASH_FOLDER;
      this.props.getDocuments(directory);
  }
  render() {
      const { documents } = this.props.dashboard;

      let docs = [];
      if(documents){

          docs = documents.map((file, index)=>{
              return this.isFolder(file) ? <Col key={index} xs="12" sm="6" lg="3"><Widget01 restoreFileOrFolder={this.restoreFileOrFolder} openFolder={this.openFolder} key={index+'fo'} link={file} header="" mainText={this.getDirectoryOrFileName(file)} icon="fa fa-folder" color="info"/></Col> : <Col key={index} xs="12" sm="6" lg="3"><Widget01 restoreFileOrFolder={this.restoreFileOrFolder} footer link={file} key={index+'fi'} header="" mainText={this.getDirectoryOrFileName(file)} icon="fa fa-file" color="primary"/></Col>
          });
      }
    return (
      <div className="animated fadeIn">
        <Row>
            <Col xs={{ size: 4, offset: 4 }} >
                <RingLoader loading={this.props.dashboard.fetching} />
            </Col>
        </Row>


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
        restoreFileOrFolder: (trashPath) => dispatch(dashboardActions.dashboardRestoreDocumentsRequest(trashPath)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trash);
