import signingTools from "@zondax/filecoin-signing-tools";
import type {
  ExtendedKey,
  MessageParams,
  TransactionSignResponse,
} from "@zondax/filecoin-signing-tools";

export class LocalFilecoinProvider {
  readonly #privateKey: ExtendedKey;

  constructor(privateKey: string, testnet = true) {
    const buf = Buffer.from(privateKey, "hex");
    const json = JSON.parse(buf.toString());
    this.#privateKey = signingTools.keyRecover(json.PrivateKey, testnet);
  }

  async getAccounts(): Promise<string[]> {
    return [this.#privateKey.address];
  }

  async newAccount(): Promise<void> {
    throw new Error(`Not supported: LocalFilecoinProvider.newAccount`);
  }

  async sign(
    from: string,
    message: MessageParams
  ): Promise<TransactionSignResponse> {
    if (from === this.#privateKey.address) {
      return signingTools.transactionSign(
        message,
        this.#privateKey.private_hexstring
      );
    } else {
      throw new Error(`Can only sign with address ${this.#privateKey.address}`);
    }
  }
}
