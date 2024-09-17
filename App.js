
//------------------------> Desarrollada por - Ian Rodrigo López Espinosa <-----------------------------------//

//-----------------------------------------------------------------------------------------
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
//------------------------------------------------------------------------
//-----------------------Importamos firebase-----------------------------
// import firebase from './src/utils/firebase.js'
import app from './src/utils/firebase.js';

//Función para logear Usuarios
// import 'firebase/auth'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//-------------------------------------------------------------------------
//----------------------Componentes adicionales -----------------------------------------------
// 1.- Instalamos el modulo npm install @react-navigation/native para crear multiples screens en nuestra app 
import {NavigationContainer} from '@react-navigation/native'

// 2.- Instalar dependencias para expo con:
// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

//3.- Se crea una función que contendra las múltiples pantallas:
//Regresará un componente que tendremos que instalar como: npm install @react-navigation/stack, lo importamos:

import {createStackNavigator} from '@react-navigation/stack'

const Stack  =  createStackNavigator()


//---------------------------Importamos Componentes -------------------------
import Auth from './components/Auth'
import StudentsList from './components/StudentsList'
import AddAssignature from './components/AddAssignature'
import AssignatureDetails from './components/AssignatureDetails'
import AddTask from './components/AddTask'

import TaskList from './components/TaskList'

import TaskDetail from './components/TaskDetail'





//-------------------------------------------------------------------------------------------------
function MyStack(){

  return(

    // <Stack.Screen/> Se utiliza para crear las distintas pantallas de navegación
    // A cada panatall se le colocará un nombre para que podamos navegar hacia a ellas name =""
      <Stack.Navigator>

        {/*Primer pantalla que visualizará el usuario  con options, permite cambiar el titulo a 
          la screen de la app      
        */}
        <Stack.Screen name ="StudentsList" component={StudentsList} options = {{title: 'Control de asignaturas'} }/>

        <Stack.Screen name = "AddAssignature" component={AddAssignature} options={{title: ""}}/>

        <Stack.Screen name = "AssignatureDetails" component={AssignatureDetails} options={{title: "Detalles de la asignatura"}}/>

        <Stack.Screen name = "AddTask" component={AddTask} options={{title: "Añadir nueva tarea"}}/>

        <Stack.Screen name = "TaskList" component={TaskList} options={{title: "Lista de tareas por hacer"}}/>


        <Stack.Screen name = "TaskDetail" component={TaskDetail} options={{title: "Actualizar información de tareas"}}/>

      </Stack.Navigator>
  )

}


//-------------------------------------------------------------------------------------------------
// export default function App(props) {

//     //Guardamos usuarios ------------------------------------------------

//     const [user , setUser] = useState(undefined);


//     //Utilizamos firebase para verificar si esta autenticado o no ----------------------
//     useEffect(()=>{
//       //Función nos va permitir regresarnos si esta logueado o no, debemos importarla auth
//       //response devuelve el usuario logueado
      
      
//       firebase.auth().onAuthStateChanged(response => {
//       //console.log("Usuario logueado" , response)
  
//       //Guardamos usuario en el setUser---------------------------------------
//         setUser(response)
        
//       })
  
//     },[])

    
  // -------------------------No hay un usuario -----------------------------------------------

  // if (user === undefined) return null;

  // Si hay almenos un usuario, entonces...

//   return (

//     <>

//     <View style={styles.background}>

//       <StatusBar style="auto" />

//       {/*Verificamos que el usuario está o no loguedo ----------------- */}
//       {/* {user ? <Logout/>: <Auth/> } */}
//       {user ? (<StudentsList user={user}/>,
//             <NavigationContainer>
      
//             <MyStack user={user}/>
    
//           </NavigationContainer>) : <Auth/> 
      
    
//       }


//     </View>


//     </>
//   );
// }


//-------------------------------------------------------------------------------------------------
export default function App(props) {
  const [user, setUser] = useState(undefined);

  // Utilizamos Firebase para verificar si el usuario está autenticado o no
  useEffect(() => {
    const auth = getAuth(app); // Inicializa el módulo de autenticación
    const unsubscribe = onAuthStateChanged(auth, (response) => {
      setUser(response);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (user === undefined) return null;

  return (
    <>
      <NavigationContainer>

        <View style={styles.background}>
          <StatusBar style="auto" />
          {user ? (
            <>
                <MyStack user={user} />
            </>
          ) : (
            <Auth />
          )}
        </View>
      </NavigationContainer>
    </>
  );
}


const styles = StyleSheet.create({
  background: {
    backgroundColor:"black",
    height:"100%",

  },

  Bar:{
    backgroundColor:"#71f7"
  },

  close:{
    marginTop:30,
  },
  title:{
    textAlign:"center",
    fontSize: 20,
    fontWeight:"bold",
    color:"#29f11d"
}
});
