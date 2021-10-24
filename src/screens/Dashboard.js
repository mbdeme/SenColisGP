import React from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import * as firebase from 'firebase'


function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <Image source={{uri:item.photo}}  style={{width:60, height:60,borderRadius:30}} />
      <View style={{alignItems:"center",flex:1}}>
        <Text style={{fontWeight:"bold"}}>{item.name}</Text>
        <Text>{item.position}</Text>
      </View>
      <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"green"}}>Call</Text>
      </TouchableOpacity>
    </View>
  );
}
const firebaseConfig = {
     apiKey: "AIzaSyBGKHIwvOgpOwdJ9VLcYU3LV9wFtJaYpjE",
     authDomain: "sengp-58dce.firebaseapp.com",
     databaseURL: "https://sengp-58dce-default-rtdb.firebaseio.com",
     projectId: "sengp-58dce",
     storageBucket: "sengp-58dce.appspot.com",
     messagingSenderId: "206192261134",
     appId: "1:206192261134:web:a839122e3bbb52acae645f",
     measurementId: "G-XBB3MK3YES"
  };
export default class Dash extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
     userdata: [],
   };
    var that = this;

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }else {
       firebase.app(); // if already initialized, use that one
    }


firebase.database().ref('users').once('value').then(function(snapshot)
{
  var li = []
       snapshot.forEach((child)=>{
        li.push({
         key: child.key,
         name:child.val().name,
         email: child.val().email,
         "position": "Clerical",
         "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/43.jpg"
       })
     })
    that.setState({userdata:li})
   })

}

  render(){
    return (

      <View style={styles.container}>
        <FlatList
          style={{flex:1}}
          data={this.state.userdata}
          renderItem={({ item }) => <Item item={item}/>}
          keyExtractor={item => item.email}
        />
         <Button mode="outlined" onPress={() =>  this.props.navigation.navigate('StartScreen')
                            }
                          >
                            Logout
                          </Button>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:60
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"80%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  }
});