import { useStepperWizardContext } from '@/context/useStepperWizard'
import React, { Dispatch, SetStateAction } from 'react'
import CountryDropdown from '../common/CountryDropdown'
import { FormikProvider, useFormik } from 'formik';
import { IUser, useUserContext } from '@/context/useUserInfo';

const validate = (values: { streetAddress: string | any[]; city: string | any[]; postalCode: string; country: string | any[]; }) => {
    interface IError {
        streetAddress?: string
        city?: string
        postalCode?: string
        country?: string
    }
    const errors: IError = {
    };
    if (!values.streetAddress) {
        errors.streetAddress = 'Enter a valid Street Address';
    }

    if (!values.city) {
        errors.city = 'Enter a valid City';
    }

    if (!values.postalCode) {
        errors.postalCode = 'Enter a valid postal code';
    } else if (!/^(?:0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/.test(values.postalCode)) {
        errors.postalCode = 'Invalid postal code';
    }
    if (!values.country) {
        errors.country = 'Country is required';
    }

    return errors;
};

const Address = () => {
    const { stepperWizardValue, setStepperWizardValue } = useStepperWizardContext()
    const { userInfoValues, setUserInfoValues }: { userInfoValues: IUser, setUserInfoValues: Dispatch<SetStateAction<IUser>> } = useUserContext()

    const handleNextStep = () => {
        setStepperWizardValue({ ...stepperWizardValue, selectedStep: 3 })
    }
    const handlePrevStep = () => {
        setStepperWizardValue({ ...stepperWizardValue, selectedStep: 1 })
    }

    const formik = useFormik({
        initialValues: {
            streetAddress: userInfoValues.streetAddress,
            city: userInfoValues.city,
            postalCode: userInfoValues.postalCode,
            country: userInfoValues.country
        },
        validate,
        onSubmit: values => {
            setUserInfoValues({
                ...userInfoValues, streetAddress: values.streetAddress,
                city: values.city,
                postalCode: values.postalCode,
                country: values.country
            })
            // Go next step
            handleNextStep()
        },
    });
    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[850px] ">
                <span className='font-bold text-zinc-800'>Contact Address</span>
                <form onSubmit={formik.handleSubmit}>
                    <FormikProvider value={formik}>
                        <div className="-mx-3 flex flex-col items-center flex-wrap pt-9">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="streetAddress"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        *Address
                                    </label>
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        id="streetAddress"
                                        placeholder="Eleuterio St ..."
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={formik.handleChange}
                                        value={formik.values.streetAddress}
                                    />
                                    {formik.errors.streetAddress ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.streetAddress}</div> : null}

                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="city"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        *City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        placeholder="Mexico City ..."
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={formik.handleChange}
                                        value={formik.values.city}
                                    />
                                    {formik.errors.city ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.city}</div> : null}

                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="postalCode"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        *Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        id="postalCode"
                                        placeholder="03660 ..."
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        onChange={formik.handleChange}
                                        value={formik.values.postalCode}
                                    />
                                    {formik.errors.postalCode ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.postalCode}</div> : null}

                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        *Country
                                    </label>

                                    <CountryDropdown props={{ ...formik }} />
                                    {formik.errors.country ? <div className="text-base font-medium text-[#ff4f4f]">{formik.errors.country}</div> : null}

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
                                    disabled={!formik.values.streetAddress || !formik.values.city || !formik.values.postalCode || !formik.values.country}
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

export default Address