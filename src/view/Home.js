import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Popup, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';

import http from '../util/http';
import './Style.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customer_name: '',
            customer_phone: '',
            customer_city: ''
        }
    }

    componentDidMount() {
       /* Popup.show(<div className="code-info"><img className="code-img" style={{width: '80%'}} src={require('../image/04.jpg')} alt='微店二维码' /></div>, {maskClosable:true, className: 'back'});
*/    }

    componentWillUnmount() {

    }

    checkPhone(phone) {
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
            return false;
        }
        return true;
    }

    handleSubmit() {
        if (this.state.customer_name === '') {
            Toast.fail('请输入您的姓名', 1)
            return;
        }

        if (this.state.customer_phone === '') {
            Toast.fail('请输入您的手机号码', 1)
            return;
        } else {
            if (!this.checkPhone(this.state.customer_phone)) {
                Toast.fail('手机号码格式不对', 1)
                return;
            }
        }

        if (this.state.customer_city === '') {
            Toast.fail('请输入您的城市', 1)
            return;
        }

        Toast.loading('加载中..', 0);

        http.request({
            url: '/feijiu/recommend/customer/save',
            data: {
                customer_name: this.state.customer_name,
                customer_phone: this.state.customer_phone,
                customer_city: this.state.customer_city
            },
            success: function (data) {
                Toast.hide();

                this.props.dispatch(routerRedux.push({
                    pathname: '/product',
                    query: {},
                }));
            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    }

    handleCustomer_name(e) {
        this.setState({
            customer_name: e.target.value
        });
    }

    handleCustomer_phone(e) {
        this.setState({
            customer_phone: e.target.value
        });
    }

    handleCustomer_city(e) {
        this.setState({
            customer_city: e.target.value
        });
    }

    render() {
        console.log(document.documentElement.clientWidth / 750);

        return (
            <div className="home" style={{'WebkitTransform':'scale(' + document.documentElement.clientWidth / 375 + ', ' + document.documentElement.clientWidth / 375 + ')'}}>
                <input type="text" id="customer_name" className="customer_name" placeholder="请输入您的姓名" value={this.state.customer_name} onChange={this.handleCustomer_name.bind(this)}/>
                <input type="text" id="customer_phone" className="customer_phone" placeholder="请输入您的手机号码"  value={this.state.customer_phone} onChange={this.handleCustomer_phone.bind(this)}/>
                <input type="text" id="customer_city" className="customer_city" placeholder="请输入您的城市"  value={this.state.customer_city} onChange={this.handleCustomer_city.bind(this)}/>
                <div className="submit_button" onClick={this.handleSubmit.bind(this)}></div>
            </div>
        );
    }
}

Home = createForm()(Home);

export default connect(({customer}) => ({customer}))(Home);