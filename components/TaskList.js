import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ScrollView, } from 'react-native'

//----------------------- Importamos componentes -----------------------------------------
// import firebase from '../src/utils/firebase'
// import 'firebase/firestore'

//------> ACTUALIZACIÓN MODULAR DE FIREBAEE 2024 <--------------------------------------
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { app } from '../src/utils/firebase'; // Asegúrate de que 'firebase.js' exporte correctamente 'app'

//---------------------------------------------------------------------------------------

//------------------------- Componentes extras ------------------------------------------

//Importamos npm install react-native-elements para mostrar los itemes de la bd en el componente-------------------
// ListItem - Avatar
import { ListItem,Avatar } from "react-native-elements";
import { TouchableOpacity } from 'react-native'

//import {NavigationContainer} from '@react-navigation/native'



export default function TaskList(props) {

    // const db = firebase.firestore(firebase)

    //----> ACTUALIZACIÓN MODULAR DE FIRESTORE 2024 <--------------
    const db = getFirestore(app);  // Inicializamos Firestore con la app de Firebase


    //Establece las tareas de los usaurios en la BD
    //Esta en blanco al inicio de la app, ya que esta no tiene nada
    const [userTask, setUserTask] = useState([]);

    useEffect(()=>{
        
        //---> ACTUALIZACIÓN MODULAR DE FIREBASE/FIRESTORE 2024 <--------
        const unsubscribe = onSnapshot(collection(db, 'taskList'), (querySnapshot) => {
            const userTask = [];

            querySnapshot.docs.forEach(doc => {
                const { titulo, descripcion, dia, mes, año, valor } = doc.data();
                userTask.push({
                    id: doc.id,
                    titulo,
                    descripcion,
                    dia,
                    mes,
                    año,
                    valor
                });
            });

            // onSnapshot devuelve querySnapshot, son los datos que tiene la base de datos
        // // querySnapshot (es una espiesta a interpretar)
        // db.collection('taskList').onSnapshot(querySnapshot =>{


        //     //-- Ahora para mostrar los datos de firebase en el componente,
        //     //Creamos un arreglo vacio para trasladar y guardar los datos interpretados
        //     //por cada doc

        //     const userTask = []


            
        //     // La propiedad .docs contiene todos los datos
        //     // Recorremos cada uno de los documentos gurdados en la base de datos
        //     //Ejecutando una función llamada DATA
        //     querySnapshot.docs.forEach(doc =>{
        //          //console.log(doc.data())

        //          // extramos los datos del doc
        //         const {titulo,descripcion, dia, mes, año, valor} = doc.data(); 

        //          //Los guardamos dentro de un objeto nuevo 
        //          //Obtnemos el id del documento actual con la propiedad id
        //          // Y de esta manera podemos guardarlo dentro del arreglo users
        //          userTask.push({

        //             id: doc.id,
        //             titulo,
        //             descripcion,
        //             dia,
        //             mes,
        //             año,
        //             valor
                    
        //         })

        //     });
                //Agregamos los datos de firebase a nuestro arreglo para poder mostrarlo en pantalla 
            setUserTask(userTask)
        });
        return () => unsubscribe(); // Nos regresa la consulta a la BD
    },[]);


    const cancel = () =>{
        props.navigation.navigate("AddTask")

    }

    const backAssignatures = () =>{
        props.navigation.navigate("StudentsList")

    }

    return (

        <>

<ScrollView style={styles.lista}>


{/*Ahora queremos visulalizar en la pantalla de UsersList */}

{
    //Recorreremos cada uno de los usuarios 

    //Los itmes a retornar vienen de un paque de react-native
    //El paque te es: npm install react-native-elements
    userTask.map(user =>{

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
            
            onPress = {()=> props.navigation.navigate("TaskDetail",{userId:user.id})}
            
        >
            
            <ListItem.Chevron style={styles.listItemStyle}/>

            <Avatar source={{
                uri: "https://image.freepik.com/vector-gratis/lista-tareas-hoja-papel-documento-tarea-grande-casilla-verificacion-plano_277904-1087.jpg",
            }} 
            rounded

            />

            <ListItem.Content style={styles.listContent}>
                <ListItem.Title style={styles.description}>{user.titulo}</ListItem.Title>

                <ListItem.Subtitle>Descripción: {user.descripcion}</ListItem.Subtitle>

                <ListItem.Subtitle>Realizar antes del: {user.dia + "/" + user.mes + "/" + user.año}</ListItem.Subtitle>


                {/* <ListItem.Subtitle>Promedio: {(((user.calif1 * 1) + (user.calif2 * 1) +( user.calif3 *1) )/3).toFixed(2)}</ListItem.Subtitle> */}
                <ListItem.Subtitle>Prioridad: 
                    {user.valor == "Baja" ? <Text style = {styles.textBajo}>{user.valor}</Text>
                    : user.valor =="Media" ? <Text style = {styles.textMedio}>{user.valor}</Text> : user.valor =="Alta"? <Text style={styles.textAlto}>{user.valor}</Text>
                : user.valor}
                </ListItem.Subtitle>


            </ListItem.Content>


        </ListItem>
)
})
}
                <TouchableOpacity onPress={cancel}>
                    <Text style={styles.viewCloose2}>Añadir nuevas tareas</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={backAssignatures}>
                    <Text style={styles.viewCloose}>Ver lista de asignaturas</Text>
                </TouchableOpacity>


</ScrollView>





        </>
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

    },
    lista:{
        height:"100%",
        width:"100%",
        marginBottom:0,
        backgroundColor:"#fff",
    },

    listContent:{
        backgroundColor:"#f4f6f7",
        borderColor:"#30a8b4",
        borderWidth:2
    },

    listItemStyle:{
        backgroundColor:"#30a8b4",
        borderRadius:5
    },
    description:{
        fontSize: 15,
        fontWeight:"bold",
        color:"#212121"
    },

    textA:{
        color:"green",
        fontWeight:"bold"
    },
    textF:{
        color:"red",
        fontWeight:"bold"
    },

    textBajo:{
        color:"green",
        fontWeight:"bold"
    },

    textMedio:{
        color:"#FFF600",
        fontWeight:"bold"
    },

    textAlto:{
        color:"red",
        fontWeight:"bold"
    },
    viewCloose:{
        backgroundColor:"#0e3198",
        borderColor:"black",
        padding:10,
        fontSize:14,
        color:"white",
        fontWeight:"bold",
        textAlign:"center",
        marginTop:5,
    },
    viewCloose2:{
        backgroundColor:"#006064",
        padding:10,
        fontSize:14,
        fontWeight:"bold",
        color: "white",
        textAlign:"center",
        marginBottom:5
    },

})
