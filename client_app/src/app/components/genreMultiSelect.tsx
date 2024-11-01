import React from 'react'
import { Control, DefaultValues, useController } from 'react-hook-form'

const options = [...Array(4).keys()];

interface FormValues {
    values: Number[]
}
const defaultValues: DefaultValues<FormValues> = {
    values: []
}
const validateValues = (value: Number[]) => {
    if (!value.length) {
        return "You must select at least one value"
    }
    return true
}

interface MultiSelectProps {
    control: Control<FormValues>;
}

const GenreMultiSelect = ({control}: MultiSelectProps) => {
    const {field, fieldState} = useController({
        control,
        name: "values",
        rules: {
            validate: validateValues
        }
    })
  return (
    <fieldset>
        <legend>Values</legend>
        <select
        value=""
        onChange={(event) => field.onChange([...field.value, +event.target.value])}>
            <option value="">Choose values</option>
            {options
                .filter((value) => !field.value.includes(value))
                .map((value) => (
                    <option key={value} value={value}>{value}</option>
                ))
            }
        </select>
        <p>{fieldState.error?.message}</p>
        <ul>
            {field.value.map((value) => (
                <li key={value}>
                    {value}
                    <button className='ml-2'
                    type='button'
                    onClick={() => {
                        field.onChange(field.value.filter((item)=> item !== value));
                    }}>
                        remove
                    </button>
                </li>
            ))}
        </ul>
    </fieldset>
  )
}

export default GenreMultiSelect