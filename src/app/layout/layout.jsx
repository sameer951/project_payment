import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    UserOutlined,
    BarsOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Input } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
class LayoutComponet extends React.Component {
    state = {
        collapsed: true,
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    menuList = [
        {
            label: 'Admin',
            icon: <UserOutlined />
        },
        {
            label: 'Invoices',
            route: '',
            icon: <BarsOutlined />
        },
        {
            label: 'Config',
            route: 'config',
            icon: <SettingOutlined />
        }
    ];

    render() {
        return <React.Fragment>
            <Layout theme="light" style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['menuItem1']} mode="inline">
                        {this.menuList.map((menu, index) => <Menu.Item key={"menuItem" + index}
                            onClick={() => {
                                let path = menu.route || '';
                                this.props.history.push(path);
                                console.log('menu', menu)
                            }}
                            icon={menu.icon}>
                            {menu.label}
                        </Menu.Item>)}

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Invoices</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>iVoyant -Payment submited by Akhil( +91 90143 92233 )</Footer>
                </Layout>
            </Layout>
        </React.Fragment>
    }
}

export default withRouter(LayoutComponet);