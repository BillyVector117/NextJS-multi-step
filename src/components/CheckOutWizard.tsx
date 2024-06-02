import React from 'react'

const CheckOutWizard = ({ activeStep = 1 }) => {
    const activeStepStyle = `relative z-10 grid w-10 h-10 font-bold text-white transition-all duration-300 bg-gray-900 rounded-full place-items-center`
    const nonActiveStepStyle = `relative z-10 grid w-10 h-10 font-bold text-gray-900 transition-all duration-300 bg-gray-300 rounded-full place-items-center`

    return (
        <div className="container w-full min-h-48 px-24 py-4">
            <div className="relative flex items-center justify-between w-full">
                <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
                <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-900 transition-all duration-500">
                </div>
                {
                    ['Personal Info', 'Address', 'Details', 'Aditional Info', 'Preferences'].map((step, index) => {
                        return (
                            <div
                                key={index}
                                className={activeStep - 1 == index ? activeStepStyle : nonActiveStepStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                    aria-hidden="true" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z">
                                    </path>
                                </svg>

                                <div className="absolute -bottom-[4.5rem] w-max text-center">
                                    <h6
                                        className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700">
                                        {index + 1}
                                    </h6>
                                    <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                                        {step}
                                    </p>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default CheckOutWizard