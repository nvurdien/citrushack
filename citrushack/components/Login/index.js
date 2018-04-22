import React, { Component } from 'react';
import {StyleSheet, View, Image, Text, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            phase: 'login',
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event})
    };

    onPasswordChange = (event) => {
        this.setState({signInPassword: event})
    };

    onSubmitSignIn = () => {
        fetch(`${deploy}/signin`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword,
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home')
                }
            });
    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.title}>CitrusHack</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        onChangeText={this.onEmailChange}
                        underlineColorAndroid='transparent'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        onChangeText={this.onPasswordChange}
                    />

                    <TouchableOpacity style={styles.btn} onPress={this.onSubmitSignIn}>
                        <Text>
                            Log-in
                        </Text>
                    </TouchableOpacity>
                    {this.state.phase === 'login' ?  <Text>Register?</Text> : <Text></Text>}

                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "blue",
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },
    input: {
        alignSelf: 'stretch',
        padding: 16,
        backgroundColor: 'white',
        marginBottom: 20
    },
    title: {
        alignSelf: 'stretch',
        color: 'white',
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    wrapper: {
        flex: 1
    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: 'green',
        padding: 20,
        alignItems: 'center',
    }
});