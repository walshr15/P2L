import React from 'React';
import { Button, View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCKenM6-N6-ZD6K-O5wi3Qgt62eV1R_ils';
// const origin = {latitude: this.props.userLat, longitude: this.props.userLong};
// const destination = {latitude: this.props.destinationLat, longitude: this.props.destinationLong};



class ShowMap extends React.Component {
	state = {
		// latitude: '', latitudeRef: '', longitude: '', longitudeRef: '',
		destinationLat: '',
		destinationLong: '',
		userLat: '',
		userLong: '',
		origin: '',
		destination:'',
		// origin: [this.props.userLat, this.props.userLong],
		// destination: [this.props.destinationLat, this.props.destinationLong],

		// origin: [50.0, -8.0],
		// destination: [this.props.destinationLat, this.props.destinationLong],

		// origin = {latitude: this.props.userLat, longitude: this.props.userLong};
		// destination = {latitude: this.props.destinationLat, longitude: this.props.destinationLong};

	}

	componentWillMount() {
		this.props.origin = {latitude: this.props.userLat, longitude: this.props.userLong};
		this.props.destination = {latitude: this.props.destinationLat, longitude: this.props.destinationLong};
	}

	render() {
		return (
			<MapView style={styles.map}
			  initialRegion={{
			  	latitude: this.props.userLat,
			  	longitude: this.props.userLong,
			  	latitudeDelta: 0.01,
			  	longitudeDelta: 0.01,
			  }
			}
		>

		<MapView.Marker
		   coordinate={{
		   	latitude: this.props.userLat,
		   	longitude: this.props.userLong,
		   	// latitude: 52.5,
		   	// longitude: -7.0,
		   }}

		   title={'You are here'}
		   description={this.props.userLat + ' ' + this.props.userLong}
		   />

		   <MapView.Marker
		   coordinate={{
		   	latitude: this.props.destinationLat,
		   	longitude: this.props.destinationLong,
		   }}

		   title={'Photo was taken here'}
		   description={this.props.userLat + ' ' + this.props.userLong}
		   />

		   <MapViewDirections
		   origin={this.props.origin}
		   destination={this.props.destination}
		   apikey={GOOGLE_MAPS_APIKEY}
		   strokeWidth={3}
		   strokeColor="hotpink"
		   />

		</MapView> 
		
		);
	}


}

const styles = StyleSheet.create({

	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	}
});

export default ShowMap;