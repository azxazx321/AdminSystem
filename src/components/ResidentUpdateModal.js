import { Divider, Form, Input, Modal, Radio, message } from 'antd'
import React, { useEffect } from 'react'
import { adminHouseholdDetails, adminHouseholdUpdate } from '../service';
import { useForm } from 'antd/es/form/Form';

export default function ResidentUpdateModal({show,hid,setSRU,refresh}) {
  let [updateForm] = useForm();

  useEffect(()=>{
    if(show){
      (async ()=>{
        let data = await adminHouseholdDetails(hid);
        updateForm.setFieldsValue(data)
      })()
    }
  },[show])

  let submitUpdate = async (resident)=>{
    console.log(resident)
    let data = await adminHouseholdUpdate(resident)
    if(data.code === 2000){
      //--提示成功
      message.success("Updated!");
      //--关闭模态对话框
      setSRU(false)
      //--更新表格
      refresh();
      return;
    }else{
      Modal.error({
        title:'错误',
        content:'更新失败!服务器返回错误消息:'+data.msg,
        okText:'确定',
        cancelText:'取消'
      })
    }
  }
  return (
    <Modal 
      open={show}
      onOk={()=>{updateForm.submit() }}
      onCancel={
        () => {
          setSRU(false)
        }
      }
    >
      <Divider />
      <Form
        form={updateForm}
        labelCol={{span:5}}
        onFinish={submitUpdate}

      >
        <Form.Item 
        label='hid'
        name="hid"
        
      >
        <Input/>
      </Form.Item>
        <Form.Item 
          label="Resident Id:" 
          name="householdId" 
          rules={[{required:true,message:"resident id is required"}]}>
          <Input placeholder='plz input resident id'/>
        </Form.Item>
        <Form.Item
          label='Resident name:'
          name='householdName'
        >
          <Input placeholder='plz input resident name'/>
        </Form.Item>
        <Form.Item 
          label='Gender:'
          name='gender'
        >
          <Radio.Group>
            <Radio value={"0"}>Female</Radio>
            <Radio value={"1"}>Male</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Resident Address:"
          name="householdAddr"
        >
          <Input placeholder='plz input residential address'/>
        </Form.Item>
        <Form.Item
          label="Phone Number:"
          name="phone"
        >
          <Input placeholder='plz input your phone number'/>
        </Form.Item>
        <Form.Item
          label='identity card number:'
          name="idNum"
        >
          <Input placeholder='plz input your identity card number'/>
        </Form.Item>

      </Form>

      
      </Modal>
  )
}
