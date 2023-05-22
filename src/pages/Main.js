import { DoubleLeftOutlined,DoubleRightOutlined,HomeOutlined,GoldOutlined,PlusOutlined,MobileOutlined,TableOutlined,UserOutlined,AppstoreOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import {Link ,Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { adminInfo, base } from '../service'
import { Button, Col, Divider, Dropdown, Form, Input, Layout, Menu, Modal, Row, Space, Typography } from 'antd'
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';

let iconMap = {
  'home':<HomeOutlined/>,
  'building':<GoldOutlined />,
  'medical':<PlusOutlined />,
  'category':<MobileOutlined />,
  'chart':<TableOutlined />,
  'basic':<UserOutlined />,
  'layers':<AppstoreOutlined />
}

export default function Main() {
  let nav = useNavigate()
  let [collapsed, setCollapsed] = useState(false)
  let [userInfo, setUserInfo] = useState({})
  let [menuItems, setMenuItems] = useState([])
  let [showModalModifyPwd, setShowModalModifyPwd] = useState(false)

  let [modifyPwdForm] = useForm()

  let generateMenuItems = (list) => {
    let newList = list.map((p,i) => {
      return {
        key: p.pid + "-" + p.path,
        label: p.pname,
        icon: iconMap[p.icon],
        children:p.children.length>0 ? generateMenuItems(p.children) : undefined

      }
    })
    return newList
  }

  useEffect(()=>{
    (async () => {
      let data = await adminInfo()
      setUserInfo(data)
    })()
  },[])


  useEffect(()=>{
    if(Object.keys(userInfo).length>0){
      let menuItems = generateMenuItems(userInfo.privileges)
      setMenuItems(menuItems)
    } 
  },[userInfo])

  let jump = (e) => {
    let url = e.key.split('-')[1]
    nav(url)
  }

  return (
    <>

    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        style={{
          backgroundColor:'#2483d2',
            minHeight:'100vh',
            color:'#fff',
            padding:'6px'
        }}
        >
        <Menu
            defaultSelectedKeys={['1-/admin']} 
            mode='inline' 
            items={menuItems}
            onClick={jump}
            />
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor:'#2483d2',
            color:'#fff',
            borderLeft: '1px solid #fff'
          }}
          >
            <Row>
              <Col>
                <DoubleLeftOutlined
                  style={{
                    fontSize:'20px',
                    marginLeft:'-35px',
                    display: collapsed ? 'none' : 'inline'
                  }}
                  onClick={()=>{setCollapsed(true)}}

                >
                </DoubleLeftOutlined>
                <DoubleRightOutlined  
                style={{
                    fontSize:'20px',
                    marginLeft:'-35px',
                    display:collapsed ? 'inline' :'none'
                  }}
                  onClick={()=>{setCollapsed(false)}}
                ></DoubleRightOutlined>
              </Col>

              <Col style={{flex:1}}>
                  <Typography.Title
                    level={3}
                    style={{margin:'15px 0 0 15px', color:'#fff'
                  }}
                  >
                    Admin System
                  </Typography.Title>
              </Col>
              <Col>
                  <Space>
                      <div>
                        <img src={base + userInfo.avatar}
                          style={{width:'35px',verticalAlign:'middle'}}/>
                      
                      <Dropdown
                        menu={{
                          items:[
                            {
                            key:'1',
                            label:'Change Password',
                            onClick: ()=> {
                              setShowModalModifyPwd(true)
                            }
                          },
                          {
                            key:'2',
                            label:'person information'
                          }
                          ]
                        }}
                        >
                          <Button type='text' style={{color:'#fff'}}>
                              {userInfo.aname}
                          </Button>
                      </Dropdown>
                      </div>
                      <Button></Button>
                      <Button></Button>
                      <Button></Button>
                  </Space>
              </Col>
            </Row>

        </Header>

        <Content>
          
          <Modal
            title='change password'
            open={showModalModifyPwd}
            onOk={
              ()=>{
                console.log('ok')
              }
            }
            onCancel={
              () => {
                setShowModalModifyPwd(false);
              }
            }
          >
            <Divider>
              <Form
                labelCol={{span:4}}
                wrapperCol={{span:20}}
              >
                <Form.Item name='oldPwd' label='旧密码:'>
                  <Input.Password placeholder='请输入旧密码'/>
                </Form.Item>
                <Form.Item name='newPwd' label='新密码:'>
                  <Input.Password placeholder='请输入新密码'/>
                </Form.Item>
                <Form.Item name='repeatPwd' label='重复密码:'>
                  <Input.Password placeholder='请再输入一次密码'/>
                </Form.Item>
              </Form>
            </Divider>
        </Modal>
        </Content>


      </Layout>

    </Layout>
      

    </>
  )
}
