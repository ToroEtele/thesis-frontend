import Head from "next/head";

import { HomeContent } from "../components";


const styles = {
  app: "w-screen h-screen pb-[6%] pt-[8%] px-[8%] flex flex-col bg-[#21242c]",
  app__effect: "app__effect z-0",
};

export default function Home() {

  return (
    <div className={styles.app}>
      <Head>
        <title>UBB Card</title>
      </Head>
      <div className={styles.app__effect} />
      <HomeContent />
    </div>
  );
}