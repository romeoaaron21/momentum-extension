import React from 'react'
import { Typography } from '@material-ui/core'
import { MetroSpinner } from 'react-spinners-kit';

export default function CircularLoader() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MetroSpinner size={56} color="#fff" />
            <Typography variant="subtitle1" style={{ marginTop: 20 }}>Loading data</Typography>
        </div>
    )
}
