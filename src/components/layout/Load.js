import styles from './Load.module.css'
import load from "../../img/loading.svg"
function Load(){
    return(
        <div className={styles.loader_container}>
            <img className={styles.loader} src={load} alt="loading" />
        </div>
    )
}

export default Load