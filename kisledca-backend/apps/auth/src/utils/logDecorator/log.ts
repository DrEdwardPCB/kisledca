import { mapValues } from "lodash";
import { LogLevel } from "./useLogger";
import { Logger } from "winston";

export interface ILogOption {
	name: string;
	level?: LogLevel;
	errorHandle?: (logger: Logger, name: string, e?: unknown) => void;
	metadata?: Record<string, string | { (): string }>;
}
export function log({ name, level, metadata, errorHandle }: ILogOption) {
	return function (
		target: Object,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const original = descriptor.value;

		descriptor.value = function (...args: any[]) {
			const actualLogger = Reflect.getMetadata(
				"logDecoratorLogger",
				target.constructor
			);
			const actualLevel =
				level ??
				Reflect.getMetadata("logDecoratorLevel", target.constructor);
			const preCompiledMetadata = Object.assign(
				{},
				metadata,
				Reflect.getMetadata("logDecoratorMetaData", target.constructor)
			);
			const actualMetadata = mapValues(preCompiledMetadata, (val) => {
				if (typeof val === "string") {
					return val;
				}
				return val();
			});
			const actualErrorHandle =
				errorHandle ??
				Reflect.getMetadata(
					"logDecoratorErrorHandler",
					target.constructor
				);
			try {
				actualLogger[actualLevel](`Starting: ${name}`, actualMetadata);
				actualLogger.debug(`with args ${args}`);
				const result = original.apply(this, args);
				actualLogger[actualLevel](`Finished: ${name}`, actualMetadata);
				actualLogger.debug(`with result ${result}`);
				return result;
			} catch (e: unknown) {
				actualErrorHandle(
					actualLogger,
					name,
					e as Error,
					actualMetadata
				);
			}
		};
		return descriptor;
	};
}
export function logAsync({ name, level, metadata, errorHandle }: ILogOption) {
	return function (
		target: Object,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const original = descriptor.value;

		descriptor.value = async function (...args: any[]) {
			const actualLogger = Reflect.getMetadata(
				"logDecoratorLogger",
				target.constructor
			);
			const actualLevel =
				level ??
				Reflect.getMetadata("logDecoratorLevel", target.constructor);
			const preCompiledMetadata = Object.assign(
				{},
				metadata,
				Reflect.getMetadata("logDecoratorMetaData", target.constructor)
			);
			const actualMetadata = mapValues(preCompiledMetadata, (val) => {
				if (typeof val === "string") {
					return val;
				}
				return val();
			});
			const actualErrorHandle =
				errorHandle ??
				Reflect.getMetadata(
					"logDecoratorErrorHandler",
					target.constructor
				);

			try {
				actualLogger[actualLevel](`Starting: ${name}`, actualMetadata);
				actualLogger.debug(`with args ${args}`);
				const result = await original.apply(this, args);
				actualLogger[actualLevel](`Finished: ${name}`, actualMetadata);
				actualLogger.debug(`with result ${result}`);
				return result;
			} catch (e: unknown) {
				actualErrorHandle(
					actualLogger,
					name,
					e as Error,
					actualMetadata
				);
			}
		};
		return descriptor;
	};
}
