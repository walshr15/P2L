import React from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import { ImagePicker } from 'expo';

import { Actions } from 'react-native-router-flux';

class Home extends React.Component {
	state = {
         image: null,
         // name:'',
    };

    render() {
    	var { image } = this.state;
    	var var1 = null;
    	var var2 = null;


    	return (
    		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    		    <Button
    		        title="Pick an image from camera roll"
    		        onPress={this._pickImage}
    		    />
    		    {image &&
    		    	<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
    	longRef = arr["GPSLongitudeRef"]
    	if (lat==null){
    		console.log('No GPS tag found');
    		alert('No GPS tag attached');
    		}else{
    			if (long==null){
    				console.log('No GPS tag found');
    				alert('No GPS tag attached');
    			}
    		else{
    			if (latRef == "S"){
    				lat *= -1;
    			}

    			if (longRef == "W"){
    				long *= -1;
    			}

    			// console.log(lat + ' ' + long);
    			Actions.mapscreen({ latitude: lat,  latitudeRef: latRef, longitude:long, longitudeRef: longRef,});
    		}
    	}
    }


    _pickImage = async () => {
    	let result = await ImagePicker.launchImageLibraryAsync({
    		allowsEditing: true,
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
  select: {
    backgroundColor: '#fff',
    marginTop:30,
    fontSize:20,
    textAlign: 'center',
    //*justifyContent: 'center',
  },

  background:{
  	backgroundColor: '#fff',
  },

});




export default Home;