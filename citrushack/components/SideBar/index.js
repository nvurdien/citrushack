import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

class Sidebar extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.margin}>
                    <Text style={styles.text} onPress={() => this.props.navigation.navigate('Camera')}>
                        Camera
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.margin}>
                    <Text style={styles.text} onPress={() => this.props.navigation.navigate('Tabs')}>
                        Tabs
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.margin}>
                    <Text style={styles.text} onPress={() => this.props.navigation.navigate('Profile')}>
                        Settings
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.margin}>
                    <Text style={styles.text} onPress={() => this.props.navigation.navigate('Login')}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
};

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100
    },
    margins: {
        marginTop: 10
    },
    text: {
        color: 'white',
        fontSize: 20,
    }
};

export default Sidebar