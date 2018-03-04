import React, { Component } from 'react';
import { Button, Platform, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { Actions } from 'react-native-router-flux';



class MapScreen extends React.Component {
	state = {
		latitude: '', latitudeRef: '', longitude: '', longitudeRef: '',
		location: null, errorMessage: null,
		userLatitude:'', userLongitude:'',
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
		let text = 'Waiting..';
		if (this.state.errorMessage) {
			text = this.state.errorMessage;
		} else if (this.state.location) {
			text = JSON.stringify(this.state.location);
		}
		return (
			<View>
			<Text>
	 		  Photo was taken at {this.props.latitude} {this.props.longitude} {this.props.latitudeRef} {this.props.longitudeRef}
	 		</Text>
			<Text style={styles.paragraph}>{text}</Text>
			<TouchableOpacity onPress={() => {
			   	   Actions.showmap({
			   	   	destinationLat: this.props.latitude,
			   	   	destinationLong: this.props.longitude,
			   	   	userLat: parseFloat(this.userLatitude),
			   	   	userLong: parseFloat(this.userLongitude),
			   	   });
			   }
			}>   
			  <Text style={styles.buttonText}>Go to map </Text>
			</TouchableOpacity>
			</View>
		);
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied, turn on location services',
			});
		}

		let location = await Location.getCurrentPositionAsync({});
		var3 = JSON.stringify(location);
		// console.log(var3);
		var4 = var3.split(",");
		// console.log(var4);
		for (let i = 0; i < var4.length; i++) {
			if (var4[i].includes('latitude')){
				this.userLatitude = var4[i];
				// console.log(this.userLatitude);
				this.userLatitude = this.userLatitude.split(":");
				this.userLatitude = this.userLatitude[1];
				// console.log(this.userLatitude);
			}
			if (var4[i].includes('longitude')){
				this.userLongitude = var4[i];
				// console.log(this.userLongitude);
				this.userLongitude = this.userLongitude.split(":");
				this.userLongitude = this.userLongitude[1];
				// console.log(this.userLongitude);
			}
		}
			
		this.setState({ location });
		// console.log(location);

		
	};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  buttonText: {
  	marginLeft: 20,
  	fontSize: 20,
  	textAlign: 'center',
  }
});

export default MapScreen;