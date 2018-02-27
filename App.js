import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ImagePicker } from 'expo';


import Home from './Home';

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
			    </Scene>
			</Router>
		);
		
	}
}

export default App;