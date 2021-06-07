import React, {useState} from 'react'
import { Button, Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { xs, sm, md, lg, xl, useWindowSize } from 'src/utils/size'
import MenuLayout from './MenuLayout'


const MenuDrawer = () => {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }   

    if (useWindowSize()[0] <= xs)
        return (
        <>
            <Button type="primary" onClick={showDrawer}>
            <MenuOutlined />
            </Button>
            <Drawer
            placement="left"
            closable={false}
            onClose={onClose}
            visible={visible}
            >
            <MenuLayout />
            </Drawer>
        </>
    )

    else return (<></>)
}

export default MenuDrawer