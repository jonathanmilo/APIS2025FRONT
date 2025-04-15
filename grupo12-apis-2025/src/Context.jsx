
import React, { Children } from "react";
import {createContext,useState,useContext} from "react";
import usuarios from '../public/usuarios_datos.json';

const contextoUsuario=React.createContext()
const validacion = React.createContext()

export function cambiarUsuario(){
    return useContext(validacion)
}
export function usarContextoUsuario(){
    return useContext(contextoUsuario)
}
export function Context ({children}){
        const [usuarioRegistrado, registrar]=useState(null)
        const validar =(usuario)=>{
            const usuarioExistente = usuarios.usuarios.filter(
                (u) => u.password === usuario.password && u.mail === usuario.mail 
              );

              if (usuarioExistente.length > 0) {
                registrar(usuarioExistente[0]);
            }

        }

        return(
            <contextoUsuario.Provider value={usuarioRegistrado}>
                <validacion.Provider value={validar}>
                    {children}
                </validacion.Provider>
            </contextoUsuario.Provider>
        )
} 