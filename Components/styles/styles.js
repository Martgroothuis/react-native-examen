'use strict';

import React from 'react-native';

let styles = React.StyleSheet.create({

    container: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
    },

    containerCamera: {
        flex: 1,
        flexDirection: 'column',
    },

    image: {
        flex: 1,
        resizeMode: 'contain',
        width: '100%',

    },

    imagePreview: {
        resizeMode: 'contain',

        flex: 1,
        width: '100%',
        height: 200,
        borderColor: 'gray',
        borderWidth: 1,
    },


    button: {
        margin: 35,
    },
    buttonStack:{
        marginTop: 0,
    },


    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    captureContainer: {
        flex: 0,
        bottom: 0,
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    capture: {
        borderRadius: 100,
    },
    captureOutside: {
        backgroundColor: '#fff',
        padding: 3,
        paddingHorizontal: 3,
        margin: 20,
    },
    captureInner: {
        backgroundColor: '#222222',
        padding: 35,
        paddingHorizontal: 35,
        margin: 2,
    },


});

module.exports = styles;