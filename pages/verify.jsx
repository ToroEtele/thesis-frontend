import { useState, useEffect } from "react";
import { HiSearch } from "react-icons/hi";

import { useWeb3Provider } from "../Web3Context/Web3Context";
import { ResultSheet } from "../components";

const styles = {
  verify: "pt-[6%] px-[13%] bg-[#21243C]",
  verify__search: "w-full h-[20%] bar z-20",
  verify__seatch_container: "w-full h-full p-[5%] flex justify-center",
  verify__form:
    "w-[600px] h-[40px] px-2 flex flex-row items-center justify-center bg-white rounded-3xl",
  verify__results: "w-full h-[80%] py-[5%] flex flex-col items-center",

  input: "w-[540px] inp2 title",
  verify_button:
    "flex items-center ml-2 p-2  rounded-[50%] font-semibold text-white bg-blue-500",
  text: "text-white font-semibold",
};

const Verify = () => {
  const [user, setUser] = useState({});
  const { verifyByID, verifyByAddress } = useWeb3Provider();

  const handleSwitch = () => {
    if (document.getElementById("method")?.checked) {
      document.getElementById("address").placeholder = "cnp:  ";
    } else {
      document.getElementById("address").placeholder = "address:  ";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = document.querySelector("#address").value;
    if (!document.getElementById("method")?.checked) {
      if (input.match(/^0x[a-fA-F0-9]{40}$/g)) {
        setUser(await verifyByAddress(input));
        document.querySelector("#address").value = "";
      } else {
        if (input.match(/^[0-9]{13}$/g)) {
          document.querySelector("#address").value = "";
        }
      }
    } else {
      setUser(await verifyByID(input));
      document.querySelector("#address").value = "";
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className={styles.verify}>
      <div className={styles.verify__search}>
        <div className={styles.verify__seatch_container}>
          <form
            action=""
            className={styles.verify__form}
            onSubmit={handleSubmit}
          >
            <label className="switch mr-2">
              <input
                type="checkbox"
                className="inp"
                id="method"
                onChange={handleSwitch}
              />
              <span className="slider round"></span>
            </label>

            <input
              type="text"
              className={styles.input}
              id="address"
              placeholder="adress:"
            />
            <button
              className={styles.verify_button}
              type="submit"
              onSubmit={handleSubmit}
            >
              <HiSearch />
            </button>
          </form>
        </div>
      </div>

      <div className={styles.verify__results}>
        <ResultSheet user={user} />
      </div>
    </div>
  );
};

export default Verify;
