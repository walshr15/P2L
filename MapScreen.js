import React, { Component } from 'react';
import { Button, Platform, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { Actions } from 'react-native-router-flux';
import getDirections from 'react-native-google-maps-directions';



class MapScreen extends React.Component {
	state = {
		latitude: '', latitudeRef: '', longitude: '', longitudeRef: '',
		userLatitude:'', userLongitude:'',
	}

	handleGetDirections = () => {
    const data = {
       source: {
        latitude: this.props.userLatitude,
        longitude: this.props.userLongitude,
      },
      destination: {
        latitude: this.props.latitude,
        longitude: this.props.longitude,
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
			// console.log(this.props.longitudeRef);
			// if (this.props.longitudeRef == "W") {
			// 	console.log(this.props.longitude);
			// 	this.props.longitude *= -1;
			// 	console.log(this.props.longitude);
			// }
			this._getLocationAsync();
		// }
	}


	render() {
		// console.log(this.props.latitude);
		// console.log(this.props.longitude);
		return(
		<View style={styles.container}>
		<Text>
	 		  Photo was taken at {this.props.latitude} {this.props.longitude}.
	 		   Make sure to turn on location services for directions!
	 	</Text>
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
		// console.log(location);
		this.props.userLatitude = location.coords.latitude;
		this.props.userLongitude = location.coords.longitude;


		// console.log(location);
		// console.log(location.coords.latitude);
		// console.log(location.coords.longitude);
		// var3 = JSON.stringify(location);
		// // console.log(var3);
		// var4 = var3.split(",");
		// // console.log(var4);
		// for (let i = 0; i < var4.length; i++) {
		// 	if (var4[i].includes('latitude')){
		// 		this.userLatitude = var4[i];
		// 		// console.log(this.userLatitude);
		// 		this.userLatitude = this.userLatitude.split(":");
		// 		this.userLatitude = this.userLatitude[1];
		// 		// console.log(this.userLatitude);
		// 	}
		// 	if (var4[i].includes('longitude')){
		// 		this.userLongitude = var4[i];
		// 		// console.log(this.userLongitude);
		// 		this.userLongitude = this.userLongitude.split(":");
		// 		this.userLongitude = this.userLongitude[1];
		// 		// console.log(this.userLongitude);
		// 	}
		// }
			
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