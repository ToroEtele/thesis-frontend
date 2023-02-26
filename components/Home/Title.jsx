import Link from 'next/link'
import React from 'react'

const styles = {
    container: 'h-[100%] w-[50%] flex flex-col justify-center z-20',
    container__title: 'w-fit text-[200%] font-bold text-white p-[2%] bg-[#171917] m-1 title',
    container__description: 'p-4 text-[#777e90] mb-[5%]',
    container__verify: 'self-start ml-3 px-4 py-2 text-white font-bold text-2xl bg-[rgb(33,191,150)] rounded-xl cursor-pointer	',
}

const Title = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.container__title}>Decentralized Identification System</h1>
        <h1 className={styles.container__title}>For Univesity of Babes Bolyai</h1>
        <p className={styles.container__description}>Ubb Card is a decentralised, smart-contract based application living on the Ethereum blockchain. You can easily access your student card by connecting to your ETH wallett, or verify other students based on their CNP or wallett address at the verify page.</p>
        <Link href='/verify' className={styles.container__verify}>
        Verify a student
        </Link>
    </div>
  )
}

export default Title