import { GoPerson } from 'react-icons/go'

const styles = {
    card: 'w-[100%] h-[100%] p-[3%] card text-white font-bold flex flex-row items-center',
    content: 'w-[95%] h-full flex flex-col',
    address: 'text-address -rotate-90 h-[5%] w-[5%] flex items-center justify-center',
    header: 'h-[8%] w-full flex flex-row items-center justify-between px-[4%]',
    title: 'text-2xl',
    design: 'w-[60%] h-[70%] bg-white design',
    inner__content: 'w-full h-full px-[5%] flex flex-row',
    image: 'h-full w-[32%] text-[1000%] flex items-center justify-center',
    data: 'h-full w-[68%] px-[8%] py-[4%]',
    label: 'font-semibold text-xs',
    info: 'font-normal text-xs pl-4',
    university: 'font-normal flex items-center justify-center'
  }

const Card = () => {
  return (
    <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>student card</h1>
            <div className={styles.design}></div>
          </div>

          <div className={styles.inner__content}>
            <div className={styles.image}>
              <GoPerson />
            </div>
            <div className={styles.data}>
              <h2 className={styles.label}>Name</h2>
              <p className={styles.info}>Firstname Lastname</p>
              <h2 className={styles.label}>CNP</h2>
              <p className={styles.info}>5010324142390</p>
              <h2 className={styles.label}>Faculty</h2>
              <p className={styles.info}>Facultatea de Ștințe Economice și Gesiunea Afacerilor</p>
              <h2 className={styles.label}>Specialization</h2>
              <p className={styles.info}>Business Informatics</p>
            </div>
          </div>

          <div className={styles.university}>
            <h2>University of Babeș Bolyai</h2>
          </div>  
        </div>

        <div className={styles.address}>
          <p>0x0000000000000000000000000000000000000000</p>
        </div>
      </div>
  )
}

export default Card