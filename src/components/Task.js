import React from 'react'
import "antd/dist/antd.css";
import Todos from './Todos'
import { Tabs } from 'antd';
import User from './User'
const { TabPane } = Tabs;
class Task extends React.Component {
  render() {
    return (
        <Tabs defaultActiveKey="1" >

          <TabPane tab="Users" key="1">
            <User />
          </TabPane>
          <TabPane tab="Todos" key="2">
            <Todos />
          </TabPane>
        </Tabs>
    )
  }

}
export default Task;