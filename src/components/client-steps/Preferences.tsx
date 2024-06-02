'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Checkbox from '../common/Checkbox'
import { useStepperWizardContext } from '@/context/useStepperWizard'
import { IUser, useUserContext } from '@/context/useUserInfo'
import { Field, FormikProvider, useFormik } from 'formik';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

const validate = (values: {
    checkBoxNotification: string; knownServices: string; checkBoxAgreeTerms: string;
}) => {
    interface IError {
        checkBoxNotification?: string
        knownServices?: string
        checkBoxAgreeTerms?: string
    }
    const errors: IError = {
    };

    if (!values.knownServices) {
        errors.knownServices = 'This field is required';
    }

    if (!values.checkBoxAgreeTerms) {
        errors.checkBoxAgreeTerms = 'Agree terms and conditions is required';
    }

    return errors;
};

const Preferences = () => {
    const router = useRouter()
    const { stepperWizardValue, setStepperWizardValue } = useStepperWizardContext()
    const { userInfoValues, setUserInfoValues }: { userInfoValues: IUser, setUserInfoValues: Dispatch<SetStateAction<IUser>> } = useUserContext()
    const [disableButtons, setDisableButtons] = useState(false)

    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch(stepperWizardValue.isPersonal ? 'https://run.mocky.io/v3/892bc38b-c7e2-4432-a478-2eac4df57942' : ' https://run.mocky.io/v3/e1724715-51d4-4ed2-b20f-cd3c59659e47', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const res: any = await response.json()
            if (res.status == "success") {
                toast(res.message)
                setDisableButtons(true)
                setTimeout(() => {
                    router.push(`/summary`)
                }, 3000);
            }
        } catch (error) {
            console.error('Error fetching the countries:', error);
        }
    }
    const handlePrevStep = () => {
        setStepperWizardValue({ ...stepperWizardValue, selectedStep: 4 })
    }

    const formik = useFormik({
        initialValues: {
            checkBoxNotification: userInfoValues.checkBoxNotification,
            knownServices: userInfoValues.knownServices,
            checkBoxAgreeTerms: userInfoValues.checkBoxAgreeTerms,
        },
        validate,
        onSubmit: values => {
            setUserInfoValues({
                ...userInfoValues, checkBoxNotification: values.checkBoxNotification.length <= 0 ? "" : "true",
                knownServices: values.knownServices,
                checkBoxAgreeTerms: "true",
            })
            const dataToSend: any = {
                "full_name": userInfoValues.fullName,
                "email": userInfoValues.email,
                "phone_number": userInfoValues.phoneNumber,
                "street_address": userInfoValues.streetAddress,
                "city": userInfoValues.city,
                "postal_code": userInfoValues.postalCode,
                "country": userInfoValues.country,
                "username": userInfoValues.username,
                "password": userInfoValues.password,
                "confirm_password": userInfoValues.confirmPassword,
                "profile_type": userInfoValues.userProfile,
                "personal_info": {
                    "date_of_birth": userInfoValues.dateOfBirth,
                    "gender": userInfoValues.gender,
                },
                "business_info": null,
                "notifications": values.checkBoxNotification.length <= 0 ? false : true,
                "how_heard": values.knownServices,
                "terms_agreed": true
            }
            handleSubmit(dataToSend)
        },
    });

    return (
        <div className="flex items-center justify-center p-12">
            <ToastContainer />
            <div className="mx-auto w-full max-w-[550px]">
                <span className='font-bold text-zinc-800'>Preferences</span>
                <form onSubmit={formik.handleSubmit}>
                    <FormikProvider value={formik}>
                        <div className="w-full flex justify-center items-end  mb-5 pt-8">
                            <label
                                htmlFor="checkBoxNotification"
                                className="mb-3 block text-base font-bold text-[#07074D]"
                            >
                                Would you like to receive notifications via email?
                            </label>
                            <Checkbox name='checkBoxNotification' />
                            {formik.errors.checkBoxNotification ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.checkBoxNotification}</div> : null}

                        </div>
                        <div className="mb-5 w-full flex flex-col items-center pt-8">
                            <label htmlFor="knownServices" className="mb-3 block text-base font-bold text-[#07074D]">
                                *How did you hear about our service?:
                            </label>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center">
                                    <Field
                                        type="radio"
                                        name="knownServices"
                                        id="radioButton1"
                                        className="h-5 w-5"
                                        value='Online Ads'
                                    />
                                    <label
                                        className="pl-3 text-base font-medium text-[#07074D]"
                                    >
                                        Online Ads
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <Field
                                        type="radio"
                                        name="knownServices"
                                        id="radioButton2"
                                        className="h-5 w-5"
                                        value=' Friend Referral'
                                    />
                                    <label
                                        className="pl-3 text-base font-medium text-[#07074D]"
                                    >
                                        Friend Referral
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <Field
                                        type="radio"
                                        name="knownServices"
                                        id="radioButton3"
                                        className="h-5 w-5"
                                        value='Social Media'
                                    />
                                    <label
                                        className="pl-3 text-base font-medium text-[#07074D]"
                                    >
                                        Social Media
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <Field
                                        type="radio"
                                        name="knownServices"
                                        id="radioButton4"
                                        className="h-5 w-5"
                                        value='Other'
                                    />
                                    <label
                                        className="pl-3 text-base font-medium text-[#07074D]"
                                    >
                                        Other
                                    </label>
                                </div>
                                {formik.errors.knownServices ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.knownServices}</div> : null}

                            </div>
                        </div>
                        <div className="w-full flex justify-center items-end mb-5 pt-8 ">
                            <label
                                htmlFor="checkBoxAgreeTerms"
                                className="mb-3 block text-base font-bold text-[#07074D]"
                            >
                                *I agree to the terms and conditions
                            </label>
                            <Checkbox name='checkBoxAgreeTerms' />
                            {formik.errors.checkBoxAgreeTerms ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.checkBoxAgreeTerms}</div> : null}

                        </div>
                        <div>
                            <div className="flex justify-between pt-8">
                                <button
                                    disabled={disableButtons}
                                    className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    onClick={handlePrevStep}>
                                    Prev
                                </button>
                                <button
                                    disabled={formik.values.checkBoxAgreeTerms.length <= 0 || !formik.values.knownServices/*  || disableButtons */}
                                    className="select-none rounded-lg bg-green-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-900/10 transition-all hover:shadow-lg hover:shadow-green-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="submit">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </FormikProvider>
                </form>
            </div>
        </div>
    )
}

export default Preferences