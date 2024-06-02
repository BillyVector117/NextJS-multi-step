'use client'
import React from 'react'
import PersonalInfo from './client-steps/PersonalInfo'
import Address from './client-steps/Address'
import AccountInfo from './client-steps/AccountInfo'
import AditionalInfo from './client-steps/AditionalInfo'
import Preferences from './client-steps/Preferences'
import { useStepperWizardContext } from '@/context/useStepperWizard'

const MultiStepForm = () => {
    const { stepperWizardValue } = useStepperWizardContext()

    const stepToRender = () => {
        switch (stepperWizardValue.selectedStep) {
            case 1:
                return <PersonalInfo />
            case 2:
                return <Address />
            case 3:
                return <AccountInfo />
            case 4:
                return <AditionalInfo />
            case 5:
                return <Preferences />
            default:
                break;
        }
    }
    return (
        <div>
            {stepToRender()}
        </div>
    )
}

export default MultiStepForm