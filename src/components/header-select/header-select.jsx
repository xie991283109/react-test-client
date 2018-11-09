/*
*  选择用户头像的组件
*/
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {
    List,
    Grid
} from 'antd-mobile';

export default class HeaderSelect extends Component {
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.avatarList = [];
        for (let i = 0; i < 20; i++) {
            this.avatarList.push({
                text: '头像' + (i + 1),
                icon: require(`../../assets/images/头像${i + 1}.png`)
            })
        }
    }

    state = {
        icon: null
    };

    chooseAvatar = ({text, icon}) => {
        this.setState({
            icon
        });

        this.props.setHeader(text);
    };

    render() {
        const {icon} = this.state;
        const listHeader = !icon ? '请选择头像' : (
            <div>
                <span>已选择头像：</span>
                <img src={icon}/>
            </div>
        );
        return (
            <List renderHeader={() => listHeader}>
                <Grid
                    data={this.avatarList}
                    columnNum={5}
                    onClick={this.chooseAvatar}
                ></Grid>
            </List>
        );
    }
}