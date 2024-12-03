import React from 'react'
import { Link } from 'react-router-dom'

const LinkComponent = ({
    componentFrom,
    to,
    title,
    className,
    clickFunction
}) => {
    return (
        <Link to={to} className={`${className}`} onClick={clickFunction}>
            {title}
        </Link>
    )
}

export default LinkComponent