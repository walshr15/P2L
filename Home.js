import React from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import { ImagePicker } from 'expo';

import { Actions } from 'react-native-router-flux';

class Home extends React.Component {
	state = {
         image: null,
    };

    render() {
    	var { image } = this.state;

    	return (
    		<View style={styles.background}>
    		    <Image style={styles.image}
    		          source={require('./p2l.png')} />
    		    <Text> </Text>
    		    <Text> </Text>

    		    <Button style={styles.button}
    		        title="Pick an image from camera roll"
    		        onPress={this._pickImage}
    		    />
    		    {image &&
    		    	<Image source={{ uri: image }} style={{ width: 150, height: 150 }} />}
    		</View>

    	);
    }

    findCoordinates = (meta) =>{
    	var exif = meta;
    	// console.log(exif);

    	this.contains(exif);

    }

    contains = (arr) =>{
    	// console.log(arr);
    	lat = arr["GPSLatitude"];
    	latRef = arr["GPSLatitudeRef"];
    	long = arr["GPSLongitude"];
    	longRef = arr["GPSLongitudeRef"];
    	if (lat==null){
    		// console.log('No GPS tag found');
    		Alert.alert('Photo Selection Invalid', 'No GPS info attached to photo.');
    		}else{
    			if (long==null){
    				// console.log('No GPS tag found');
    				Alert.alert('Photo Selection Invalid', 'No GPS tag attached.');
    			}
    		else{
    			if (latRef == "S" && lat>=0){
    				lat *= -1;
    			}

    			if (longRef == "W" && long>=0){
    				long *= -1;
    			}

    			// console.log(lat + ' ' + long);
    			Actions.mapscreen({ latitude: lat, longitude:long, });
    		}
    	}
    }


    _pickImage = async () => {
    	let result = await ImagePicker.launchImageLibraryAsync({
    		// allowsEditing: true,
    		aspect: [4, 3],
    		exif: true,
    	});

    	if (!result.cancelled) {
    		this.setState({ image: result.uri});
    		this.findCoordinates(result.exif);
    	}

    };

}


var styles = StyleSheet.create({
  // select: {
  //   backgroundColor: '#fff',
  //   marginTop:30,
  //   fontSize:20,
  //   textAlign: 'center',
  //   //*justifyContent: 'center',
  // },

  background: {
  	backgroundColor: "white",
  	flex: 1, 
  	alignItems: 'center', 
  	justifyContent: 'center', 
  },

  button: {
  	// backgroundColor: "white",
  	// color: "blue"
  	backgroundColor: '#99AAFF',
  	borderRadius: 5,
  	borderWidth: 1,
  	borderColor: '#000033',
  },

  image: {
  	flex: 0,
  	// width: ,
  	// height: ,
  	resizeMode: 'contain',
  },

});




export default Home;