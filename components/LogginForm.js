import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

//--------------Importamos Componentes------------------------------------
import {validateEmail} from '../src/utils/validations'

// import firebase from '../src/utils/firebase'
// import 'firebase/auth'

// -----> ACTUALIZACIÓN MODULAR DE FIREBASE 2024 <-----//
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../src/utils/firebase'; // Importamos la inicialización de Firebase

//------------------------------------------------------------------------//


export default function LogginForm(props) {
    //Para cargar o conectar, usamos la función singInWithEmailAndPassword
    //Le mandamos la propiedad de la función 
    const{changeForm} = props;

    //Pasamos los parámetros de email y password------------------------
    const [formData , setFormData] = useState(defaultValue())

    function defaultValue(){
        return{
            email:"",
            password:"",
        };
    }
    //--------------------------------------------------------------------
    //Para los errores

    const [formError , setFormError] = useState({})

    //Para el login del user obtener los usuarios registrados...
    const{setUser,...user} = props;

    //--> MODULO DE FIREBASE 2024 (AUTENTICACIÓN):
    const auth = getAuth(firebaseApp);

    //Función para sing In
    const singIn = async ()=>{
        //Validamos que los datos estén bien escritos*****************************

        let errors ={};

        if(!formData.email || !formData.password){
            //Campos vacios-----------------------------------
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;
            alert("Campos vacios")


        }else if(!validateEmail(formData.email)){
            //Comprueba que el correo este bien escrito
            errors.email = true;
            alert("Formato de correo electrónico incorrecto")

        }else if(formData.password.length <6){
            // Comprobamos que la contraseña tenga más de 6 caracteres
            errors.password = true;
            alert("La longitud de la contraseña debe ser mayor a 6 caracteres")

        }else if(user.email || user.password == false ){
            //¿Quien tiene la información de los usuarios registrados en la BD...
            // user, setUser

            //Si la contraseña o el email están no corresponder a la info de BD
            alert("La constraseña o el correo electrónico son incorrectos")
            errors.email = true;
            errors.password = true;

        }else{
            //Si la contraseña y el correo están bien escritos, entonces accedes a tu cuenta

            // firebase
            // .auth()
            // .signInWithEmailAndPassword(formData.email, formData.password)
            // .then(()=>{
            //     console.log("Accediendo...")
            //     alert("Bienvenido")
            // })
            // .catch(()=>{
            //     setFormError({
            //         email:true,
            //         password:true,
            //     })
            // })
            //Iniciamos sesión y entramos a la app para usarla            
            //console.log("Accediste a tu cuenta")

            
            //-->ACTUAIZACIÓN MODULAR DE FIREBASE 2024 (AUTENTICACIÓN):
            // Autenticación con Firebase

            try {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
                
                    console.log("Accediendo...");
                    alert("Bienvenido", "Has iniciado sesión correctamente.");

            } catch (error) {

                    console.error("Error al iniciar sesión:", error);
                    setFormError({
                    email: true,
                    password: true,

                });
                alert("Error", "Correo electrónico o contraseña incorrectos.");
            }
        }

        
        setFormError(errors)
        console.log(errors)

    }


    return (
        <>
        <View>



            </View>




            <View style={styles.vista2}>

            <Text style={styles.title}>Gestor de asignaturas</Text>

            <TextInput
                
                style={[styles.input , formError.email && styles.error]}
                placeholder = "Correo electrónico"
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


             
                <TouchableOpacity  onPress = {singIn}>
                    <Text style={styles.btnText}>Iniciar Sesión</Text>
                </TouchableOpacity>


                <TouchableOpacity  onPress = {changeForm}>
                  <Text style = {styles.btnTextR}>¿Nuevo usuario? Registrate</Text>
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
        marginBottom:15

    },

    btnTextR:{
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        color:"white",
        fontSize: 20,
        fontWeight:"bold",
        backgroundColor:"#008000",
        borderRadius:10,
        borderColor:"#7CFC00",
        textAlign:'center',
        borderWidth:2,
    },

    input:{
        color:"white",
        width: "80%",
        marginBottom: 25,
        backgroundColor:"#045FB4",
        padding:12,
        borderRadius:10,
        fontSize: 20,
        borderWidth: 2,
        borderColor: "#2EFEF7"
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
        marginTop:30,
        marginBottom:15,
    },
    
    title:{
        textAlign:"center",
        fontSize: 20,
        fontWeight:"bold",
        color:"#fff",
        padding:10
    },

    vista2:{
        backgroundColor:"#828282",
        padding:15,
        width:"100%",
        height:"45%",
        alignItems:"center",
        margin:10
    }
    
    
})
