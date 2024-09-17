import React,{useState} from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'
// Regresa el registro o el loging

//---------------------Importamos componentes-------------------------
import LogginForm from './LogginForm'
import RegisterForm from './RegisterForm'

export default function Auth(props) {

    //Variable para determinar si el usuario está o no logueado
    const [islogin , setIsLogin] = useState(true)

    //Función que nos permite cambiar de formulario
    //Si estamos o no logueados dentro de FireBase
    const changeForm = () =>{

        //
        setIsLogin(!islogin);

    };



    return (
<>
        <View style={styles.view}>
            <Image style={styles.logo} source={require("../assets/logo.jpg")} />

            {/*Le mandamos la función como propiedad a LogginForm */}
            {islogin ? (
                <LogginForm changeForm={changeForm}/>) 
            
            : (
                <RegisterForm changeForm={changeForm}/>)}

        </View>
        </>
    )
}

const styles = StyleSheet.create({
    
    view:{
        backgroundColor:"#707070",
        flex: 1,
        alignItems: "center",
    },

    logo:{
        width: "80%",
        height:200,
        marginTop:35,
        borderRadius:20
    },
})
