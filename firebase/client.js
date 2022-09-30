import * as firebase from "firebase/app"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { useState, useEffect } from "react"
import { getUser } from "../utils"

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
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

  const createUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  const signMeOut = async () => {
    await signOut(auth)
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
  }
}
