import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from "react-native";

import { Camera, Permissions } from 'expo'
import { Container, Content, Header, Item, Icon, Input, Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Drawer from 'react-native-drawer'
import SideBar from '../../components/SideBar'
import Key from './key'

class CameraComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            hasCameraPermission: null,
            save: 0,
            type: Camera.Constants.Type.back,
            camera: null,
        }
    }


    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    snap = async () => {
        if (this.camera) {
            this.camera.takePictureAsync().then( photo => {
                console.log(photo);
                fetch(`https://vision.googleapis.com/v1/images:annotate?key=${Key}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "requests": [
                            {
                                "image": {
                                    "content": photo.uri
                                },
                                "features": [
                                    {
                                        "type": "DOCUMENT_TEXT_DETECTION"
                                    }
                                ]
                            }
                        ]
                    })
                })
                    .then(results => {
                        const detections = results[0].textAnnotations;
                        let index = 0;
                        detections.forEach(text => {
                            index += 1;
                            {
                                text.description.toUpperCase() === 'TOTAL' ? this.setState({save: detections[index].description}) : ""
                            }
                        });
                    })
                    .catch(err => {
                        console.log('index', {title: 'Google Cloud API Test', body: `Your results are: ${err}`})
                    });
                this.props.navigation.navigate('Tabs', {navigation: this.props, save: this.state.save})
            }).catch(err => {
                console.log('index', {title: 'Google Cloud API Test', body: `Your results are: ${err}`})
            })
        }
    };


    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />
        }
        else if (hasCameraPermission === false) {
            return <Text> No access to camera</Text>
        }
        else {
            return (
                <Drawer
                    type="static"
                    content={<SideBar prev={'Camera'} navigation={this.props.navigation} />}
                    tapToClose={true}
                    openDrawerOffset={Dimensions.get('window').width - 150}
                    styles={drawerStyles}
                    tweenHandler={Drawer.tweenPresets.parallax}
                    ref={(ref) => this._drawer = ref}
                >
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1, justifyContent: 'space-between' }} ref={ref => { this.camera = ref; }} type={this.state.type} >

                        <Header rounded
                                style={{
                                    position: 'absolute', backgroundColor: 'transparent',
                                    left: 0, top: 0, right: 0, zIndex: 100, alignItems: 'center'
                                }}
                        >
                            <View style={{ flexDirection: 'row', flex: 2, paddingLeft: 20 }}>
                                <Icon name="ios-menu" style={{ color: 'white', fontWeight: 'bold', marginTop: 20 }} onPress={() => this._drawer.open()} />
                            </View>
                        </Header>

                        <View onPress={this.snap} style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 10, marginBottom: 15, alignItems: 'flex-end' }}>


                            <View onPress={this.snap} style={{ alignItems: 'center' }}>
                                <MaterialCommunityIcons onPress={this.snap} name="circle-outline"
                                    style={{color: 'white', fontSize: 100}}
                                />
                            </View>

                        </View>
                    </Camera>
                </View>
                </Drawer>
            )
        }
    }
}
export default CameraComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const drawerStyles = {
    drawer: { backgroundColor: '#000000'},
};