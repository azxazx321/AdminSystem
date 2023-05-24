import { Divider, Form, Input, Modal, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { adminHouseholdDetails } from '../service';
import { useForm } from 'antd/es/form/Form';

export default function ResidentUpdateModal({show,hid,setSRU}) {
  let [updateForm] = useForm();

  useEffect(()=>{
    if(show){
      (async ()=>{
        let data = await adminHouseholdDetails(hid);
        console.log(data)
        updateForm.setFieldsValue(data)
      })()
    }
  },[show])

  return (
    <Modal 
      open={show}
      onOk={
        () => {
          setSRU(false)
        }
      }
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
