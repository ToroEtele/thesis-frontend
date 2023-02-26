import { useState } from "react"

import { useWeb3Provider } from "../Web3Context/Web3Context";
import { ResultSheet } from "../components";

const styles = {
    verify: 'pt-[6%] px-[13%] bg-[#21243C]',
    verify__search: 'w-full h-[20%] bar z-20',
    verify__results: 'w-full h-[80%] py-[5%] flex flex-col items-center',

    form: 'w-full h-full p-[5%] flex items-center justify-between',
    input: 'w-[60%] inp2 title',
    button: 'flex items-center py-[0.5%] px-[2%] border border-white rounded-3xl border-2 font-semibold text-white',
    text: 'text-white font-semibold'
  }

const Verify = () => {
    const [user, setUser] = useState({});

    const {verifyByID, verifyByAddress} = useWeb3Provider();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const input = document.querySelector('#address').value;
        if(!document.querySelector('#method').checked){
            if(input.match(/^0x[a-fA-F0-9]{40}$/g)) {
                setUser(await verifyByAddress(input))
                document.querySelector('#address').value = '';
            } else {
                if(input.match(/^[0-9]{13}$/g)) {
                    document.querySelector('#address').value = '';
                }
            }
        } else {
            setUser(await verifyByID(input));
            document.querySelector('#address').value = '';
        }
    }

  return (
    <div className={styles.verify} >
        <div className={styles.verify__search}>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
                <input type="text" className={styles.input} id='address'/>

                <div className="flex flex-row items-center">
                    <p className={styles.text}>Search by:  ADDRESS</p>
                    <label className="switch mx-4">
                        <input type="checkbox" className="inp" name="method" id="method"/>
                        <span className="slider round"></span>
                    </label>
                    <p className={styles.text}>CNP</p>
                </div>

                <input className={styles.button} type='submit' onSubmit={handleSubmit} value='Search'/>
            </form>
        </div>

        <div className={styles.verify__results}>
            <ResultSheet user={user}/>
        </div>
    </div>
  )
}

export default Verify