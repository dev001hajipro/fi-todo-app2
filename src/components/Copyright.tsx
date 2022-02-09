import { Link, Typography } from "@mui/material"
import React from "react"

type Props = {
    message: string
}

const Copyright: React.FC<Props> = ({ message }) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright'}&copy;
            {' '}
            <Link color="inherit" href="">xxx</Link>
            {' '}
            {new Date().getFullYear()}.
        </Typography>
    )
}

export default Copyright
