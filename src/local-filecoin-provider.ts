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
  ): Promise<TransactionSignLotusResponse> {
    if (from === this.#privateKey.address) {
      return signingTools.transactionSignLotus(
        message,
        this.#privateKey.private_base64
      );
    } else {
      throw new Error(`Can only sign with address ${this.#privateKey.address}`);
    }
  }
}
