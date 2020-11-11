import type {
  ExtendedKey,
  MessageParams,
  TransactionSignLotusResponse,
} from "@zondax/filecoin-signing-tools";
import type { WalletSubProvider } from "@glif/filecoin-wallet-provider";
import { Network } from "@glif/filecoin-wallet-provider";
import * as bytes from "uint8arrays";

const moduleToImport = process.env.JEST_WORKER_ID
  ? "@zondax/filecoin-signing-tools/nodejs"
  : "@zondax/filecoin-signing-tools";
const signingTools = require(moduleToImport);

export class LocalFilecoinProvider implements WalletSubProvider {
  readonly #privateKey: ExtendedKey;

  constructor(privateKey: string, network: Network = Network.MAIN) {
    const buf = bytes.fromString(privateKey, "base16");
    const json = JSON.parse(bytes.toString(buf));
    const keyType = json.Type;
    const isTestnet = network === Network.TEST;
    if (keyType === "bls") {
      this.#privateKey = signingTools.keyRecoverBLS(json.PrivateKey, isTestnet);
    } else if (keyType === "secp256k1") {
      this.#privateKey = signingTools.keyRecover(json.PrivateKey, isTestnet);
    } else {
      throw new Error(`Unknown key type: ${keyType}`);
    }
  }

  async getAccounts(): Promise<string[]> {
    return [this.#privateKey.address];
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
