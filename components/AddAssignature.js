import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity, Image} from 'react-native'

import { Avatar } from "react-native-elements";

//---------------------Importamos componentes ---------------------------
// import firebase from '../src/utils/firebase'
// import 'firebase/firestore'

//---> Actualización modular de firebase 2024 <--
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../src/utils/firebase'; // Asegúrate de importar la instancia inicializada

//-----------------------------------------------------------------------



export default function AddAssignature(props) {
    const {user, setShowList} = props;
    // const db = firebase.firestore(firebase)


    //--> Actualización modular de firebase 2024 <--
    const db = getFirestore(app); // Inicializa Firestore con la instancia de Firebase

    //Creamos el estado para nuestras variables:-----------------------------------------
    const [materias, setMaterias] = useState(materiasValue)

    //Función para los valores de interés... ---------------------------------------------
    const materiasValue={
        
            nombreProfesor:"",
            nombre_materia:"",
            calif1:"",
            calif2:"",
            calif3:"",
            //promedio:"",
    }

        //Creamos el estado de los errores ---------------------------------------------
        const [formError , setFormError] = useState({})

        //-------------------------------------------------------------------------------

        //Creamos la función para añadir las materias del alumno a la BD:
        const AddAssignatures = async() =>{

            let errors ={};
            //Validamos los campos vacios...
            if(!materias.nombreProfesor  || !materias.nombre_materia || !materias.calif1
                || !materias.calif2 || !materias.calif3){
                    
                if(!materias.nombreProfesor) errors.nombreProfesor = true;
                if(!materias.nombre_materia) errors.nombre_materia = true;
                if(!materias.calif1) errors.calif1 = true;
                if(!materias.calif2) errors.calif2 = true;
                if(!materias.calif3) errors.calif3 = true;
                
    
                alert("Campos vacios")
    
            }else{
                //Si no hay campos vacios, agregue la info a la BD-------------
    
                try{
    
                    //Comenzamos a utilizar firebase " db " para guardar la info
                    // Usamos el metodo db, creamos una collección llamada cumpleañeros
                    // Añadimos un objeto
                    // await db.collection('ListAssignatures').add({
                    //     //Las propiedades de esos objetos son:
                        
                    //     nombreProfesor:materias.nombreProfesor,
                    //     nombre_materia:materias.nombre_materia,
                    //     calif1:materias.calif1,
                    //     calif2:materias.calif2,
                    //     calif3:materias.calif3,
                        //promedio:materias.promedio,

                    ////////////////////////////////////////////////////////////////////////////////
                    ///////////////////////////////////////////////////////////////////////////////
                    //-- ACTUALIZACIÓN MODULAR DE FIREBASE 2024 <--

                    // Añadimos un objeto a la colección 'ListAssignatures'

                    await addDoc(collection(db, 'ListAssignatures'), {
                        nombreProfesor: materias.nombreProfesor,
                        nombre_materia: materias.nombre_materia,
                        calif1: materias.calif1,
                        calif2: materias.calif2,
                        calif3: materias.calif3,


                    });

                    //console.log(state)
                    alert('La información ha sido guardada con éxito.');
                    setShowList(true)

                    
                    }catch(error){
                        console.log(" Error al almacenar la información ",error)
                    }
    
            }
            
            setFormError(errors)
            //console.log(errors)
        }
    
    return (
<>
        <View style={styles.vistaG}>

            <View style={styles.vista}>
                <Text style={styles.title}>Añadir una nueva asignatura</Text>

            </View>

            <View style={styles.vistaG2}>
                

            
            <TextInput
                
                style={[styles.input , formError.nombreProfesor && styles.error]}
                placeholder = "Nombre del profesor"
                placeholderTextColor = "white"
                onChangeText={(text)=>setMaterias({...materias,nombreProfesor:text})}
            
            />


            <TextInput
                
                style={[styles.input , formError.nombre_materia && styles.error]}
                placeholder = "Nombre de la materia"
                placeholderTextColor = "white"
                onChangeText={(text)=>setMaterias({...materias,nombre_materia:text})}
            
            />  


            <View style={styles.vistaCalificaciones}>
            <TextInput
                
                style={[styles.input3 , formError.calif1 && styles.error]}
                placeholder = "Calif. 1"
                keyboardType="numeric"
                maxLength={3}
                placeholderTextColor = "white"
                onChangeText={(text)=>setMaterias({...materias,calif1:text})}
            
            />  


            <TextInput
                
                style={[styles.input3 , formError.calif2 && styles.error]}
                placeholder = "Calif. 2"
                keyboardType="numeric"
                maxLength={3}
                placeholderTextColor = "white"
                onChangeText={(text)=>setMaterias({...materias,calif2:text})}
            
            />  


            <TextInput
                
                style={[styles.input3 , formError.calif3 && styles.error]}
                placeholder = "Calif. 3"
                keyboardType="numeric"
                maxLength={3}
                placeholderTextColor = "white"
                onChangeText={(text)=>setMaterias({...materias,calif3:text})}
            
            />  
            </View>
            {/* {setMaterias.promedio = (materias.calif1 + materias.calif2 + materias.calif3)/3} */}

            {/* <Text>El promedio de la materia es: {materias.promedio}</Text> */}
            

            <TouchableOpacity  onPress = {AddAssignatures}>

                <Text style={styles.btnText} >Añadir asignatura</Text>

            </TouchableOpacity>

        </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    title:{
        textAlign:"center",
        fontSize: 20,
        fontWeight:"bold",
        color:"#fff",
        },
    
        btnText:{
            padding:10,
            alignItems:"center",
            justifyContent:"center",
            color:"white",
            fontSize: 15,
            fontWeight:"bold",
            backgroundColor:"#088A4B",
            borderRadius:10,
            borderColor:"#2EFE2E",
            textAlign:'center',
            borderWidth:2,
            marginTop:15,
            width:"100%" ,
             
        },
    
        input:{
            padding:10,
            color:"white",
            width: "100%",
            marginBottom: 15,
            backgroundColor:"#4527A0",
            borderRadius:10,
            fontSize: 15,
            borderWidth: 2,
            borderColor: "#B388FF"
            
    
        },
    
        login:{
            flex:1,
            justifyContent:"flex-end",
            marginBottom:20,

        },
    
        error:{
            borderColor:"#940c0c",
            borderWidth:2
        },
    
        vista:{
            marginBottom:10,
            padding:5,
            width:"100%",
        },

        vistaG:{
            backgroundColor:"#1B0A2A",
            width:"100%",
            height:"100%",
            alignItems:"center"

        },

        vistaG2:{
            alignItems:"center",
            backgroundColor:"#230849",
            borderColor:"#9B59B6",
            width:"100%",
            height:300,
            borderWidth:2,
            borderRadius:20,
            padding:15
        },

        vistaCalificaciones:{
            flexDirection:"row"
        
        },

            input3:{
                margin:10,
                padding:10,
                color:"white",
                width: "30%",
                marginBottom: 10,
                backgroundColor:"#4527A0",

                borderRadius:10,
                fontSize: 12,
                borderWidth: 2,
                borderColor: "#B388FF",
                fontWeight:"bold",
                textAlign:"center"
        
            },

})
