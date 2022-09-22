import {useEffect, useState} from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit,btnText,projectData}){

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(()=>{
        fetch("http://localhost:5000/categories",{
        method:"GET",
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then((resp)=> resp.json())
    .then((data)=> {
        setCategories(data);
    })
    .catch(err=> console.log(err))
    }, [])


    const submit = (e)=>{
        e.preventDefault();
        handleSubmit(project)
        //console.log(project)
    }
    
    function handleChange(e){
        setProject({ ...project,[e.target.name]: e.target.value})
    }

     
    function handleCategory(e){
        setProject({ 
            ...project, 
            category:{
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
        },
    })

    }

    return (
        <form onSubmit={submit} className={styles.form} action="">
            <Input value={project.name ? project.name: ''} type="text" name="name" text="Nome do projeto" placeholder={"digite o nome do projeto"} handleOnChange={handleChange}/>

            <Input value={project.budget ? project.budget: ''} type="number" name="budget" text="Orçamento do projeto" placeholder={"digite o orçamento total"} handleOnChange={handleChange} />


            <Select value={project.category?project.category.id : ''} name="category_id" text="Selecione a categoria" handleOnChange={handleCategory} options={categories} />

            <SubmitButton text={btnText}/>
            
        </form>
    )
}

export default ProjectForm