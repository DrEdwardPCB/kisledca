import { Logger } from "winston";
import "reflect-metadata"
import { defaultErrorHandler } from "./errorHandle";
export enum LogLevel {
    DEBUG="debug",
    INFO="info",
    ERROR="error",
}

export interface IuseLoggerOptions {
    logger:Logger
    level: LogLevel
    errorHandle?:(logger:Logger,name:string,e?:unknown, metadata?:Record<string, string> )=>void
    metadata?: Record<string, string|{():string}>
}
export function useLogger({logger,level,errorHandle, metadata}:IuseLoggerOptions){
    return function (constructor : Function){
        Reflect.defineProperty(constructor,"logDecoratorLogger", logger);
        Reflect.defineProperty(constructor,"logDecoratorLevel", level);
        Reflect.defineProperty(constructor,"logDecoratErrorHandler", errorHandle??defaultErrorHandler)
        Reflect.defineProperty(constructor, "logDecoratorMetaData", metadata??{})
    }
}