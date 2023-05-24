import { Divider, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { adminHouseholdDetails } from '../service'

export default function ResidentDetailsModal({show, setSRD, hid}) {
    let [resident, setResident] = useState({})
    useEffect(() => {
        if(show){
            (async () => {
                let data = await adminHouseholdDetails(hid)
                setResident(data)
            })()

        }
    },[show])
    return (
        <div>
            <Modal
                open={show}
                title="Resident Details"
                onCancel={() => {
                    setSRD(false)
                }}
                onOk={() => {
                    setSRD(false)
                }}
                >
                <Divider />
                <Space direction='vertical' size='large'>
                    <div>Resident Id: {resident.hid}</div>
                    <div>Resident Name: {resident.householdName}</div>
                    <div>Gender: {resident.gender === '0' ? 'male' : 'female'}</div>
                    <div>Resident Address: {resident.phone}</div>
                    <div>Identity Card Number: {resident.idNum}</div>
                </Space>
                <Divider/>

            </Modal>
        </div>
    )
}
