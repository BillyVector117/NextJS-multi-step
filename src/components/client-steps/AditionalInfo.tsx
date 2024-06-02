import { useStepperWizardContext } from '@/context/useStepperWizard'
import React, { Dispatch, SetStateAction, useState } from 'react'
import GenderDropdown from '../common/GenderDropdown'
import SizeDropdown from '../common/SizeDropdown'
import { IUser, useUserContext } from '@/context/useUserInfo';
import { FormikProvider, useFormik } from 'formik';

const validate = (values: {
    dateOfBirth: string | any[]; gender: string | any[]; companyName: string; companySize: string | any[];
    roleInCompany: string | any[]; isPersonal: string
}) => {
    interface IError {
        dateOfBirth?: string
        gender?: string
        companyName?: string
        companySize?: string
        roleInCompany?: string
    }
    const errors: IError = {
    };
    if (values.isPersonal == 'Personal') {
        if (!values.dateOfBirth) {
            errors.dateOfBirth = 'Date of birth is required';
        }

        if (!values.gender) {
            errors.gender = 'Gender is required';
        }

    } else {
        if (!values.companyName) {
            errors.companyName = 'Company name is required';
        }
        if (!values.companySize) {
            errors.companySize = 'Company size is required';
        }
        if (!values.roleInCompany) {
            errors.roleInCompany = 'Role company is required';
        }

    }


    return errors;
};

const AditionalInfo = () => {
    const { stepperWizardValue, setStepperWizardValue } = useStepperWizardContext()
    const { userInfoValues, setUserInfoValues }: { userInfoValues: IUser, setUserInfoValues: Dispatch<SetStateAction<IUser>> } = useUserContext()

    const handleNextStep = () => {
        setStepperWizardValue({ ...stepperWizardValue, selectedStep: 5 })
    }
    const handlePrevStep = () => {
        setStepperWizardValue({ ...stepperWizardValue, selectedStep: 3 })
    }
    const formik = useFormik({
        initialValues: {
            dateOfBirth: userInfoValues.dateOfBirth,
            gender: userInfoValues.gender,
            companyName: userInfoValues.companyName,
            companySize: userInfoValues.companySize,
            roleInCompany: userInfoValues.roleInCompany,
            isPersonal: userInfoValues.userProfile
        },
        validate,
        onSubmit: values => {
            setUserInfoValues({
                ...userInfoValues, dateOfBirth: stepperWizardValue.isPersonal ? values.dateOfBirth : "",
                gender: stepperWizardValue.isPersonal ? values.gender : "",
                companyName: !stepperWizardValue.isPersonal ? values.companyName : "",
                companySize: !stepperWizardValue.isPersonal ? values.companySize : "",
                roleInCompany: !stepperWizardValue.isPersonal ? values.roleInCompany : ""
            })
            // Go next step
            handleNextStep()
        },
    });
    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[850px]">
                <span className='font-bold text-zinc-800'>Aditional Information</span>
                {
                    stepperWizardValue.isPersonal ? (<>

                        <form onSubmit={formik.handleSubmit}>
                            <FormikProvider value={formik}>
                                <div className="-mx-3 items-center flex flex-col justify-center align-middle pt-9">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                htmlFor="dateOfBirth"
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                               *Date of Birth
                                            </label>
                                            <input
                                                type="text"
                                                name="dateOfBirth"
                                                id="dateOfBirth"
                                                placeholder="28/11/2000"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                onFocus={(e) => (e.target.type = "date")}
                                                onBlur={(e) => (e.target.type = "text")}
                                                onChange={formik.handleChange}
                                                value={formik.values.dateOfBirth}
                                            />
                                            {formik.errors.dateOfBirth ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.dateOfBirth}</div> : null}

                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                htmlFor="gender"
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                *Gender
                                            </label>
                                            <GenderDropdown props={{ ...formik }} />
                                            {formik.errors.gender ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.gender}</div> : null}

                                        </div>
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
                                            disabled={!formik.values.dateOfBirth || !formik.values.gender}
                                            className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="submit">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </FormikProvider>
                        </form></>) : (<>
                            <form onSubmit={formik.handleSubmit}>
                                <FormikProvider value={formik}>
                                    <div className="-mx-3 flex flex-wrap pt-9">
                                        <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                                <label
                                                    htmlFor="companyName"
                                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                                >
                                                    *Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="companyName"
                                                    id="companyName"
                                                    placeholder="Monoma ..."
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.companyName}
                                                />
                                                {formik.errors.companyName ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.companyName}</div> : null}

                                            </div>
                                        </div>
                                        <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                                <label
                                                    htmlFor="companySize"
                                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                                >
                                                    *Company Size
                                                </label>
                                                <SizeDropdown props={{ ...formik }} />
                                                {formik.errors.companySize ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.companySize}</div> : null}

                                            </div>
                                        </div>

                                    </div>
                                    <div className="w-full flex justify-center">
                                        <div className="w-full justify-center self-center align-middle px-3 sm:w-1/2">
                                            <div className="mb-5">
                                                <label
                                                    htmlFor="roleInCompany"
                                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                                >
                                                    *Role In Company
                                                </label>
                                                <input
                                                    type="text"
                                                    name="roleInCompany"
                                                    id="roleInCompany"
                                                    placeholder="Frontend developer ..."
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.roleInCompany}
                                                />
                                                {formik.errors.roleInCompany ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.roleInCompany}</div> : null}

                                            </div>
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
                                                disabled={!formik.values.companyName || !formik.values.companySize || !formik.values.roleInCompany}
                                                className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="submit">
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </FormikProvider>
                            </form>
                        </>)
                }

            </div>
        </div>
    )
}

export default AditionalInfo