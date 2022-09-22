import { useLocation } from "react-router-dom"
import Container from '../layout/Container'
import styles from './Projects.module.css'
import LinkButton from "../layout/LinkButton"
import Message from "../layout/Message"
import { useState, useEffect } from "react"
import ProjectCard from "../projects/ProjectCard"
import Load from "../layout/Load"
function Projects(){
    const [projects, setProjects] = useState([]);
    const [removeload, setRemoveLoad] = useState(false);


    const location = useLocation();
    let message = '';
    if(location.state){
        
        message = location.state.message;
    }

    useEffect(() =>{
        setTimeout(()=>{
        fetch('http://localhost:5000/projects',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data =>{
            console.log(data)
            setProjects(data)
            setRemoveLoad(true);
        }).catch((err) => console.log(err))
    },300)
    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar projeto"/>
            </div>            
            {message && <Message msg={message} type="success" />}
            <Container customClass = "start">
                {projects.length > 0 && 
                    projects.map((project) => (
                        <ProjectCard 
                        name={project.name} 
                        id={project.id}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        />
                    ))
                }

                {!removeload && <Load/>}
                {removeload && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Projects