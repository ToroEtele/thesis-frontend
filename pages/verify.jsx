import { useState } from "react"

import { Result } from "../components"
import { getStudentByAddress, getStudentByCNP } from "../utils/public_methods"

const styles = {
    verify: 'w-screen h-screen pt-[6%] px-[13%] flex flex-col bg-[#21242c]',
    verify__search: 'w-full h-[20%] bar z-10',
    verify__results: 'w-full h-[80%] px-[10%] py-[5%]',
    form: 'w-full h-full p-[5%] flex items-center justify-between',
    input: 'w-[60%] inp2 title',
    button: 'flex items-center py-[0.5%] px-[2%] border border-white rounded-3xl border-2 font-semibold text-white',
    text: 'text-white font-semibold'
  }

const Verify = () => {
    const [user, setUser] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const input = document.querySelector('#address').value;

        if(!document.querySelector('#method').checked){
            if(input.match(/^0x[a-fA-F0-9]{40}$/g)) {
                console.log('Hello');
                getStudentByAddress(setUser, input);
                document.querySelector('#address').value = '';
            } else {
                if(input.match(/^[0-9]{13}$/g)) {
                    document.querySelector('#address').value = '';
                }
            }
        } else {
            getStudentByCNP(setUser, input);
            document.querySelector('#address').value = '';
        }
    }

  return (
    <div className={styles.verify}>
        <div className='app__effect z-0'/>
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
            <Result user={user}/>
        </div>
    </div>
  )
}

export default Verify