import { useForm } from 'antd/es/form/Form'
import React from 'react'
import { adminHouseholdAdd } from '../service'
import { Divider, Form, Input, Modal, Radio, message } from 'antd'

export default function ResidentAddModal({show,setSRA,refresh}) {
  let [addForm] = useForm()

  let submitAdd = async (resident) => {
    console.log(resident)
    let data = await adminHouseholdAdd(resident)
    if(data.code === 2000) {
      message.success('added a new resident!')
      setSRA(false)
      addForm.resetFields()
      refresh()
    }
  }
  return (
    <div>
      <Modal
        title='Add a new resident:'
        open={show}
        onCancel={()=> setSRA(false)}
        onOk={()=>{addForm.submit()}}
        centered={true}
      >
        <Form
          form={addForm}
          labelCol={{span:6}}
          onFinish={submitAdd}
          >
          <Divider/>
          <Form.Item 
            label="Resident No:" 
            name="householdId" 
            rules={[{required:true,message:"Resident cannot be null"}]}>
            <Input placeholder=''/>
          </Form.Item>
          <Form.Item
          label='Resident Name:'
          name='householdName'
        >
          <Input placeholder='plz input resident name'/>
        </Form.Item>
        <Form.Item 
          label='Gender:'
          name='gender'
        >
          <Radio.Group>
            <Radio value={"0"}>FeMale</Radio>
            <Radio value={"1"}>Male</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Household Address:"
          name="householdAddr"
        >
          <Input placeholder='plz input your address'/>
        </Form.Item>
        <Form.Item
          label="Phone:"
          name="phone"
        >
          <Input placeholder='plz input your phone number'/>
        </Form.Item>
        <Form.Item
          label='Identity card number:'
          name="idNum"
        >
          <Input placeholder='plz input your identity card number'/>
        </Form.Item>
        </Form>

      </Modal>
      </div>
  )
}
