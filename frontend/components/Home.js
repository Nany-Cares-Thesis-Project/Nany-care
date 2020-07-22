import React, { useState, useEffect } from "react";
import {
  View,
  Picker,
  ListView,
  StyleSheet,
  NativeModules,
  FlatList,
  SafeAreaView,
  Text,
} from "react-native";
import axios from "axios";
import {Button} from "react-native-paper";



export default function AllNany() { // function to render results based on selected category
// states to use 
  const [nanylist, setNanylist] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedKids, setSelectedKids] = useState([]);
  const [selectedEdu, setSelectedEdu] = useState([]);
  const [selected, setSelected] = useState([]);

//fetching data from the db 
  useEffect(() => {
    fetch(
      `http://localhost:5000/ret`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/vnd.github.cloak-preview"
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        setNanylist(response);
        //console.log(response)
      })
      .catch(error => console.log(error));
  }, []);


// filtering the list data 
  function listFilter () { 
    if(selectedCity === "allNany"){
      setSelected(nanylist)
    }
    else{
    var selected1;
     selected1 = nanylist.filter(op => { 
       console.log(op["place"])
              return ((op["place"] === selectedCity) && (op["educationLevel"] ===  selectedEdu) && ( op["kidsNumber"] === selectedKids)) 
            }
             )
      setSelected(selected1)
     // console.log(op["place"])
    //  console.log(selected1)
    //  console.log("selected",selected)
    //  console.log("selected city",selectedCity)
    //  console.log("selected level",selectedEdu)
    //  console.log("selected kids",selectedKids)
    // 
    }
  }
  
    return(  
      <View>
{/* city picker */}
      <Text> Select a city </Text>
          <Picker
            nanylist = {nanylist}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => { setSelectedCity(itemValue)}}
          > 
            <Picker.Item label= "All Cities" value= "allNany" /> 
            <Picker.Item label= "Amman" value= "amman" />
            <Picker.Item label= "Irbid" value= "irbid" />
            <Picker.Item label= "Zarqa" value= "zarqa" />
            <Picker.Item label= "Aqaba" value= "aqaba" />  
          </Picker> 



          {/* Kids can handle picker */}
      <Text> Kids can Handle </Text>
          <Picker
            nanylist = {nanylist}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => { setSelectedKids(itemValue)}}
          > 
            <Picker.Item label= "1 kid" value= "1" />
            <Picker.Item label= "2 kids" value= "2" />
            <Picker.Item label= "3 kids" value= "3" />
            <Picker.Item label= "4 kids" value= "4" />  
          </Picker> 


          {/* Education level picker */}
      <Text> Education level </Text>
          <Picker
            nanylist = {nanylist}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => { setSelectedEdu(itemValue)}}
          > 
            <Picker.Item label= "College" value= "college" />
            <Picker.Item label= "High school" value= "high school" />  
          </Picker> 

      <Button onClick= {listFilter} >go</Button>
      
  {/* rendering based on the selection condition */}
    <View>
    {selected.map((nany) => (
      <Text>
        NAME : {nany.name} PLACE: {nany.place} HOURLY COST: {nany.cost}{" "}
        EDUCATION LEVEL : {nany.educationLevel} ECPERIANCE LEVEL :{" "}
        {nany.experianceLevel} KIDS NUMBER : {nany.kidsNumber} AGE :{" "}
        {nany.age} WORKING HOURS : {nany.workingHour}{" "}
      </Text>
        ))}
    </View>
   </View>
    )  
} 