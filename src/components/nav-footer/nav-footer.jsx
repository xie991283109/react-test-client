import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';  //非路由组件使用路由api

const Item = TabBar.Item;

class NavFooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    };

    render() {
        const {navList, unReadCount} = this.props;
        const {pathname} = this.props.location;
        return (
            <TabBar>
                {
                    navList.map((nav, index) => (
                        <Item
                            key={index}
                            title={nav.text}
                            badge={nav.path === '/message' ? unReadCount : 0}
                            icon={{uri: require(`./images/${nav.icon}.png`)}}
                            selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                            selected={pathname === nav.path}
                            onPress={() => this.props.history.replace(nav.path)}
                        ></Item>
                    ))
                }
            </TabBar>
        );
    }
}

export default withRouter(NavFooter)