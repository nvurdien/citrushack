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
import 'aws-sdk';
import * as AWS from "aws-sdk";

AWS.config.update({
    region:'us-east-1'
});

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:b66fdc9b-bf70-4a84-bfc4-45aa94384960",
    AccessKeyId: 'AKIAIG7XIOTEYC3O7FIA',
    SecretKey: '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'
});

let docClient = new AWS.DynamoDB.DocumentClient();

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            signInPhone: '',
            signInPassword: '',
            signInName: '',
            phase: 'login',
        }
    }

    onPhoneChange = (event) => {
        this.setState({signInPhone: event})
    };

    onPasswordChange = (event) => {
        this.setState({signInPassword: event})
    };

    onNameChange = (event) => {
        this.setState({signInName: event})
    };

    onLoginClick = (event) => {
        this.setState({phase: 'login'})
    };

    onRegisterClick = (event) => {
        this.setState({phase: 'register'})
    };

    onSubmitSignIn = () => {
        // fetch(`${deploy}/signin`, {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: this.state.signInPhone,
        //         password: this.state.signInPassword,
        //     })
        // })
        //     .then(response => response.json())
        //     .then(user => {
        //         if(user.id){
        //             this.props.loadUser(user);
        //             this.props.onRouteChange('home')
        //         }
        //     });

        let params = {
            TableName : "reactApp",
            ProjectionExpression:"phoneNumber",
            KeyConditionExpression: "phoneNumber = :yyyy",
            ExpressionAttributeValues: {
                ":yyyy":this.state.signInPhone,
            }
        };

        docClient.query(params, function(err, data) {
            if (err) {
                console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                data.Items.forEach(function(item) {
                    console.log(item.firstName + " " + item.lastName);
                });
            }
        });

    };

    onSubmitRegister = () => {

    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.title}>CitrusHack</Text>

                    {this.state.phase === 'register' ? <TextInput style={styles.input}
                                                                  placeholder='Name'
                                                                  onChangeText={this.onNameChange}
                                                                  underlineColorAndroid='transparent'
                    /> : ""
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
                        onChangeText={this.onPasswordChange}
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
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2980b9",
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