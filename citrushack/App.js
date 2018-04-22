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
import { StackNavigator } from 'react-navigation';
import Splash from './containers/Splash'
import Login from "./components/Login";
// import BadInstagramCloneApp from './containers/camera';


const Application = StackNavigator({
    Home: { screen: Login }
    },
    {
        navigationOptions: {
            header: false,
        }
    }
);

const initialState = {
    input: '',
    imageURL: '',
    box: [],
    route: 'start',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
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
            this.props.navigation.navigate('Profile');
        }
    };

    render() {
        return(
            <Application />
        );
    }
}


// export default class App extends React.Component {
//
//     constructor(){
//         super();
//         this.state = initialState
//     }
//
//     loadUser = (data) => {
//         console.log(data);
//         this.setState({user: {
//                 id: data.id,
//                 name: data.name,
//                 email: data.email,
//                 entries: data.entries
//             }
//         })
//     };
//
//     onRouteChange = (newRoute) => {
//         if(newRoute === 'signout'){
//             this.setState(initialState)
//         }else if(newRoute === 'home'){
//             this.setState({isSignedIn: true})
//         }
//         this.setState({
//             route: newRoute
//         })
//     };
//
//     onInputChange = (event) => {
//         this.setState({
//             input: event.target.value,
//         })
//     };
//
//     render() {
//         const { route } = this.state;
//         return (
//             <View style={styles.container}>
//                 {/*{ route === 'start'*/}
//                     {/*? <Index onRouteChange={this.onRouteChange}/>*/}
//                     {/*: ( route === 'signin'*/}
//                         {/*? <Index/>*/}
//                         {/*: <Index/>) }*/}
//                         <Login/>
//             </View>
//         )
//     }
// }

AppRegistry.registerComponent('App', () => App);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {

    }
});