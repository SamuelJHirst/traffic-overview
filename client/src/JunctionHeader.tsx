import React from 'react';
import {
  Paper,
  Typography
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface JunctionHeaderProps {
    text: string;
    arrows?: boolean;
    colour: string;
}

function JunctionHeader(props: JunctionHeaderProps) {
    const { text, arrows, colour } = props;

    return (
        <Paper sx={{ 
            backgroundColor: colour === 'blue' ? '#01579b' : '#1b5e20', 
            color: '#FFFFFF',
            padding: 1,
            margin: 1
        }}>

            <Typography align="center" variant="h6">
                {
                    arrows
                        ?
                            <>
                                <ArrowUpwardIcon sx={{
                                    position: 'relative',
                                    top: '4px',
                                    right: '24px',
                                    display: { xs: 'none', sm: 'none', md: 'inline-block', lg: 'inline-block', xl: 'inline-block' }
                                }} />
                                { text }
                                <ArrowDownwardIcon sx={{
                                    position: 'relative',
                                    top: '4px',
                                    left: '24px',
                                    display: { xs: 'none', sm: 'none', md: 'inline-block', lg: 'inline-block', xl: 'inline-block' }
                                }} />
                            </>
                        : text
                }
            </Typography>
        </Paper>
    );
}

export default JunctionHeader;