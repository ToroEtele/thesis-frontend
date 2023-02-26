import Menu from './Menu.jsx';
import Connect from './ConnectMoralis';

const styles = {
  navbar: 'absolute w-full flex justify-between py-[2%] px-[8%] text-white z-10'
}

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Menu />
      <Connect />
    </div>
  )
}

export default Navbar