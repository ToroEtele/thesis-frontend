import Card from '../Card'

const styles = {
  conteiner: 'z-0 h-[100%] w-[50%] py-[10%] pl-[5%] ',
}

const CardContainer = () => {
  return (
    <div className={styles.conteiner}>
      <Card/>
    </div>
  )
}

export default CardContainer