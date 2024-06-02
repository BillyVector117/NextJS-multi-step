import { useStepperWizardContext } from '@/context/useStepperWizard'
import { IUser, useUserContext } from '@/context/useUserInfo';
import { Field, FormikProvider, useFormik } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react'

const validate = (values: { username: string; password: string; confirmPassword: string; userProfile: string; }) => {
    interface IError {
        username?: string
        password?: string
        confirmPassword?: string
        userProfile?: string
    }
    const errors: IError = {
    };
    if (!values.username) {
        errors.username = 'Username is required';
    } else if (values.username.length < 3) {
        errors.username = 'Enter a valid username';
    }

    if (!values.password) {
        errors.password = 'Enter a password';
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
        errors.password = 'Minimum eight characters, at least one letter and one number';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Verify your confirmed password';
    }

    if (!values.userProfile) {
        errors.userProfile = 'User profile is required';
    }

    return errors;
};

const AccountInfo = () => {
    const { stepperWizardValue, setStepperWizardValue } = useStepperWizardContext()
    const { userInfoValues, setUserInfoValues }: { userInfoValues: IUser, setUserInfoValues: Dispatch<SetStateAction<IUser>> } = useUserContext()

    const handleNextStep = (userProfile: string) => {
        setStepperWizardValue({ ...stepperWizardValue, selectedStep: 4, isPersonal: userProfile == 'Personal' ? true : false })
    }
    const handlePrevStep = () => {
        setStepperWizardValue({ ...stepperWizardValue, selectedStep: 2 })
    }
    const formik = useFormik({
        initialValues: {
            username: userInfoValues.username,
            password: userInfoValues.password,
            confirmPassword: userInfoValues.confirmPassword,
            userProfile: userInfoValues.userProfile
        },
        validate,
        onSubmit: values => {
            setUserInfoValues({
                ...userInfoValues, username: values.username,
                password: values.password,
                confirmPassword: values.confirmPassword,
                userProfile: values.userProfile
            })
            // Go next step
            handleNextStep(values.userProfile)
        },
    });
    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
                <span className='font-bold text-zinc-800'>Account Details</span>

                <form onSubmit={formik.handleSubmit}>
                    <FormikProvider value={formik}>

                        <div className="-mx-3 flex flex-wrap pt-9">
                            <div className="w-full px-3 ">
                                <div className="mb-5">
                                    <label
                                        htmlFor="username"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        *Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="BillyVector117 ..."
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                    />
                                    {formik.errors.username ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.username}</div> : null}

                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="password"

                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        *Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Strong Password ..."
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                    {formik.errors.password ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.password}</div> : null}

                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        *Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        placeholder="Confirming password ..."
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmPassword}
                                    />
                                    {formik.errors.confirmPassword ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.confirmPassword}</div> : null}

                                </div>
                            </div>
                        </div>
                        <div className="mb-5 w-full flex flex-col items-center">
                            <label htmlFor="userProfile" className="mb-3 block text-base font-medium text-[#07074D]">
                                *User Profile
                            </label>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center">
                                    <Field
                                        type="radio"
                                        name="userProfile"
                                        id="userProfile"
                                        className="h-5 w-5"
                                        value={'Personal'}
                                    />
                                    <label
                                        className="pl-3 text-base font-medium text-[#07074D]"
                                    >
                                        Personal
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <Field
                                        type="radio"
                                        name="userProfile"
                                        id="userProfile"
                                        className="h-5 w-5"
                                        value={'Business'}
                                    />
                                    <label
                                        className="pl-3 text-base font-medium text-[#07074D]"
                                    >
                                        Business
                                    </label>
                                </div>
                                {formik.errors.userProfile ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.userProfile}</div> : null}

                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between pt-8">
                                <button
                                    className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    onClick={handlePrevStep}>
                                    Prev
                                </button>
                                <button
                                    disabled={!formik.values.username || !formik.values.password || !formik.values.confirmPassword || !formik.values.userProfile}
                                    className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="submit">
                                    Next
                                </button>
                            </div>
                        </div>
                    </FormikProvider>
                </form>
            </div>
        </div>
    )
}

export default AccountInfo