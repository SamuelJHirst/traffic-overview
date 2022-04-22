import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    Autocomplete,
    Box,
    Paper,
    TextField
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { set as setRoad } from './state/road';

interface RoadSelectorProps {
    width: string;
}

function RoadSelector(props: RoadSelectorProps) {
    const dispatch = useDispatch();

    const { width } = props;

    const road = useSelector((state: any) => state.road.name);
    const roads = useSelector((state: any) => state.roads);

    return (
        <Box sx={{
            backgroundColor: '#111111',
            border: 'solid 2px #333333',
            borderRadius: '8px',
            width: width
        }}>
            <Autocomplete
                disablePortal
                freeSolo
                options={roads}
                PaperComponent={(props) => <Paper {...props} sx={{ backgroundColor: '#111111' }} />}
                ListboxProps={{ style: { maxHeight: '200px' }}}
                value={road}
                onChange={(e, value) => { if (value) dispatch(setRoad(value)) }}
                renderOption={(props, option) => {
                    return (
                        <span {...props} style={{ 
                            backgroundColor: '#111111',
                            color: '#AAAAAA'
                        }}>
                            {option}
                        </span>
                    );
                }}
                renderInput={(props) => <TextField className='road-selector' {...props} label="Road" InputLabelProps={{ sx: { color: '#AAAAAA !important' } }} />}
                clearIcon={<ClearIcon fontSize="small" sx={{ color: '#AAAAAA !important' }} />}
            />
        </Box>
    );
}

export default RoadSelector;