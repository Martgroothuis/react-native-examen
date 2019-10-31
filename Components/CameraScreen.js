import React, {Component} from "react";
import { StyleSheet, TouchableOpacity, View} from "react-native";
import {RNCamera} from "react-native-camera";

var RNFS = require('react-native-fs');

class CameraScreen extends Component {

    static navigationOptions = {
        title: 'Maak foto',
    };

    constructor(props) {
        super(props);
        this.state = {uri: ''};
        // takePicture = takePicture.bind(this);
    }

    render() {
        return (
            <View style={styles.containerCamera}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({barcodes}) => {
                        console.log(barcodes);
                    }}
                />
                <View style={styles.captureContainer}>
                    <View style={[styles.capture, styles.captureOutside]}>
                        <TouchableOpacity onPress={this.takePicture.bind(this)} style={[styles.capture, styles.captureInner]}>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }


    takePicture = async function () {
        that = this;
        if (this.camera) {
            const options = {quality: 1, base64: true, fixOrientation: true};
            const data = await this.camera.takePictureAsync(options);
            if (data) {

                var ts = new Date().getTime();
                var directory = RNFS.ExternalDirectoryPath + '/pictures';
                var imgPath = RNFS.ExternalDirectoryPath + `/pictures/${ts}.jpg`;
                // console.log(RNFS.ExternalDirectoryPath + `/pictures/${ts}.jpg`);

                RNFS.mkdir(directory.toString()).then(console.log(directory));
                RNFS.writeFile(imgPath, data.base64, 'base64')
                    .then((result) => {
                        console.log(imgPath);
                        this.props.navigation.navigate('Image', {
                            imgPath: imgPath,
                        });

                    })
                    .catch((err) => {
                        console.log(err.message);
                    });

            }
        }
    };

}

const styles = require('./styles/styles');

export default CameraScreen;