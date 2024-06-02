'use client'
import { useField } from 'formik';
import React, { useState } from 'react';

interface GenderDropdownProps {
    onChange: (value: string) => void;
}

const GenderDropdown: React.FC<any> = (/* { onChange } */ { ...props }) => {
    const [field] = useField(props)
    const [selectedGender, setSelectedGender] = useState<string>('');
    /*  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
         const value = e.target.value;
         setSelectedGender(value);
         onChange(value);
       }; */
       console.log('field', field)
    return (
        <div className="w-full max-w-xs mx-auto">
            <select
                {...field}
                {...props}
                value={field.value.gender}
                id="gender"
                name="gender"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            /* value={selectedGender}
            onChange={handleChange} */
            >
                <option value="" disabled>Select your gender ...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
        </div>
    );
};

export default GenderDropdown;