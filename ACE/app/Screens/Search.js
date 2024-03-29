import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TextInput, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SearchBar() {
  return (
    
  <View style={style.assembler}>
   <View style={style.Main}>
    <TextInput placeholder='searchhsh' style={style.Input} ></TextInput>
  </View>
    <View style={style.buttonP}>
      <TouchableOpacity>
        <FontAwesome style={style.icon} name='search' size={40} marginTop={3} marginLeft={9}/>
      </TouchableOpacity> 
    </View>
   
   </View>
  );
}

const style =StyleSheet.create({
    assembler:{
      flexDirection:'row',
      marginTop:120,
      marginLeft:24

    },
    Main:{
        backgroundColor:'#FFF',
        width:300,
        height:60,
        
        borderWidth:3,
        borderColor:'#c0c0c0',
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        flexDirection:'row'
    },
    Input:{
      marginLeft:10,
      marginTop:3,
      fontSize:20

    },
    buttonP:{
      height:60,
      width:60,
      backgroundColor:'#1d1d1f',
      borderWidth:1,
      
      borderTopRightRadius:20,
      borderBottomRightRadius:20,
     
      borderColor:'#1d1d1f',
      
      justifyContent:'center'
    },
    icon:{
      marginRight:  10,
      color:'#fcfcff'
      
    }

})