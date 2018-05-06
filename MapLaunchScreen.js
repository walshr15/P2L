import React, { Component } from 'react';
import { Button, Dimensions, Platform, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { Actions } from 'react-native-router-flux';
import getDirections from 'react-native-google-maps-directions';

const DEVICE_DIMENSIONS = Dimensions.get('window');

class MapLaunchScreen extends React.Component {
	constructor(props){
		super(props);
		state = {
			destLatitude: '', destLongitude: '',
			userLatitude:'', userLongitude:'',
		}
	}

	handleGetDirections = () => {
    const data = {
       source: {
        latitude: this.state.userLatitude,
        longitude: this.state.userLongitude,
      },
      destination: {
        latitude: this.props.destLatitude,
        longitude: this.props.destLongitude,
      },
      params: [
        {
          key: "dirflg",
          value: "w"
        }
      ]
    }

    getDirections(data)
  }

  componentWillMount() {
		// if (Platform.OS === 'android' && !Constants.isDevice) {
		// 	this.setState({
		// 		errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
		// 	});
		// } else {
			this._getLocationAsync();
		// }
	}


	render() {

		if (DEVICE_DIMENSIONS.height < 600 && DEVICE_DIMENSIONS.width < 340) {
			return(
				<View style={styles.container}>
				   <Image style={styles.image}
				         source={require('./assets/images/p2lsmaller.png')} />
				   <Text> </Text>	     
				   <Text style={{fontSize: 8, margin: 8}}>
				     Photo was taken at ({this.props.destLatitude}, {this.props.destLongitude}).
				     Make sure that you have an active internet connection and to turn on location services for directions!
				   </Text>
				   <Text> </Text>
				   <Button onPress={this.handleGetDirections} title="Open Map" />
    		   </View>
    		);
		}

		return(
		   <View style={styles.container}>
		       <Image style={styles.image}
    		      source={require('./assets/images/p2lsmaller.png')} />
    		   <Text> </Text>	
    		   <Text> </Text>     
    		   <Text style={{margin: 8}}>
    		     Photo was taken at ({this.props.destLatitude}, {this.props.destLongitude}).
    		     Make sure that you have an active internet connection and to turn on location services for directions!
    		   </Text>
    		   <Text> </Text> 
    		   <Button onPress={this.handleGetDirections} title="Open Map" />
    		</View>
    	);

	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied, turn on location services and allow P2L permission to use it.',
			});
		}

		let location = await Location.getCurrentPositionAsync({});
		this.setState({ userLatitude: location.coords.latitude});		
		this.setState({ userLongitude: location.coords.longitude});	

		
	};

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
  },

  image: {
  	flex: 0,
  	resizeMode: 'contain',
  },

});

export default MapLaunchScreen;