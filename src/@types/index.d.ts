


declare module 'winthor-auth-service' {
   import {Router, RouterOptions} from 'express'
    export function AuthSecurity(): any
    export function Api(options?: RouterOptions): Router
    
}