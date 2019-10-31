import {View, Image, StyleSheet,} from "react-native";
import React, {Component} from "react";

import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Form,
    Item,
    Input
} from 'native-base';

class ImageScreen extends Component {

    static navigationOptions = {
        title: 'Goede Foto?',
    };

    render() {
        const {navigation} = this.props;
        const imgPath = navigation.getParam('imgPath');
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{uri: 'file://' + imgPath}}
                />

                <Button full
                        onPress={() => this.props.navigation.navigate('Form', {imgPath: imgPath,})}>
                    <Text>Goede Foto?</Text>
                </Button>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    image: {
        flex: 1,
    },
});


export default ImageScreen;