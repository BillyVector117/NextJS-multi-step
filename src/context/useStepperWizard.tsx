'use client'
import { createContext, useContext, useState } from "react"
export const StepperWizardContext = createContext<any>({ selectedStep: 1, isPersonal: undefined })
interface IStepperWizard {
    selectedStep: 1
    isPersonal: null,
}
export const StepperWizardProvider = ({ children }: any) => {
    const [stepperWizardValue, setStepperWizardValue] = useState<IStepperWizard>({
        selectedStep: 1,
        isPersonal: null

    })
    return <StepperWizardContext.Provider value={{ stepperWizardValue, setStepperWizardValue }}>{children}</StepperWizardContext.Provider>
}
export const useStepperWizardContext = () => {
    const context = useContext(StepperWizardContext)
    if (context === undefined) {
        throw new Error('StepperWizardContext must be used inside CartProvider')
    }
    return context
}