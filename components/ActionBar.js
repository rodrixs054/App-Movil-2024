import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

//Importamos componentes---------------------------------------
// import firebase from '../src/utils/firebase';

//--> Actualización modular de Firebase/ Autenticación <-- 2024
import app from '../src/utils/firebase.js'; // Asegúrate de tener la instancia de Firebase inicializada
import { getAuth, signOut } from 'firebase/auth';



export default function ActionBar(props) {
    //Recibimos las probiedads de ActionBar
    const{showList,setShowList}= props;

    //--> Actualización modular de firebase 2024:
    const auth = getAuth(app); // Inicializa el servicio de Firebase Auth

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Sesión cerrada correctamente");
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
            });
    };

    // return (
    //    <View style={styles.viewFooter}>

    //         <View style={styles.viewCloose}>
    //             <Text style={styles.title}
    //             onPress={()=>firebase.auth().signOut()}>Cerrar Sesión</Text>
    //         </View>


    //         <View style={styles.viewCloose2}>
    //             <Text style={styles.title} 
    //             onPress={()=>setShowList(!showList)} >
    //                 {showList ? "Nueva Materia" : "Cancelar acción"}</Text>
    //         </View>

    //     </View>


    // )

    return (
        <View style={styles.viewFooter}>
            <View style={styles.viewCloose}>
                <Text style={styles.title} onPress={handleSignOut}>
                    Cerrar Sesión
                </Text>
            </View>

            <View style={styles.viewCloose2}>
                <Text style={styles.title} onPress={() => setShowList(!showList)}>
                    {showList ? "Añadir asignatura" : "Ver asignaturas"}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title:{
        textAlign:"center",
        fontSize: 15,
        fontWeight:"bold",
        color:"white"
    },


    viewFooter:{
        position:"absolute",
        bottom:0,
        flexDirection:"row",
        width:"100%",
        height:50,
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:30,



    },
    viewCloose:{
        backgroundColor:"#3E2723",
        borderColor:"#FF1744",
        borderWidth:2,
        borderRadius:10,
        paddingVertical:10,
        paddingHorizontal:20,
    },

    viewCloose2:{
        backgroundColor:"#006064",
        borderColor:"#18FFFF",
        borderWidth:2,
        borderRadius:10,
        paddingVertical:10,
        paddingHorizontal:20,

    }

})
