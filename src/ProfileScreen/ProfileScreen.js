import React from 'react';
import { View, TextInput, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase'; 


class ProfileScreen extends React.Component {

  

  constructor(props) {
        super(props);
        const navigation = this.props.navigation;
        this.state = {user: {name: '', photo: require('../../assets/profilePictures/mike.png'),  loggedOut: false, birthday: '', status: ''}, editActive: false}
    }

  setupListener() {
    firebase.database().ref('users/test').on('value', (snapshot) => {
      this.state.user.name = snapshot.val().name;
      this.state.user.birthday = snapshot.val().birthday;
      this.state.user.status = snapshot.val().status;
      this.setState({
        user: this.state.user,
        editActive: false
      });
    });
  }

  componentDidMount() {this.setupListener();}
  componentWilUnmount() {firebase.database().ref('users/test').off('value');}

      async logInFB() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('575341286140281', {
      permissions: ['public_profile'],
    });
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,birthday,picture.type(large)`);
    const data = (await response.json())
    const username = data.name
    const userphoto = data.picture
    const birthday = data.birthday
    //this.state.user.photo = {uri: userphoto.data.url}
    //this.state.user.name = username
    const user = Object.assign({}, this.state.user, { name: username, photo: {uri: userphoto.data.url}, birthday: birthday, loggedOut: false}); 
                    this.setState({ user });
    //console.log(birthday)
    

    }
  }

/*idk what this was doing tbh but i don't think we need it any more*/
  // static navigationOptions = {
  //   tabBarLabel: 'Profile',
  //   tabBarIcon: ({ tintColor }) => {
  //     return <Image
  //       source={require('../../assets/profilePictures/mike.png')}
  //       style={[{width: 26, height: 26}, {tintColor: tintColor}]}/>
  //   },
  // };

  onSave = user => {
    this.setState({user: user});
  };

setStatusStyle() {
  distStr = this.state.editActive ? 'none' : 'flex';
  return {
    marginTop:'5%',
    width: 275,
    flexDirection: 'row',
    alignItems: 'center',
    display: distStr
  }
}

setEditorStyle() {
  distStr = !this.state.editActive ? 'none' : 'flex';
  return {
    marginTop:'5%',
    color:'white',
    width: 300,
    fontSize:20,
    display: distStr
  }
}

/*render method for new prototype*/
  render() {
    const navigation = this.props.navigation;
    return (
      <KeyboardAwareScrollView
      style={{ flex: 1, flexDirection:'column', backgroundColor: '#333' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
      scrollEnabled={false}>
        <Image source = {this.state.user.photo} style = {{marginTop:'5%', height:150, width:150, borderRadius:150/2}}/>
        
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Text style = {{fontSize:48, color:'white'}}>{this.state.user.name}</Text>
          <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
          onPress={() => navigation.navigate('Settings', {})}>
            <Image source={require('../../assets/icons/settings.png')} style={{height:30, width:30, tintColor:'white', marginLeft:10}}/>
          </TouchableHighlight>
        </View>
        {/*<Text style = {{fontSize:24, color:'white'}}>Birthday: {this.state.user.birthday}</Text>*/}
        <TouchableOpacity activeOpacity={0.25} onPress={this.logInFB.bind(this)}>
          <View style={this.state.user.loggedOut ? {flexDirection:'row', alignItems:'center', marginTop:20} : {display:'none'}}> 
            <Image source={require('../../assets/icons/facebook.png')} style={{height:20, width:20, marginRight:15}}/>
            <Text  style={{fontSize:18, color:'white', textDecorationLine:'underline'}}>Connect Account</Text>
          </View>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
        <View style={this.setStatusStyle()}>
        <Text style = {{fontSize:20, color:'white'}}>Status: {this.state.user.status}</Text>
        <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
        onPress={() => {
          this.setState({
            editActive: true
          });
        }}>
        <Image source={require('../../assets/icons/edit.png')} style={{height:30, width:30, tintColor:'white', marginLeft:10}}/>
        </TouchableHighlight>
        </View>
        <TextInput
                autogrow={true}
                multiline={true}
                style={this.setEditorStyle()}
                placeholder="Enter a status"
                placeholderTextColor="#aaa"
                onSubmitEditing={(event) => {
                    firebase.database().ref('users/test/status').set(event.nativeEvent.text);
                }}
                returnKeyType='done'
            />
        </View>
      </KeyboardAwareScrollView>
    );
  }


/*render method for old prototype*/
  // render() {
  //   const navigation = this.props.navigation;
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'column' }}>
  //       <Image source = {this.state.user.photo} style = {{height:150, width:150, borderRadius:150/2}}/>
        
  //       <View style={{flexDirection:'row', alignItems: 'center'}}>
  //         <Text style = {{fontSize:48, color:'#444'}}>{this.state.user.name}</Text>
  //         <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
  //         onPress={() => navigation.navigate('EditProfile', {user: this.state.user, onSave: this.onSave})}>
  //           <Image source={require('../../assets/icons/edit.png')} style={{height:30, width:30, tintColor:'#555', marginLeft:10}}/>
  //         </TouchableHighlight>
  //       </View>
  //       <Text style = {{fontSize:24, color:'#666'}}>Birthday: {this.state.user.birthday}</Text>
  //       <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'>
  //         <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
  //           <Image source={require('../../assets/icons/facebook.png')} style={{height:20, width:20, marginRight:15}}/>
  //           <Text onPress={this.logInFB.bind(this)} style={{fontSize:18, color:'#555', textDecorationLine:'underline'}}>Connect Account</Text>
  //         </View>
  //       </TouchableHighlight>
  //       <TouchableHighlight underlayColor='rgba(200,200,200,0.8)'
  //       onPress={() => navigation.navigate('Schedule', {name: this.state.user.name, editable: true})}> 
  //         <View style={{flexDirection: 'column', alignItems:'center', justifyContent:'center', marginTop:20}}>
  //           <Image source={require('../../assets/icons/calendar.png')} style={{height:80, width:76, marginBottom:5}}/>
  //           <Text style={{fontSize:18, color:'#444'}}>Update Schedule</Text>
  //         </View>
  //       </TouchableHighlight>
  //     </View>
  //   );
  // }
}

export default ProfileScreen;
