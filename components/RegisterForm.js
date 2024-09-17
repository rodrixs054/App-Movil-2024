import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View , TouchableOpacity, TextInput} from 'react-native'

// --------------------- Importamos Componentes -------------------------
import {validateEmail} from '../src/utils/validations'
// import firebase from '../src/utils/firebase'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../src/utils/firebase'; // Importa la instancia de Firebase inicializada

//-----------------------------------------------------------------------


export default function RegisterForm(props) {
    //Cambiar pantallas si el usuario está logueado
    const {changeForm} = props

        //Guardamos la info de los campos del formulario-------
    // formData tiene un objeto  con 3 atributos
    const [formData , setFormData] = useState(

        defaultValue()
        // {
        //     email:"",
        //     password:"",
        //     repeatPassword:""
        // }
    )
    //Estado para los errores
    const [formError , setFormError] = useState({})

    function defaultValue(){
        return{
            email:"",
            password:"",
            repeatPassword:""
        };
    }

    //----------------------------------------------------
    //---------------------------------------------------
    //Añadimos la colección cumpleaños a las personas registradas:
    
    //Registrar usuarios------------------------------------

    const register = () =>{
        //console.log("Registrando...")
        console.log(formData)

        //Validamos que los datos estén bien escritos*****************************

        let errors ={};

        if(!formData.email || !formData.password || !formData.repeatPassword){
            //Campos vacios
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;
            if(!formData.repeatPassword) errors.repeatPassword = true;
            alert("Debes de rellenar todos los campos");

        }else if(!validateEmail(formData.email)){
            errors.email = true;
            alert("Correo electrónico inválido")
            //Expresiones regulares-------------------------------
            // Lo usammos para validar el de email

            //----------------------------------------------------


        }else if (formData.password !== formData.repeatPassword){
            //Validamos contraseñas sean iguales------------------------
            errors.password = true;
            errors.repeatPassword = true;


        }else if(formData.password.length <6){
            //Validamos el tamaño de la contraseña
            errors.password = true;
            errors.repeatPassword = true;


        }else{
            console.log("Datos correctos...")

            //Registramos usuarios--------------------------------------------
            // createUserWithEmailAndPassword metodo para crear usuarios
            //Esta función regresa una promesa nativa de la función 

        //     firebase
        //     .auth()
        //     .createUserWithEmailAndPassword(formData.email, formData.password)
        //     .then(()=>{
        //         console.log("Cuenta creada...")
        //         alert("Cuenta creada satisfactoriamente")


        //     })
        //     .catch(()=>{
        //         setFormError({
        //             email:true,
        //             password:true,
        //             repeatPassword:true,
        //         })
        //     })
            
        // }

        //----> Actualización modular de firebase 2024:
        
        const auth = getAuth(app); // Inicializa el módulo de autenticación
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then(() => {
                    console.log("Cuenta creada...");
                    alert("Cuenta creada satisfactoriamente");
                })
                .catch(() => {
                    setFormError({
                        email: true,
                        password: true,
                        repeatPassword: true,
                    });
                });
        }

        setFormError(errors)
        console.log(errors)
    }
    //------------------------------------------------------
    //******************************************************** 


    return (
<>
        <Text style={styles.title}>Crea una cuenta para comenzar</Text>
        
        <View style={styles.vista2}>


            <TextInput
                
                style={[styles.input , formError.email && styles.error]}
                placeholder = "Correo Electrónico"
                placeholderTextColor = "white"
                onChangeText={(text)=>setFormData({...formData,email:text})}
            
            />

            <TextInput
                style={[styles.input,  formError.password && styles.error]}
                placeholder = "Contraseña"
                placeholderTextColor = "white"
                secureTextEntry = {true}
                onChangeText={(text)=>setFormData({...formData,password:text})}

            
            />

            <TextInput
                style={[styles.input,  formError.repeatPassword && styles.error]}
                placeholder = "Repetir Contraseña"
                placeholderTextColor = "white"
                secureTextEntry = {true}
                onChangeText={(text)=>setFormData({...formData,repeatPassword:text})}
            
            />


            <TouchableOpacity  onPress = {register}>
                <Text style={[styles.btnText, styles.btn2]}>Registrar cuenta</Text>
            </TouchableOpacity>


            </View>


            <View style={styles.login}> 

                <View style={styles.vista}>
                    <Text style={styles.title}>¿Ya tienes cuenta?</Text>
                </View>


                <TouchableOpacity  onPress = {changeForm}>
                    <Text style={styles.btnText}>Iniciar Sesión</Text>
                </TouchableOpacity>

            </View>


        </>
    )
}

const styles = StyleSheet.create({
    btnText:{
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        color:"white",
        fontSize: 20,
        fontWeight:"bold",
        backgroundColor:"#C2AD0C",
        borderRadius:10,
        borderColor:"#F6E034",
        textAlign:'center',
        borderWidth:2,
    },
    btn2:{
        backgroundColor:"#008000",
        borderColor:"#7CFC00",
    },

    input:{

        padding:10,
        color:"white",
        width: "80%",
        marginBottom: 20,
        backgroundColor:"#045FB4",
        borderRadius:10,
        fontSize: 20,
        borderWidth: 2,
        borderColor: "#2EFEF7"
    },

    login:{
        margin:50, 
    },

    error:{
        borderColor:"#940c0c",
        borderWidth:2
    },

    title:{
        textAlign:"center",
        fontSize: 20,
        fontWeight:"bold",
        color:"#fff",
        margin:5
    },
    vista2:{
        backgroundColor:"#828282",
        width:"100%",
        height:"34%",
        alignItems:"center",
        margin:10,
        padding:10,
    }
    

})
