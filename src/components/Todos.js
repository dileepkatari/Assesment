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
        let Todo =  JSON.parse(localStorage.getItem('Todos'))!==null ? JSON.parse(localStorage.getItem('Todos'))  :  []
        this.props.dispatch({type:'FETCH_USERSTODO', payload:{}})
    }
    showModal = () => {
        this.setState({
            visible:true
        })
    }

    handleupdate = () => {
        this.props.dispatch({type:'UPDATE_USERTODO'})
        this.setState({showupdate:false, visible:false})
    }
    
    handleOk = () => {
        this.props.dispatch({type:'ADD_USERSTODO'})
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
        this.props.dispatch({type:'DELETE_USERSTODO', payload:row})
    } 

    editrow = (row,index) => {
        this.props.dispatch({type:'SET_USERSTODO', payload: row})
        this.setState({showupdate:true, visible:true})
    }

    changefield = obj => {
        this.props.dispatch({type:'CHANGE_FIELD',payload:obj})
    }

    onChange = date => {
        let obj = {key:'date', value : date} 
        this.props.dispatch({type:'CHANGE_FIELD',payload:obj})
    }
    render(){
        const {userstodo, usersdatatodo} = this.props
        const columns = [
            {
                title: "Event",
                dataIndex: "event",
                key: "event",
                render: text => <a>{text}</a>
            },
            {
                title: "Date",
                dataIndex: "date",
                key: "date",
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
                Create Todo
    </Button>
            <Table columns={columns} dataSource={usersdatatodo} />
                    <Modal
                title='Create Todo'
                visible={this.state.visible}
                handleOk={this.handleOk}
                handleCancel={this.handleCancel}
                showbutton = {this.state.showupdate}
                handleupdate = {this.handleupdate}
            >
            <form>
                <label>Event</label> &nbsp;&nbsp;
                <input type = "text" id="name" value={userstodo.event} onChange={e => this.changefield({key:'event', value:e.target.value})} /><br/>
               
            </form>
            </Modal>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    userstodo: state.TodoReducer.userDetailstodo,
    usersdatatodo: state.TodoReducer.userstodo
})
export default connect(mapStateToProps)(Users)