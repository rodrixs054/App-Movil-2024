import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View , Button, Image, Alert, TextInput, TouchableOpacity} from 'react-native'

//---------------------Importamos componentes ---------------------------
// import firebase from '../src/utils/firebase'
// import 'firebase/firestore'


//---> ACTUALIZACIÓN MODULAR DE FIREBASE 2024 <------------------------//
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../src/utils/firebase'; 

//-----------------------------------------------------------------------

//----------------------------------------Componentes extras-----------------------------
//importamos el picker de selección npm install @react-native-picker/picker --save
import { Picker } from '@react-native-picker/picker'

//-----------------------------------------------------------------------------------------------------------------------------
export default function AddTask(props) {

    // const db = firebase.firestore(firebase)

    //---> ACTUALIZACIÓN MODULAR DE FIRESTORE 2024 <----------------------------
    // Inicializar Firestore
    const db = getFirestore(app);

    const [tareas, setTareas] = useState(TareaValue)
    //Función para los valores de interés... ---------------------------------------------
    const TareaValue={
        
        titulo:"",
        descripcion:"",
        dia:"",
        mes:"",
        año:"",
        valor:""      
    }


    //Seteamos los valores del picker....
    const [pickerValue, setPickerValue] = useState("")

    //Creamos el estado de los errores ---------------------------------------------
    const [formError , setFormError] = useState({})

    //-------------------------------------------------------------------------------



    //-----------------------------------------------------------------------------
    //Creamos la función para añadir las tareas del alumno a la BD:
    const AddTask = async() =>{

        let errors ={};
        //Validamos los campos vacios...
        if(!tareas.titulo  || !tareas.descripcion ||  !tareas.valor ||  !tareas.dia || !tareas.mes || !tareas.año){
                
            if(!tareas.titulo) errors.titulo = true;
            if(!tareas.descripcion) errors.descripcion = true;
            if(!tareas.dia) errors.dia = true;
            if(!tareas.mes) errors.mes = true;
            if(!tareas.año) errors.año = true;
            if(!tareas.valor) errors.valor = true;
            

            alert("Campos vacios")

        }else{
            //Si no hay campos vacios, agregue la info a la BD-------------

            try{

                //--> ACTUALIZACIÓN MODULAR DE FIRESTORES 2024 <-------------//
                // Guardar en Firestore
                await addDoc(collection(db, 'taskList'), {
                    titulo: tareas.titulo,
                    descripcion: tareas.descripcion,
                    dia: tareas.dia,
                    mes: tareas.mes,
                    año: tareas.año,
                    valor: tareas.valor
                //---------------------------------------------------------------//
                //Comenzamos a utilizar firebase " db " para guardar la info
                // Usamos el metodo db, creamos una collección llamada cumpleañeros
                // Añadimos un objeto
                // await db.collection('taskList').add({
                    //Las propiedades de esos objetos son:
                    
                    // titulo:tareas.titulo,
                    // descripcion:tareas.descripcion,
                    // dia:tareas.dia,
                    // mes:tareas.mes,
                    // año:tareas.año,
                    // valor:tareas.valor,
                //--------------------------------------------------------------//
                })
                //console.log(state)
                alert('Nueva tarea guardada con éxito');
                props.navigation.navigate("TaskList")

                }catch(error){
                    console.log(error)
                }

        }
        
        setFormError(errors)
        console.log(errors)
    }

    const changeWindow = () =>{
        props.navigation.navigate("TaskList")


    }



    return (
        <>
        
        <View style={styles.vistaG} >

            <Text style={styles.btnText}>Añade tus tareas por hacer</Text>
            
            {/* <Image style={styles.logo} source={require("../assets/escribiendo.png")} /> */}

        <View style={styles.vistaG2}>

            <TextInput
                
                style={[styles.input , formError.titulo && styles.error]}
                placeholder = "Título de la tarea."
                placeholderTextColor = "white"
                onChangeText={(text)=>setTareas({...tareas,titulo:text})}
            
            />

            
            <TextInput
                
                style={[styles.input , formError.descripcion && styles.error]}
                placeholder = "Descripción de la tarea."
                placeholderTextColor = "white"
                onChangeText={(text)=>setTareas({...tareas,descripcion:text})}
            
            />

            <View style={styles.vistaFecha}>
                
                <TextInput
                    
                    style={[styles.input3 , formError.dia && styles.error]}
                    placeholder = "Día"
                    maxLength={2}

                    keyboardType = "numeric"
                    placeholderTextColor = "white"
                    onChangeText={(text)=>setTareas({...tareas,dia:text})}
                
                />

                <TextInput
                    
                    style={[styles.input3 , formError.mes && styles.error]}
                    placeholder = "Mes"
                    maxLength={2}
                    keyboardType = "numeric"
                    placeholderTextColor = "white"
                    onChangeText={(text)=>setTareas({...tareas,mes:text})}
                
                />

                <TextInput
                    
                    style={[styles.input3 , formError.año && styles.error]}
                    maxLength={4}
                    placeholder = "Año"
                    keyboardType = "numeric"
                    placeholderTextColor = "white"
                    onChangeText={(text)=>setTareas({...tareas,año:text})}
                
                />



            </View>




            <View style={[styles.input, formError.valor && styles.error]}>
                <Picker
                        style={[styles.inputPickerS, formError.valor && styles.error]}
                    
                        selectedValue={pickerValue}   // Asegura que el valor seleccionado sea el del estado pickerValue
                        onValueChange={(itemValue)=>{
                            setPickerValue(itemValue);  // Actualiza el estado pickerValue
                            setTareas({...tareas,valor:itemValue}) // También actualiza el valor en tareas
                        }}
                    >

                        <Picker.Item  label="Valor de tarea" value={''} />
                        <Picker.Item label="Alta" value={"Alta"} />
                        <Picker.Item label="Media" value={"Media"} />
                        <Picker.Item label="Baja" value={"Baja"} />

                </Picker>

            </View>




            <TouchableOpacity  onPress = {AddTask}>
                <Text style={styles.btnText2}>Añadir nueva tarea</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress = {changeWindow}>
                <Text style={styles.btnText3}>Lista de tareas por hacer</Text>
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
        padding:5,
        color:"white",
        fontSize: 18,
        fontWeight:"bold",
        textAlign:'center',
        margin:10
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
        alignItems:"center",
        backgroundColor:"#164146",
        borderColor:"#fff",
        width:"95%",
        height:460,
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

    btnText2:{
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
