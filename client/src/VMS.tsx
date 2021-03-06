import React from 'react';

import {
    Box,
    Paper,
    Grid,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PinDropIcon from '@mui/icons-material/PinDrop';

import SIG from './SIG';

interface VMSProps {
    lat: number;
    long: number;
    sig: any[];
    vms: any;
}

function VMS(props: VMSProps) {
    const {
        lat, long, vms, sig,
    } = props;

    return (
        <Paper sx={{
            padding: 1,
            margin: 1,
            width: 'calc(100% - 32px);',
            backgroundColor: '#111111',
            color: '#AAAAAA',
        }}
        >
            <Grid container direction="row" alignItems="center">
                <Grid
                    item
                    sx={{
                        display: {
                            xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block',
                        },
                    }}
                >
                    <InfoIcon sx={{
                        paddingRight: 2,
                        position: 'relative',
                        top: '2px',
                    }}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        width: {
                            xs: 'calc(100% - 32px)',
                            sm: 'calc(100% - 72px)',
                            md: 'calc(100% - 120px)',
                            lg: 'calc(100% - 120px)',
                            xl: 'calc(100% - 120px)',
                        },
                    }}
                >
                    {
                        vms
                            ? (
                                <Box sx={{
                                    backgroundColor: '#000000',
                                    color: 'yellow',
                                    textAlign: 'center',
                                    padding: 2,
                                    borderRadius: 2,
                                    width: '100%',
                                    position: 'relative',
                                }}
                                >
                                    <Box sx={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: 'yellow',
                                        borderRadius: '50%',
                                        opacity: 0.2,
                                        position: 'absolute',
                                        top: '8px',
                                        left: '8px',
                                    }}
                                    />
                                    <Box sx={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: 'yellow',
                                        borderRadius: '50%',
                                        opacity: 0.2,
                                        position: 'absolute',
                                        bottom: '8px',
                                        left: '8px',
                                    }}
                                    />
                                    <Box sx={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: 'yellow',
                                        borderRadius: '50%',
                                        opacity: 0.2,
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                    }}
                                    />
                                    <Box sx={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: 'yellow',
                                        borderRadius: '50%',
                                        opacity: 0.2,
                                        position: 'absolute',
                                        bottom: '8px',
                                        right: '8px',
                                    }}
                                    />
                                    {
                                        vms.code !== 'BLANK'
                                            ? (
                                                <>
                                                    <img src={`/images/vms/${vms.code}.png`} alt="VMS Screen" />
                                                    <br />
                                                </>
                                            )
                                            : null
                                    }
                                    { vms.message.split('\n').map((x: string, index: number) => (x === '' ? <React.Fragment key={index} /> : (index === 0 ? <span key={index}>{ x }</span> : (
                                        <span key={index}>
                                            <br />
                                            { x }
                                        </span>
                                    )))) }
                                </Box>
                            )
                            : null
                    }
                    {
                        vms && sig.length > 0
                            ? <Box sx={{ marginTop: 1 }} />
                            : null
                    }
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 2,
                        width: 'calc(100% + 32px)',
                    }}
                    >
                        {
                            sig.map((s: any, index: number) => (
                                <SIG key={index} sig={s} />
                            ))
                        }
                    </Box>
                </Grid>
                <Grid
                    item
                    sx={{
                        marginLeft: 'auto',
                        marginRight: 0,
                        display: {
                            xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block',
                        },
                    }}
                >
                    <a href={`https://www.google.com/maps?q=${lat}+${long}`} target="_blank" rel="noreferrer">
                        <PinDropIcon sx={{
                            position: 'relative',
                            top: '2px',
                            paddingRight: 1,
                            color: '#AAAAAA',
                        }}
                        />
                    </a>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default VMS;
