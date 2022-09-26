import styles from './Project.module.css'
import {json, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Load from '../layout/Load';
import Container from '../layout/Container';
import ProjectForm from '../projects/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../services/ServicesForm';
import{parse,v4 as uuidv4} from 'uuid'
import ServiceCard from '../services/ServiceCard';

function Project(){
    const {id} = useParams();
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])

    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState();
    const [type, setType] = useState();


    useEffect(()=>{
        setTimeout(() =>{
            fetch(`http://localhost:5000/projects/${id}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            },
        }).then(resp=> resp.json())
        .then((data)=>{
            setProject(data);
            setServices(data.services);
        }).catch(err=>console.log(err));
    }, [id])
        }, 500)

    function editPost(project){
        setMessage('');
        //budget validation
        if(project.budget < project.cost){
            setMessage('Orçamento não pode ser menor que o custo do projeto');
            setType('error');
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(project),
        }).then(resp=> resp.json())
        .then((data)=>{
            setProject(data);
            setShowProjectForm(false)
            setMessage('Projeto atualizado!');
            setType('success');
        }).catch((ex)=>{
            console.log(ex)
        })
        

    }

    function createService(project){

        const lastService = project.services[project.services.length -1]

        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;

        const newCost =parseFloat(project.cost)+parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)){
            setMessage("Orçamento ultrapassado, verifique o valor do serviço");
            setType('error');
            project.services.pop();

            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: "PATCH",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(project)
        }).then(
            (resp)=> resp.json()
        ).then(
            (data)=>{
                setShowServiceForm(false)
                setServices(data.services);
            }
        ).catch(err => console.log(err))
    }

    function removeService(id, cost){
        const servicesUpdate = project.services.filter(
            (services) => services.id !==id
        );

        const projectUpdate = project;
        projectUpdate.services =servicesUpdate 
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdate.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(projectUpdate)
        }).then(
            (resp)=> resp.json
            ).then(
                (data)=>{
                    setProject(projectUpdate)
                    setServices(servicesUpdate)
                    setMessage('Serviço removido com sucesso')
                }
        ).catch(err => console.log(err))
    }

    function togglProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function togglServiceForm(){
        setShowServiceForm(!showServiceForm)
    }
    return(
        <>
            {project.name ? (
            <div className={styles.project_datails}>
                <Container customClass="colum">
                    {message && <Message type={type} msg={message}/>}
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
                                <ProjectForm handleSubmit={editPost} 
                                btnText="Concluir Edição" 
                                projectData={project}/>

                            </div>
                        )}
                    </div>

                    <div className={styles.service_form_container}>
                            <h2>Adicione um serviço</h2>
                            <button className={styles.btn} onClick={togglServiceForm}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar'}</button>
                            <div className={styles.project_info}>
                                {showServiceForm &&(
                                    <ServiceForm handleSubmit={createService} btntext="Adicionar Serviço" projectData={project}/>
                                )
                                }
                            </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass='start'>
                            {services.length > 0 &&
                                services.map((service) =>(
                                    <ServiceCard 
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ) )}
                            {services.length == 0 &&(
                                <p>Não há serviços cadastrados</p>
                            )}

                    </Container>
                </Container>
            </div>
               
            ):(
                <Load/>
        )}
        </>
    )
}

export default Project