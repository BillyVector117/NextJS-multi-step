'use client'
import { useStepperWizardContext } from '@/context/useStepperWizard'
import React, { Dispatch, SetStateAction } from 'react'
import { useFormik } from 'formik';
import { IUser, useUserContext } from '@/context/useUserInfo';


const validate = (values: { fullName: string | any[]; phoneNumber: string | any[]; email: string; }) => {
    interface IError {
        fullName?: string
        phoneNumber?: string
        email?: string
    }
    const errors: IError = {
    };
    if (!values.fullName) {
        errors.fullName = 'Must be at least 2 characters';
    } else if (values.fullName.length < 2) {
        errors.fullName = 'Must be at least 2 characters';
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = 'Enter a valid phone number';
    } else if (values.phoneNumber.length < 10) {
        errors.phoneNumber = 'Enter a valid phone number';
    }

    if (!values.email) {
        errors.email = 'Invalid email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

const PersonalInfo = () => {
    const { stepperWizardValue, setStepperWizardValue } = useStepperWizardContext()
    const { userInfoValues, setUserInfoValues }: { userInfoValues: IUser, setUserInfoValues: Dispatch<SetStateAction<IUser>> } = useUserContext()

    const handleNextStep = () => {
        setStepperWizardValue({ ...stepperWizardValue, selectedStep: 2 })
    }
    const formik = useFormik({
        initialValues: {
            fullName: userInfoValues.fullName,
            email: userInfoValues.email,
            phoneNumber: userInfoValues.phoneNumber
        },
        validate,
        onSubmit: values => {
            setUserInfoValues({
                ...userInfoValues, fullName: values.fullName,
                email: values.email,
                phoneNumber: values.phoneNumber
            })
            // Go next step
            handleNextStep()
        },
    });
    return (
        <div className="flex items-center justify-center p-12 rounded">
            <div className="mx-auto w-full max-w-[850px]">
                <span className='font-bold text-zinc-800'>Personal Information</span>
                <form onSubmit={formik.handleSubmit} className='justify-center ' >
                    <div className="-mx-3 flex flex-wrap pt-9">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    htmlFor="fullName"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    *Full name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Billy Rodriguez ..."
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    onChange={formik.handleChange}
                                    value={formik.values.fullName}
                                />

                                {formik.errors.fullName ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.fullName}</div> : null}
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    htmlFor="email"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    *Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Billy.rodriguez.morales@outlook.com ..."
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                {formik.errors.email ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.email}</div> : null}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="w-full justify-center self-center align-middle px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    *Phone Number ()
                                </label>
                                <input
                                    type="tel"
                                    pattern="[0-9]{10}"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="5524206617..."
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    onChange={formik.handleChange}
                                    value={formik.values.phoneNumber}
                                />
                                {formik.errors.phoneNumber ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.phoneNumber}</div> : null}

                            </div>
                        </div>

                    </div>

                    <div>
                        <div className="flex justify-between pt-8">
                            <button
                                className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                disabled>
                                Prev
                            </button>
                            <button
                                disabled={!formik.values.fullName || !formik.values.phoneNumber || !formik.values.email}
                                className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="submit">
                                Next
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PersonalInfo