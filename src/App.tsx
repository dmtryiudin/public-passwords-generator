import { useState } from "react";
import CryptoJs from "crypto-js";
import HEX from "crypto-js/enc-hex";
import { ImagePassword } from "./components";
import { imagePasswordToString } from "./utils/imagePasswordToString";
import styles from "./styles.module.css";
import { getPasswordsVariants } from "./utils/getPasswordsVariants";

function App() {
  const [imagePasswordState, setImagePasswordState] = useState<boolean[][]>([]);
  const [secret, setSecret] = useState<string>("");
  const [serviceURL, setServiceURL] = useState<string>("");
  const [serviceLogin, setServiceLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hashGamma = (gamma: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = gamma;

        for (let i = 0; i < 100_000; i++) {
          result = HEX.stringify(CryptoJs.SHA3(result));
        }

        resolve(result);
      }, 0);
    });
  };

  const generatePassword = async () => {
    setIsLoading(true);
    const serviceData = `${serviceURL}.${serviceLogin}`;
    const secretServiceData = HEX.stringify(
      CryptoJs.HmacSHA3(serviceData, secret)
    );

    const imagePasswordString = imagePasswordToString(imagePasswordState);

    const imageSecretServiceData = HEX.stringify(
      CryptoJs.HmacSHA3(secretServiceData, imagePasswordString)
    );

    const hashedGamma = await hashGamma(imageSecretServiceData);

    setPassword(hashedGamma);
    setIsLoading(false);
  };

  const disabled = Boolean(password || isLoading);

  return (
    <>
      <div>
        <label>Secret</label>
        <br />
        <textarea
          disabled={disabled}
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className={styles.input}
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        />
      </div>
      <br />
      <div>
        <label>Image secret</label>
        <ImagePassword
          disabled={disabled}
          state={imagePasswordState}
          setState={setImagePasswordState}
        />
      </div>
      <br />
      <div>
        <label>Service main page URL (without https://)</label>
        <br />
        <input
          disabled={disabled}
          value={serviceURL}
          onChange={(e) => setServiceURL(e.target.value)}
          className={styles.input}
          placeholder="mail.google.com"
        />
      </div>
      <br />
      <div>
        <label>Service login</label>
        <br />
        <input
          disabled={disabled}
          value={serviceLogin}
          onChange={(e) => setServiceLogin(e.target.value)}
          className={styles.input}
          placeholder="test.user@gmail.com"
        />
      </div>
      <br />
      {password ? (
        getPasswordsVariants(password).map((el) => {
          return (
            <>
              {el}
              <br />
            </>
          );
        })
      ) : (
        <button disabled={disabled} onClick={generatePassword}>
          {isLoading ? "Loading..." : "Generate password"}
        </button>
      )}
    </>
  );
}

export default App;
