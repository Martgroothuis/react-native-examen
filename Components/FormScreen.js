import React from 'react';
import {StyleSheet, Image, PermissionsAndroid, Platform, Alert} from 'react-native';
import Mailer from 'react-native-mail';

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
    Input,
    Picker,
    Label,
    Textarea
} from 'native-base';
import store from "react-native-simple-store";


class FormScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentLatitude: 'unknown',//Initial Latitude
            currentLongitude: 'unknown',//Initial Longitude
            naam: '',
            omschrijving: '',
            url: '',
            selected: undefined
        };
    }

    static navigationOptions = {
        title: 'Email maken',
    };

    componentDidMount() {
        let that = this;

        async function requestLocationPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                        'title': 'Location Access Required',
                        'message': 'This App needs to Access your location'
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    that.callLocation(that);


                } else {
                    alert("Permission Denied");
                }
            } catch (err) {
                alert("err", err);
                console.warn(err)
            }
        }

        requestLocationPermission();
    }

    callLocation(that) {
        //alert("callLocation Called");
        navigator.geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                that.setState({currentLongitude: currentLongitude});
                //Setting state Longitude to re re-render the Longitude Text
                that.setState({currentLatitude: currentLatitude});
                //Setting state Latitude to re re-render the Longitude Text
                that.getStreet(that, currentLatitude, currentLongitude);
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true}
        );
        that.watchID = navigator.geolocation.watchPosition((position) => {
            //Will give you the location on location change
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            that.setState({currentLongitude: currentLongitude});
            //Setting state Longitude to re re-render the Longitude Text
            that.setState({currentLatitude: currentLatitude});
            //Setting state Latitude to re re-render the Longitude Text
            that.getStreet(that, currentLatitude, currentLongitude);

        });
    }

    componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID);
    };

    getStreet = (that, lat, long) => {

        fetch('http://www.mapquestapi.com/geocoding/v1/reverse?key=bOy5wNwV3EZs86DW9YGywMJAp0TbPQcF&location=' + lat + ',' + long + '&includeRoadMetadata=true&includeNearestIntersection=truej')
            .then((response) => response.json())
            .then((data) => {

                let usaStreet = data.results[0].locations[0].street;

                let street = usaStreet.split(' ').reverse().join(' ');


                that.setState({
                    isLoading: false,
                    street: street,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    };

    saveData = () => {
        const {navigation} = this.props;
        const imgPath = navigation.getParam('imgPath');
        // Alert.alert('dddd');
        const Array = {
            name: this.state.naam,
            street: this.state.street,
            currentLongitude: this.state.currentLongitude,
            currentLatitude: this.state.currentLatitude,
            selected: this.state.selected,
            omschrijving: this.state.omschrijving,
            imgPath: imgPath,
        };

        store.push('sendMails', Array);

    };

    onValueChange2(value: string) {
        this.setState({
            selected: value
        });
    }

    render() {
        const {navigation} = this.props;
        const imgPath = navigation.getParam('imgPath');
        return (
            <Container>
                <Content>
                    <Form>

                        {/*<Item>*/}
                        {/*<Input placeholder="Latitude" value={this.state.currentLatitude}/>*/}
                        {/*</Item>*/}
                        {/*<Item>*/}
                        {/*<Input placeholder="Longitude" value={this.state.currentLongitude}/>*/}
                        {/*</Item>*/}
                        <Item>
                            <Input placeholder="street" value={this.state.street}/>
                        </Item>
                        <Item Picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down"/>}
                                style={{width: undefined}}
                                placeholder="Soort Probleem"
                                placeholderStyle={{color: "#bfc6ea"}}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Picker.Item label="Maak Keuze" value=""/>
                                <Picker.Item label="Rommel" value="Rommel"/>
                                <Picker.Item label="Defect" value="Defect"/>
                                <Picker.Item label="Klimaat" value="Klimaat"/>
                                <Picker.Item label="Wifi" value="Wifi"/>
                                <Picker.Item label="Overig" value="Overig"/>
                            </Picker>
                        </Item>
                        <Item last>
                            <Input
                                onChangeText={(naam) => this.setState({naam})}
                                name="naam"
                                placeholder="Naam"/>
                        </Item>
                        <Textarea rowSpan={5} bordered
                                  onChangeText={(omschrijving) => this.setState({omschrijving})}
                                  name="omschrijving"
                                  placeholder="omschrijving"/>
                        <Image
                            source={{uri: 'file://' + imgPath}}
                            style={styles.imagePreview}
                        />
                        <Button full info style={styles.button}
                                onPress={this.handleEmail}>
                            <Text>Mail verzenden</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }

    handleEmail = () => {
        if (this.state.naam && this.state.omschrijving && this.state.selected) {

            this.saveData();

            const {navigation} = this.props;
            const imgPath = navigation.getParam('imgPath');
            Mailer.mail({
                subject: 'Probleem: ' + this.state.selected,
                recipients: ['dummymartdummy@gmail.com'],
                // ccRecipients: ['dummymartdummy@gmail.com'],
                // bccRecipients: ['dummymartdummy@gmail.com'],
                body:
                    'jouw naam: ' +
                    this.state.naam +
                    '\njouw straat: ' +
                    this.state.street +
                    '\njouw currentLongitude: ' +
                    this.state.currentLongitude +
                    '\njouw currentLatitude: ' +
                    this.state.currentLatitude +
                    '\nSoort probleem: ' +
                    this.state.selected +
                    '\njouw omschrijving: ' +
                    this.state.omschrijving,

                isHTML: true,
                attachment: {
                    path: imgPath,   // The absolute path of the file from which to read data.
                    type: 'jpg',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                    name: '',   // Optional: Custom filename for attachment
                }
            }, (error, event) => {
                Alert.alert(
                    error,
                    event,
                    [
                        {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
                        {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
                    ],
                    {cancelable: true}
                )
            });

        } else {
            Alert.alert('Error', 'Vul eerst alle velden in!');
        }
    }
}

const styles = require('./styles/styles');

export default FormScreen