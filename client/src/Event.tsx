import React from 'react';
import {
  Paper,
  Grid,
  Typography
} from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

interface EventProps {
    type: string;
    reason: string;
    severity: string;
    lanes: { laneName: string, laneStatus: string }[];
}

function Event(props: EventProps) {
    const { type, reason, severity, lanes } = props;

    return (
        <Paper sx={{ 
            padding: 1,
            margin: 1
        }}>
            <Grid container direction="row" alignItems="center">
                <Grid item>
                    <ConstructionIcon sx={{
                        paddingRight: 2,
                        position: 'relative',
                        top: '2px'
                    }} />
                </Grid>
                <Grid item>
                    <Typography variant='body1' sx={{ textTransform: 'capitalize' }}>{ type.toLowerCase() }</Typography>
                    <Typography variant='caption'>{ reason }</Typography>
                </Grid>
                <Grid item sx={{
                    marginLeft: 'auto',
                    marginRight: 0
                }}>
                    <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>{ severity.toLowerCase() } Severity</Typography>
                </Grid>
            </Grid>
            {
                lanes.length > 0
                ?
                <>
                    <br />
                    <Grid container>
                        <table style={{ width: '100%', textAlign: 'center' }}>
                            <tbody>
                                <tr>
                                    {
                                        lanes.map((lane, index) => (
                                            <td key={ index }>{ lane.laneName }</td>
                                        ))
                                    }
                                    </tr>
                                    <tr>
                                    {
                                        lanes.map((lane, index) => (
                                            <td key={ index } style={{ textTransform: 'capitalize' }}>{ lane.laneStatus.toLowerCase() }</td>
                                        ))
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </Grid>
                </>
                : <></>
            }
        </Paper>
    );
}

export default Event;