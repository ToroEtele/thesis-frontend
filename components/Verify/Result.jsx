import { GoPerson } from 'react-icons/go'

const styles = {
    result: 'w-full h-full py-[4%] flex flex-row border-white border border-4 rounded-xl',
    image: 'w-[30%] h-full text-[1400%] flex items-center justify-center image text-white',
    data: 'px-[10%] py-[1%] text-white',
    label: 'font-semibold text-normal',
    info: 'font-normal text-normal pl-2',
}

const Result = () => {
  return (
    <div className={styles.result}>
        <div className={styles.image}>
            <GoPerson />
        </div>
        <div className={styles.data}>
              <h2 className={styles.label}>Name:</h2>
              <p className={styles.info}>Firstname Lastname</p>
              <h2 className={styles.label}>CNP:</h2>
              <p className={styles.info}>5010324142390</p>
              <h2 className={styles.label}>Address:</h2>
              <p className={styles.info}>0x0000000000000000000000000000000000000000</p>
              <h2 className={styles.label}>Faculty:</h2>
              <p className={styles.info}>Facultatea de Ștințe Economice și Gesiunea Afacerilor</p>
              <h2 className={styles.label}>Specialization:</h2>
              <p className={styles.info}>Business Informatics</p>
              <h2 className={styles.label}>Status:</h2>
              <p className={styles.info}>On going</p>

            </div>
    </div>
  )
}

export default Result