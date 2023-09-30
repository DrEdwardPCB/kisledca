import { Service } from "typedi";
import { hash, compare } from "bcryptjs";
@Service()
export class EncryptCompareService {
	async encrypt(text: string): Promise<string> {
		return await hash(text, 10);
	}
	async compare(text: string, cipher: string): Promise<boolean> {
		return await compare(text, cipher);
	}
}
