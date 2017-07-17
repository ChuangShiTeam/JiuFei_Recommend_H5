import React, {Component} from 'react';
import {connect} from 'dva';
import {Toast} from 'antd-mobile';
import {createForm} from 'rc-form';

import constant from '../util/constant';
import http from '../util/http';
import './Style.css';

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        if (this.props.product.list.length === 0) {
            this.handleLoad();
        }
    }

    componentWillUnmount() {

    }

    handleLoad() {
        Toast.loading('加载中..', 0);

        http.request({
            url: '/feijiu/recommend/product/list',
            data: {

            },
            success: function (data) {
                Toast.hide();

                this.props.dispatch({
                    type: 'product/fetch',
                    data: {
                        list: data
                    }
                });
            }.bind(this),
            complete: function () {
                Toast.hide();
            }.bind(this)
        });
    }

    handleClick(product_link) {
        if (product_link !== '') {
            window.location.href = product_link;
        }
    }

    render() {
        return (
            <div className="apply" style={{'WebkitTransform':'scale(' + document.documentElement.clientWidth / 375 + ', ' + document.documentElement.clientWidth / 375 + ')'}}>
                <img style={{width: '100%'}} src={require('../image/01.jpg')} alt=""/>
                <div className="product">
                    {
                        this.props.product.list.map(function (item) {
                            return (
                                <div key={item.product_id} className="product_item" onClick={this.handleClick.bind(this, item.product_link)}>
                                    <div className="product_image" style={{background: 'url(' + constant.host + item.product_image + ') no-repeat center'}}></div>
                                    <div className="product_name">{item.product_name}</div>
                                    <div className="product_content" dangerouslySetInnerHTML={{__html: item.product_content.replace(/\r?\n/g,"<br />")}}></div>
                                </div>
                            )
                        }.bind(this))
                    }
                </div>
                <div>
                    <img style={{width: '100%'}} src={require('../image/02.jpg')} alt=""/>
                </div>
            </div>
        );
    }
}

Product = createForm()(Product);

export default connect(({product}) => ({product}))(Product);
