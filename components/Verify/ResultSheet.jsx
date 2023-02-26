const styles = {
  result_sheet: "h-[60vw] w-[42.45vw] box",
  result_body: "relative h-[80%] w-[100%] p-[5%]",
  result_main:
    "h-[100%] w-[100%] p-[5%] flex flex-col items-center border-x border-t border-black border-x-4 border-t-4",
  result_title:
    "h-[30] w-[100%] flex flex-row items-center justify-center text-center font-bold text-[6vh]",
  result_name:
    "h-[20%] w-[50%] flex flex-row justify-center items-center text-center font-bold text-[3vh] border-t border-[rgb(33,191,150)] border-t-8",
  result_content:
    "h-[50%] w-[100%] felx flex-col text-center items-center font-bold text-[2vh]",
  result_footer: "h-[20%] w-[100%] flex flex-col items-center bg-[#041836]",
  result_logo:
    "relative top-[-10vh] h-[20vh] w-[20vh] flex flex-row align-center justify-center bg-white p-[4px] rounded-[50%]",
  footer_up: "absolute right-[10%] mt-[5%] text-[3vh] text-white font-semibold",
  footer_down:
    "absolute w-full bottom-[5%] flex flex-row justify-between items-end px-[10%] text-white font-semibold",
  corner_left: "absolute top-0 left-0 h-[8%] w-[8%] bg-white",
  corner_right: "absolute top-0 right-0 h-[8%] w-[8%] bg-white",
};

const ResultSheet = ({ user }) => {
  const status = user.name ? (
    user.learnings[0].state == 0 ? (
      <p className="text-green-600 text-xl">Active</p>
    ) : user.learnings[0].state == 1 ? (
      <p className="text-red-600 text-xl">Suspended</p>
    ) : (
      <p className="text-blue-600 text-xl">Finished</p>
    )
  ) : (
    ""
  );

  return (
    <div className={styles.result_sheet}>
      <div className={styles.result_body}>
        <div className={styles.corner_left}></div>
        <div className={styles.corner_right}></div>
        <div className={styles.result_main}>
          <div className={styles.result_title}>
            <h1>
              Certificate of Student <br /> Identification
            </h1>
          </div>
          <div className={styles.result_name}>
            <h1>
              Proudly presented to <br />
              <span className="text-[4vh]">
                {user.name ? user.name : "Firstname Lastname"}
              </span>
            </h1>
          </div>
          <div className={styles.result_content}>
            <h1 className="mb-[2%] mt-[4%]">
              For being part of the community of{" "}
              <span className="text-[2.5vh] text-[rgb(33,191,150)]">
                {" "}
                Babeș-Bolyai University
              </span>
              , <br /> at faculty of:{" "}
              <span className="text-[rgb(33,191,150)] text-[2.5vh]">
                {user.name ? user.learnings[0].faculty : "no faculty found"}
              </span>
            </h1>
            <h1 className="mb-[2%]">
              The studied specialization is:{" "}
              <span className="text-[2.5vh] text-[rgb(33,191,150)]">
                {user.name
                  ? user.learnings[0].specialization
                  : "no specialization found"}
              </span>
            </h1>
            <h1 className="mb-[4%]">
              The current status is:
              {status}
            </h1>
            <h1 className="text-[rgb(33,191,150)] text-[2.5vh]">{user.id}</h1>
            <p className="mb-[2%] text-[1.5vh] text-gray-500">(CNP)</p>
            <h1 className="text-[rgb(33,191,150)] text-[2.5vh]">
              {user.walletAddress}
            </h1>
            <p className="mb-[2%] text-[1.5vh] text-gray-500">(address)</p>
          </div>
        </div>
      </div>
      <div className={styles.result_footer}>
        <div className={styles.result_logo}>
          <img
            src="/ubb.png"
            alt="ubb"
            className="bg-[rgb(33,191,150)] rounded-[50%]"
          />
        </div>
        <div className={styles.footer_up}>2020 | 09 | 29</div>
        <div className={styles.footer_down}>
          <h1 className="text-[3vh]">
            University of <br /> Babeș-Bolyai
          </h1>
          <h1 className="text-[2vh]">identification.ubb.ro</h1>
        </div>
      </div>
    </div>
  );
};

export default ResultSheet;
