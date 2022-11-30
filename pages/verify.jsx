import { Result } from "../components"

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
  return (
    <div className={styles.verify}>
        <div className='app__effect z-0'/>
        <div className={styles.verify__search}>
            <form action="" className={styles.form}>
                <input type="text" className={styles.input}/>

                <div className="flex flex-row items-center">
                    <p className={styles.text}>Search by:  ADDRESS</p>
                    <label className="switch mx-4">
                        <input type="checkbox" className="inp"/>
                    <span className="slider round"></span>
                    </label>
                    <p className={styles.text}>CNP</p>
                </div>

                <button className={styles.button}>Search</button>

            </form>
        </div>
        <div className={styles.verify__results}>
            <Result/>
        </div>
    </div>
  )
}

export default Verify