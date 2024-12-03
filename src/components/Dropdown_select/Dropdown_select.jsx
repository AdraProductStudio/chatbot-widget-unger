import React from 'react'
import Select from 'react-dropdown-select'


export const Dropdown_select = ({
    componentFrom,
    multi,
    className,
    searchable,
    create,
    options,
    labelField,
    valueField,
    values,
    change,
    placeholder
}) => {

    return (
        <Select
            multi={multi}
            className={className}
            searchable={searchable}
            create={create}
            options={options}
            labelField={labelField}
            valueField={valueField}
            values={values}
            onChange={change}
            placeholder={placeholder}
        />
    )
}
