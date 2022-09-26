import styles from '../projects/ProjectForm.module.css'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'


import {useState} from 'react'

function ServiceForm({handleSubmit, btntext, projectData}){

    const [service, setService] = useState();


    function Submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]:e.target.value})
    }

    return(
        <form onSubmit={Submit} className={styles.form} action="">
            <Input type="text" text="Nome do serviço" name="name" placeholder="Insira o nome do serviço" handleOnChange={handleChange}/>
            <Input type="number" text="Custo do serviço" name="cost" placeholder="Insira o valor total" handleOnChange={handleChange}/>
            <Input type="text" text="Descrição do serviço" name="description" placeholder="Escreva o serviço" handleOnChange={handleChange}/>
            
            <SubmitButton text={btntext}/> 
        </form>
    )
}

export default ServiceForm