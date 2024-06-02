'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldHookConfig, FieldProps, useField } from 'formik';

interface Country {
  cca3: string;
  name: {
    common: string;
  };
}
interface CountryDropdownProps extends FieldProps {
  onChange: (value: string) => void;
}
const CountryDropdown: React.FC<any> = ({ /* form, onChange,  */...props }) => {
  const [field] = useField(props)
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const storedCountries = localStorage.getItem('countries');
      if (storedCountries) {
        setCountries(JSON.parse(storedCountries));
      } else {
        try {

          const response = await fetch('https://restcountries.com/v3.1/all')
          const data: any = await response.json()
          const sortedCountries = data.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common));
          setCountries(sortedCountries);
          localStorage.setItem('countries', JSON.stringify(sortedCountries));
        } catch (error) {
          console.error('Error fetching the countries:', error);
        }

      }
    }


    fetchCountries()
  }, []);

  const sortedCountries = useMemo(() => {
    return countries.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common));
  }, [countries]);

  return (
    <select
      {...field}
      {...props}
      value={field.value.country}
      /* value={selectedCountry}
       onChange={handleChange} */
      id="country"
      name="country"
      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    >
      <option value="" disabled>Select a country ...</option>
      {sortedCountries.map((country) => (
        <option key={country.cca3} value={country.name.common}>
          {country.name.common}
        </option>
      ))}
    </select>
  );
};

export default React.memo(CountryDropdown);