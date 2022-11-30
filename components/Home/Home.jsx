import CardContainer from './CardContainer'
import Title from './Title'

const styles = {
    home: 'w-[100%] h-[100%] flex flex-row'
}

const HomeContent = () => {
  return (
    <div className={styles.home}>
        <Title />
        <CardContainer />
    </div>
  )
}

export default HomeContent