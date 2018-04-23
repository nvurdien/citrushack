import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Platform,
    TouchableOpacity,
    TextInput
} from "react-native";
import Drawer from "react-native-drawer";
import SideBar from "../../components/SideBar";
import {Icon} from 'native-base'
import Card from "react-native-elements/src/card/Card";
import Amplify, { API } from 'aws-amplify';
import aws_exports from '../../aws-exports';
import Twilio from "react-native-twilio";
import twil_api from './twilio'

let accountSID = twil_api[0];
let authToken = twil_api[1];

Amplify.configure(aws_exports);

class Tabs extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            total: 15.35,
            contacts: [
            ],
            leftover: 0,
            phoneNumber: "",
        };
    }

    onPhoneChange = (event) => {
        this.setState({phoneNumber: event})
    };


    splitEven = () => {
        if (this.state.count <= 0) return false;
        let arrr = this.state.contacts;
        if(this.state.total > 0){
            arrr.map(person =>
            {
                person.payment = this.state.total/this.state.count;
            }
            );
            this.setState({contacts: arrr})
        }
    };

    textEveryone = () => {
        this.state.contacts.map(person => {
            Twilio.messages.create({
                from: "+17472342508",
                to: "+1"+person.phoneNumber,
                body: 'You owe $'+ person.payment,
                accountSid: accountSID,
                authToken: authToken
            }).then(message => process.stdout.write(message.sid)).catch(err => console.log(err));
        });
    };

    addPerson = async () => {
        const path = "/user/object/" + this.state.phoneNumber;
        try {
            const apiResponse = await API.get("userCRUD", path);
            if(apiResponse.phoneNumber == this.state.phoneNumber) {
                this.state.contacts.map(person => {
                    if (person.phoneNumber  == this.state.phoneNumber){
                        return "";
                    }
                });
            }
            let a = this.state.contacts;
            a.push({
                phoneNumber: this.state.phoneNumber,
                firstName: (apiResponse.firstName ? apiResponse.firstName : ""),
                lastName: (apiResponse.lastName ? apiResponse.lastName : ""),
                payment: 0
            });
            this.setState({contacts: a, count: this.state.count + 1});
            console.log("response from getting note: " + apiResponse);
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <Drawer
                type="static"
                content={<SideBar prev={'Tabs'} navigation={this.props.navigation} />}
                tapToClose={true}
                openDrawerOffset={Dimensions.get('window').width - 150}
                styles={drawerStyles}
                tweenHandler={Drawer.tweenPresets.parallax}
                ref={(ref) => this._drawer = ref}
            >
                <View style={styles.container}>
                    <Card containerStyle={styles.cardContainer}>
                        <View style={styles.headerContainer}>
                            <View style={styles.headerColumn}>
                                <Text><Icon name="ios-menu" style={{ color: 'black', fontWeight: 'bold' }} onPress={() => this._drawer.open()} /></Text>
                                <Text style={styles.userNameText}>Hello World!</Text>
                            </View>
                        </View>
                        <Card>
                            <View>
                                <Text>Total Amount = {this.state.total ? this.state.total : <TextInput style={styles.input} placeholder='Total' />}</Text>
                                <TouchableOpacity style={styles.btn} onPress={this.splitEven}><Text>Split Evenly</Text></TouchableOpacity>
                            </View>
                        </Card>
                        <Card>
                            <View>
                                <Text>Party</Text>
                                {this.state.contacts.map(person => <Text>{person.firstName} ... ${person.payment}</Text>)}
                                <TextInput
                                    style={styles.input}
                                    placeholder='Phone Number'
                                    onChangeText={this.onPhoneChange}
                                    underlineColorAndroid='transparent'
                                />
                                <TouchableOpacity onPress={this.addPerson} style={styles.btn}><Text>Add Contact</Text></TouchableOpacity>
                            </View>
                        </Card>
                        <View><TouchableOpacity style={styles.btn} onPress={this.textEveryone}><Text>Text Everyone!</Text></TouchableOpacity></View>
                    </Card>
                </View>
            </Drawer>
        )
    }
};

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
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#16a085',
        padding: 10,
        alignItems: 'center',
    },
    input: {
        alignSelf: 'stretch',
        padding: 16,
        backgroundColor: '#3498db',
        marginBottom: 20
    },
});

const drawerStyles = {
    drawer: { backgroundColor: '#000000'},
};


export default Tabs