import { useState } from "react";
import CryptoJs from "crypto-js";
import Base64 from "crypto-js/enc-base64";

const suffixes = ["...19$dI", ".19$dI", ".RhZm9156^f$a12"];

function App() {
  const [secret, setString] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const hashPasswordGamma = (): Promise<string> => {
    return new Promise((res) => {
      setTimeout(() => {
        const passwordGamma = CryptoJs.HmacSHA3(`${service}.${login}`, secret);
        let passwordTmpValue = Base64.stringify(passwordGamma);

        for (let i = 0; i < 1_000_000; i++) {
          const nextHashStep = CryptoJs.SHA3(passwordTmpValue);
          passwordTmpValue = Base64.stringify(nextHashStep);
        }

        res(passwordTmpValue);
      }, 0);
    });
  };

  const generatePassword = async () => {
    setLoading(true);

    const passwordTmpValue = await hashPasswordGamma();

    setPassword(passwordTmpValue.slice(0, 14));
    setLoading(false);
  };

  return (
    <>
      <div>
        <label>Secret</label>
        <br />
        <input
          disabled={!!password}
          placeholder="Your secret"
          value={secret}
          onChange={(e) => setString(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label>Service main page URL (no https://)</label>
        <br />
        <input
          disabled={!!password}
          placeholder="web.telegram.org"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label>Login</label>
        <br />
        <input
          disabled={!!password}
          placeholder="test@gmail.com"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <br />
      <button disabled={!!password} onClick={generatePassword}>
        {isLoading ? "Loading" : "Generate password"}
      </button>
      <br />
      <br />
      {password
        ? suffixes.map((el) => <div key={el}>{password + el}</div>)
        : null}
    </>
  );
}

export default App;
