import React, {Component} from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import { NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY } from '../constants';
import SatSetting from './SatSetting';
import SatelliteList from './SatelliteList';
import WorldMap from './WorldMap';

class Main extends Component {
    constructor(){
        super();
        this.state = {
            satInfo: null,
            satList: null,
            setting: null,
            isLoadingList: false
        }
    }
    render() {
        const { isLoadingList, satInfo, satList, setting } = this.state;
        return (
            // grid: col-8 + col-16 = 24 in total
            // parent component is Main.js instead of App.js
            // SatSetting: Satellite settings on the left top
            // SatelliteList: Satellite lists on the left bottom
            // WorldMap: Map on the right side
            <Row className='main'>
                <Col span={8} >
                    <SatSetting onShow={this.showNearbySatellite}/>
                    <SatelliteList isLoad={isLoadingList}
                                   satInfo={satInfo}
                                   onShowMap={this.showMap} />
                </Col>
                <Col span={16} className="right-side">
                    <WorldMap satData={satList} observerData={setting} />
                </Col>
            </Row>
        );
    }

    showMap = (selected) => {
        this.setState(preState => ({
            ...preState,
            satList: [...selected]
        }))
    }

    showNearbySatellite = (setting) => {
        this.setState({
            isLoadingList: true,
            setting: setting
        })
        this.fetchSatellite(setting);
    }

    fetchSatellite= (setting) => {
        // parameter for apis
        const {latitude, longitude, elevation, altitude} = setting;
        // url  /api/ added
        const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

        this.setState({
            isLoadingList: true
        });

        // make request
        axios.get(url)
            .then(response => {
                console.log(response.data)
                this.setState({
                    satInfo: response.data,
                    isLoadingList: false
                })
            })
            .catch(error => {
                console.log('err in fetch satellite -> ', error);
            })
    }
}
export default Main;

