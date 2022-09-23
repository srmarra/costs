import styles from './Project.module.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Load from '../layout/Load';
import Container from '../layout/Container';
function Project(){
    const {id} = useParams();
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(()=>{
        setTimeout(() =>{
            fetch(`http://localhost:5000/projects/${id}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            },
        }).then(resp=> resp.json())
        .then((data)=>{
            setProject(data)
        }).catch(err=>console.log(err));
    }, [id])
        }, 500)

    function togglProjectForm(){
        setShowProjectForm(!showProjectForm)
    }
    return(
        <>
            {project.name ? (
            <div className={styles.project_datails}>
                <Container customClass="colum">
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={togglProjectForm}>{!showProjectForm ? 'Editar projeto' : 'Fechar'}</button>
                        {!showProjectForm ? (
                               <div className={styles.project_info}>
                                <p>
                                <span>Categoria:</span>{project.category.name}
                                </p>
                                <p>
                                <span>Total Orçamento:</span>{project.budget}
                                </p>
                                <p>
                                <span>Total Utilizado:</span>{project.cost}
                                </p>
                               </div> 
                        ) : (
                            <div className={styles.project_info}>
                                <p>Destalhes do projeto</p>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
               
            ):(
                <Load/>
        )}
        </>
    )
}

export default Project