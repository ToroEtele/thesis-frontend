import Link from "next/link";

const styles = {
  menu: "flex items-center",
  menu__logo: "pr-[10%] mr-[10%] font-semibold text-[200%] logo",
  menu__item: "p-[2%] uppercase font-semibold cursor-pointer text-[#777e90]",
};

const Menu = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.menu__logo}>UBB</div>
      {["", "verify", "shop", "about"].map((item) => {
        return (
          <Link href={`/${item}`} key={item} className={styles.menu__item}>
            {item == "" ? "home" : item}
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
