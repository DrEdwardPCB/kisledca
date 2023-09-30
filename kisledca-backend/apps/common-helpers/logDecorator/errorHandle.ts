import { Logger } from "winston";

export function defaultErrorHandler(logger:Logger,name:string, e:Error, metadata:Record<string, string> ){
    logger.error(`Error: ${name}, ${JSON.stringify(e)}`, metadata);
}