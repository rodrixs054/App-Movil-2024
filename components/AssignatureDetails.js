import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { ActivityIndicator } from 'react-native'

//---------------------------------Importamos nuestros componentes -------------------------
// import firebase from '../src/utils/firebase'

// import 'firebase/firestore'

//-------------> ACTUALIZACIÓN MODULAR DE FIREBASE 2024 <----------------------------------
import { getFirestore, doc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';
import firebaseApp from '../src/utils/firebase'; // Asegúrate de tener inicializada tu app de Firebase


//-------------------------------------- --------------------------------------------------

export default function AssignatureDetails(props) {

    const {user} = props
    const [userStudent, setUserStudent] = useState(studentValues)

    const studentValues = {


        id: '',
        nombreProfesor: "",
        nombre_materia: "",
        calif1: "",
        calif2: "",
        calif3: "",

    }

    //Mostrar una pequeña barra de carga si tarda demasiado en cargar los datos
    const [loading, setLoading] = useState(true)

    // const db = firebase.firestore()

    //-------> ACTUALIZACIÓN MODULAR DE FIREBASE 2024 <-----------------------
    const db = getFirestore(firebaseApp); // Obtén la instancia de Firestore


    const getUserId = async (id) => {


        //---> ACTUALIZACIÓN MODULAR DE FIREBASE 2024 -  PARA OBTENER LOS DATOS DE UN REGISTRO Y EDITARLOS <------------------
        try {
            const docRef = doc(db, 'ListAssignatures', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUserStudent({
                    ...userData,
                    id: docSnap.id,
                });
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        } finally {
            setLoading(false);
        }


        // Se realiza una consulta a la base de datos db, a la coleccionn users
        //Vamos a buscar un doc a traves del id que le estamos pasando  
        // dbRef es la consulta
        // const dbRef = db.collection('ListAssignatures').doc(id)

        // //Obtenemos el datos de la consulta
        // const doc = await dbRef.get();

        // //Los datos obtenidos en userEffect no son tan facil de interpretar
        // // Por lo que tenbemos que interpretar los datos de la db 

        // //Con doc.data() permite interpretar esos datos
        // const userStudent = doc.data();

        // //Ya podemos ver la info de cada uno de los usuarios
        // //Guardaremos el usuario en un state  
        // // Ya tenemos el usuario

        // //console.log(user)

        // //Establecemos el setUser con sus parametros a recibir:
        // setUserStudent({

        //     //Le pasamos todos los datos que tenga el usuario + adicional le pasamos los datos de user
        //     ...userStudent,

        //     // El usuario que estas recibiendo de firebase guardalo en el state de react
        //     // Y ya podriamos mostrarlos en pantalla con value={user.value }
        //     id: doc.id
        // });

        // // Lo ponemos cuando queremas que renderice algo, validamos con el if y carga
        // setLoading(false)


    };

    useEffect(() => {

        // Aqui obtenemos el id que estamos recibiendo desde props
        //getUserId(props.route.params.userId)
        //Problema, tenemos que interpretar la informacion del doc

        const { userId } = props.route.params;
        getUserId(userId);
    }, [])


    // Función para eliminar un registro del usuario:

    const deleteUser = async () => {

        //---> ACTUALIZACIÓN MODULAR DE FIREBASE 2024 - ELIMINAR UN REGISTRO HEHCO POR EL USUARIO EN LA BD
        try {
            const docRef = doc(db, 'ListAssignatures', props.route.params.userId);
            await deleteDoc(docRef);
            alert("Asignatura eliminada con éxito.")
            props.navigation.navigate('StudentsList');
        } catch (error) {
            console.error("Error deleting document: ", error);
        }

        //Realizará una consulta a firebase
        // Para eliminar, le paso el doc doc(props.route.params.userId)
        //y de este doc viene (props.route.params.userId) el id de userId

        // const dbRef = db.collection('ListAssignatures').doc(props.route.params.userId);

        // //Una vez encontrado, borralo
        // await dbRef.delete();

        // //Una vez borrado me enviará a userList, otra vez

        // props.navigation.navigate("StudentsList")

    }

    // ------------------------Función para actualizar la información del usuario -------------------------


    const updateUser = async () => {

        //---> ACTUALIZACIÓN MODULAR DE FIREBASE 2024 - ACTUALIZAR LA INFORMACIÓN DE UN REGISTRO <------------
        try {
            const docRef = doc(db, 'ListAssignatures', userStudent.id);

            await setDoc(docRef, {
                nombreProfesor: userStudent.nombreProfesor,
                nombre_materia: userStudent.nombre_materia,
                calif1: userStudent.calif1,
                calif2: userStudent.calif2,
                calif3: userStudent.calif3,
            });

            setUserStudent(studentValues);

            alert('Información Actualizada');

            props.navigation.navigate('StudentsList');

        } catch (error) {
            console.error("Error al actualizar la información: ", error);
        }

        //Realizamos una consulta firebase
        // Podemos obtener el id del usuario a través del estado de user.id ó
        // props.route.params.userId
        // const dbRef = db.collection('ListAssignatures').doc(userStudent.id);

        // //Realizamos un upset desde el dbRef
        // //Con .set realizaremos un update en los posibles campos 
        // await dbRef.set({

        //     nombreProfesor: userStudent.nombreProfesor,
        //     nombre_materia: userStudent.nombre_materia,
        //     calif1: userStudent.calif1,
        //     calif2: userStudent.calif2,
        //     calif3: userStudent.calif3,
        // })

        // //Mandamos a actualizar el estado de los campos a su estado inicial
        // setUserStudent(studentValues)

        // //Una vez actualizado el usuario, volvemos a la lista de usuarios:

        // alert("Información Actualizada")

        // props.navigation.navigate("StudentsList")
    }

    
    //Creamos función para confirmar si se desea eliminar o no la persona ----------------------

    const openConfirmationAlert = () =>{
        Alert.alert('Eliminar asignatura:' + " " + userStudent.nombre_materia, '¿Estás seguro?',[

            {text: "Si", onPress:()=> deleteUser()},
            {text: "No", onPress:()=>alert("Operación cancelada")}
        ])
    }

    //Si carga la app, regresa el loading si no regresa el form 
    if(loading){
        return(
    
            <View>
    
                <ActivityIndicator size='large' color='red'/>
    
            </View>
        )
    }

    const handleChangeText = (name, value) =>{

        //Copia el estado inicial de lso demás valores y actualiza un campo en específico
        //Sin perder o borrar las de mpas variables del estado
        setUserStudent({...userStudent, [name]: value});
    };


    return (
        <>

        <View style={styles.vistaG}>

            <View style={styles.vista}>
                <Text style={styles.title}>Editar información de la asignatura</Text>

            </View>

            <View style={styles.vistaG2}>
                <View style={styles.vistaS}>

                </View>

            <TextInput
                
                style={styles.input}
                placeholder = "Ingrese nombre del profesor..."
                placeholderTextColor = "white"
                value={userStudent.nombreProfesor}
                onChangeText={(value)=>handleChangeText("nombreProfesor",value)}
            
            />

            <TextInput
                
                style={styles.input}
                placeholder = "Ingrese nombre de la materia..."
                placeholderTextColor = "white"
                value={userStudent.nombre_materia}
                onChangeText={(value)=>handleChangeText("nombre_materia",value)}
            
            />
            <View style={styles.vistaCalificaciones}>
            <TextInput
                
                style={styles.input3}
                placeholder = "Calif. 1..."
                keyboardType = "numeric"
                placeholderTextColor = "white"
                maxLength={3}

                value={userStudent.calif1}
                onChangeText={(value)=>handleChangeText("calif1",value)}
            
            />

            <TextInput
                
                style={styles.input3}
                placeholder = "Calif. 2..."
                placeholderTextColor = "white"
                keyboardType = "numeric"
                value={userStudent.calif2}
                maxLength={3}

                onChangeText={(value)=>handleChangeText("calif2",value)}
            
            />

            <TextInput
                
                style={styles.input3}
                placeholder = "Calif. 3..."
                keyboardType = "numeric"
                placeholderTextColor = "white"
                maxLength={3}

                value={userStudent.calif3}
                onChangeText={(value)=>handleChangeText("calif3",value)}
            
            />

            </View> 

            <TouchableOpacity  onPress = {updateUser}>
                <Text style={styles.btnText}>Actualizar información</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress = {openConfirmationAlert}>
                <Text style={styles.btnText2}>Eliminar asignatura</Text>
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
        padding: 5
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
            height:360,
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
    
        btnText:{
            padding:10,
            margin: 10,
            color:"white",
            fontSize: 15,
            fontWeight:"bold",
            backgroundColor:"#088A4B",
            borderRadius:10,
            borderColor:"#2EFE2E",
            textAlign:'center',
            borderWidth:2,
        },
        btnText2:{
            padding:10,
            margin:10,
            color:"white",
            fontSize: 15,
            fontWeight:"bold",
            backgroundColor:"#610B21",
            borderRadius:10,
            borderColor:"#FF0040",
            textAlign:'center',
            borderWidth:2,
        },
    
})
