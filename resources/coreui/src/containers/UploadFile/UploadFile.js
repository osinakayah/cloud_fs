import React, {Component} from 'react';
import {Badge, Row, Col, Card, CardHeader, CardFooter, CardBody, Label, Input} from 'reactstrap';//
import Gallery from 'react-fine-uploader'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import {reactLocalStorage} from 'reactjs-localstorage'
import 'react-fine-uploader/gallery/gallery.css'
let user = reactLocalStorage.getObject('user_token', {});
const uploader = new FineUploaderTraditional({
    options: {
        params: {

        },
        chunking: {
            enabled: true
        },
        deleteFile: {
            enabled: true,
            endpoint: '/api/file/upload?token='+user.token
        },
        request: {
            endpoint: '/api/file/upload?token='+user.token
        },
        retry: {
            enableAuto: true
        }
    }
})


class UploadFile extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>
            <Gallery uploader={ uploader } />
          </Col>
        </Row>
      </div>

    )
  }
}

export default UploadFile;
