import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Grid,
  SwipeableDrawer,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import DirectionHeader from './DirectionHeader';
import RoadHeader from './RoadHeader';
import JunctionHeader from './JunctionHeader';
import AverageSpeed from './AverageSpeed';
import Distance from './Distance';
import CCTV from './CCTV';
import Event from './Event';
import VMS from './VMS';
import RoadSelector from './RoadSelector';
import NotFound from './NotFound';
import Loading from './Loading';

function App() {
  const [road, setRoad] = useState<(string)>("");
  const [roads, setRoads] = useState<string[]>([]);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [colour, setColour] = useState<string>('blue');
  const [showSpeeds, setShowSpeeds] = useState<boolean>(true);
  const [showDistances, setShowDistances] = useState<boolean>(true);
  const [showCCTV, setShowCCTV] = useState<boolean>(true);
  const [showVMS, setShowVMS] = useState<boolean>(true);
  const [showIncidents, setShowIncidents] = useState<boolean>(true);
  const [showRoadworks, setShowRoadworks] = useState<boolean>(true);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const refs = useRef<any>([]);

  const roadChange = (newRoad: string) => {
    setRoad(newRoad);
    if (newRoad.slice(0, 1) === 'M' || newRoad.slice(newRoad.length - 3) === '(M)') {
      setColour('blue');
    } else {
      setColour('green');
    }
  };

  const unsetRoad = (e: any) => {
    setRoad("");
  }

  const refresh = (e: any) => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_BASE}road/${ road }`, { validateStatus: (status: number) => { return (status >= 200 && status < 300) || status === 404 }}).then((resp: AxiosResponse) => {
      refs.current = [];
      setData(resp.data.data);
      setLoading(false);
    });
  }

  const jump = (index: number) => {
    refs.current.filter((x: any) => x)[index].scrollIntoView();
  }

  useEffect(() => {
    if (roads.length === 0) {
      axios.get(`${process.env.REACT_APP_API_BASE}roads`).then((resp: AxiosResponse) => {
        setRoads(resp.data.data);
      });
    } 
    if ((!data && road) || (data && road && road !== data.road)) {
      setLoading(true);
      axios.get(`${process.env.REACT_APP_API_BASE}road/${ road }`, { validateStatus: (status: number) => { return (status >= 200 && status < 300) || status === 404 }}).then((resp: AxiosResponse) => {
        refs.current = [];
        if (resp.status === 404) {
          setData({ road });
        } else {
          setData(resp.data.data);
        }
        setLoading(false);
      });
    }
  });
  
  return (
    <div className="App">
      {
        !road
        ?
          <Box sx={{ 
            backgroundImage: "url('/images/landing-bg.jpg')",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <Box sx={{ 
              backgroundColor: "#000000",
              opacity: 0.9,
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0
            }}></Box>
            <Box sx={{ zIndex: 1 }}>
              <Typography variant="h1" align="center" color="#AAAAAA">Traffic Overview</Typography>
              <Typography variant="h5" align="center" color="#AAAAAA">All the information you need on England's motorways.</Typography>
              <Box sx={{
                marginTop: 8,
                width: "100%",
                display: "flex",
                justifyContent: "center"
              }}>
                <RoadSelector width="600px" road={ road } roads={ roads } setRoad={ roadChange } />
              </Box>
            </Box>
          </Box>
        :
          <>
            <SwipeableDrawer
              anchor="left"
              open={showSidebar}
              onOpen={() => setShowSidebar(true)}
              onClose={() => setShowSidebar(false)}
              PaperProps={{ sx: { backgroundColor: '#222222', padding: '8px' } }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button variant="contained" onClick={ () => { unsetRoad(null); setShowSidebar(false); } } fullWidth sx={{ paddingTop: '16px', paddingBottom: '16px', marginBottom: '16px' }}>Home</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" onClick={ () => { refresh(null); setShowSidebar(false); } } fullWidth sx={{ paddingTop: '16px', paddingBottom: '16px', marginBottom: '16px' }}>Refresh</Button>
                </Grid>
              </Grid>
              <RoadSelector width="100%" road={ road } roads={ roads } setRoad={ roadChange } />
              <br />
              {
                data && data.dataTimestamp
                ? <Typography variant="caption" align="center" component="p" sx={{ color: '#AAAAAA' }}>Data Fetched At: { (new Date(data.dataTimestamp).toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/) ?? ['', '', ''])[2] }</Typography>
                : null
              }
              <Box
                my={2}
                p={2}
                sx={{
                  backgroundColor: '#111111',
                  color: '#AAAAAA'
                }}
              >
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={showSpeeds} onChange={() => setShowSpeeds(!showSpeeds)} sx={{ color: "#AAAAAA" }} />} label="Show Speeds" />
                  <FormControlLabel control={<Checkbox checked={showDistances} onChange={() => setShowDistances(!showDistances)} sx={{ color: "#AAAAAA" }} />} label="Show Distances" />
                  <FormControlLabel control={<Checkbox checked={showCCTV} onChange={() => setShowCCTV(!showCCTV)} sx={{ color: "#AAAAAA" }} />} label="Show CCTV" />
                  <FormControlLabel control={<Checkbox checked={showVMS} onChange={() => setShowVMS(!showVMS)} sx={{ color: "#AAAAAA" }} />} label="Show VMS" />
                  <FormControlLabel control={<Checkbox checked={showIncidents} onChange={() => setShowIncidents(!showIncidents)} sx={{ color: "#AAAAAA" }} />} label="Show Incidents" />
                  <FormControlLabel control={<Checkbox checked={showRoadworks} onChange={() => setShowRoadworks(!showRoadworks)} sx={{ color: "#AAAAAA" }} />} label="Show Roadworks" />
                </FormGroup>
              </Box>
            </SwipeableDrawer>
            <Box sx={{
              backgroundColor: "#222222"
            }}>
              <Box sx={{
                display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none' },
                justifyContent: "center",
                paddingTop: '16px',
                paddingBottom: '16px',
              }}>
                <Button variant="contained" onClick={ () => setShowSidebar(true) } sx={{ marginRight: '16px' }}>Menu</Button>
                <RoadSelector width="calc(100% - 112px)" road={ road } roads={ roads } setRoad={ roadChange } />
              </Box>
              {
                loading
                ? <Loading />
                : data !== null && data.dataTimestamp
                  ?
                    <Grid container>
                      <Grid item p={2} lg={2} xl={2} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' }, position: 'fixed', top: 0, bottom: 0 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Button variant="contained" onClick={ unsetRoad } fullWidth sx={{ paddingTop: '16px', paddingBottom: '16px', marginBottom: '16px' }}>Home</Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button variant="contained" onClick={ refresh } fullWidth sx={{ paddingTop: '16px', paddingBottom: '16px', marginBottom: '16px' }}>Refresh</Button>
                          </Grid>
                        </Grid>
                        <RoadSelector width="100%" road={ road } roads={ roads } setRoad={ roadChange } />
                        <br />
                        <Typography variant="caption" align="center" component="p">Data Fetched At: { (new Date(data.dataTimestamp).toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/) ?? ['', '', ''])[2] }</Typography>
                        <Box
                          my={2}
                          p={2}
                          sx={{
                            backgroundColor: '#111111',
                            color: '#AAAAAA'
                          }}
                        >
                          <FormGroup>
                            <FormControlLabel control={<Checkbox checked={showSpeeds} onChange={() => setShowSpeeds(!showSpeeds)} sx={{ color: "#AAAAAA" }} />} label="Show Speeds" />
                            <FormControlLabel control={<Checkbox checked={showDistances} onChange={() => setShowDistances(!showDistances)} sx={{ color: "#AAAAAA" }} />} label="Show Distances" />
                            <FormControlLabel control={<Checkbox checked={showCCTV} onChange={() => setShowCCTV(!showCCTV)} sx={{ color: "#AAAAAA" }} />} label="Show CCTV" />
                            <FormControlLabel control={<Checkbox checked={showVMS} onChange={() => setShowVMS(!showVMS)} sx={{ color: "#AAAAAA" }} />} label="Show VMS" />
                            <FormControlLabel control={<Checkbox checked={showIncidents} onChange={() => setShowIncidents(!showIncidents)} sx={{ color: "#AAAAAA" }} />} label="Show Incidents" />
                            <FormControlLabel control={<Checkbox checked={showRoadworks} onChange={() => setShowRoadworks(!showRoadworks)} sx={{ color: "#AAAAAA" }} />} label="Show Roadworks" />
                          </FormGroup>
                        </Box>
                        <Accordion 
                          disableGutters
                          sx={{
                            maxHeight: 'calc(100% - 488px)',
                            borderRadius: '0 !important',
                            overflowY: 'auto'
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: '#AAAAAA' }} />}
                            sx={{
                              backgroundColor: '#111111',
                              color: '#AAAAAA'
                            }}
                          >
                            <Typography>Jump to Junction</Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              backgroundColor: '#111111'
                            }}
                          >
                            {
                              [...data.primaryDirectionSections].reverse().filter((e: any) => { return e.interface === 'JUNCTION' }).map((section: any, index: number) => (
                                <Button 
                                  key={index} 
                                  onClick={() => jump(index)} 
                                  fullWidth
                                  sx={{
                                    color: '#AAAAAA',
                                    '&:hover': {
                                      backgroundColor: 'transparent !important'
                                    }
                                  }}
                                >
                                  { section.payload.name }
                                </Button>
                              ))
                            }
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                      <Grid item xs={0} sm={0} md={0} lg={2} xl={2}>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                        <Grid container spacing={1}>
                          <Grid item xs={6} sm={5}>
                            <DirectionHeader direction={ data.primaryDirection } colour={colour} primary={true} />
                          </Grid>
                          <Grid item sm={2} sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}>
                            <RoadHeader road={ data.road } ringRoad={ data.circularRoad } colour={colour} />
                          </Grid>
                          <Grid item xs={6} sm={5}>
                            <DirectionHeader direction={ data.secondaryDirection } colour={colour} primary={false} />
                          </Grid>
                          {
                            [...data.primaryDirectionSections].reverse().map((section: any, index: number) => (
                              section.interface === "JUNCTION"
                              ?
                                <React.Fragment key={index}>
                                  <Grid item xs={6} sm={5}>
                                    <JunctionHeader text={ section.payload.destination } colour={colour} />
                                  </Grid>
                                  <Grid item xs={2} sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}>
                                    <JunctionHeader refs={(element: any) => refs.current.push(element)} text={ section.payload.name } arrows colour={colour} />
                                  </Grid>
                                  <Grid item xs={6} sm={5}>
                                    <JunctionHeader text={ data.secondaryDirectionSections[data.secondaryDirectionSections.length - 1 - index].payload.destination } colour={colour} />
                                  </Grid>
                                </React.Fragment>
                              : 
                              <React.Fragment key={index}>
                                  <Grid item xs={6} sm={5} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                  }}>
                                    {
                                      showSpeeds
                                      ? <AverageSpeed speed={ Math.round(section.payload.speed)} />
                                      : null
                                    }
                                    {
                                      showDistances
                                      ? <Distance distance={ section.payload.length} />
                                      : null
                                    }
                                    {
                                      [...section.payload.data].reverse().map((info: any, index: number) => (
                                        info.interface === "CCTV" && showCCTV
                                        ? 
                                          <CCTV key={ info.payload.id } lat={ info.payload.lat } long={ info.payload.long } image={ info.payload.image } description={ info.payload.description } />
                                        : info.interface === "VMS" && showVMS
                                          ?
                                            <VMS key={ info.payload.address } lat={ info.payload.lat } long={ info.payload.long } vms={ info.payload.vms } sig={ info.payload.sig } />
                                          : info.interface === "EVENT" && ((info.payload.type !== "ROADWORKS" && showIncidents) || (info.payload.type === "ROADWORKS" && showRoadworks))
                                            ?
                                                <Event key={ info.payload.id } type={ info.payload.type } reason={ info.payload.reason } severity={ info.payload.severity } lanes={ info.payload.lanes } />
                                            : <></>
                                      ))
                                    }
                                  </Grid>
                                  <Grid item sm={2} sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}></Grid>
                                  <Grid item xs={6} sm={5} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                  }}>
                                    {
                                      showSpeeds
                                      ? <AverageSpeed speed={ Math.round(data.secondaryDirectionSections[data.secondaryDirectionSections.length - 1 - index].payload.speed)} />
                                      : null
                                    }
                                    {
                                      showDistances
                                      ? <Distance distance={ data.secondaryDirectionSections[data.secondaryDirectionSections.length - 1 - index].payload.length} />
                                      : null
                                    }
                                    {
                                      data.secondaryDirectionSections[data.secondaryDirectionSections.length - 1 - index].payload.data.map((info: any, index: number) => (
                                        info.interface === "CCTV" && showCCTV
                                        ?
                                          <CCTV key={ info.payload.id } lat={ info.payload.lat } long={ info.payload.long } image={ info.payload.image } description={ info.payload.description } />
                                        : info.interface === "VMS" && showVMS
                                          ?
                                            <VMS key={ info.payload.address } lat={ info.payload.lat } long={ info.payload.long } vms={ info.payload.vms } sig={ info.payload.sig } />
                                          : info.interface === "EVENT" && ((info.payload.type !== "ROADWORKS" && showIncidents) || (info.payload.type === "ROADWORKS" && showRoadworks))
                                            ?
                                              <Event key={ info.payload.id } type={ info.payload.type } reason={ info.payload.reason } severity={ info.payload.severity } lanes={ info.payload.lanes } />
                                            : <></>
                                      ))
                                    }
                                  </Grid>
                                </React.Fragment>
                            ))
                          }
                        </Grid>
                      </Grid>
                    </Grid>
                  : 
                    <NotFound unsetRoad={unsetRoad} />
              }
            </Box>
          </>
      }
    </div>
  );
}

export default App;
