/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import codePush from "react-native-code-push";
let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var onError = function (error) {
  console.log("An error occurred. " + error);
};

var onDownloadProgress = function (downloadProgress) {
  if (downloadProgress) {
      console.log("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress)
  }
};

var onSyncStatusChange = function(SyncStatus) {
  switch (SyncStatus) {
      case SyncStatus.CHECKING_FOR_UPDATE:
          // Show "Checking for update" notification
          break;
      case SyncStatus.AWAITING_USER_ACTION:
          // Show "Checking for update" notification
          break;
      case SyncStatus.DOWNLOADING_PACKAGE:
          // Show "downloading" notification
          break;
      case SyncStatus.INSTALLING_UPDATE:
          // Show "installing" notification
          break;
  }
}

codePush.sync({ updateDialog: true }, onSyncStatusChange, onDownloadProgress, onError);

export default class App extends Component{

  onButtonPress() {
    alert("here in codePush")
    codePush.sync({
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE
    });    
      //codePush.sync({ updateDialog: true }, onSyncStatusChange, onDownloadProgress, onError);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!!!
          try now this is pushed update again!!!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <View>
              <TouchableOpacity onPress={this.onButtonPress}>
                  <Text>Check for updates</Text>
              </TouchableOpacity>
            </View> 
      </View>
    );
  }
}

App = codePush(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
