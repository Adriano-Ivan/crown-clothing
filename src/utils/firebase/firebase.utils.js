import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect,
     signInWithPopup, GoogleAuthProvider,
    createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB8m_aUn8lxnXxucZfRMrktRwv_oOLX_tw",
    authDomain: "crown-clothing-db-142d7.firebaseapp.com",
    projectId: "crown-clothing-db-142d7",
    storageBucket: "crown-clothing-db-142d7.appspot.com",
    messagingSenderId: "289984125378",
    appId: "1:289984125378:web:553ef25f9064bcf07b1e5b"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async(
    userAuth,
    additionalInformation={displayName:'mike'}
) => {

    if(!userAuth) return;

    const userDocRef = doc(db,'users',userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });

        }catch(error){
           
            console.log('error creating the user', error.message);
        }   
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email,password)=>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);

}

export const signInAuthUserWithEmailAndPassword = async(email, password)=>{
    if(!email || !password) return;

    const userCredential =await signInWithEmailAndPassword(auth, email,password);

    return userCredential;
}