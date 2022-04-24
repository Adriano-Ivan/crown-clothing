
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}
const SignUpForm =()=>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email,password, confirmPassword} = formFields;

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit= async(event)=>{
        event.preventDefault();
  
        if(password !== confirmPassword) {
            alert('As senhas não são iguais !');
            return;
        }
            
      
        if(!email){
            alert('Por favor, disponibilize seu email ! ');
            return;
        }

        try {
            const {user}= await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }catch(error){
            if(error.code === "auth/email-already-in-use"){
                alert('Cannot create user, email already in use !');
            }
            console.log(error);
        }
    }

    const handleChange =(event) =>{
        const {name, value} = event.target;

        setFormFields({
            ...formFields,
            [name]: value
        })
    }
    return (
        <div className='sign-up-container'>
            <h2>Don't have an account ?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={' Display name'} 
                inputOptions={{type:'text', value:displayName, required :true,
                name:'displayName', onChange:handleChange}}/>

                <FormInput label={'Email'} 
                inputOptions={{type:'email', value:email,
                required:true,name:'email',onChange:handleChange}}/>

                <FormInput label={'Password'} 
                inputOptions={{type:'password', value:password,
                required:true,name:'password',onChange:handleChange}}/>

                <FormInput label={'Confirm password'}
                inputOptions={{type:'password',value:confirmPassword,
                required:true, name:'confirmPassword',onChange:handleChange}} />

                <Button type='submit'>
                    Sign Up
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm;