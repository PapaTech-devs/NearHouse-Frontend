import * as firebase from "firebase/app"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth"
import { useState, useEffect } from "react"
import { getUser } from "../utils"
import { useRouter } from "next/router"

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "nearhouse-6e718.appspot.com",
  messagingSenderId: "673515990511",
  appId: "1:673515990511:web:b36a597a2e8256ce23da1a",
  measurementId: "G-2GL40YGPX7",
}

// if a Firebase instance doesn't exist, create one
firebase.initializeApp(FirebaseCredentials)

const formatAuthUser = async (user) => {
  const tempUser = getUser(user.uid)
  return tempUser
}

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  const router = useRouter()

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    var formattedUser = await formatAuthUser(authState)
    setAuthUser(formattedUser)
    setLoading(false)
  }

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
  }

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)
    return result.user
  }

  const createUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  const signMeOut = async () => {
    await signOut(auth)
    router.push("/")
  }

  // listen for app state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading,
    signIn,
    createUser,
    signMeOut,
    setAuthUser,
    signInWithGoogle,
    resetPassword,
  }
}
