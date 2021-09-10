import React, { useState,useEffect } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
  Chip
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";

// styles
import useStyles from "./styles";


// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/TableSearch";
import BigStat from "./components/BigStat/BigStat";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import {apiService} from "../../service"
const mainChartData = getMainChartData();




export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();
  const [data,setData] = useState([])
  const [res,setRes] = useState({})
  const [highlight,setHighlight] = useState(0)
  const [search,setSearch] = useState({input:""})
  const colors= ["primary","secondary" , "warning","success" ,"info"]
  const [PieChartData,setPieData] = useState([
    { name: "Group A", value: 400, color: "primary" },
    { name: "Group B", value: 300, color: "secondary" },
    { name: "Group C", value: 300, color: "warning" },
    { name: "Group D", value: 200, color: "success" },
  ]);
  useEffect(()=>{
        // apiService.get().then((data)=>{
        //     console.log(data)
        //     setData(data.data.hits.hits)
        //     let chighlight = 0
        //     let pChart = []
        //     data.data.hits.hits.map((i,index)=>{
        //        chighlight += i.highlight.content.length
        //        if(index <5 ) {  
        //        pChart.push({name:i._source.file.filename,value:i.highlight.content.length,color:colors[index] })
        //        }
        //     })
        //     setHighlight(chighlight)
        //     setPieData(pChart)
        //     setRes(data.data)
        // })
  },[])

  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  function submit() {
      apiService.search(search).then((data)=>{
            console.log(data)
            setData(data.data.hits.hits)
            let chighlight = 0
            let pChart = []
            data.data.hits.hits.map((i,index)=>{
               chighlight += i.highlight.content.length
               if(index <5 ) {  
               pChart.push({name:i._source.file.filename,value:i.highlight.content.length,color:colors[index] })
               }
            })
            setHighlight(chighlight)
            setPieData(pChart)
            setRes(data.data)
            alert("Search Completely")
            
      }).catch((e)=>{
          alert(e)
      })
  }

//   useEffect(()=>{},[res])

  return (
    <>
      <PageTitle title="Documents" button={<Button
      variant="contained"
      size="medium"
      color="secondary"
    >
        Latest Reports
    </Button>} />
      <Grid container spacing={4}>
          <Grid item xs={2}></Grid>
        <Grid item xs={8}>
            <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <InputBase
                className={classes.input}
                value={search.input}
                onChange={(e)=>{setSearch({...search,input:e.target.value})}}
                placeholder="Search Doucments"
                inputProps={{ 'aria-label': 'search document' }}
            />
            <IconButton  className={classes.iconButton} 
            aria-label="search"
            onClick={()=>{
                submit()
            }}
            >
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                <DirectionsIcon />
            </IconButton>
    </Paper>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget
            title={`Results found of \"${res?.ST ? res.ST:""}\"`}
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                {/* <Grid item xs={2}></Grid> */}
               <Grid item xs={3}>
              <Typography variant="h5"  size="xl" weight="medium" noWrap>
                {data.length}
              </Typography>
                </Grid>
             
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
                <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                Results
                </Typography>
                <Chip label= {data.length} classes={{root: classes["info"]}}></Chip>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                Highlight
                </Typography>
                <Chip label={highlight} classes={{root: classes["warning"]}}></Chip>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Max Score
                </Typography>
                <Chip label={res?.hits?.max_score} classes={{root: classes["success"]}}></Chip>
              </Grid>
             
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget title="Top Result Analyze" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={PieChartData}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {PieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {PieChartData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            title="Results"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table  label={["","Id","File Name","Link","Summary","Score"]}  data={data} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
