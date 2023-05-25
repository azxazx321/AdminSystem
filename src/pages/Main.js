import { DoubleLeftOutlined,DoubleRightOutlined,HomeOutlined,GoldOutlined,PlusOutlined,MobileOutlined,TableOutlined,UserOutlined,AppstoreOutlined, createFromIconfontCN, QuestionCircleOutlined, PoweroffOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import {Link ,Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { adminInfo, adminUpdatePwd, base } from '../service'
import { Button, Col, Divider, Dropdown, Form, Input, Layout, Menu, Modal, Popover, Row, Space, Typography, message } from 'antd'
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

let IconFont = createFromIconfontCN({
  scriptUrl:'//at.alicdn.com/t/c/font_4024563_j8fb8jmpbwr.js'
})

export default function Main() {
  let nav = useNavigate()
  let [collapsed, setCollapsed] = useState(false)
  let [userInfo, setUserInfo] = useState({})
  let [menuItems, setMenuItems] = useState([])
  let [showModalModifyPwd, setShowModalModifyPwd] = useState(false)

  let [themeColor,setThemeColor] =  useState('#2483d2');
  //主题颜色列表
  let [themeColorList,setThemeColorList] = useState([
    '#2483d2',
    '#EF3E5B',
    '#6F5495',
    '#688FAD',
    '#95D47A',
    '#52CCCE',
    '#677C8A',
  ])
  
  
  
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

  let submitModifyPwd = async ({oldPwd,newPwd,repeatPwd}) => {
    if(oldPwd == null || oldPwd.length<6){
      message.error("旧密码长度不足!")
      return;
    }
    if(newPwd == null || newPwd.length<6){
      message.error("新密码长度不足!")
      return;
    }
    if(repeatPwd == null || repeatPwd.length<6){
      message.error("重复密码长度不足!")
      return;
    }
    if(oldPwd == newPwd){
      message.error("新旧密码不允许相同!")
      return;
    }
    if(newPwd !== repeatPwd){
      message.error("两次密码不一致!")
      return;
    }

    let data = await adminUpdatePwd(oldPwd, newPwd)
    if(data.code === 2000) {
      delete localStorage["adminToken"]

      Modal.success({
        title: "sucessfully",
        content: "password has been updated successfully",
        okText: "Confirm",
        onOk: () => {
          nav("/login")
        }
      })
      //return;
    } else {
      Modal.error({
        title:'error',
        content:"error" + data.msg,
        okText: "confirm"
      })
      //return;
    }
  }

  return (
    <>

    <Layout>
      <Sider
        collapsed={collapsed}
        trigger={null}
        style={{
            backgroundColor:themeColor,
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
            backgroundColor:themeColor,
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
                      <div>
                        <IconFont 
                          type='icon-colors'
                          style={{color:'#fff', fontSize:'28px', verticalAlign:'middle'}} 
                        />
                        <Popover 
                          content={
                            <Space>
                              {
                                themeColorList.map((color,index)=>{
                                  return(
                                    <Button 
                                      style={{
                                        width: '60px',
                                        height: '30px',
                                        backgroundColor:color,
                                        borderWidth: '0px'
                                      }}
                                      key={index}
                                      onClick={()=>{setThemeColor(color)}}
                                    />
                                  )
                                })
                              }
                            </Space>
                          }
                        >
                        <Button type='text' style={{color:'#fff'}}>Change Theme</Button>
                        </Popover>
                      </div>
                      <div>
                        <QuestionCircleOutlined 
                          style={{color:'#fff',fontSize:'26px',verticalAlign:'middle'}}
                        />
                        <Dropdown
                          menu={{
                            items: [
                              {key:'1',label:'Help Docs'},
                              {key:'2',label:'About System'}
                            ]
                          }}
                          >
                            <Button type='text' style={{color:'#fff'}}>Help</Button>

                          </Dropdown>
                      </div>

                      <div>
                          <PoweroffOutlined
                            style={{color:'#fff',fontSize:'26px',verticalAlign:'middle'}}
                            onClick={()=>{
                              Modal.confirm({
                                centered: true,
                                title:'Confirm',
                                content:'Are you sure you want to quit this system?',
                                onOk: ()=>{
                                  delete localStorage['adminToken']
                                  nav('/login')
                                }
                              })
                            }}
                          
                          />
                      </div>
                      
                  </Space>
              </Col>
            </Row>

        </Header>

        <Content>
          <Outlet />
        
        </Content>


      </Layout>

    </Layout>
    <Modal
            title='change password'
            open={showModalModifyPwd}
            onOk={
              ()=>{
                modifyPwdForm.submit()
              }
            }
            onCancel={
              () => {
                modifyPwdForm.resetFields()
                setShowModalModifyPwd(false)
              }
            }
          >
            <Divider>
              <Form
                form={modifyPwdForm}
                labelCol={{span:8}}
                wrapperCol={{span:16}}
                onFinish={(submitModifyPwd)}
                style={{width: '40vh'}}

              >
                <Form.Item name='oldPwd' label='Old Password:'>
                  <Input.Password placeholder='Please input your password'/>
                </Form.Item>
                <Form.Item name='newPwd' label='New Password:'>
                  <Input.Password placeholder='please input your new password'/>
                </Form.Item>
                <Form.Item name='repeatPwd' label='Confirm Password:'>
                  <Input.Password placeholder='please input your new password again'/>
                </Form.Item>
              </Form>
            </Divider>
        </Modal>

    </>
  )
}
