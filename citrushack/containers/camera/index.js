import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Camera, Permissions } from 'expo'

import { Container, Content, Header, Item, Icon, Input, Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class CameraComponent extends Component {

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    onSnap = (event) => {

    };

    render() {
        const { hasCameraPermission } = this.state

        if (hasCameraPermission === null) {
            return <View />
        }
        else if (hasCameraPermission === false) {
            return <Text> No access to camera</Text>
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1, justifyContent: 'space-between' }} type={this.state.type} >

                        <Header searchBar rounded
                                style={{
                                    position: 'absolute', backgroundColor: 'transparent',
                                    left: 0, top: 0, right: 0, zIndex: 100, alignItems: 'center'
                                }}
                        >
                            <View style={{ flexDirection: 'row', flex: 2, paddingLeft: 20 }}>
                                <Icon name="ios-menu" style={{ color: 'white', fontWeight: 'bold' }} />
                            </View>
                        </Header>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 10, marginBottom: 15, alignItems: 'flex-end' }}>


                            <View style={{ alignItems: 'center' }}>
                                <MaterialCommunityIcons name="circle-outline"
                                    style={{color: 'white', fontSize: 100}}
                                />
                            </View>

                        </View>
                    </Camera>
                </View>
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