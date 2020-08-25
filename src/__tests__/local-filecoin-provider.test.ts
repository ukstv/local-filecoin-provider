import { LocalFilecoinProvider } from "../local-filecoin-provider";

const secp256k1Key =
  "7b2254797065223a22736563703235366b31222c22507269766174654b6579223a2257587362654d5176487a366f5668344b637262633045642b31362b3150766a6a504f3753514931355031343d227d";

describe("secp256k1", () => {
  const provider = new LocalFilecoinProvider(secp256k1Key, true);
  test("#getAccounts", async () => {
    const accounts = await provider.getAccounts();
    expect(accounts).toEqual(["t17lxg2i2otnl7mmpw2ocd6o4e3b4un3272vny6ka"]);
  });
  test("#sign", async () => {
    const accounts = await provider.getAccounts();
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
    });
    expect(sig).toMatchSnapshot();
  });
});
