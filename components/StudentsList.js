import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ScrollView, Image , Button} from 'react-native'
// Equivalente a ListBirhday.js

//----------------------- Importamos componentes -----------------------------------------
// import firebase from '../src/utils/firebase'
// import 'firebase/firestore'

//Firebase modular --->2024
import app from '../src/utils/firebase'; // Asegúrate de tener la instancia de Firebase inicializada
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';


import ActionBar from './ActionBar'

import AddAssignature from './AddAssignature'

//---------------------------------------------------------------------------------------

//------------------------- Componentes extras ------------------------------------------

//Importamos npm install react-native-elements para mostrar los itemes de la bd en el componente-------------------
// ListItem - Avatar
import { ListItem,Avatar } from "react-native-elements";
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

//import {NavigationContainer} from '@react-navigation/native'



export default function StudentsList(props) {
    const navigation = useNavigation();  // Accede al objeto de navegación

    const [showList, setShowList] = useState(false)

    // const db = firebase.firestore(props)

    //--> Firebase modular 2024:
    const db = getFirestore(app); // Inicializa el servicio de Firestore

    //Nos muestre la lista o formulario:----------------------------
    //Tarea : CUMPLEAÑEROS = Nombre, apellido, fecha, y boton de registrar fechas 

        
    //Establece los cumpleaños de los usaurios en la BD
    //Esta en blanco al inicio de la app, ya que esta no tiene nada
    const [usersMaterias, setUsersMaterias] = useState([]);

    //----------------------Llamamos a la ejecución de firebase--------------------------------------------
    const {user} = props;
    

        // useEffect(()=>{

        

        //     // onSnapshot devuelve querySnapshot, son los datos que tiene la base de datos
        //     // querySnapshot (es una espiesta a interpretar)
        //     db.collection('ListAssignatures').onSnapshot(querySnapshot =>{
    
    
        //         //-- Ahora para mostrar los datos de firebase en el componente,
        //         //Creamos un arreglo vacio para trasladar y guardar los datos interpretados
        //         //por cada doc
    
        //         const usersMaterias = []
    
    
                
        //         // La propiedad .docs contiene todos los datos
        //         // Recorremos cada uno de los documentos gurdados en la base de datos
        //         //Ejecutando una función llamada DATA
        //         querySnapshot.docs.forEach(doc =>{
        //              //console.log(doc.data())
    
        //              // extramos los datos del doc
        //             const {nombreProfesor,nombre_materia, calif1, calif2, calif3, promedio} = doc.data(); 
    
        //              //Los guardamos dentro de un objeto nuevo 
        //              //Obtnemos el id del documento actual con la propiedad id
        //              // Y de esta manera podemos guardarlo dentro del arreglo users
        //              usersMaterias.push({
    
        //                 id: doc.id,
        //                 nombreProfesor,
        //                 nombre_materia,
        //                 calif1,
        //                 calif2,
        //                 calif3,
        //                 promedio : (((calif1*1) + (calif2 * 1)+ (calif3 * 1))/3).toFixed(2)
    
                        
        //             })
    
        //         });
        //             //Agregamos los datos de firebase a nuestro arreglo para poder mostrarlo en pantalla 
        //             setUsersMaterias(usersMaterias)
                   
            
            
        //     });
    
        // },[]);

        //--> Actualización modular de firebase/firestrore 2024 <--
        
        useEffect(() => {
            //--> ACTUALIZACIÓN  MODULAR DE  Firebase/FireStore 2024 <--
            const unsubscribe = onSnapshot(collection(db, 'ListAssignatures'), (querySnapshot) => {
                const usersMaterias = [];

                querySnapshot.forEach((doc) => {
                    const { nombreProfesor, nombre_materia, calif1, calif2, calif3 } = doc.data();
                    usersMaterias.push({
                        id: doc.id,
                        nombreProfesor,
                        nombre_materia,
                        calif1,
                        calif2,
                        calif3,
                        promedio: (((calif1 * 1) + (calif2 * 1) + (calif3 * 1)) / 3).toFixed(2),
                    });
                });
                setUsersMaterias(usersMaterias);
            });
    
            // Cleanup the listener on unmount
            return () => unsubscribe();
        }, []);


    return (
        <View style={styles.container}>

            {showList ?(
            <>
            
            <ScrollView style={styles.lista}>


                    {/*Ahora queremos visulalizar en la pantalla de UsersList */}

                    {
                        //Recorreremos cada uno de los usuarios 

                        //Los itmes a retornar vienen de un paque de react-native
                        //El paque te es: npm install react-native-elements
                        usersMaterias.map(user =>{

                        return(

                            //ListItem, recibe un key único
                            // <ListItem.Chevron/> permite colocar un tipo icono al inicio de la lista
                            //Ponemos el avatar, la propiedad rounded permite hace la imagen circular
                            // Colocamos un texto ListItem.Content -----> dentro de este componente, tenemos:
                            // Colocamos ListItem.Title>{user.name}</ListItem.Title contiene el nombre del usuario
                            //Colocamos su correo: <ListItem.Subtitle>{user.email}</ListItem.Subtitle>


                            //Todos los datos de los usuarios los tenemos en ListItem Key = {user.id}
                            //bottomDivider para dividir los contactos de la lista 
                            
                            <ListItem
                                //Ahora mostramos el ID de la persona cuando se presiona su perfil y lo 
                                //Mande a la ventana UserDetailScreen y la pasamos el dato de User Id
                                // Por medio de una propiedad userId: user.id
                                // Ahora tenemos que obtener dicha ID en UserDetailScreen ------>
                                key = {user.id} bottomDivider
                                backgroundColor = "#90A4AE"
                                
                                onPress = {()=> navigation.navigate("AssignatureDetails",{userId:user.id})}
                                
                            >
                                
                                <ListItem.Chevron style={styles.listItemStyle}/>

                                <Avatar source={{
                                    uri: "https://pbs.twimg.com/media/D5_gdpPXoAE3pb7.jpg",
                                }} 
                                rounded

                                />

                                <ListItem.Content style={styles.listContent}>
                                    <ListItem.Title style={styles.description}>{user.nombreProfesor}</ListItem.Title>

                                    <ListItem.Subtitle>Nombre Materia: {user.nombre_materia}</ListItem.Subtitle>
                                    {/* <ListItem.Subtitle> {user.edad >=18 ?"Mayor de edad" : "Menor de edad"}</ListItem.Subtitle> */}

                                    {/* <ListItem.Subtitle>Día de nacimiento: {user.diaNacimiento}</ListItem.Subtitle> */}
                                    
                                    <ListItem.Subtitle>Primer Calificación: {user.calif1}</ListItem.Subtitle>
                                    <ListItem.Subtitle>Segunda Calificación: {user.calif2}</ListItem.Subtitle>
                                    <ListItem.Subtitle>Tercera Calificación: {user.calif3}</ListItem.Subtitle>


                                    {/* <ListItem.Subtitle>Promedio: {(((user.calif1 * 1) + (user.calif2 * 1) +( user.calif3 *1) )/3).toFixed(2)}</ListItem.Subtitle> */}
                                    <ListItem.Subtitle>Promedio: {user.promedio}</ListItem.Subtitle>
                                    <ListItem.Subtitle>Estatus Materia: {user.promedio >= 7.0 ? <Text style = {styles.textA}>Materia Aprobada</Text> 
                                    : <Text style={styles.textF}>Materia no aprobada</Text>}</ListItem.Subtitle>


                                </ListItem.Content>


                            </ListItem>
                    )
                })
            }

                    <TouchableOpacity onPress={()=>props.navigation.navigate("AddTask")} >
                            <Text style={styles.btnText2}>Añadir nuevas tareas por hacer</Text>

                    </TouchableOpacity>
                </ScrollView>

                </>     
                
            ) : (
                
            <AddAssignature setShowList={setShowList} user={user}/>
            )}

            <ActionBar showList={showList} setShowList={setShowList} />

        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        textAlign:"center",
        fontSize: 20,
        fontWeight:"bold",
        color:"#0A0A2A"

    },    
    container:{
        alignItems:"center",
        height:"100%",
        width:"100%",
        backgroundColor:"#fff"

    },
    lista:{
        width:"100%",
        marginBottom:50,
        backgroundColor:"#fff",
    },

    listContent:{
        backgroundColor:"#f4f6f7",
        borderColor:"#0598aa",
        borderWidth:2,
        padding:5,
    },

    listItemStyle:{
        backgroundColor:"#1c7883",
        borderRadius:5
    },
    description:{
        fontSize: 15,
        fontWeight:"bold",
        color:"#000",
    },

    textA:{
        color:"green",
        fontWeight:"bold"
    },
    textF:{
        color:"red",
        fontWeight:"bold"
    },
    btnText2:{
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        color:"white",
        fontSize: 15,
        fontWeight:"bold",
        backgroundColor:"#366ab1",
        textAlign:'center',
        width:"100%",
    },
})
