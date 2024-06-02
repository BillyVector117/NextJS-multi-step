'use client'
import { createContext, useContext, useState } from "react"
export const defaultUserContextData = {
    fullName: '',
    email: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: '',
    username: '',
    password: '',
    confirmPassword: '',
    userProfile: '',
    dateOfBirth: '',
    gender: '',
    companyName: '',
    companySize: '',
    roleInCompany: '',
    checkBoxNotification: '',
    knownServices: '',
    checkBoxAgreeTerms: '',
}
export const UserContext = createContext<any>({
    fullName: '',
    email: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: '',
    username: '',
    password: '',
    confirmPassword: '',
    userProfile: '',
    dateOfBirth: '',
    gender: '',
    companyName: '',
    companySize: '',
    roleInCompany: '',
    checkBoxNotification: '',
    knownServices: '',
    checkBoxAgreeTerms: '',

})
export interface IUser {
    fullName: '',
    email: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: '',
    username: '',
    password: '',
    confirmPassword: '',
    userProfile: '',
    dateOfBirth: '',
    gender: '',
    companyName: '',
    companySize: '',
    roleInCompany: '',
    checkBoxNotification: string,
    knownServices: '',
    checkBoxAgreeTerms: string,
}
export const UserInfoProvider = ({ children }: any) => {
    const [userInfoValues, setUserInfoValues] = useState<IUser>({
        fullName: '',
        email: '',
        phoneNumber: '',
        streetAddress: '',
        city: '',
        postalCode: '',
        country: '',
        username: '',
        password: '',
        confirmPassword: '',
        userProfile: '',
        dateOfBirth: '',
        gender: '',
        companyName: '',
        companySize: '',
        roleInCompany: '',
        checkBoxNotification: '',
        knownServices: '',
        checkBoxAgreeTerms: '',

    })
    return <UserContext.Provider value={{ userInfoValues, setUserInfoValues }}>{children}</UserContext.Provider>
}
export const useUserContext = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('UserContext must be used inside CartProvider')
    }
    return context
}
