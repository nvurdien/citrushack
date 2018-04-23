import React, { Component } from 'react'
import { Card, Icon } from 'react-native-elements'
import {
    Dimensions,
    Linking,
    ListView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { Icon as NativeIcon } from 'native-base'
import PropTypes from 'prop-types'
import Tel from './Tel'
import Drawer from "react-native-drawer";
import SideBar from "../../components/SideBar";

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
    },
    container: {
        flex: 1,
    },
    headerColumn: {
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                alignItems: 'center',
                marginTop: 50
            },
            android: {
                alignItems: 'center',
            },
        }),
    },
    placeIcon: {
        color: 'white',
        fontSize: 26,
    },
    scroll: {
        backgroundColor: '#FFF',
    },
    telContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    userNameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center',
    },
})

class Contact extends Component {

    constructor(props){
        super(props);
    }
    static propTypes = {
        name: PropTypes.string.isRequired,
        tels: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                number: PropTypes.string.isRequired,
            })
        ).isRequired,
    }

    state = {
        telDS: new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        }).cloneWithRows(this.props.tels),
    }

    onPressTel = number => {
        console.log("tel")
    }

    onPressSms = () => {
        console.log('sms')
    }

    renderHeader = () => {
        const {
            name,
        } = this.props;

        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerColumn}>
                    <Text><NativeIcon name="ios-menu" style={{ color: 'black', fontWeight: 'bold' }} onPress={() => this._drawer.open()} /></Text>
                    <Text style={styles.userNameText}>{name}</Text>
                </View>
            </View>
        )

    }

    renderTel = () => (
        <ListView
            contentContainerStyle={styles.telContainer}
            dataSource={this.state.telDS}
            renderRow={({ id, name, number }, _, k) => {
                return (
                    <Tel
                        key={`tel-${id}`}
                        index={k}
                        name={name}
                        number={number}
                        onPressSms={this.onPressSms}
                        onPressTel={this.onPressTel}
                    />
                )
            }}
        />
    )

    render() {
        return (
            <Drawer
                type="static"
                content={<SideBar prev={'Profile'} navigation={this.props.navigation} />}
                tapToClose={true}
                openDrawerOffset={Dimensions.get('window').width - 150}
                styles={drawerStyles}
                tweenHandler={Drawer.tweenPresets.parallax}
                ref={(ref) => this._drawer = ref}
            >
                <View style={styles.container}>
                    <Card containerStyle={styles.cardContainer}>
                        {this.renderHeader()}
                        {this.renderTel()}
                    </Card>
                </View>
            </Drawer>
        )
    }
}
const drawerStyles = {
    drawer: { backgroundColor: '#000000'},
};

export default Contact
