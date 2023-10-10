import { Service } from "typedi";

//this service is a decryption service
@Service()
export class EncryptDecryptService {
	async encrypt(text: string): Promise<string> {
		return new Buffer(text, "utf-8").toString("base64");
	}
	async decrypt(text: string): Promise<string> {
		return new Buffer(text, "base64").toString("utf-8");
	}
}
