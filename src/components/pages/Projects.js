import { useLocation } from "react-router-dom"
import Container from '../layout/Container'
import styles from './Projects.module.css'
import LinkButton from "../layout/LinkButton"
import Message from "../layout/Message"
import { useState, useEffect } from "react"
import ProjectCard from "../projects/ProjectCard"
function Projects(){
    const [projects, setProjects] = useState([]);

    const location = useLocation();
    let message = '';
    if(location.state){
        
        message = location.state.message;
    }

    useEffect(() =>{
        fetch('http://localhost:5000/projects',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data =>{
            console.log(data)
            setProjects(data)
        }).catch((err) => console.log(err))
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
            </Container>
        </div>
    )
}

export default Projects