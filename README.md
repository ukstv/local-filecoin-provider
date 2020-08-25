# Local Filecoin Provider

Based on [Filecoin Wallet Provider](https://github.com/openworklabs/filecoin-wallet-provider) by OpenWorkLabs.

Usage:

```typescript
import { LocalFilecoinProvider } from "@ukstv/local-filecoin-provider";
const secp256k1Key =
  "7b2254797065223a22736563703235366b31222c22507269766174654b6579223a2257587362654d5176487a366f5668344b637262633045642b31362b3150766a6a504f3753514931355031343d227d";
const provider = new LocalFilecoinProvider(secp256k1Key, true);
const accounts = await provider.getAccounts(); // ["t17lxg2i2otnl7mmpw2ocd6o4e3b4un3272vny6ka"]
const address = accounts[0];
const sig = await provider.sign(address, {
  from: address,
  to: address,
  value: "0",
  method: 0,
  gasPrice: "1",
  gasLimit: 1000,
  nonce: 0,
  params: "",
}); // Get signature
```
