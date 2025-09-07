import {Connection } from "mongoose"

declare global {
    var mongoose :{
        Type: any
        conn:Connection | null,
        promise : promise<Connection> | null
    }
}

export {}