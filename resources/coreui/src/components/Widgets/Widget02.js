import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardFooter, Button} from 'reactstrap';
import classNames from 'classnames';
import {mapToCssModules} from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  mainText: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  footer: PropTypes.bool,
  link: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

const defaultProps = {
  header: '$1,999.50',
  mainText: 'Income',
  icon: "fa fa-cogs",
  color: 'primary',
  variant: "0",
  link: "#"
};

class Widget02 extends Component {
  render() {
    const {toggleRenameModal,  downloadFile, openFolder, toggleDeleteModal, className, cssModule, header, mainText, icon, color, footer, link, children, variant, ...attributes} = this.props;

    // demo purposes only
    const padding = (variant === '0' ? {card: "p-3", icon: "p-3", lead: "mt-2"} : ( variant === "1" ? {
      card: "p-0", icon: "p-4", lead: "pt-3" } : {card: "p-0", icon: "p-4 px-5", lead: "pt-3"}));

    const card = {style: "clearfix", color: color, icon: icon, classes: ""};
    card.classes = mapToCssModules(classNames(className, card.style, padding.card), cssModule);

    const lead = {style: "h5 mb-0", color: color, classes: ""};
    lead.classes = classNames(lead.style, 'text-' + card.color, padding.lead);

    const blockIcon = function (icon) {
      const classes = classNames(icon, 'bg-' + card.color, padding.icon, "font-2xl mr-3 float-left");
      return (<i className={ classes }></i>);
    };

    const cardFooter = function () {
      if (footer) {
        return (
          <CardFooter className="px-3 py-2">
            <Button onClick={() => {toggleRenameModal(link)}} className="font-weight-bold font-xs btn-block text-muted">Rename
              <i className="fa fa-pencil float-right font-lg"></i></Button>
            <Button onClick={()=>downloadFile(link)} className="font-weight-bold font-xs btn-block text-muted">Download
              <i className="fa fa-cloud-download float-right font-lg"></i></Button>
            <Button onClick={()=>{toggleDeleteModal(link)}} className="font-weight-bold font-xs btn-block text-muted">Delete
              <i className="fa fa-trash float-right font-lg"></i></Button>
          </CardFooter>
        );
      }else {
          return (
              <CardFooter className="px-3 py-2">
                <Button onClick={() => {toggleRenameModal(link)}} className="font-weight-bold font-xs btn-block text-muted">Rename
                  <i className="fa fa-pencil float-right font-lg"></i></Button>
                <Button onClick={() => openFolder(link)} className="font-weight-bold font-xs btn-block text-muted">Open Folder
                  <i className="fa fa-folder-open float-right font-lg"></i></Button>
                <Button onClick={()=>{toggleDeleteModal(link)}} className="font-weight-bold font-xs btn-block text-muted">Delete
                  <i className="fa fa-trash float-right font-lg"></i></Button>
              </CardFooter>
          );
      }
    };

    return (
      <Card>
        <CardBody className={ card.classes } {...attributes}>
          { blockIcon(card.icon) }
          <div className={ lead.classes }>{ header }</div>
          <div className="text-muted text-uppercase font-weight-bold font-xs">{ mainText }</div>
        </CardBody>
        { cardFooter() }
      </Card>
    )
  }
}

Widget02.propTypes = propTypes;
Widget02.defaultProps = defaultProps;

export default Widget02;