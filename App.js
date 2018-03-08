import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ImagePicker } from 'expo';


import Home from './Home';
import MapScreen from './MapScreen';
// import ShowMap from './ShowMap';

import {
	Router,
	Scene,
} from 'react-native-router-flux';



class App extends React.Component {
	render() {
		return (
			<Router>
			  <Scene key = 'root'>
			    <Scene key='home' component={Home} title='Home'/>
			    <Scene key='mapscreen' component={MapScreen} title='MapScreen'/>
			    {/*<Scene key='showmap' component={ShowMap} title='ShowMap'/>*/}
			    </Scene>
			</Router>
		);
		
	}
}

export default App;