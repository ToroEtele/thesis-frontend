import Head from 'next/head'

import { Navbar, HomeContent } from '../components';

const styles = {
  app: 'w-screen h-screen pb-[6%] pt-[8%] px-[13%] flex flex-col bg-[#21242c]',
}

export default function Home() {
  return (
    <div className={styles.app}>
      <div className='app__effect z-0'/>
      {/* <Navbar/> */}
      <HomeContent />
    </div>
  )
}
