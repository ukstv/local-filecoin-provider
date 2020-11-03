import type {
  ExtendedKey,
  MessageParams,
  TransactionSignLotusResponse,
} from "@zondax/filecoin-signing-tools";

const moduleToImport = process.env.JEST_WORKER_ID
  ? "@zondax/filecoin-signing-tools/nodejs"
  : "@zondax/filecoin-signing-tools";
const signingTools = require(moduleToImport);

export class LocalFilecoinProvider {
  readonly #privateKey: ExtendedKey;

  constructor(privateKey: string, testnet = true) {
    const buf = Buffer.from(privateKey, "hex");
    const json = JSON.parse(buf.toString());
    const keyType = json.Type;
    if (keyType === "bls") {
      this.#privateKey = signingTools.keyRecoverBLS(json.PrivateKey, testnet);
    } else if (keyType === "secp256k1") {
      this.#privateKey = signingTools.keyRecover(json.PrivateKey, testnet);
    } else {
      throw new Error(`Unknown key type: ${keyType}`);
    }
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
  ): Promise<TransactionSignLotusResponse> {
    if (from === this.#privateKey.address) {
      const asString = await signingTools.transactionSignLotus(
        message,
        this.#privateKey.private_base64
      );
      return JSON.parse(asString);
    } else {
      throw new Error(`Can only sign with address ${this.#privateKey.address}`);
    }
  }
}
