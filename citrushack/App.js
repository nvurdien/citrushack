import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    AsyncStorage,
    TouchableOpacity,
    View,
    KeyboardAvoidingView
} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Login from "./containers/Login";
import CameraComponent from "./containers/camera";
import Profile from './containers/Profile';
import Tabs from './containers/Tabs';
import Sidebar from "./components/SideBar";


const Application = DrawerNavigator({
    Login: { screen: DrawerNavigator(
            {
                Login: { screen: Login},
                Camera: {
                    screen: DrawerNavigator(
                        {
                            Logout: { screen: Login},
                            Camera: {
                                screen: CameraComponent,
                            },
                            Profile: { screen: Profile},
                            Tabs: { screen: Tabs},
                            SideBar: {screen: Sidebar}
                        },
                        {
                            initialRouteName: 'Camera',
                        }
                    ),
                },
                Profile: {
                    screen: DrawerNavigator(
                        {
                            Logout: { screen: Login},
                            Camera: {
                                screen: CameraComponent,
                            },
                            Profile: { screen: Profile},
                            Tabs: { screen: Tabs},
                            SideBar: {screen: Sidebar}
                        },
                        {
                            initialRouteName: 'Profile',
                        }
                    )},
                Tabs: {
                    screen: DrawerNavigator(
                        {
                            Logout: { screen: Login},
                            Camera: {
                                screen: CameraComponent,
                            },
                            Profile: { screen: Profile},
                            Tabs: { screen: Tabs},
                            SideBar: {screen: Sidebar}
                        },
                        {
                            initialRouteName: 'Tabs',
                        }
                    )}
            },
            {
                initialRouteName: 'Login',
            }
         )},

    },
    {
        navigationOptions: {
            header: false,
        }
    }
);

const initialState = {
    isSignedIn: false,
    user: {
        signInPhone: "",
        signInfirstName: "",
        signInlastName: "",
        phase: "login"
    }
};

export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = initialState
    }



    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {

        let value = await AsyncStorage.getItem('user');
        if (value !== null){
            this.props.navigation.navigate('Camera');
        }
    };

    render() {
        return(
            <Application />
        );
    }
}

AppRegistry.registerComponent('Application', () => Application);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});