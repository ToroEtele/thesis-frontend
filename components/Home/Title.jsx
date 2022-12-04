import React from 'react'

const styles = {
    container: 'h-[100%] w-[50%] flex flex-col justify-center',
    container__title: 'w-fit text-[200%] font-bold text-white p-[2%] bg-[#171917] m-1 title',
    container__description: 'p-4 text-[#777e90]'
}

const Title = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.container__title}>Decentralized Identification System</h1>
        <h1 className={styles.container__title}>For Univesity of Babes Bolyai</h1>
        <p className={styles.container__description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, laborum laudantium! Autem totam aperiam possimus voluptates repellendus sint explicabo rerum laudantium dolore amet, est optio aliquid quaerat recusandae? Reiciendis aliquam, eius, tenetur magnam cupiditate optio culpa voluptatem, aperiam quam eaque quidem consectetur. Quasi commodi, ullam suscipit similique omnis fugiat nesciunt!</p>
    </div>
  )
}

export default Title