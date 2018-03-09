import React, { Component } from 'react';
import { Button, Platform, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { Actions } from 'react-native-router-flux';
import { getDirections } from 'react-native-google-maps-directions';



class MapScreen extends React.Component {
	state = {
		latitude: '', longitude: '',
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
			this._getLocationAsync();
		// }
	}


	render() {
		// console.log(this.props.latitude);
		// console.log(this.props.longitude);
		return(
		<View style={styles.container}>
		    <Image style={styles.image}
    		      source={require('./p2lsmaller.png')} />
    		<Text> </Text>	
    		<Text> </Text>     
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
		this.props.userLatitude = location.coords.latitude;
		this.props.userLongitude = location.coords.longitude;		

		
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
  	// width: ,
  	// height: ,
  	resizeMode: 'contain',
  },

});

export default MapScreen;