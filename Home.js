import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { ImagePicker } from 'expo';


export default class App extends React.Component {
	state = {
         image: null,
    };

    render() {
    	let { image } = this.state;

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

    _pickImage = async () => {
    	let result = await ImagePicker.launchImageLibraryAsync({
    		// allowsEditing: true,
    		// aspect: [4, 3],
    		exif: true,
    	});

    	console.log(result.exif);

    	if (!result.cancelled) {
    		this.setState({ image: result.uri });
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