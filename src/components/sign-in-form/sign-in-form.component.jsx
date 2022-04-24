
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import {signInAuthUserWithEmailAndPassword, signInWithGooglePopUp, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-in.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    email:'',
    password:''
}
const SignInForm =()=>{
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const logGoogleUser = async()=>{
        const {user} = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    const resetFields = () =>{
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
            const userCredential = await signInAuthUserWithEmailAndPassword(email, password);
            resetFields();
        }catch(error){
            switch(error.code){
                case 'auth/user-not-found':
                    alert('usuário não encontrado !');
                    break;
                case 'auth/wrong-password':
                    alert('senha incorreta !');
                    break;
                default:
                    alert('houve um erro na autenticação !');
            }
            console.log(error);
        }
    }
    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({
            ...formFields,
            [name]:value
        });

        console.log(formFields);
    }
    return (
        <div class='sign-up-container' >
            <h2>I already have an account ?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={'email'}
                inputOptions={{type:'email',
                value:email,name:'email',onChange:handleChange}}/>
                <FormInput label={'password'}
                inputOptions={{type:'password',
                value:password, name:'password',onChange:handleChange}}/>
                <div class='buttons-container'>
                    <Button type='submit'>SIGN IN</Button>
                    <Button type='button' onClick={logGoogleUser}
                buttonType='google' > GOOGLE SIGN IN</Button>
                </div>

            </form>
         
        </div>
    )
}

export default SignInForm;
