'use client'
import CheckOutWizard from "@/components/CheckOutWizard";
import MultiStepForm from "@/components/MultiStepForm";
import { useStepperWizardContext } from "@/context/useStepperWizard";

export default function Home() {
  const { stepperWizardValue } = useStepperWizardContext()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container w-full justify-center text-center">
        <CheckOutWizard activeStep={stepperWizardValue.selectedStep} />
        <MultiStepForm />
      </div>
    </main>
  );
}
