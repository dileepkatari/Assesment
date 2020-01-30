import React from 'react'
import { Modal, Button } from 'react-bootstrap';


class Modals extends React.Component{
    render(){
        const {showbutton, visible, handleCancel} = this.props
        return(
            <Modal show={visible} onHide={handleCancel}>
  <Modal.Header closeButton>
    <Modal.Title>{this.props.title}</Modal.Title>
  </Modal.Header>

  <Modal.Body>
  {this.props.children}
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={this.props.handleCancel}>Close</Button>
    {showbutton ? (
        <Button variant="primary" onClick={this.props.handleupdate}>Update</Button>
    ):
    <Button variant="primary" onClick={this.props.handleOk}>Save</Button>}
  </Modal.Footer>
</Modal>
        //     <Modal
        //     title={this.props.title}
        //     visible={this.props.visible}
        //     onOk={this.props.handleOk}
        //     onCancel={this.props.handleCancel}
        //   >
        //    {this.props.children}
        //   </Modal>
        )
    }
}

export default Modals