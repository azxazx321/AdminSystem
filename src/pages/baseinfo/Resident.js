import { Button, Col, Divider, Input, Modal, Popconfirm, Row, Space, Table, Typography, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { adminHouseholdBatchDelete, adminHouseholdBatchExport, adminHouseholdDelete, adminHouseholdFullExport, adminHouseholdList } from '../../service'
import ResidentDetailsModal from '../../components/ResidentDetailsModal'
import ResidentUpdateModal from '../../components/ResidentUpdateModal'
import ResidentAddModal from '../../components/ResidentAddModal'
import { UploadOutlined } from '@ant-design/icons'

export default function Resident() {

  let [isLoading, setIsLoading] = useState(false)
  let [residentList,setResidentList]  = useState([])

  let [showRegidentDetailsModal,setShowRegidentDetailsModal] = useState(false);
  let [showRegidentUpdateModal,setShowRegidentUpdateModal] = useState(false);
  let [showRegidentAddModal,setShowRegidentAddModal] = useState(false);
  let [showBatchAdd,setShowBatchAdd] = useState(false)
  
  let [residentId,setResidentId] = useState(0);
  let [pageNum,setPageNum] = useState(1)
  let [pageSize,setPageSize] = useState(3)
  let [recordCount,setRecordCount] = useState(0)
  let [selectedKeys,setSelectedKeys] = useState([])


  let loadData = async (pageNum) => {
    if(isLoading) return
    setIsLoading(true)
    let data = await adminHouseholdList(pageNum)
    data.data.forEach((resident)=>{resident.key = resident.hid})
    setResidentList(data.data)
    setPageNum(data.pageNum)
    setPageSize(data.pageSize)
    setRecordCount(data.recordCount)
    setIsLoading(false)
  }

  let doDelete = async (hid) => {
    let data = await adminHouseholdDelete(hid)
    if(data.code === 2000) {
      message.success('deleted!')
      loadData(1)
      return;
    } else {
      message.success({
        title: 'ERROR',
        message: 'Deleted unsuccessfully' + data.msg
      })
      return;
    }

  }

  let doBatchedDelete =() => {
    if(selectedKeys.length <= 0) {
      message.error('you must select at least one')
      return;
    }

    Modal.confirm({
      title: 'confirm',
      content: 'Are you sure you want to delete these residents records?',
      onOk: async () => {
        console.log(selectedKeys)
        let data = await adminHouseholdBatchDelete(selectedKeys)
        if(data.code === 2000){
          message.success("Deleted Selected Resident!");
          loadData(1);
          return;
        }else{
          message.error("Error:"+data.msg)
          return;
        }
      
      }
      

    })
  }

  let exportSelectedResidents = async ()=>{
    if(selectedKeys.length<=0){
      message.error("you must select at least one");
      return;
    }
    let data = await adminHouseholdBatchExport(selectedKeys);

    let url = window.URL.createObjectURL(data)

    let a = document.createElement("a");
    a.href = url;
    a.download = 'residents.xlsx'
    a.click()
    URL.revokeObjectURL(url)
  }


  let exportAllResidents = async () => {
    let data = await adminHouseholdFullExport();

    let url = window.URL.createObjectURL(data)
    let a = document.createElement("a");
    a.href = url;
    a.download = 'residents-all.xlsx'
    a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    loadData(1)
    
  },[])
  return (
    <div style={{margin:"5px 30px 0px 30px"}}>
      
      <Divider orientation='left' style={{marginTop:0}}>
        <Typography.Title level={5} style={{marginTop:0}}>
          Demography
          </Typography.Title>
      </Divider>
      <Row>
        <Col style={{flex:1}}>
          <Space.Compact>
          <Button 
            onClick={() => setShowRegidentAddModal(true) }
            >
              Add 
          </Button>
          <Button onClick={() => doBatchedDelete()}>Delete Selected</Button>
          <Button>1</Button>
          <Button onClick={() => exportSelectedResidents()}>Export Selected</Button>
          <Button onClick={()=> exportAllResidents()}>Export All</Button>
          </Space.Compact>
        </Col>
        <Col>
          <Space.Compact>
            <Input placeholder='Search by Name'/>
            <Button>
              Search
            </Button>
          </Space.Compact>
        </Col>    
      </Row>
      <Table
        style={{marginTop: '10px'}}
        dataSource={residentList}
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows)=>{
            setSelectedKeys(selectedRowKeys)}
        }}
        pagination={{
          total: recordCount,
          pageSize,
          current: pageNum,
          onChange: (newPageNum) => {
            loadData(newPageNum)
          }
        }}
        columns={[
          {
            title: 'Number:',
            dataIndex:'hid',
            key:'1',
            align: 'center'
          },
          {
            title: 'Name:',
            dataIndex:'householdName',
            key:'2',
            align: 'center'
          },
          {
            title: 'Gender:',
            dataIndex:'gender',
            key:'3',
            align: 'center'
          },

          {
            title: 'Contact details:',
            dataIndex:'phone',
            key:'4',
            align: 'center'
          },
          {
            title: 'Household Id:',
            dataIndex:'householdId',
            key:'5',
            align: 'center'
          },
          {
            title: 'Opertation',
            dataIndex:'hid',
            key:'6',
            align: 'center',
            render: (hid) => (
              <Space.Compact size="small">
                <Button size="small" onClick={() =>{
                    setShowRegidentDetailsModal(true)
                    setResidentId(hid)
                }}>Details 
                </Button>
                <Button size="small" onClick={() =>{
                    setShowRegidentUpdateModal(true)
                    setResidentId(hid)
                }}>Alter 
                </Button>
                  <Popconfirm
                    title='confirm'
                    description='are you sure you want to delete this resident?'
                    onConfirm={()=>{doDelete(hid)}}
                  >
                <Button size="small">
                         Delete 
                </Button>
                  </Popconfirm>
                 
              </Space.Compact>
              
            )
          }
        ]}
      
      >

      </Table>

      <ResidentDetailsModal 
        show={showRegidentDetailsModal}
        hid={residentId}
        setSRD={setShowRegidentDetailsModal}
      />
      <ResidentUpdateModal
        show={showRegidentUpdateModal}
        hid={residentId}
        refresh={()=>{loadData(1)}}
        setSRU={setShowRegidentUpdateModal}
      />
      <ResidentAddModal
        show={showRegidentAddModal}
        refresh={()=>{loadData(1)}}
        setSRA={setShowRegidentAddModal} 
      />


      <Modal
        open={showBatchAdd}
        title='Batch import'
        centered='true'
        onOk={()=>{setShowBatchAdd(false)}}
        onCancel={()=>{setShowBatchAdd(false)}}
      >
        <Upload>
          <Button icon={<UploadOutlined />}>Upload Excel</Button>
        </Upload>
      </Modal>
    </div>
  )
}
