 import React from 'react'
import "antd/dist/antd.css";
import { connect } from 'react-redux';
import { Table, Divider, Tag, Button } from "antd";
import Modal from './simplemodal'
import 'bootstrap/dist/css/bootstrap.min.css';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            showupdate: false
        }
    }
    componentDidMount(){
        let users = JSON.parse(localStorage.getItem('userDetails'))!==null ? JSON.parse(localStorage.getItem('userDetails'))  :  []
        
        this.props.dispatch({type:'FETCH_USERS', payload:{}})
    }
    showModal = () => {
        this.setState({
            visible:true
        })
    }
    handleupdate = () => {
      const {users} = this.props
      let arr = []
      localStorage.setItem('User', JSON.stringify(arr))
      let data = JSON.parse(localStorage.getItem('User'))
      users.id = data.length+1
      data.push(users)
      localStorage.setItem('User', JSON.stringify(data))
      this.props.dispatch({type:'EDIT_USERS', payload:users})
        this.setState({
            visible:false,
            showupdate:false
        })
    }
    handleOk = () => {
        this.props.dispatch({type:'ADD_USERS'})
        this.setState({
            visible:false
        })
    }
    handleCancel = () => {
        this.setState({
            visible:false
        })
    }
    deleterow = (row,index) => {
        this.props.dispatch({type:'DELETE_USER', payload:row})
    } 

    editrow = (row,index) => {
        this.props.dispatch({type:'SET_USER', payload: row})
        this.setState({showupdate:true, visible:true})
    }

    handleupdate = () => {
        this.props.dispatch({type:'UPDATE_USER'})
        this.setState({showupdate:false, visible:false})
    }

    changefield = obj => {
        this.props.dispatch({type:'CHANGE_FIELD',payload:obj})
    }
    render(){
        const {users} = this.props
        const columns = [
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                render: text => <a>{text}</a>
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
                render: text => <a>{text}</a>
            },
            {
                title: "Action",
                key: "action",
                render: (text, record) => (
                    <div>
                        <Button onClick={(i) => this.editrow(record)}>Edit</Button>
                        <Divider type="vertical" />
                        <Button onClick={(i) => this.deleterow(record,i)}>Delete</Button>
                    </div>
                )
            }
        ];
        const datas = JSON.parse(localStorage.getItem('User'))
        return(
            <div>
            <Button type="primary" onClick={this.showModal}>
                Create User
    </Button>
            <Table columns={columns} dataSource={this.props.usersdata} />
            <Modal
                title='Create User'
                visible={this.state.visible}
                handleOk={this.handleOk}
                handleCancel={this.handleCancel}
                showbutton = {this.state.showupdate}
                handleupdate = {this.handleupdate}
            >
            <form>
                <label>Name</label> &nbsp;&nbsp;
                <input type = "text" id="name" value={users.name} onChange={e => this.changefield({key:'name', value:e.target.value})} /><br/>
                <label>Email</label> &nbsp;&nbsp;
                <input type = "email" id="email" value={users.email} onChange={e => this.changefield({key:'email', value:e.target.value})} />
            </form>
            </Modal>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.UserReducer.userDetails,
    usersdata: state.UserReducer.users
})
export default connect(mapStateToProps)(Users)