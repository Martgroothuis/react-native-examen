import {PermissionsAndroid, View, TextInput, StyleSheet, Image, Alert} from "react-native";
import React, {Component} from 'react';
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

    Grid,
    Col,
    Accordion,

} from 'native-base';

import store from 'react-native-simple-store';


const dataArray = [
    {title: "Probleem: Rommel", content: "Lorem ipsum dolor sit amet"},
    {title: "Probleem: Wifi", content: "Lorem ipsum dolor sit amet"},
    {title: "Probleem: Overig", content: "Lorem ipsum dolor sit amet"}
];


store.delete('sendMails');

export default class HistoryScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            array: undefined,
        };
    }


    static navigationOptions = {
        title: 'Geschiedenis',
    };

    getData = () => {
        store.get('sendMails')
            .then((result) =>
                Alert.alert(result[0].name, result[0].street + '\n' + result[0].omschrijving + '\n' + result[0].selected  + '\n' + result[0].imgPath)
            )
    };

    render() {


        return (
            <Container>
                <Content padder>
                    <Accordion dataArray={dataArray} icon="add" expandedIcon="remove"/>
                    <Button full info style={styles.button}
                            onPress={this.getData}>
                        <Text>bekijk laaatste email</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = require('./styles/styles');