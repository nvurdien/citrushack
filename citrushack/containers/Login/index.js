import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import Amplify, { API } from 'aws-amplify';
import aws_exports from '../../aws-exports';
import Logo from './OMI_Logo_small.png';
Amplify.configure(aws_exports);

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            signInPassword : "",
            signInPhone: "",
            signInfirstName: "",
            signInlastName: "",
            phase: "login"
        }
    }

    onPhoneChange = (event) => {
        this.setState({signInPhone: event})
    };

    onPasswordChange = (event) => {
        this.setState({signInPassword: event})
    };

    onfirstNameChange = (event) => {
        this.setState({signInfirstName: event})
    };

    onlastNameChange = (event) => {
        this.setState({signInlastName: event})
    };

    onLoginClick = () => {
        this.setState({phase: 'login'})
    };

    onRegisterClick = () => {
        this.setState({phase: 'register'})
    };

    onSubmitSignIn = async () => {
        const path = "/user/object/" + this.state.signInPhone;
        try {
            const apiResponse = await API.get("userCRUD", path);
            if(apiResponse.password === this.state.signInPassword) {
                this.props.signInfirstName = this.state.signInfirstName;
                this.props.signInlastName = this.state.signInlastName;
                this.props.signInPhone = this.state.signInPhone;
                this.props.navigation.navigate('Camera', {props: this.props});
            }
            console.log("response from getting note: " + apiResponse);
        } catch (e) {
            console.log(e);
        }
        this.props.navigation.navigate('Camera', {props: this.props});

    };

    onSubmitRegister = async () => {
        let newAccount = {
            body: {
                "phoneNumber": this.state.signInPhone,
                "firstName": this.state.signInfirstName,
                "lastName": this.state.signInlastName,
                "password": this.state.signInPassword
            }
        };
        const path = "/user";

        // Use the API module to save the note to the database
        try {
            const apiResponse = await API.put("userCRUD", path, newAccount);
            console.log("response from saving note: " + apiResponse);
            this.props.navigation.navigate('Camera')
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
                <View style={styles.container}>
                    <Image source={Logo}/>

                    {this.state.phase === 'register' ? <TextInput style={styles.input}
                                                                  placeholder='First Name'
                                                                  onChangeText={this.onfirstNameChange}
                                                                  underlineColorAndroid='transparent'
                    /> : <Text/>
                    }

                    {this.state.phase === 'register' ? <TextInput style={styles.input}
                                                                  placeholder='Last Name'
                                                                  onChangeText={this.onlastNameChange}
                                                                  underlineColorAndroid='transparent'
                    /> : <Text/>
                    }

                    <TextInput
                        style={styles.input}
                        placeholder='Phone Number'
                        onChangeText={this.onPhoneChange}
                        underlineColorAndroid='transparent'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={this.onPasswordChange}
                        underlineColorAndroid='transparent'
                    />
                    { this.state.phase === 'login' ?
                    <TouchableOpacity style={styles.btn} onPress={this.onSubmitSignIn}>
                        <Text style={{color: 'white'}}>
                             Log-in
                        </Text>
                    </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.btn} onPress={this.onSubmitRegister}>
                            <Text style={{color: 'white'}}>
                                Register
                        </Text>
                    </TouchableOpacity>
                    }
                    {this.state.phase === 'login' ?
                        <TouchableOpacity
                            style={styles.link}
                            onPress={this.onRegisterClick}
                        ><Text style={{color: 'white'}}>Register?</Text></TouchableOpacity> :
                        <TouchableOpacity
                            style={styles.link}
                            onPress={this.onLoginClick}
                        ><Text style={{color:'white'}}>Login?</Text></TouchableOpacity>
                    }

                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0e6dbd",
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },
    input: {
        alignSelf: 'stretch',
        padding: 16,
        backgroundColor: '#3498db',
        marginBottom: 20
    },
    title: {
        alignSelf: 'stretch',
        color: 'white',
        fontSize: 40,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    wrapper: {
        flex: 1
    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#16a085',
        padding: 20,
        alignItems: 'center',
    },
    link: {
        marginTop: 10
    }
});