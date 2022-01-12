import React, {Component} from 'react';
import {Form, Button, InputNumber} from 'antd';

class SatSettingForm extends Component {

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 11 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 },
            },
        };
        return (
            <Form {...formItemLayout} className="sat-setting" onSubmit={this.showSatellite}>
                <Form.Item label="Longitude (degrees)">
                    {
                        getFieldDecorator("longitude", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please enter your longitude",
                                }
                            ],
                        })(<InputNumber min={-180} max={180}
                                        style={{width: "100%"}}
                                        placeholder="Please enter longitude"
                        />)
                    }
                </Form.Item>

                <Form.Item label="Latitude (degrees)">
                    {
                        getFieldDecorator("latitude", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please enter your latitude",
                                }
                            ],
                        })(<InputNumber placeholder="Please enter latitude"
                                        min={-90} max={90}
                                        style={{width: "100%"}}
                        />)
                    }
                </Form.Item>

                <Form.Item label="Elevation (meters)">
                    {
                        getFieldDecorator("elevation", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please enter your elevation",
                                }
                            ],
                        })(<InputNumber placeholder="Please enter elevation"
                                        min={-413} max={8850}
                                        style={{width: "100%"}}
                        />)
                    }
                </Form.Item>

                <Form.Item label="Altitude (degrees)">
                    {
                        getFieldDecorator("altitude", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please enter your altitude",
                                }
                            ],
                        })(<InputNumber placeholder="Please enter altitude"
                                        min={0} max={90}
                                        style={{width: "100%"}}
                        /> )
                    }
                </Form.Item>

                <Form.Item label="Duration (secs)">
                    {
                        getFieldDecorator("duration", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please enter your duration",
                                }
                            ],
                        })(<InputNumber placeholder="Please enter duration" min={0} max={90} style={{width: "100%"}} />)
                    }
                </Form.Item>
                <Form.Item className="show-nearby">
                    <Button type="primary" htmlType="submit" style={{textAlign: "center"}}>
                        Find Nearby Satellite
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    showSatellite = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.onShow(values);
            }
        });
    }
}

const SatSetting1 = Form.create({name: 'satellite-setting'})(SatSettingForm)

export default SatSetting1;