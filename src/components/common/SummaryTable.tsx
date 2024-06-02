'use client'
import { useStepperWizardContext } from '@/context/useStepperWizard'
import { IUser, useUserContext } from '@/context/useUserInfo'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SummaryTable = () => {
    const router = useRouter()
    const { stepperWizardValue } = useStepperWizardContext()
    const { userInfoValues }: { userInfoValues: IUser, setUserInfoValues: Dispatch<SetStateAction<IUser>> } = useUserContext()


    console.log('userInfoValues', userInfoValues)
    console.log('stepperWizardValue', stepperWizardValue)
    useEffect(() => {
      if (userInfoValues.checkBoxAgreeTerms == '') {
          router.push(`/`)
      }
    }, [userInfoValues, router])

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='w-full'>
                        <th scope="col" className="px-6 py-3">
                            User Information
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Full name
                        </th>
                        <td className="px-6 py-4">
                            {userInfoValues.fullName}
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Email
                        </th>
                        <td className="px-6 py-4">
                            {userInfoValues.email}
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Phone Number
                        </th>
                        <td className="px-6 py-4">
                            {userInfoValues.phoneNumber}
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Street Address
                        </th>
                        <td className="px-6 py-4">
                            {userInfoValues.streetAddress}
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            City
                        </th>
                        <td className="px-6 py-4">
                            {userInfoValues.city}
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Postal Code
                        </th>
                        <td className="px-6 py-4">
                            {userInfoValues.postalCode}
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Country
                        </th>
                        <td className="px-6 py-4">
                            {userInfoValues.country}
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Username
                        </th>
                        <td className="px-6 py-4">
                            {userInfoValues.username}
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Profile Type
                        </th>
                        <td className="px-6 py-4">
                            {userInfoValues.userProfile}
                        </td>
                    </tr>
                    {
                        stepperWizardValue.isPersonal ? (
                            <>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Date of Birth
                                    </th>
                                    <td className="px-6 py-4">
                                        {userInfoValues.dateOfBirth}
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Gender
                                    </th>
                                    <td className="px-6 py-4">
                                        {userInfoValues.gender}
                                    </td>
                                </tr>
                            </>
                        ) : (
                            <>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Company Name
                                    </th>
                                    <td className="px-6 py-4">
                                        {userInfoValues.companyName}
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Company Size
                                    </th>
                                    <td className="px-6 py-4">
                                        {userInfoValues.companySize}
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Role In Company
                                    </th>
                                    <td className="px-6 py-4">
                                        {userInfoValues.roleInCompany}
                                    </td>
                                </tr>
                            </>
                        )
                    }
                </tbody>
            </table>
        </div>

    )
}

export default SummaryTable