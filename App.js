import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ImagePicker } from 'expo';
import { Router, Scene} from 'react-native-router-flux';

import Home from './Home';
import MapScreen from './MapScreen';


class App extends React.Component {
	render() {
		return (
			<Router>
			  <Scene key = 'root'>
			    <Scene key='home' component={Home} title='Home'/>
			    <Scene key='mapscreen' component={MapScreen} title='Photo Location'/>
			    </Scene>
			</Router>
		);
		
	}
}

export default App;