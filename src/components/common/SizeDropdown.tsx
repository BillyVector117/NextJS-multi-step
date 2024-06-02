'use client'
import { useField } from 'formik';
import React, { useState } from 'react';
interface SizeDropdownProps {
    onChange: (value: string) => void;
}
const SizeDropdown: React.FC<any> = (/* { onChange } */{ ...props }) => {
    const [field] = useField(props)
    const [selectedSize, setSelectedSize] = useState<string>('');
    /*  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
         const value = e.target.value;
         setSelectedSize(value);
         onChange(value);
     }; */
     console.log('field', field)
    return (
        <div className="w-full max-w-xs mx-auto">
            <select
                {...field}
                {...props}
                value={field.value.companySize}
                id="companySize"
                name="companySize"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            /* value={selectedSize}
            onChange={handleChange} */
            >
                <option value="" disabled>Select a size ...</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
            </select>
        </div>
    );
};

export default SizeDropdown;