import React, { Component } from 'react';
import {Text, View, StyleSheet} from "react-native";

const Index = ({onRouteChange}) => {
    return (
        <View onPress={ () => onRouteChange('signin') } style={styles.container}>
            <View>
                <Text style={styles.title}>Hi!</Text>
            </View>
            <View>
                <Text style={styles.subtitle}>Yes</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitle: {
        color: 'white',
        fontWeight: 'normal'
    },
    container: {
        backgroundColor: "blue",
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    }
});

export default Index;