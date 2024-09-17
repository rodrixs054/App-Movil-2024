import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View , Alert, TextInput, TouchableOpacity, Image} from 'react-native'
import { ActivityIndicator } from 'react-native'
import { Picker } from '@react-native-picker/picker'


//---------------------------------Importamos nuestros componentes -------------------------
// import firebase from '../src/utils/firebase'
// import 'firebase/firestore'

//-----> ACTUALIZACIÓ´N MODULAR DE FIREBASE/FIRESTORE 2024 <-----------------------------------
import { app } from '../src/utils/firebase';
import { getFirestore, doc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';



export default function TaskDetail(props) {
    //------------------------------------------------------------------------------------------
const [userStudentTask, setUserStudentTask] = useState(studentValuesTask)

//Seteamos los valores del picker....
const [pickerValue, setPickerValue] = useState()

const studentValuesTask = {


    id: '',
    titulo:"",
    descripcion:"",
    dia:"",
    mes:"",
    año:"",
    valor:"" 

}

//Mostrar una pequeña barra de carga si tarda demasiado en cargar los datos
const [loading, setLoading] = useState(true)
// const db = firebase.firestore(firebase)



//--- ACTUALIZACIÓN MODULAR DE FIREBASE/FIRESTORE 2024 <---------------
const db = getFirestore(app);

const getUserId = async (id) => {

//----> ACTUALIZACIÓN DE FIREBASE/FIRESTORE 2024 <---------------
try {
    const docRef = doc(db, 'taskList', id); //--> Se realiza consulta en la BD
    const docSnap = await getDoc(docRef); //--> Trae la consulta con el id la tarea

    if (docSnap.exists()) { //--> Si existe el dato con el id de la tarea, traera toda la información del id correspondiente de la tarea
        const userData = docSnap.data();
        setUserStudentTask({
        ...userData,
        id: docSnap.id,

    });
    } else {
        alert('La información de la tarea no existe'); //--> De lo contrario, la tarea no existe
    }
    setLoading(false);

} catch (error) {
    alert('Ocurrió un error al realizar la consulta:', error);
    setLoading(false);
}
    // Se realiza una consulta a la base de datos db, a la coleccionn users
    //Vamos a buscar un doc a traves del id que le estamos pasando  
    // dbRef es la consulta
    // const dbRef = db.collection('taskList').doc(id)

    //Obtenemos el datos de la consulta
    // const doc = await dbRef.get();

    //Los datos obtenidos en userEffect no son tan facil de interpretar
    // Por lo que tenbemos que interpretar los datos de la db 

    //Con doc.data() permite interpretar esos datos
    // const userStudentTask = doc.data();

    //Ya podemos ver la info de cada uno de los usuarios
    //Guardaremos el usuario en un state  
    // Ya tenemos el usuario

    //console.log(user)

    //Establecemos el setUser con sus parametros a recibir:
    // setUserStudentTask({

        //Le pasamos todos los datos que tenga el usuario + adicional le pasamos los datos de user
        // ...userStudentTask,

        // El usuario que estas recibiendo de firebase guardalo en el state de react
        // Y ya podriamos mostrarlos en pantalla con value={user.value }
        // id: doc.id
    // });

    // Lo ponemos cuando queremas que renderice algo, validamos con el if y carga
};

useEffect(() => {

    // Aqui obtenemos el id que estamos recibiendo desde props
    getUserId(props.route.params.userId)

    //Problema, tenemos que interpretar la informacion del doc
}, [])

//------------------------ Eliminar tareas--------------------------------------------
const deleteUserTask = async () => {

    //--> ACTUALIZACIÓN MODULAR DE FIREBASE/FIRESTORE 2024 <------
    try {

        const docRef = doc(db, 'taskList', props.route.params.userId); //---> Hacemos una consulta en base al id de la tarea
        await deleteDoc(docRef); ///---> Se elimina la tarea en base al id encontrado

        alert("Tarea eliminada con éxito");
        props.navigation.navigate('TaskList');
    } catch (error) {

        alert('Error al eleminar la tarea:', error);
    }

    //Realizará una consulta a firebase
    // Para eliminar, le paso el doc doc(props.route.params.userId)
    //y de este doc viene (props.route.params.userId) el id de userId

    // const dbRef = db.collection('taskList').doc(props.route.params.userId);

    // //Una vez encontrado, borralo
    // await dbRef.delete();

    // //Una vez borrado me enviará a userList, otra vez

    // props.navigation.navigate("TaskList")

}

//------------------------- Actualizar tarea ------------------------------

const updateTask = async () => {

    //----> ACTUALIZACIÓN MODULAR DE FIREBASE/FIRESTORE 2024 <----------
    try {

        const docRef = doc(db, 'taskList', userStudentTask.id); ///---> Se selecciona el registro respecto al id de la tarea
        await setDoc(docRef, { //---> Nos trae toda la información que tiene la tarea seleccionada pra su modificación
            titulo: userStudentTask.titulo,
            descripcion: userStudentTask.descripcion,
            dia: userStudentTask.dia,
            mes: userStudentTask.mes,
            año: userStudentTask.año,
            valor: userStudentTask.valor,
        });

        setUserStudentTask(studentValuesTask); //----> Modificamos los valores del objeto en base a su estado
        alert('Información de la tarea actualizada');
        props.navigation.navigate('TaskList');

    } catch (error) {
        console.error('Error al actualizar la información de la tarea:', error);
    }

    //Realizamos una consulta firebase
    // Podemos obtener el id del usuario a través del estado de user.id ó
    // props.route.params.userId
    // const dbRef = db.collection('taskList').doc(userStudentTask.id);

    // //Realizamos un upset desde el dbRef
    // //Con .set realizaremos un update en los posibles campos 
    // await dbRef.set({

    //     titulo:userStudentTask.titulo,
    //     descripcion:userStudentTask.descripcion,
    //     dia:userStudentTask.dia,
    //     mes:userStudentTask.mes,
    //     año:userStudentTask.año,
    //     valor:userStudentTask.valor 
    // })

    // //Mandamos a actualizar el estado de los campos a su estado inicial
    // setUserStudentTask(studentValuesTask)

    // //Una vez actualizado el usuario, volvemos a la lista de usuarios:

    // alert("Información Actualizada")

    // props.navigation.navigate("TaskList")
}

    //----------------Función para confirmar si se desea eliminar o no la tareas ----------------------

    const openConfirmationAlert = () =>{
        Alert.alert('Eliminar tarea:' + " " + userStudentTask.titulo, '¿Estás seguro?',[

            {text: "Si", onPress:()=> deleteUserTask()},
            {text: "No", onPress:()=>alert("Operación Cancelada")}
        ])
    }

    const handleChangeText = (name, value) =>{

        //Copia el estado inicial de lso demás valores y actualiza un campo en específico
        //Sin perder o borrar las de mpas variables del estado
        setUserStudentTask({...userStudentTask, [name]: value});
    };

    //Si carga la app, regresa el loading si no regresa el form 
    if(loading){
        return(
    
            <View>
    
                <ActivityIndicator size='large' color='blue'/>
    
            </View>
        )
    }

    const cancel = () =>{
        props.navigation.navigate("TaskList")

    }

    return (
        <>

        <View style={styles.vistaG} >
            
            {/* <Image style={styles.logo} source={require("../assets/escribiendo.png")} /> */}

        <View style={styles.vistaG2}>

            <TextInput
                
                style={styles.input}
                placeholder = "Título de la tarea..."
                placeholderTextColor = "white"
                value={userStudentTask.titulo}
                onChangeText={(value)=>handleChangeText("titulo",value)}
            
            />

            <TextInput
                
                style={styles.input}
                placeholder = "Añade una descripción..."
                placeholderTextColor = "white"
                value={userStudentTask.descripcion}
                onChangeText={(value)=>handleChangeText("descripcion",value)}
            
            />

            
       

            <View style={styles.vistaFecha}>
                

                <TextInput
                
                style={styles.input3}
                placeholder = "Día"
                maxLength={2}

                keyboardType = "numeric"
                placeholderTextColor = "white"
                value={userStudentTask.dia}
                onChangeText={(value)=>handleChangeText("dia",value)}
            
                />



                <TextInput
                
                style={styles.input3}
                placeholder = "Mes"
                keyboardType = "numeric"
                maxLength={2}

                placeholderTextColor = "white"
                value={userStudentTask.mes}
                onChangeText={(value)=>handleChangeText("mes",value)}
            
                />

                <TextInput
                
                style={styles.input3}
                placeholder = "Año"
                maxLength={4}

                keyboardType = "numeric"
                placeholderTextColor = "white"
                value={userStudentTask.año}
                onChangeText={(value)=>handleChangeText("año",value)}
            
                />



            </View>




            <View style={styles.input}>
                <Picker
                        style={styles.inputPickerS}
                    
                        selectedValue={userStudentTask.valor}
                        onValueChange={(value)=>handleChangeText("valor", value)}
                    >

                        <Picker.Item  label="Valor de la tarea..." value={''} />
                        <Picker.Item label="Alta" value={"Alta"} />
                        <Picker.Item label="Media" value={"Media"} />
                        <Picker.Item label="Baja" value={"Baja"} />

                </Picker>

            </View>


            {/* */}

            <TouchableOpacity  onPress = {updateTask}>
                <Text style={styles.btnText}>Actualizar información de la tarea</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress = {openConfirmationAlert}>
                <Text style={styles.btnText2}>Eliminar tarea de la lista</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress = {cancel}>
                <Text style={styles.btnText3}>Cancelar acción</Text>
            </TouchableOpacity>

        </View>


        </View>

        </>

    )
}

const styles = StyleSheet.create({
    vista2:{
        backgroundColor:"#585858",
        width:"100%",
        height:"30%",
        alignItems:"center",
        borderRadius: 40,
        borderColor: "#909497",
        borderWidth:2

    },

    // logo:{
    //     objectFit:"cover",
    //     width: 300,
    //     borderRadius:5,
    //     padding:10,
    //     height:200,
    //     margin:10
    // },

    btnText:{
        padding:10,
        margin:10,
        color:"white",
        fontSize: 15,
        fontWeight:"bold",
        backgroundColor:"#088A4B",
        borderRadius:10,
        borderColor:"#2EFE2E",
        textAlign:'center',
        borderWidth:2,
        width:"100%", 
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
        width:"100%", 

    },
    btnText3:{
        margin:10,
        padding: 10,
        color:"white",
        fontSize: 15,
        fontWeight:"bold",
        backgroundColor:"#154360",
        borderRadius:10,
        borderColor:"#5DADE2",
        textAlign:'center',
        borderWidth:2,
    },

    vistaG2:{
        marginTop:10,
        alignItems:"center",
        backgroundColor:"#164146",
        borderColor:"#fff",
        width:"95%",
        height:540,
        borderWidth:2,
        borderRadius:5,
        padding:10
    },
    input:{
        color:"white",
        width: "85%",
        margin:10,
        padding:10,
        backgroundColor:"#036670",
        borderRadius:10,
        fontSize: 15,
        borderWidth: 2,
        borderColor: "#08e9ff",
        fontWeight:"bold"

    },

    inputPickerS:{
        color:"#fff"
    },
    error:{
        borderColor:"#940c0c",
        borderWidth:2
    },

    vista:{
        marginTop:10,
        marginBottom:15,
        backgroundColor:"#B404AE",
        borderRadius:40,
        borderColor:"#2ECCFA",
        borderWidth:2,
        width:"100%",

        
    },
    vistaG:{
        backgroundColor:"#144146",
        width:"100%",
        height:"100%",
        alignItems:"center",
        padding:10

    },

    vistaFecha:{
        flexDirection:"row"

    },

    input3:{
        color:"white",
        width: "25%",
        margin:10,
        padding:10,
        backgroundColor:"#036670",
        borderRadius:10,
        fontSize: 15,
        borderWidth: 2,
        borderColor: "#08e9ff",
        fontWeight:"bold"

    },

})
