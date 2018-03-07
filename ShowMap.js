import React from 'React';
import { Button, View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCKenM6-N6-ZD6K-O5wi3Qgt62eV1R_ils';
// const origin = {latitude: this.props.userLat, longitude: this.props.userLong};
// const destination = {latitude: this.props.destinationLat, longitude: this.props.destinationLong};
const LAT_DELTA = 0.01;
const LONG_DELTA = 0.01;



class ShowMap extends React.Component {
	constructor(props){
		super(props)

	this.state = {
		// latitude: '', latitudeRef: '', longitude: '', longitudeRef: '',
		destinationLat: '',
		destinationLong: '',
		// userLat: '',
		// userLong: '',
		origin: '',
		// destination:'',

		initialPosition: {
			latitude: 0,
			longitude: 0,
			latitudeDelta: 0,
			longitudeDelta: 0,
		},

		markerPosition: {
			latitude: 0,
			longitude: 0,
			latitudeDelta: 0,
			longitudeDelta: 0,
		},

		destinationPosition: {
			destLat: 0,
		    destLong: 0,
		},

		// origin: [50.0, -8.0],
		// destination: [this.props.destinationLat, this.props.destinationLong],

		// origin = {latitude: this.props.userLat, longitude: this.props.userLong};
		// destination = {latitude: this.props.destinationLat, longitude: this.props.destinationLong};

	}
}

	watchID: ?number = null;

	// const LAT_DELTA = 0.01;
	// const LONG_DELTA = 0.01;


	componentDidMount() {

		

		navigator.geolocation.getCurrentPosition((position) => {
			var lat = parseFloat(position.coords.latitude)
			var long = parseFloat(position.coords.longitude)
			// console.log(lat + " " + long)

		var initialRegion = {
			latitude: lat,
			longitude: long,
			latitudeDelta: LAT_DELTA,
			longitudeDelta: LONG_DELTA,
			// latitudeDelta: 0.01,
			// longitudeDelta: 0.01,
		}

		this.setState({initialPosition:initialRegion})
		this.setState({markerPosition:initialRegion})
		// console.log(this.state.initialPosition)

		},

		(error) => alert(JSON.stringify(error)),
		{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

		this.watchID = navigator.geolocation.watchPosition((position) => {
			var lat = parseFloat(position.coords.latitude)
			var long = parseFloat(position.coords.longitude)
			// console.log(lat + " " + long)

			var lastRegion = {
				latitude: lat,
				longitude: long,
				latitudeDelta: LAT_DELTA,
				longitudeDelta: LONG_DELTA,
				// latitudeDelta: 0.01,
				// longitudeDelta: 0.01,
			}

			this.setState({initialPosition:lastRegion})
			this.setState({markerPosition:lastRegion})
		})

	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID)
	}

	render() {
		return (
			

	    <View style={styles.container}>
	        <MapView style={styles.map}
	                 region={this.state.initialPosition}>
	                 <MapView.Marker
	                    coordinate={this.state.markerPosition}
	                     title={'Your location'}>
	                     <View style={styles.radius}>
	                     <View style={styles.marker}>
	                     </View>
	                     </View>
	                     </MapView.Marker>

	                  <MapView.Marker
		   coordinate={{
		   	latitude: this.props.destinationLat,
		   	longitude: this.props.destinationLong,
		   }}
		   	
		

		   title={'Photo was taken here'}
		   
		   ></MapView.Marker>
		   
		   <MapViewDirections
		   origin={this.state.initialPosition}
		   destination={{
		   	latitude: this.props.destinationLat,
		   	longitude: this.props.destinationLong,
		   }}
		   apikey={GOOGLE_MAPS_APIKEY}
		   strokeWidth={5}
		   strokeColor="hotpink"
		   />
	        </MapView>

	        

	    </View>    

		
		);
	}


}

const styles = StyleSheet.create({

	radius: {
		height: 50,
		width: 50,
		borderRadius: 50/2,
		overflow: 'hidden',
		backgroundColor: 'rgba(0, 122, 255, 0.1)',
		borderWidth: 1,
		borderColor: 'rgba(0, 122, 255, 0.3)',
		alignItems: 'center',
		justifyContent: 'center',
	},

	marker: {
		height: 20,
		width: 20,
		borderRadius: 20/2,
		overflow: 'hidden',
		backgroundColor: '#007AFF',
		borderWidth: 3,
		borderColor: 'white',
		// alignItems: 'center',
		// justifyContent: 'center',
	},

	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},

	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});

export default ShowMap;