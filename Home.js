import React from 'react';
import { Alert, Dimensions, Button, Image, StyleSheet, Text, View } from 'react-native';
import { Asset, AppLoading, ImagePicker, Permissions } from 'expo';
import { Actions } from 'react-native-router-flux';

const DEVICE_DIMENSIONS = Dimensions.get('window');

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userImage: null,
            isReady: false,
        };
    }

    render() {
    	var { userImage } = this.state;
    	
    	if (!this.state.isReady) {
    		return (
    			<AppLoading
    			startAsync={this._cacheResourcesAsync}
    			onFinish={() => this.setState({ isReady: true })}
    			onError={console.warn}
    			/>
    		);
    	}

    	if (DEVICE_DIMENSIONS.height < 600 && DEVICE_DIMENSIONS.width < 340) {
    		return (
    		   <View style={styles.background}>
    			    <Image style={styles.image}
    		          source={require('./assets/images/p2lhome.png')} />

    		    <Button style={styles.button}
    		        title="Pick an image from camera roll"
    		        onPress={this._pickImage}
    		    />
    		    {userImage &&
    		    	<Image source={{ uri: userImage }} style={{ width: 150, height: 150 }} />}
    		  </View>
    		);
    		    
    	}




    	return (
    		<View style={styles.container}>
    		    <Image style={styles.image}
    		          source={require('./assets/images/p2lhome.png')} />
    		    <Text> </Text>
    		    <Text> </Text>

    		    <Button style={styles.button}
    		        title="Pick an image from camera roll"
    		        onPress={this._pickImage}
    		    />
    		    {userImage &&
    		    	<Image source={{ uri: userImage }} style={{ width: 150, height: 150 }} />}
    		</View>

    	);
    }

    async _cacheResourcesAsync() {
    	const images = [
    	   require('./assets/images/p2lhome.png'),
    	   require('./assets/images/p2lsmaller.png'),
    	];

    	const cacheImages = images.map((image) => {
    		return Asset.fromModule(image).downloadAsync();
    	});
    	return Promise.all(cacheImages)
    }


    findCoordinates = (arr) =>{
        // console.log(arr);

    	lat = arr["GPSLatitude"];
        console.log(lat);
    	latRef = arr["GPSLatitudeRef"];
    	long = arr["GPSLongitude"];
    	longRef = arr["GPSLongitudeRef"];
    	if (lat==null){
    		Alert.alert('Photo Selection Invalid', 'No GPS info attached to photo.');
    		}else{
    			if (long==null){
    				Alert.alert('Photo Selection Invalid', 'No GPS info attached to photo.');
    			}
    		else{
    			if (latRef == "S" && lat>=0){
    				lat *= -1;
    			}

    			if (longRef == "W" && long>=0){
    				long *= -1;
    			}

    			Actions.maplaunchscreen({ destLatitude: lat, destLongitude:long, });
    		}
    	}
    }


    _pickImage = async () => {
        
    	let result = await ImagePicker.launchImageLibraryAsync({
    		exif: true,
    	});

    	if (!result.cancelled) {
    		this.setState({ userImage: result.uri });
    		this.findCoordinates(result.exif);
    	}

    };

}


var styles = StyleSheet.create({

  container: {
  	backgroundColor: "white",
  	flex: 1, 
  	alignItems: 'center', 
  	justifyContent: 'center', 
  },

  button: {
  	backgroundColor: '#99AAFF',
  	borderRadius: 5,
  	borderWidth: 1,
  	borderColor: '#000033',
  	fontSize: 14,
  },

  image: {
  	width: 225,
  	height: 200,
  	flex: 0,
  	resizeMode: 'contain',
  }

});




export default Home;