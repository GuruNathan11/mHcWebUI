import React, { useEffect, useState, Dispatch } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Rectangle6215 from './../../../assets/images/mettler_images/Rectangle 6215.png';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { getAllStaff } from "../../../store/actions/Staff";
import { getAllPatient } from "../../../store/actions/Patient";
import { HttpLogin } from "../../../utils/Http";
import {
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
    Select,
    SelectChangeEvent,

} from "@mui/material";
import Q15RegistryData from '../../../assets/data/Q15Data.json';
import loaddingFile from '../../../../src/assets/images/tenor.gif';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { PDFViewer } from "@react-pdf/renderer";
import { Document, Text, Page, View, StyleSheet } from '@react-pdf/renderer';
import "./styles.css";
import ReactDOM from "react-dom";

interface IQ15Reports { }
interface IQ15Reports {
    StaticPage: any;
    getAllPatientData: any;
    dispatch: Dispatch<any>;
    getAllStaffData: any;
    match: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}





const Q15Reports: React.FC<IQ15Reports> = ({
    dispatch, getAllPatientData, getAllStaffData, match


}) => {
    let [inputFormData, setInputFormData] = useState(Q15RegistryData);
    let [decryptPatientId, setDecryptPatientId] = useState("");
    let [addCalendarDate, setAddCalendarDate] = useState(new Array<any>());
    let [tableData, setTableData] = useState(new Array<any>());
    const [spinner, setSpinner] = useState(false);
    let [calendarDate, setCalendarDate] = useState(new Date());
    let [getStaffDataItems, setGetStaffDataItems] = useState(new Array<any>());
    let [getPatientDataItems, setGetPatientDataItems] = useState(new Array<any>());
    let [inputOrgData, setInputOrgData] = useState("");  
    let [newTimeSlot, setNewTimeSlot] = useState(new Array<any>());

    const firstDay = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() - 3)), "DDD MMM DD YYYY HH:mm:ss").format("MMM DD, YYYY");
    const secondDay = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() - 2)), "DDD MMM DD YYYY HH:mm:ss").format("MMM DD, YYYY");
    const thirdDay = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() - 1)), "DDD MMM DD YYYY HH:mm:ss").format("MMM DD, YYYY");
    const forthDay = moment((new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate())), "DDD MMM DD YYYY HH:mm:ss").format("MMM DD, YYYY");

    const addInputData = {
        shiftIncharge: "",
        criteria: "",
        patientName: "",
        slot: "",
        shift: "",
        startDate: null,
        endDate: null
    }
    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }

    let [newInputData, setNewInputData] = useState(addInputData);
    function formatDate(epoch) {
        let d = new Date(epoch);
        let month = String((d.getMonth() + 1)).padStart(2, '0');
        let day = String((d.getDate())).padStart(2, '0');
        let hours = String((d.getHours())).padStart(2, '0');
        let mins = String((d.getMinutes())).padStart(2, '0');
    
        return `${hours}:${mins}`;
    }
    useEffect(() => {        
        var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
       
        orgData = orgData.loginInput.organization;
        HttpLogin.axios().get("api/org/getById/" + orgData)
            .then((res) => {
                if (res.data.message.code === "MHC - 0200") {
  //                  const regex = /\d+(:\d+)?/;  
                   // console.log(String(5).padStart(2, '0'));
                //    const minutesInDay = 1440;
                //    const timeBlocksArr = [{ timeString: '06:00 AM', timeValue: '0' }];
                //    for (let i = 30; i <= minutesInDay - 30; i += 30) {
                //        const halfHourInLoop = i / 60;
               
                //        let formattedBlock = String(halfHourInLoop);
                //        const hour = formattedBlock.split('.')[0];
                //        const minute = i % 60 === 0 ? '00' : '30';
                //        formattedBlock = `${hour}:${minute}`;
               
                //        const today = new Date();
                //        const timeString = new Date(
                //            today.getFullYear(),
                //            today.getMonth(),
                //            today.getDate(),
                //            Number(hour),
                //            Number(minute),
                //        );
                //        timeBlocksArr.push({
                //            timeString: timeString.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                //            timeValue: formattedBlock,
                //        });
                //    }
                //    console.log(JSON.stringify(timeBlocksArr));

              var newResult = res.data.data.shift.startTime !== ""?res.data.data.shift.startTime:"08:00"
                const createTimeSlots = (fromTime, toTime, slotLength =15*60) => {
                    let slotStart = new Date(fromTime).valueOf();
                    let slotEnd = new Date(fromTime).valueOf() + slotLength * 1000;
                    let endEpoch = new Date(toTime).valueOf();
                    let ob = [];
                    for (slotEnd; slotEnd <= endEpoch; slotEnd = slotEnd + slotLength * 1000) {
                        ob.push(formatDate(slotStart));
                        slotStart = slotEnd;
                    }
                    return ob;
                }
              
                
                const from = "2022-05-25 "+newResult;
                const to = "2022-05-26 "+newResult;
                const slotLength = 15 * 60; //seconds
              //  console.log(JSON.stringify(newResult));
                var r = createTimeSlots(from, to, slotLength );   
             //   console.log(JSON.stringify(r[0].slice(0,2)));
                setNewTimeSlot(r);      

                    setInputOrgData(res.data.data.id);
                 
                } else {
                    setInputOrgData("");
                }
            })

        setNewInputData({ ...newInputData });
        var from = newInputData.startDate !== null ? new Date(newInputData.startDate) : new Date();
        var dayCalendar = [];
      //  var to = newInputData.endDate !== null ? new Date(newInputData.endDate.getFullYear(), newInputData.endDate.getMonth(), newInputData.endDate.getDate() + 4) : new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() + 4);

        

            dayCalendar.push(moment(new Date(from.setDate(from.getDate()))).format("YYYYMMDD"));
        
       // console.log(JSON.stringify(dayCalendar));
       // console.log(JSON.stringify(newInputData.startDate));
       // console.log(JSON.stringify(newInputData.endDate));
        setAddCalendarDate(dayCalendar);
        dispatch(getAllStaff());
        dispatch(getAllPatient());
        if(newInputData.startDate === null && newInputData.endDate === null){
          
        }
        
        HttpLogin.axios().get("/api/config/get_all")
            .then((response) => {
              //  console.log(JSON.stringify(response));
             //   setTableData(response.data.data);

            })        
    }, []);

    const Accordion = styled((props: AccordionProps) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));

    const AccordionSummary = styled((props: AccordionSummaryProps) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));


    const [isPageLoaded, setPageLoaded] = useState(false);

    if (!isPageLoaded && !getAllStaffData.isLoading) {
        //  console.log(JSON.stringify(getAllStaffData.items))
        if (getAllStaffData.items.message.code === "MHC - 0200") {
            setGetStaffDataItems(getAllStaffData.items.data.filter(t => t.organization === inputOrgData));
           
        } else {
            setGetStaffDataItems([]);
            alert(getAllStaffData.items.message.description);
        }
        setPageLoaded(true)
    }
    if (!getAllStaffData && getAllStaffData.isFormSubmit) {

        setTimeout(() => {
            setPageLoaded(false);

        }, (1000));
    }


    const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

    if (!isPatientPageLoaded && !getAllPatientData.isLoading) {
        if (getAllPatientData.items.message.code === "MHC - 0200") {
            setGetPatientDataItems(getAllPatientData.items.data.filter(t => t.organization === inputOrgData));
          
        } else {
            setGetPatientDataItems([]);
            alert(getAllPatientData.items.message.description);
        }
        setPatientPageLoaded(true);
    }
    if (!getAllPatientData && getAllPatientData.isFormSubmit) {

        setTimeout(() => {
            setPatientPageLoaded(false);

        }, (1000));
    }

    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const [newExpanded, setNewExpanded] = React.useState<string | false>('panel11');
    const [newAddExpanded, setNewAddExpanded] = React.useState<string | false>('Shift A');


    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const handleNewChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setNewExpanded(newExpanded ? panel : false);
        };

    const handleNewAddChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setNewAddExpanded(newExpanded ? panel : false);
        };

        const handleDateChange = (event: any) => {
            newInputData.startDate = event;
            setNewInputData({ ...newInputData });
          //  console.log(JSON.stringify(moment(newInputData.startDate).format("YYYYMMDD")));
           // console.log(JSON.stringify(moment(new Date()).format("YYYYMMDD")));
           
         
            var from = newInputData.startDate !== null ? new Date(newInputData.startDate) : new Date();
            var dayCalendar = [];
            var to = newInputData.endDate !== null ? new Date(newInputData.endDate) : new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate());
    
            for (var day = from; day <= to; day.setDate(day.getDate() + 1)) {
    
                dayCalendar.push(moment(new Date(day)).format("YYYYMMDD"));
            } 
            setAddCalendarDate(removeDuplicates(dayCalendar));
        }
    
        const handleNewDateChange = (event: any) => {
            newInputData.endDate = event;
            setNewInputData({ ...newInputData });
           
            var from = newInputData.startDate !== null ? new Date(newInputData.startDate) : new Date();
            var dayCalendar = [];
            var to = newInputData.endDate !== null ? new Date(newInputData.endDate) : new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate());
    
            for (var day = from; day <= to; day.setDate(day.getDate() + 1)) {
    
                dayCalendar.push(moment(new Date(day)).format("YYYYMMDD"));
            } 
            setAddCalendarDate(removeDuplicates(dayCalendar));                             
          
        }

        if(newInputData.endDate === null && newInputData.startDate !== null){
            var newFromDate = moment(newInputData.startDate).format("YYYYMMDD");
            var newToDate = moment(new Date()).format("YYYYMMDD");
             HttpLogin.axios().get("/api/config/getByDateRange?startDate="+newFromDate+"&endDate="+newToDate)
             .then((response) => {   
                if(response.data.data !== null && response.data.data !== undefined){
                   // console.log(JSON.stringify("/api/config/getByDateRange?startDate="+moment(newInputData.startDate).format("YYYYMMDD")+"&endDate="+moment(new Date()).format("YYYYMMDD")));                                       
                    //console.log(JSON.stringify(response.data))         
                     setTableData(response.data.data);  
                }
                                               
             })
         }else if(newInputData.endDate !== null && newInputData.startDate !== null){
            var newFromDate = moment(newInputData.startDate).format("YYYYMMDD");
            var newToDate = moment(newInputData.endDate).format("YYYYMMDD");
             HttpLogin.axios().get("/api/config/getByDateRange?startDate="+newFromDate+"&endDate="+newToDate)
             .then((response) => {   
                if(response.data.data !== null && response.data.data !== undefined){
                //  console.log(JSON.stringify("/api/config/getByDateRange?startDate="+moment(newInputData.startDate).format("YYYYMMDD")+"&endDate="+moment(new Date()).format("YYYYMMDD")));                                       
                //     console.log(JSON.stringify(response.data))         
                     setTableData(response.data.data);
                }                                   
             })
         }else if(newInputData.endDate === null && newInputData.startDate === null){ 
            HttpLogin.axios().get("/api/config/getByDate/"+addCalendarDate[0])
            .then((response) => {               
               // console.log(JSON.stringify(newInputData.endDate));
                if(response.data.data !== undefined && response.data.data !== null){
                    setTableData(response.data.data);             
                }            
            })
         }
    const handleChanges = (event: SelectChangeEvent) => {
        if (event.target.name === "shift") {
            newInputData.shift = event.target.value;
        } else if (event.target.name === "shiftIncharge") {
            newInputData.shiftIncharge = event.target.value;        
                var newTableData = (tableData.map((k)=>{
                    var sureData = "";
                    if(k.shiftIncharge.shiftInchargeA === event.target.value && sureData === 'Shift A'){
                        setNewAddExpanded('Shift A');
                        return k;
                    }else if(k.shiftIncharge.shiftInchargeB === event.target.value && sureData === 'Shift B'){
                        setNewAddExpanded('Shift B');
                        return k;
                    }else if(k.shiftIncharge.shiftInchargeC === event.target.value && sureData === 'Shift C'){
                        setNewAddExpanded('Shift C');
                        return k;
                    }else{
                        setNewAddExpanded('Shift A');
                        return k;
                    }}))                    
           setTableData(newTableData);
           
        } else if (event.target.name === "criteria") {
            newInputData.criteria = event.target.value;
        } else if (event.target.name === "patientName") {
            newInputData.patientName = event.target.value;            
            var newTableData = (tableData.map((k)=>{
                if(k.pid === event.target.value){
                    return k;
                }else{
                    return k;
                }}))                    
       setTableData(newTableData);       
        } else if (event.target.name === "q15Slot") {
            newInputData.slot = event.target.value;
        }
        // var newArray = tableData.filter(t => t.shiftIncharge === newInputData.shiftIncharge || t.enteredBy === newInputData.criteria || t.pid === newInputData.patientName).map(k => { return k.q15Date });
        // console.log(JSON.stringify(removeDuplicates(newArray)));
        // setAddCalendarDate(removeDuplicates(newArray));
        setNewInputData({ ...newInputData });    
        setNewExpanded('panel11');             
        event.preventDefault();
    }


  

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section1: {
    position: 'absolute',
    top: 30,
    left: -30
  },
  section3: {
    position: 'absolute',
    top: 30,
    left: 99,
  },
  section4: {
    position: 'absolute',
    top: 30,
    left: 130,
    width: 300
  },
  section5: {
    position: 'absolute',
    top: 30,
    left: 210,
    width: 300
  },
  section6: {
    position: 'absolute',
    top: 30,
    left: 310,
    width: 300
  },
  section7: {
    position: 'absolute',
    top: 30,
    left: 390,
    width: 300
  },
  section8: {
    position: 'absolute',
    top: 30,
    left: -30,
    width: 300
  },
  section9: {
    position: 'absolute',
    top: 30,
    left: 40,
    width: 300
  },
  section12: {
    position: 'absolute',
    top: 30,
    left: 210,
    width: 300
  },
  section10: {
    position: 'absolute',
    top: 30,
    left: 120,
    width: 300
  },
  section13: {
    position: 'absolute',
    top: 30,
    left: 290,
    width: 300
  },
  section16: {
    position: 'absolute',
    top: 30,
    left: 500,
    width: 300
  },
  section11: {
    position: 'absolute',
    top: 30,
    left: 150,
    width: 300
  },
  section14: {
    position: 'absolute',
    top: 30,
    left: 330,
    width: 300
  },
  section15: {
    position: 'absolute',
    top: 30,
    left: 400,
    width: 300
  },
  section2: {
    position: 'absolute',
    top: 30,
    left: 1,
    fontSize: 12,
    width: 300
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    top: 90,
    position: 'absolute',
    fontSize: 12,
    width: 575,
    height: 270,
    border: "1 solid #C9C9C9",
    justifyContent: "space-between",
    display: "flex"
  },
  sectionss: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    top: 450,
    position: 'absolute',
    fontSize: 12,
    width: 575,
    height: 135,
    border: "1 solid #C9C9C9",

  },
  sectionsss: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    top: 453,
    position: 'absolute',
    fontSize: 12,
    width: 575,
    height: 135,
    left: 90
  },
  sectionssss: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    top: 453,
    position: 'absolute',
    fontSize: 12,
    width: 575,
    height: 135,
    left: 290
  },
  sectionsssss: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    top: 10,
    position: 'absolute',
    fontSize: 12,
    width: 575,
    height: 135,
    left: 360
  },
  sections: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    top: 390,
    position: 'absolute',
    fontSize: 12,
    width: 575,
    height: 364,
    border: "1 solid #C9C9C9",
    justifyContent: "space-between",
    display: "flex"
  },
  sections1: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    top: 25,
    position: 'absolute',
    fontSize: 12,
    width: 575,
    height: 364,
    border: "1 solid #C9C9C9",
    justifyContent: "space-between",
    display: "flex"
  },
  topSection1: {
    position: 'absolute',
    left: 40,
    top: 7,

  },
  topSection0: {
    position: 'absolute',
    left: 54,
    top: 5,

  },
  topSection00: {
    position: 'absolute',
    left: 230,
    top: 5,

  },
  topSection0000: {
    position: 'absolute',
    left: 130,
    top: 280,

  },
  topSection000: {
    position: 'absolute',
    left: 430,
    top: 5,

  },
  topSection01: {
    position: 'absolute',
    left: 145,
    top: 5,

  },
  topSection001: {
    position: 'absolute',
    left: 325,
    top: 5,

  },
  topSection0001: {
    position: 'absolute',
    left: 535,
    top: 5,

  },
  topSection101: {
    position: 'absolute',
    left: 440,
    top: -50,

  },
  topSection2: {
    position: 'absolute',
    left: 40,
    whiteSpace: 'nowrap',
    top: 30
  },
  topSection3: {
    position: 'absolute',
    left: 40,
    top: 50
  },
  topSection4: {
    position: 'absolute',
    left: 40,
    top: 70
  },
  topSection5: {
    position: 'absolute',
    left: 40,
    top: 90
  },
  topSection6: {
    position: 'absolute',
    left: 40,
    top: 110
  },
  topSection7: {
    position: 'absolute',
    left: 40,
    top: 130
  },
  topSection1345: {
    position: 'absolute',
    left: 40,
    top: 135
  },
  topSection1330: {
    position: 'absolute',
    left: 40,
    top: 113
  },
  topSection8: {
    position: 'absolute',
    left: 40,
    top: 150
  },
  topSection1400: {
    position: 'absolute',
    left: 40,
    top: 157
  },
  topSection9: {
    position: 'absolute',
    left: 40,
    top: 170
  },
  topSection1415: {
    position: 'absolute',
    left: 40,
    top: 176
  },
  topSection10: {
    position: 'absolute',
    left: 40,
    top: 190
  },
  topSection1430: {
    position: 'absolute',
    left: 40,
    top: 195
  },
  topSection11: {
    position: 'absolute',
    left: 40,
    top: 210
  },
  topSection1445: {
    position: 'absolute',
    left: 40,
    top: 214
  },
  topSection112: {
    position: 'absolute',
    left: 40,
    top: 230
  },
  topSection1500: {
    position: 'absolute',
    left: 40,
    top: 235
  },
  topSection113: {
    position: 'absolute',
    left: 40,
    top: 250
  },
  topSection1515: {
    position: 'absolute',
    left: 40,
    top: 255
  },
  topSection114: {
    position: 'absolute',
    left: 40,
    top: 270
  },
  topSection1530: {
    position: 'absolute',
    left: 40,
    top: 274
  },
  topSections1530: {
    position: 'absolute',
    left: 10,
    top: 48
  },
  topSectionsShift: {
    position: 'absolute',
    left: 10,
    top: 460
  },
  topSectionsPrintName: {
    position: 'absolute',
    left: 10,
    top: -19
  },
  topSectionsInitial: {
    position: 'absolute',
    left: 10,
    top: -19
  },
  topSections1120: {
    position: 'absolute',
    left: 10,
    top: 78
  },
  topSections2156: {
    position: 'absolute',
    left: 10,
    top: 110
  },
  topSectionsSignName: {
    position: 'absolute',
    left: 10,
    top: -20
  },
  topSection115: {
    position: 'absolute',
    left: 40,
    top: 290
  },
  topSection1545: {
    position: 'absolute',
    left: 40,
    top: 295
  },
  // topSections1545: {
  //   position: 'absolute',
  //   left: 40,
  //   top: 30
  // },
  topSection116: {
    position: 'absolute',
    left: 40,
    top: 310
  },
  topSection1230: {
    position: 'absolute',
    left: 40,
    top: 317
  },
  topSection117: {
    position: 'absolute',
    left: 40,
    top: 330
  },
  topSection1347: {
    position: 'absolute',
    left: 40,
    top: 335
  },
  topSection12: {
    position: 'absolute',
    left: 40,
    top: 7,

  },
  topSection13: {
    position: 'absolute',
    left: 40,
    top: 30,
    whiteSpace: 'nowrap'
  },
  topSection14: {
    position: 'absolute',
    left: 40,
    top: 50
  },
  topSection15: {
    position: 'absolute',
    left: 40,
    top: 70
  },
  topSection16: {
    position: 'absolute',
    left: 40,
    top: 90
  },
  topSection17: {
    position: 'absolute',
    left: 40,
    top: 110
  },
  topSection18: {
    position: 'absolute',
    left: 40,
    top: 130
  },
  topSection19: {
    position: 'absolute',
    left: 40,
    top: 150
  },
  topSection20: {
    position: 'absolute',
    left: 40,
    top: 170
  },
  topSection21: {
    position: 'absolute',
    left: 40,
    top: 190
  },
  topSection22: {
    position: 'absolute',
    left: 40,
    top: 210
  },
  topSectionsShifts: {
    position: 'absolute',
    left: 10,
    top: 15
  },
  Location: {
    position: "absolute",
    top: 10,
    left: 90
  },
  Location3: {
    position: "absolute",
    top: 10,
    left: 279
  },
  Location2: {
    position: "absolute",
    top: 10,
    left: 450
  },
  line: {
    backgroundColor: '#C9C9C9',
    width: 0.5,
    border: "1 groove #C9C9C9",
    height: 268,
    position: "relative",
    left: 110,
    top: -30
  },
  line2: {
    backgroundColor: '#C9C9C9',
    width: 0.5,
    border: "1 groove #C9C9C9",
    height: 268,
    position: "relative",
    left: 110,
    top: -30
  },
  line4: {
    backgroundColor: '#C9C9C9',
    width: 120,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 45,
    top: 125
  },
  line5: {
    backgroundColor: '#C9C9C9',
    width: 120,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 45,
    top: 165
  },
  line6: {
    backgroundColor: '#C9C9C9',
    width: 120,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 45,
    top: 210
  },
  line70: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: -3
  },
  line7: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 18
  },
  line8: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 40
  },
  line9: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 59
  },
  line10: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 78
  },
  line11: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 98
  },
  line12: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 118
  },
  line13: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 137
  },
  line14: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 156
  },
  line15: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 173
  },
  line16: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 191
  },
  line17: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 210
  },
  line18: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 227
  },
  line19: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 245
  },
  line20: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 264
  },
  line21: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 282
  },
  line22: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 300
  },
  line23: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 29,
    top: 320
  },
  line30: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: -12,
    top: 30
  },
  line31: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: -12,
    top: 60
  },
  line32: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: -12,
    top: 88
  },
  line33: {
    backgroundColor: '#C9C9C9',
    width: 575,
    border: "1 groove #C9C9C9",
    height: 1,
    position: "relative",
    left: 10,
    top: 60
  },
  line24: {
    backgroundColor: '#C9C9C9',
    width: 0.5,
    border: "1 groove #C9C9C9",
    height: 364,
    position: "relative",
    left: 75,
    top: -65
  },
  line25: {
    backgroundColor: '#C9C9C9',
    width: 0.5,
    border: "1 groove #C9C9C9",
    height: 364,
    position: "relative",
    left: 97,
    top: -32
  },
  line26: {
    backgroundColor: '#C9C9C9',
    width: 0.5,
    border: "1 groove #C9C9C9",
    height: 364,
    position: "relative",
    left: 64,
    top: -32
  },
  line27: {
    backgroundColor: '#C9C9C9',
    width: 0.5,
    border: "1 groove #C9C9C9",
    height: 364,
    position: "relative",
    left: 70,
    top: -32
  },
  line28: {
    backgroundColor: '#C9C9C9',
    width: 0.5,
    border: "1 groove #C9C9C9",
    height: 364,
    position: "relative",
    left: 105,
    top: -32
  },
  line29: {
    backgroundColor: '#C9C9C9',
    width: 0.5,
    border: "1 groove #C9C9C9",
    height: 364,
    position: "relative",
    left: 80,
    top: -32
  },
  line34: {
    backgroundColor: '#C9C9C9',
    width: 0.5,
    border: "1 groove #C9C9C9",
    height: 134,
    position: "relative",
    left: 102,
    top: 460
  },
  line35: {
    backgroundColor: '#C9C9C9',
    width: 0.5,
    border: "1 groove #C9C9C9",
    height: 134,
    position: "relative",
    left: 300,
    top: 327
  },
  line36: {
    backgroundColor: '#C9C9C9',
    width: 0.5,
    border: "1 groove #C9C9C9",
    height: 134,
    position: "relative",
    left: 360,
    top: 192
  },
  line3: {

    width: 170,
    border: "1 groove #C9C9C9",
    height: 60,
    position: "relative",
    left: 410,
    top: 30
  },
  container:{
  position:'relative',
  top:30
  },
  line280: {
    backgroundColor: '#C9C9C9',
    width: 0.5,
    border: "1 groove #C9C9C9",
    height: 364,
    position: "relative",
    left: 72,
    top: -32
  },
  line290: {
    backgroundColor: '#C9C9C9',
    width: 0.5,
    border: "1 groove #C9C9C9",
    height: 364,
    position: "relative",
    left: 120,
    top: -32
  },
});

  const handlePdfGenerate = (e) =>{        
    setNewInputData({ ...newInputData });   
    var additionalData = Array.from(tableData.map(k=>addCalendarDate.filter(j=>j === moment(k.q15Date).format("YYYYMMDD") && (newInputData.shiftIncharge === "" || k.shiftIncharge.shiftInchargeA === newInputData.shiftIncharge || k.shiftIncharge.shiftInchargeB === newInputData.shiftIncharge || k.shiftIncharge.shiftInchargeC === newInputData.shiftIncharge) && (newInputData.patientName === "" || newInputData.patientName === k.pid))));
     additionalData = additionalData.filter(j=>j.length !== 0).map(k=>{return k})         
    additionalData.length !== 0 && additionalData !== null && additionalData !== undefined ?
    ReactDOM.render(
        <PDFViewer width={'100%'} height={'100%'}>
        
  <Document>
     {addCalendarDate.length !== 0 ? Object.keys(addCalendarDate).map(k => (
                                tableData !== null && tableData.length > 0 &&
                                (
                                  tableData.filter(j=>addCalendarDate[k] === moment(j.q15Date).format("YYYYMMDD")).length > 0 ? tableData.filter(j=>addCalendarDate[k] === moment(j.q15Date).format("YYYYMMDD")&& (newInputData.shiftIncharge === "" || j.shiftIncharge.shiftInchargeA === newInputData.shiftIncharge || j.shiftIncharge.shiftInchargeB === newInputData.shiftIncharge || j.shiftIncharge.shiftInchargeC === newInputData.shiftIncharge) && (newInputData.patientName === "" || newInputData.patientName === j.pid)).map(l => (
                                        <>
    <Page size="A4" style={styles.page}>
      <Text style={styles.line3} />
<Text style={{position:"relative",top:"45px",left:"-60px"}} >Mettler Health Care Organization</Text>

      <View style={styles.section}>
        <Text style={styles.topSection101}>{getPatientDataItems.filter(i=>i.id === l.pid).map(tableData =>{return tableData.basicDetails[0].name[0].given+" "+tableData.basicDetails[0].name[0].family.charAt(0,2)})}</Text>
        <Text style={styles.Location}>Location Code</Text>
        <View style={styles.section1}>

          <Text style={styles.topSection1}>L1</Text>
          <Text style={styles.topSection2}>L2</Text>
          <Text style={styles.topSection3}>L3</Text>
          <Text style={styles.topSection4}>L4</Text>
          <Text style={styles.topSection5}>L5</Text>
          <Text style={styles.topSection6}>L6</Text>
          <Text style={styles.topSection7}>L7</Text>
          <Text style={styles.topSection8}>L8</Text>
          <Text style={styles.topSection9}>L9</Text>
          <Text style={styles.topSection10}>L10</Text>
          <Text style={styles.topSection11}>L11</Text>
        </View>
        <View style={styles.section2}>
          <Text style={styles.topSection12}>Bedroom</Text>
          <Text style={styles.topSection13}>BedroomAwake</Text>
          <Text style={styles.topSection14}>BedroomAsleep</Text>
          <Text style={styles.topSection15}>Bathroom</Text>
          <Text style={styles.topSection16}>DayArea</Text>
          <Text style={styles.topSection17}>FishBowl</Text>
          <Text style={styles.topSection18}>ExamRoom</Text>
          <Text style={styles.topSection19}>WithNurse</Text>
          <Text style={styles.topSection20}>OnPass</Text>
          <Text style={styles.topSection21}>WithTherapist</Text>
          <Text style={styles.topSection22}>School</Text>
        </View>
        <View style={styles.section3}>

          <Text style={styles.topSection1}>L12</Text>
          <Text style={styles.topSection2}>L13</Text>
          <Text style={styles.topSection3}>L14</Text>
          <Text style={styles.topSection4}>L15</Text>
          <Text style={styles.topSection5}>L16</Text>
          <Text style={styles.topSection6}>L17</Text>
          <Text style={styles.topSection7}>L18</Text>
          <Text style={styles.topSection8}>L19</Text>
          <Text style={styles.topSection9}>L20</Text>
          <Text style={styles.topSection10}>L21</Text>
          <Text style={styles.topSection11}>L22</Text>
        </View>
        <View style={styles.section4}>

          <Text style={styles.topSection1}>Cafeteria</Text>
          <Text style={styles.topSection2}>Outdoors</Text>
          <Text style={styles.topSection3}>TR Room</Text>
          <Text style={styles.topSection4}>Gym</Text>
          <Text style={styles.topSection5}>Fish Bowl</Text>
          <Text style={styles.topSection6}>Playground</Text>
          <Text style={styles.topSection7}>On Visit</Text>
          <Text style={styles.topSection8}>On Pass</Text>
          <Text style={styles.topSection9}>Quiet Room</Text>
          <Text style={styles.topSection10}>Seclusion</Text>
          <Text style={styles.line} />
        </View>
        <Text style={styles.Location3}>Activity</Text>
        <View style={styles.section5}>

          <Text style={styles.topSection1}>Sucide</Text>
          <Text style={styles.topSection2}>Homicidal</Text>
          <Text style={styles.topSection3}>Elopement</Text>
          <Text style={styles.topSection4}>Assauiltive</Text>
          <Text style={styles.topSection5}>Psychosis</Text>
          <Text style={styles.topSection6}>Self Abuse</Text>

        </View>
        <View style={styles.section6}>

          <Text style={styles.topSection1}>Sucide</Text>
          <Text style={styles.topSection2}>Homicidal</Text>
          <Text style={styles.topSection3}>Elopement</Text>
          <Text style={styles.topSection4}>Assauiltive</Text>
          <Text style={styles.topSection5}>Psychosis</Text>
          <Text style={styles.topSection6}>Self Abuse</Text>
          <Text style={styles.line2} />
        </View>
        <Text style={styles.Location2}>Restriction(circle)</Text>

        <View style={styles.section7}>

          <Text style={styles.topSection1}>phone</Text>
          <Text style={styles.topSection2}>visitor</Text>
          <Text style={styles.topSection3}>unit</Text>
          <Text style={styles.topSection4}>other:</Text>
          <Text style={styles.line4} />
          <Text style={styles.line5} />
          <Text style={styles.line6} />

        </View>
        <Text style={{position:"relative",top:"270px"}}>
            <Text>Date:</Text>
            <Text>{moment(l.q15Date).format("MMM DD, YYYY")}</Text>
        </Text>
        <Text style={styles.topSection0000}>Document Location code and staff initilats every 15 minutes</Text>
      </View>
     
      <View style={styles.sections}>
        <View style={styles.section8}>
          <Text style={styles.line70} />
          <Text style={styles.topSection1}>{newTimeSlot[0]}</Text>
          <Text style={styles.line7} />
          <Text style={styles.topSection2}>{newTimeSlot[1]}</Text>
          <Text style={styles.line8} />
          <Text style={styles.topSection3}>{newTimeSlot[2]}</Text>
          <Text style={styles.line9} />
          <Text style={styles.topSection4}>{newTimeSlot[3]}</Text>
          <Text style={styles.line10} />
          <Text style={styles.topSection5}>{newTimeSlot[4]}</Text>
          <Text style={styles.line11} />
          <Text style={styles.topSection1330}>{newTimeSlot[5]}</Text>
          <Text style={styles.line12} />
          <Text style={styles.topSection1345}>{newTimeSlot[6]}</Text>
          <Text style={styles.line13} />
          <Text style={styles.topSection1400}>{newTimeSlot[7]}</Text>
          <Text style={styles.line14} />
          <Text style={styles.topSection1415}>{newTimeSlot[8]}</Text>
          <Text style={styles.line15} />
          <Text style={styles.topSection1430}>{newTimeSlot[9]}</Text>
          <Text style={styles.line16} />
          <Text style={styles.topSection1445}>{newTimeSlot[10]}</Text>
          <Text style={styles.line17} />
          <Text style={styles.topSection1500}>{newTimeSlot[11]}</Text>
          <Text style={styles.line18} />
          <Text style={styles.topSection1515}>{newTimeSlot[12]}</Text>
          <Text style={styles.line19} />
          <Text style={styles.topSection1530}>{newTimeSlot[13]}</Text>
          <Text style={styles.line20} />
          <Text style={styles.topSection1545}>{newTimeSlot[14]}</Text>
          <Text style={styles.line21} />
          <Text style={styles.topSection1230}>{newTimeSlot[15]}</Text>
          <Text style={styles.line22} />

          <Text style={styles.line24} />
        </View>

        <Text style={styles.topSection0}>Location Code</Text>


        <View style={styles.section9}>

          <Text style={styles.topSection1}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[0].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[0].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection2}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[1].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[1].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection3}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[2].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[2].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection4}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[3].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[3].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection5}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[4].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[4].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1330}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[5].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[5].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1345}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[6].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[6].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1400}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[7].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[7].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1415}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[8].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[8].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1430}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[9].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[9].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1445}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[10].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[10].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1500}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[11].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[11].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1515}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[12].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[12].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1530}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[13].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[13].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1545}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[14].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[14].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1230}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[15].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[15].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>
          
          <Text style={styles.line25} />
        </View>
        <Text style={styles.topSection01}>Initial</Text>

        <View style={styles.section10}>

          <Text style={styles.topSection1}></Text>

          <Text style={styles.topSection2}></Text>

          <Text style={styles.topSection3}></Text>

          <Text style={styles.topSection4}></Text>

          <Text style={styles.topSection5}></Text>

          <Text style={styles.topSection1330}></Text>

          <Text style={styles.topSection1345}></Text>

          <Text style={styles.topSection1400}></Text>

          <Text style={styles.topSection1415}></Text>

          <Text style={styles.topSection1430}></Text>

          <Text style={styles.topSection1445}></Text>

          <Text style={styles.topSection1500}></Text>

          <Text style={styles.topSection1515}></Text>

          <Text style={styles.topSection1530}></Text>

          <Text style={styles.topSection1545}></Text>

          <Text style={styles.topSection1230}></Text>

          <Text style={styles.topSection1347}></Text>
          <Text style={styles.line26} />
        </View>
        <View style={styles.section11}>

          <Text style={styles.topSection1}>{newTimeSlot[16]}</Text>

          <Text style={styles.topSection2}>{newTimeSlot[17]}</Text>

          <Text style={styles.topSection3}>{newTimeSlot[18]}</Text>

          <Text style={styles.topSection4}>{newTimeSlot[19]}</Text>

          <Text style={styles.topSection5}>{newTimeSlot[20]}</Text>

          <Text style={styles.topSection1330}>{newTimeSlot[21]}</Text>

          <Text style={styles.topSection1345}>{newTimeSlot[22]}</Text>

          <Text style={styles.topSection1400}>{newTimeSlot[23]}</Text>

          <Text style={styles.topSection1415}>{newTimeSlot[24]}</Text>

          <Text style={styles.topSection1430}>{newTimeSlot[25]}</Text>

          <Text style={styles.topSection1445}>{newTimeSlot[26]}</Text>

          <Text style={styles.topSection1500}>{newTimeSlot[27]}</Text>

          <Text style={styles.topSection1515}>{newTimeSlot[28]}</Text>

          <Text style={styles.topSection1530}>{newTimeSlot[29]}</Text>

          <Text style={styles.topSection1545}>{newTimeSlot[30]}</Text>

          <Text style={styles.topSection1230}>{newTimeSlot[31]}</Text>

        
          <Text style={styles.line27} />
        </View>

        <Text style={styles.topSection00}>Location Code</Text>


        <View style={styles.section12}>

          <Text style={styles.topSection1}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[16].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[16].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection2}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[17].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[17].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection3}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[18].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[18].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection4}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[19].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[19].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection5}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[20].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[20].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1330}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[21].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[21].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1345}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[22].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[22].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1400}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[23].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[23].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1415}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[24].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[24].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1430}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[25].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[25].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1445}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[26].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[26].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1500}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[27].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[27].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1515}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[28].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[28].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1530}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[29].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[29].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1545}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[30].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[30].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1230}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[31].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[31].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>
       
          <Text style={styles.line28} />
        </View>
        <Text style={styles.topSection001}>Initial</Text>

        <View style={styles.section13}>

          <Text style={styles.topSection1}></Text>

          <Text style={styles.topSection2}></Text>

          <Text style={styles.topSection3}></Text>

          <Text style={styles.topSection4}></Text>

          <Text style={styles.topSection5}></Text>

          <Text style={styles.topSection1330}></Text>

          <Text style={styles.topSection1345}></Text>

          <Text style={styles.topSection1400}></Text>

          <Text style={styles.topSection1415}></Text>

          <Text style={styles.topSection1430}></Text>

          <Text style={styles.topSection1445}></Text>

          <Text style={styles.topSection1500}></Text>

          <Text style={styles.topSection1515}></Text>

          <Text style={styles.topSection1530}></Text>

          <Text style={styles.topSection1545}></Text>

          <Text style={styles.topSection1230}></Text>

          <Text style={styles.topSection1347}></Text>
          <Text style={styles.line280} />
        </View>
        <View style={styles.section14}>

          <Text style={styles.topSection1}>{newTimeSlot[32]}</Text>

          <Text style={styles.topSection2}>{newTimeSlot[33]}</Text>

          <Text style={styles.topSection3}>{newTimeSlot[34]}</Text>

          <Text style={styles.topSection4}>{newTimeSlot[35]}</Text>

          <Text style={styles.topSection5}>{newTimeSlot[36]}</Text>

          <Text style={styles.topSection1330}>{newTimeSlot[37]}</Text>

          <Text style={styles.topSection1345}>{newTimeSlot[38]}</Text>

          <Text style={styles.topSection1400}>{newTimeSlot[39]}</Text>

          <Text style={styles.topSection1415}>{newTimeSlot[40]}</Text>

          <Text style={styles.topSection1430}>{newTimeSlot[41]}</Text>

          <Text style={styles.topSection1445}>{newTimeSlot[42]}</Text>

          <Text style={styles.topSection1500}>{newTimeSlot[43]}</Text>

          <Text style={styles.topSection1515}>{newTimeSlot[44]}</Text>

          <Text style={styles.topSection1530}>{newTimeSlot[45]}</Text>

          <Text style={styles.topSection1545}>{newTimeSlot[46]}</Text>

          <Text style={styles.topSection1230}>{newTimeSlot[47]}</Text>

       
          <Text style={styles.line29} />
        </View>

        <Text style={styles.topSection000}>Location Code</Text>


        <View style={styles.section15}>

          <Text style={styles.topSection1}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[32].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[32].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection2}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[33].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[33].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection3}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[34].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[34].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection4}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[35].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[35].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection5}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[36].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[36].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1330}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[37].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[37].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1345}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[38].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[38].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1400}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[39].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[39].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1415}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[40].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[40].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1430}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[41].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[41].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1445}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[42].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[42].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1500}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[43].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[43].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1515}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[44].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[44].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1530}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[45].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[45].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1545}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[46].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[46].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1230}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[47].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[47].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>
          
          <Text style={styles.line290} />
        </View>
        <Text style={styles.topSection0001}>Initial</Text>

        <View style={styles.section16}>

          <Text style={styles.topSection1}></Text>

          <Text style={styles.topSection2}></Text>

          <Text style={styles.topSection3}></Text>

          <Text style={styles.topSection4}></Text>

          <Text style={styles.topSection5}></Text>

          <Text style={styles.topSection1330}></Text>

          <Text style={styles.topSection1345}></Text>

          <Text style={styles.topSection1400}></Text>

          <Text style={styles.topSection1415}></Text>

          <Text style={styles.topSection1430}></Text>

          <Text style={styles.topSection1445}></Text>

          <Text style={styles.topSection1500}></Text>

          <Text style={styles.topSection1515}></Text>

          <Text style={styles.topSection1530}></Text>

          <Text style={styles.topSection1545}></Text>

          <Text style={styles.topSection1230}></Text>

          <Text style={styles.topSection1347}></Text>

        </View>
      </View>

    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
      <View style={styles.sections1}>
        <View style={styles.section8}>
          <Text style={styles.line70} />
          <Text style={styles.topSection1}>{newTimeSlot[48]}</Text>
          <Text style={styles.line7} />
          <Text style={styles.topSection2}>{newTimeSlot[49]}</Text>
          <Text style={styles.line8} />
          <Text style={styles.topSection3}>{newTimeSlot[50]}</Text>
          <Text style={styles.line9} />
          <Text style={styles.topSection4}>{newTimeSlot[51]}</Text>
          <Text style={styles.line10} />
          <Text style={styles.topSection5}>{newTimeSlot[52]}</Text>
          <Text style={styles.line11} />
          <Text style={styles.topSection1330}>{newTimeSlot[53]}</Text>
          <Text style={styles.line12} />
          <Text style={styles.topSection1345}>{newTimeSlot[54]}</Text>
          <Text style={styles.line13} />
          <Text style={styles.topSection1400}>{newTimeSlot[55]}</Text>
          <Text style={styles.line14} />
          <Text style={styles.topSection1415}>{newTimeSlot[56]}</Text>
          <Text style={styles.line15} />
          <Text style={styles.topSection1430}>{newTimeSlot[57]}</Text>
          <Text style={styles.line16} />
          <Text style={styles.topSection1445}>{newTimeSlot[58]}</Text>
          <Text style={styles.line17} />
          <Text style={styles.topSection1500}>{newTimeSlot[59]}</Text>
          <Text style={styles.line18} />
          <Text style={styles.topSection1515}>{newTimeSlot[60]}</Text>
          <Text style={styles.line19} />
          <Text style={styles.topSection1530}>{newTimeSlot[61]}</Text>
          <Text style={styles.line20} />
          <Text style={styles.topSection1545}>{newTimeSlot[62]}</Text>
          <Text style={styles.line21} />
          <Text style={styles.topSection1230}>{newTimeSlot[63]}</Text>
          <Text style={styles.line22} />

          <Text style={styles.line24} />
        </View>

        <Text style={styles.topSection0}>Location Code</Text>


        <View style={styles.section9}>

          <Text style={styles.topSection1}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[48].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[48].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection2}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[49].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[49].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection3}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[50].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[50].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection4}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[51].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[51].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection5}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[52].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[52].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1330}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[53].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[53].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1345}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[54].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[54].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1400}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[55].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[55].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1415}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[56].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[56].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1430}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[57].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[57].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1445}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[58].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[58].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1500}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[59].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[59].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1515}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[60].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[60].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1530}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[61].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[61].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1545}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[62].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[62].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1230}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[63].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[63].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>        
          <Text style={styles.line25} />
        </View>
        <Text style={styles.topSection01}>Initial</Text>

        <View style={styles.section10}>

          <Text style={styles.topSection1}></Text>

          <Text style={styles.topSection2}></Text>

          <Text style={styles.topSection3}></Text>

          <Text style={styles.topSection4}></Text>

          <Text style={styles.topSection5}></Text>

          <Text style={styles.topSection1330}></Text>

          <Text style={styles.topSection1345}></Text>

          <Text style={styles.topSection1400}></Text>

          <Text style={styles.topSection1415}></Text>

          <Text style={styles.topSection1430}></Text>

          <Text style={styles.topSection1445}></Text>

          <Text style={styles.topSection1500}></Text>

          <Text style={styles.topSection1515}></Text>

          <Text style={styles.topSection1530}></Text>

          <Text style={styles.topSection1545}></Text>

          <Text style={styles.topSection1230}></Text>

          <Text style={styles.topSection1347}></Text>
          <Text style={styles.line26} />
        </View>
        <View style={styles.section11}>

          <Text style={styles.topSection1}>{newTimeSlot[64]}</Text>

          <Text style={styles.topSection2}>{newTimeSlot[65]}</Text>

          <Text style={styles.topSection3}>{newTimeSlot[66]}</Text>

          <Text style={styles.topSection4}>{newTimeSlot[67]}</Text>

          <Text style={styles.topSection5}>{newTimeSlot[68]}</Text>

          <Text style={styles.topSection1330}>{newTimeSlot[69]}</Text>

          <Text style={styles.topSection1345}>{newTimeSlot[70]}</Text>

          <Text style={styles.topSection1400}>{newTimeSlot[71]}</Text>

          <Text style={styles.topSection1415}>{newTimeSlot[72]}</Text>

          <Text style={styles.topSection1430}>{newTimeSlot[73]}</Text>

          <Text style={styles.topSection1445}>{newTimeSlot[74]}</Text>

          <Text style={styles.topSection1500}>{newTimeSlot[75]}</Text>

          <Text style={styles.topSection1515}>{newTimeSlot[76]}</Text>

          <Text style={styles.topSection1530}>{newTimeSlot[77]}</Text>

          <Text style={styles.topSection1545}>{newTimeSlot[78]}</Text>

          <Text style={styles.topSection1230}>{newTimeSlot[79]}</Text>

        
          <Text style={styles.line27} />
        </View>

        <Text style={styles.topSection00}>Location Code</Text>


        <View style={styles.section12}>

          <Text style={styles.topSection1}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[64].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[64].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection2}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[65].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[65].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection3}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[66].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[66].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection4}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[67].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[67].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection5}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[68].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[68].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1330}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[69].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[69].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1345}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[70].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[70].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1400}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[71].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[71].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1415}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[72].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[72].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1430}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[73].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[73].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1445}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[74].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[74].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1500}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[75].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[75].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1515}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[76].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[76].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1530}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[77].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[77].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1545}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[78].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[78].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1230}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[79].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[79].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.line28} />
        </View>
        <Text style={styles.topSection001}>Initial</Text>

        <View style={styles.section13}>

          <Text style={styles.topSection1}></Text>

          <Text style={styles.topSection2}></Text>

          <Text style={styles.topSection3}></Text>

          <Text style={styles.topSection4}></Text>

          <Text style={styles.topSection5}></Text>

          <Text style={styles.topSection1330}></Text>

          <Text style={styles.topSection1345}></Text>

          <Text style={styles.topSection1400}></Text>

          <Text style={styles.topSection1415}></Text>

          <Text style={styles.topSection1430}></Text>

          <Text style={styles.topSection1445}></Text>

          <Text style={styles.topSection1500}></Text>

          <Text style={styles.topSection1515}></Text>

          <Text style={styles.topSection1530}></Text>

          <Text style={styles.topSection1545}></Text>

          <Text style={styles.topSection1230}></Text>

          <Text style={styles.topSection1347}></Text>
          <Text style={styles.line280} />
        </View>
        <View style={styles.section14}>

          <Text style={styles.topSection1}>{newTimeSlot[80]}</Text>

          <Text style={styles.topSection2}>{newTimeSlot[81]}</Text>

          <Text style={styles.topSection3}>{newTimeSlot[82]}</Text>

          <Text style={styles.topSection4}>{newTimeSlot[83]}</Text>

          <Text style={styles.topSection5}>{newTimeSlot[84]}</Text>

          <Text style={styles.topSection1330}>{newTimeSlot[85]}</Text>

          <Text style={styles.topSection1345}>{newTimeSlot[86]}</Text>

          <Text style={styles.topSection1400}>{newTimeSlot[87]}</Text>

          <Text style={styles.topSection1415}>{newTimeSlot[88]}</Text>

          <Text style={styles.topSection1430}>{newTimeSlot[89]}</Text>

          <Text style={styles.topSection1445}>{newTimeSlot[90]}</Text>

          <Text style={styles.topSection1500}>{newTimeSlot[91]}</Text>

          <Text style={styles.topSection1515}>{newTimeSlot[92]}</Text>

          <Text style={styles.topSection1530}>{newTimeSlot[93]}</Text>

          <Text style={styles.topSection1545}>{newTimeSlot[94]}</Text>

          <Text style={styles.topSection1230}>{newTimeSlot[95]}</Text>

       
          <Text style={styles.line29} />
        </View>

        <Text style={styles.topSection000}>Location Code</Text>


        <View style={styles.section15}>

          <Text style={styles.topSection1}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[80].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[80].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection2}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[81].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[81].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection3}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[82].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[82].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection4}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[83].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[83].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection5}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[84].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[84].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1330}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[85].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[85].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1345}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[86].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[86].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1400}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[87].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[87].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1415}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[88].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[88].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1430}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[89].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[89].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1445}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[90].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[90].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1500}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[91].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[91].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1515}>{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[92].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[92].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1530}>{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[93].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[93].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1545}>{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[94].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[94].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>

          <Text style={styles.topSection1230}>{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[95].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[95].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location !== "" && n.acitivity !== ""?(" - "+n.activity):n.location === "" && n.acitivity !== ""?(n.activity):""})}</Text>
          
          <Text style={styles.line290} />
        </View>
        <Text style={styles.topSection0001}>Initial</Text>

        <View style={styles.section16}>

          <Text style={styles.topSection1}></Text>

          <Text style={styles.topSection2}></Text>

          <Text style={styles.topSection3}></Text>

          <Text style={styles.topSection4}></Text>

          <Text style={styles.topSection5}></Text>

          <Text style={styles.topSection1330}></Text>

          <Text style={styles.topSection1345}></Text>

          <Text style={styles.topSection1400}></Text>

          <Text style={styles.topSection1415}></Text>

          <Text style={styles.topSection1430}></Text>

          <Text style={styles.topSection1445}></Text>

          <Text style={styles.topSection1500}></Text>

          <Text style={styles.topSection1515}></Text>

          <Text style={styles.topSection1530}></Text>

          <Text style={styles.topSection1545}></Text>

          <Text style={styles.topSection1230}></Text>

          <Text style={styles.topSection1347}></Text>

        </View>
      </View>
        <View style={styles.sectionss}>
          <Text style={styles.topSectionsShift}>Shift</Text>
          <Text style={styles.line30} />
          <Text style={styles.topSections1530}>{newTimeSlot[0]} to {newTimeSlot[31]}</Text>
          <Text style={styles.line31} />
          <Text style={styles.topSections1120}>{newTimeSlot[32]} to {newTimeSlot[63]}</Text>
          <Text style={styles.line32} />
          <Text style={styles.topSections2156}>{newTimeSlot[64]} to 8:45</Text>

        </View>
        <Text style={styles.line34} />
        <View style={styles.sectionsss}>
       

          <Text style={styles.topSectionsShifts}>Print Name</Text>

          <Text style={styles.topSections1530}>{newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeA).map(tableData =>{return tableData.name[0].given}) ||
          newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeA && i.id === newInputData.shiftIncharge).map(tableData =>{return tableData.name[0].given}) || "--"}</Text>

          <Text style={styles.topSections1120}>{newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeB).map(tableData =>{return tableData.name[0].given}) ||
          newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeB && i.id === newInputData.shiftIncharge).map(tableData =>{return tableData.name[0].given}) || "--"}</Text>

          <Text style={styles.topSections2156}>{newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeC).map(tableData =>{return tableData.name[0].given}) ||
          newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeC && i.id === newInputData.shiftIncharge).map(tableData =>{return tableData.name[0].given}) || "--"}</Text>

        </View>
        <Text style={styles.line35} />
        <View style={styles.sectionssss}>
        

          <Text style={styles.topSectionsShifts}>Initial</Text>

          <Text style={styles.topSections1530}>{newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeA).map(tableData =>{return tableData.name[0].family.charAt(0,2)}) ||
          newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeA && i.id === newInputData.shiftIncharge).map(tableData =>{return tableData.name[0].family.charAt(0,2)}) || "--"}</Text>

          <Text style={styles.topSections1120}>{newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeB).map(tableData =>{return tableData.name[0].family.charAt(0,2)}) ||
          newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeB && i.id === newInputData.shiftIncharge).map(tableData =>{return tableData.name[0].family.charAt(0,2)}) || "--"}</Text>

          <Text style={styles.topSections2156}>{newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeC).map(tableData =>{return tableData.name[0].family.charAt(0,2)}) ||
          newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeC && i.id === newInputData.shiftIncharge).map(tableData =>{return tableData.name[0].family.charAt(0,2)}) || "--"}</Text>

        </View>
        <Text style={styles.line36} />
        <View style={styles.sectionsssss}>
          <Text style={styles.topSectionsShift}>Sign Name</Text>

          <Text style={styles.topSections1530}></Text>

          <Text style={styles.topSections1120}></Text>

          <Text style={styles.topSections2156}></Text>
          
        </View>
      </View>

    </Page>
    </>
)):<> </>))):<> </>}
  </Document>

          </PDFViewer>,
        document.getElementById("root")
      ): alert("No records found");
      
  }

    return (
        <div style={{ background: decryptPatientId != "" ? '#2D56AD' : "#FFF", height: decryptPatientId != "" ? '98px' : '0px', display: 'flex', width: 'calc(100% - 0px)', position: 'absolute' }} >
        <div style={{ boxShadow: " 1px 0px 0px 0px #D4DFEA", backgroundColor: "#EAF2FA", top: "10px", position: "absolute", left: "0px", width: "337px", height: "-webkit-fill-available" }}>
            <div style={{ display: "flex", position: "absolute", top: "20px", left: "20px", gap: "152px", color: "#0052CC", fontWeight: 600, fontFamily: "poppins" }}>
                <div>Filters</div>
                <div>Clear All</div>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>            
            {spinner &&
                  (<div className='overlay-content'>
                    <div className='wrapper'>
                      <img src={loaddingFile} style={{ position: 'absolute', width: '100%', zIndex: 2, opacity: '0.5' }} />
                    </div>
                  </div>
                  )}
                <div className="bedorgForm-fields" style={{ top: "69px", display: "flex", flexDirection: "row-reverse", left: "20px", width: "250px" }}>

                    <FormControl className="name-input13" variant="outlined">
                        <InputLabel color="primary" ><span >Shift Incharge
                        </span></InputLabel>
                        <Select color="primary" size="medium" label="Shift Incharge" name="shiftIncharge" value={newInputData.shiftIncharge} onChange={handleChanges}>
                        <MenuItem value="">Select</MenuItem>
        {getStaffDataItems.filter(i=>i.role === "Registered Nurses").map((tableData,i) =>{
            return (
              <MenuItem key={i} value={tableData.id}>{tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)}</MenuItem>
            )
          })}
                        </Select>
                        <FormHelperText />
                    </FormControl>
                </div>
                <div className="bedorgForm-fields" style={{ top: "147px", display: "flex", flexDirection: "row-reverse", left: "20px", width: "250px" }}>

                    <FormControl className="name-input13" variant="outlined">
                        <InputLabel color="primary" ><span >Entered By
                        </span></InputLabel>
                        <Select color="primary" size="medium" label="Entered By" name="criteria" value={newInputData.criteria} onChange={handleChanges}>
                           <MenuItem value="">Select</MenuItem>
        {getStaffDataItems.filter(i=>i.role==="Social Workers" || i.role==="Registered Nurses" || i.role==="Nurse Practitioner").map((tableData,i) =>{
            return (
              <MenuItem key={i} value={tableData.id}>{tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)}</MenuItem>
            )
          })}
                        </Select>
                        <FormHelperText />
                    </FormControl>
                </div>
                <div className="bedorgForm-fields" style={{ top: "228px", display: "flex", flexDirection: "row-reverse", left: "20px", width: "250px" }}>

                    <FormControl className="name-input13" variant="outlined">
                        <InputLabel color="primary" ><span >Patient Name
                        </span></InputLabel>
                        <Select color="primary" size="medium" label="Patient Name" name="patientName" value={newInputData.patientName} onChange={handleChanges}>
                        <MenuItem value="">Select</MenuItem>
                        {getPatientDataItems.map((tableData,i) =>{
            return (
              <MenuItem key={i} value={tableData.id}>{tableData.basicDetails[0].name[0].given+" "+tableData.basicDetails[0].name[0].family.charAt(0,2)}</MenuItem>
            )
          })}    
                        </Select>
                        <FormHelperText />
                    </FormControl>
                </div>
                <div className="bedorgForm-fields" style={{ top: "311px", display: "flex", flexDirection: "row-reverse", left: "20px", width: "250px" }}>

                    <FormControl className="name-input13" variant="outlined">
                        <InputLabel color="primary" ><span >Slot
                        </span></InputLabel>
                        <Select color="primary" size="medium" label="Criteria" name="q15Slot" value={newInputData.slot} onChange={handleChanges}>
                            <MenuItem value="1">Nurse Incharge</MenuItem>
                            <MenuItem value="2">Social Worker</MenuItem>
                            <MenuItem value="3">Start Date</MenuItem>
                            <MenuItem value="1">End Date</MenuItem>
                            <MenuItem value="2">Patient</MenuItem>
                            <MenuItem value="3">Slot</MenuItem>
                            <MenuItem value="3">Shift</MenuItem>
                        </Select>
                        <FormHelperText />
                    </FormControl>
                </div>
                <div className="bedorgForm-fields" style={{ top: "391px", display: "flex", flexDirection: "row-reverse", left: "20px", width: "250px" }}>

                    <FormControl className="name-input13" variant="outlined">
                        <InputLabel color="primary" ><span >Shift
                        </span></InputLabel>
                        <Select color="primary" size="medium" label="Criteria" name="shift" value={newInputData.shift} onChange={handleChanges}>
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem  value="Shift A">Shift A</MenuItem>
                        <MenuItem  value="Shift B">Shift B</MenuItem>
                        <MenuItem  value="Shift C">Shift C</MenuItem>
                        </Select>
                        <FormHelperText />
                    </FormControl>
                </div>
                <div className="bedorgForm-fields" style={{ top: "475px", display: "flex", flexDirection: "row-reverse", left: "20px", width: "250px" }}>

                    <DatePicker
                        className="name-input13"                           
                        label="Start Date"
                        value={newInputData.startDate}
                        onChange={(e) => {handleDateChange(e)}}
                        slotProps={{
                            textField: {
                                variant: "outlined",
                                size: "medium",
                                color: "primary",
                            },
                        }}
                    />
                </div>
                <div className="bedorgForm-fields" style={{ top: "557px", display: "flex", flexDirection: "row-reverse", left: "20px", width: "250px" }}>

                    <DatePicker
                        className="name-input13"                          
                        label="End Date"
                        value={newInputData.endDate}
                        onChange={(e) => {handleNewDateChange(e)}}
                        slotProps={{
                            textField: {
                                variant: "outlined",
                                size: "medium",
                                color: "primary",
                            },
                        }}
                    />
                </div>
            </LocalizationProvider>
        </div>
        <div style={{ fontFamily: "poppins", fontSize: "18px", fontStyle: "normal", fontWeight: 700, lineHeight: "normal", position: "absolute", top: "46px", left: "344px" }}>Q15 Reports</div>
        <a style={{cursor:'pointer'}} onClick={handlePdfGenerate}><span style={{ display: "flex", gap: "9px", top: "47px", position: "absolute", left: "unset", right: "300px", width: "125px", height: "32px", backgroundColor: "#F8F9FB", borderRadius: "4px" }}>
                        <span>
                            <i style={{ position: "absolute", top: "5px", left: "5px" }} className="large material-icons">file_download</i>
                        </span>
                        <span style={{ position: "absolute", top: "6px", left: "39px", fontSize: "14px" }}>Download</span>
                    </span>                   
                    </a>
                    <div style={{ display: "flex", position: "absolute", left: "unset", right: "176px", top: "47px", gap: "9px", backgroundColor: "#F8F9FB", height: "32px", width: "89.93px", borderRadius: "4px" }}>
                        <div><i style={{ position: "relative", top: "5px", left: "7px" }} className="large material-icons">print</i></div>
                        <div style={{ position: "absolute", top: "6px", left: "39px", fontSize: "14px" }}>Print</div>
                    </div>
        <div style={{position:'relative',left:'354px',top:'100px',display:'flex',flexDirection:'column',width:'66%'}}>
{ addCalendarDate.length !== 0 ? Object.keys(addCalendarDate).map(k => (
      <div >
        <Accordion expanded={expanded === 'panelmain'+k} onChange={handleChange('panelmain'+k)}>
            <AccordionSummary style={{ backgroundColor: "#FFF" }} aria-controls="panel1d-content" id="panel1d-header">
                <Typography style={{ backgroundColor: "#FFF" }}> <span style={{ fontFamily: "poppins", fontSize: "18px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{moment(addCalendarDate[k]).format("MMM DD, YYYY")}</span>
                  
                </Typography>
            </AccordionSummary>
            <AccordionDetails >
                <Typography >
                    {tableData.filter(j=>addCalendarDate[k] === moment(j.q15Date).format("YYYYMMDD")).length > 0 ? (tableData.filter(j=>addCalendarDate[k] === moment(j.q15Date).format("YYYYMMDD") && (newInputData.shiftIncharge === "" || 
                    j.shiftIncharge.shiftInchargeA === newInputData.shiftIncharge || j.shiftIncharge.shiftInchargeB === newInputData.shiftIncharge || j.shiftIncharge.shiftInchargeC === newInputData.shiftIncharge) &&
                    (newInputData.patientName === "" || newInputData.patientName === j.pid) && (newInputData.criteria ==="" || newInputData.criteria === j.enteredBy.shiftA.slot1 || newInputData.criteria === j.enteredBy.shiftA.slot2 ||
                    newInputData.criteria === j.enteredBy.shiftA.slot3 || newInputData.criteria === j.enteredBy.shiftA.slot4 || newInputData.criteria === j.enteredBy.shiftB.slot1 || newInputData.criteria === j.enteredBy.shiftB.slot2
                    || newInputData.criteria === j.enteredBy.shiftB.slot3 || newInputData.criteria === j.enteredBy.shiftB.slot4 || newInputData.criteria === j.enteredBy.shiftC.slot1 || newInputData.criteria === j.enteredBy.shiftC.slot2
                    || newInputData.criteria === j.enteredBy.shiftC.slot3 || newInputData.criteria === j.enteredBy.shiftC.slot4)).map(l => (
                    <Accordion style={{ borderStyle: "none" }} expanded={newExpanded === 'panel11'} onChange={handleNewChange('panel11')}>
                        <AccordionSummary style={{ backgroundColor: "#FFF" }} expandIcon={false} aria-controls="panel11d-content" id="panel11d-header">
                            <Typography style={{width:"-webkit-fill-available"}}>
                            
                            <div>
                                <span style={{ color: "#000", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal",position:'relative',top:'-14px' }}>Shift Incharge: {newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "" && newAddExpanded === 'Shift B' && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeB).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)}) ||
                                newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "" && newAddExpanded === 'Shift C' && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeC).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)}) || 
                                newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "" && newAddExpanded === 'Shift A' && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeA).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)}) ||
                                newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "" && newAddExpanded === 'Shift B' && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeB && i.id === newInputData.shiftIncharge).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)}) ||
                                newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "" && newAddExpanded === 'Shift C' && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeC && i.id === newInputData.shiftIncharge).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)}) ||
                                newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "" && newAddExpanded === 'Shift A' && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeA && i.id === newInputData.shiftIncharge).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)}) || 
                                getStaffDataItems.filter(m=>m.id === newInputData.shiftIncharge && newInputData.shiftIncharge !== "" && newInputData.shiftIncharge !== l.shiftIncharge.shiftInchargeB && newInputData.shiftIncharge !== l.shiftIncharge.shiftInchargeC && newInputData.shiftIncharge !== l.shiftIncharge.shiftInchargeA).map(m=>{return "--"}) && "--"}</span>
                                <div className="bedorgForm-fields" style={{ zIndex: 1, top: "-15px", display: "flex", flexDirection: "row-reverse", left: "unset", right: "-1px", width: "250px" }}>

                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel id="demo-select-small-label">Shift A</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="shift" name="shift"
                                            value={newInputData.shift}
                                            label="Shift"
                                            onChange={handleChanges}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            <MenuItem  value="Shift A">Shift A</MenuItem>
                                            <MenuItem  value="Shift B">Shift B</MenuItem>
                                            <MenuItem  value="Shift C">Shift C</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <span style={{ position: "relative", top: "20px" }}>Select Shift:</span>
                                </div>
                                <div style={{position:'relative',width:'100%',top:'18px',left:'-10px'}}>
                                <Accordion style={{ borderStyle: "none",top:'-12px' }} expanded={newAddExpanded === 'Shift A'} onChange={handleNewAddChange('Shift A')}>
                                    <AccordionSummary style={{ backgroundColor: "#F7FAFE",borderRadius:'6px' }} aria-controls="panel11Ad-content" id="panel11Ad-header">
                                        <Typography >
                                            <span style={{ fontFamily: "poppins", color: "#000", fontSize: "14px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal", position: "relative", top: "0px" }}>Shift A:
                                                <span style={{ fontFamily: "poppins", color: "#000", fontSize: "14px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal" }}>{newTimeSlot[0]} AM to {newTimeSlot[31]} PM</span>
                                            </span>
                                            <div style={{ position: "absolute", left: "unset",whiteSpace:"nowrap",right:"90px", top: "12px", width: "131px", display: "flex", gap: "7px" }}>
                                                <img src={Rectangle6215}></img>
                                                <div style={{}}>Patient: {getPatientDataItems.filter(i=>i.id === l.pid).map(tableData =>{return tableData.basicDetails[0].name[0].given+" "+tableData.basicDetails[0].name[0].family.charAt(0,2)})}</div>
                                            </div>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails style={{ backgroundColor: "#F7FAFE",borderBottomLeftRadius:'6px',borderBottomRightRadius:'6px' }}>
                                        <Typography style={{ height: "448px", backgroundColor: "#F7FAFE",cursor:'auto' }}>
                                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                                <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[0]} AM to {newTimeSlot[7]} AM:
                                                    
                                                    <div style={{ position: "absolute", left: "unset", top: "137px", width: "131px", display: "flex", gap: "7px",whiteSpace:"nowrap" }}>
                                                    <div style={{position:"relative",top:"5px",width:"fit-contant"}}>Entered By:</div>
                                                        <img src={Rectangle6215}></img>
                                                        <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal",position:"relative",top:"5px" }}>{((newInputData.criteria === "" && l.enteredBy.shiftA.slot1 !== "" && l.enteredBy.shiftA.slot1 !== null) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftA.slot1).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) || 
                                                        ((newInputData.criteria !== "" && l.enteredBy.shiftA.slot1 !== "" && l.enteredBy.shiftA.slot1 !== null && l.enteredBy.shiftA.slot1 === newInputData.criteria) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftA.slot1).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) ||
                                                        getStaffDataItems.filter(m=>m.id === newInputData.criteria && newInputData.criteria !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "") && newInputData.criteria !== l.enteredBy.shiftA.slot1).map(m=>{return "--"}) && "--"}</div>
                                                    </div>
                                                </div>
                                                <a style={{cursor:'pointer'}} onClick={()=>{alert(k)}}><div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[0]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[0].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[0].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[0].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[0].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div></a>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[1]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[1].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[1].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[1].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[1].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[2]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[2].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[2].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[2].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[2].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[3]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[3].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[3].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[3].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[3].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[4]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[4].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[4].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[4].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[4].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[5]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[5].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[5].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[5].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[5].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[6]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[6].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[6].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[6].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[6].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[7]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[7].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[7].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[7].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[7].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>

                                            </div>
                                            <span style={{ textAlign: "center", border: "1px solid ", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "31px", borderColor: "#E3E8F1" }}></span>
                                            <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "46px" }}>
                                                <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[8]} AM to {newTimeSlot[15]} AM:
                                                
                                                    <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px",whiteSpace:"nowrap" }}>
                                                    <div style={{position:"relative",top:"4px",width:"fit-contant"}}>Entered By:</div>
                                                        <img src={Rectangle6215}></img>
                                                        <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal",position:"relative",top:"5px" }}>{((newInputData.criteria === "" && l.enteredBy.shiftA.slot2 !== "" && l.enteredBy.shiftA.slot2 !== null) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftA.slot2).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) || 
                                                        ((newInputData.criteria !== "" && l.enteredBy.shiftA.slot2 !== "" && l.enteredBy.shiftA.slot2 !== null && l.enteredBy.shiftA.slot2 === newInputData.criteria) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftA.slot2).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) ||
                                                        getStaffDataItems.filter(m=>m.id === newInputData.criteria && newInputData.criteria !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "") && newInputData.criteria !== l.enteredBy.shiftA.slot2).map(m=>{return "--"}) && "--"}</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[8]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[8].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[8].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[8].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[8].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[9]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[9].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[9].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[9].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[9].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[10]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[10].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[10].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[10].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[10].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[11]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[11].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[11].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[11].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[11].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[12]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[12].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[12].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[12].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[12].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[13]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[13].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[13].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[13].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[13].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[14]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[14].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[14].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[14].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[14].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[15]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[15].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[15].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[15].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[15].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>

                                            </div>
                                            <span style={{ textAlign: "center", border: "1px solid", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "75px", borderColor: "#E3E8F1" }}></span>
                                            <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "86px" }}>
                                                <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[16]} PM to {newTimeSlot[23]} PM:
                                               
                                                    <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px",whiteSpace:"nowrap" }}>
                                                    <div style={{position:"relative",top:"5px",width:"fit-contant"}}>Entered By:</div>
                                                        <img src={Rectangle6215}></img>
                                                        <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal",position:"relative",top:"5px" }}>{((newInputData.criteria === "" && l.enteredBy.shiftA.slot3 !== "" && l.enteredBy.shiftA.slot3 !== null) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftA.slot3).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) || 
                                                        ((newInputData.criteria !== "" && l.enteredBy.shiftA.slot3 !== "" && l.enteredBy.shiftA.slot3 !== null && l.enteredBy.shiftA.slot3 === newInputData.criteria) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftA.slot3).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) ||
                                                        getStaffDataItems.filter(m=>m.id === newInputData.criteria && newInputData.criteria !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "") && newInputData.criteria !== l.enteredBy.shiftA.slot3).map(m=>{return "--"}) && "--"}</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[16]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[16].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[16].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[16].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[16].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[17]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[17].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[17].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[17].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[17].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[18]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[18].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[18].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[18].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[18].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[19]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[19].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[19].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[19].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[19].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[20]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[20].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[20].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[20].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[20].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[21]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[21].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[21].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[21].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[21].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[22]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[22].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[22].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[22].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[22].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[23]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[23].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[23].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[23].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[23].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>

                                            </div>
                                            <span style={{ textAlign: "center", border: "1px solid", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "116px", borderColor: "#E3E8F1" }}></span>
                                            <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "130px" }}>
                                                <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[24]} PM to {newTimeSlot[31]} PM:
                                               
                                                    <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px",whiteSpace:"nowrap" }}>
                                                    <div style={{position:"relative",top:"5px",width:"fit-contant"}}>Entered By:</div>
                                                        <img src={Rectangle6215}></img>
                                                        <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal",position:"relative",top:"5px" }}>{((newInputData.criteria === "" && l.enteredBy.shiftA.slot4 !== "" && l.enteredBy.shiftA.slot4 !== null) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftA.slot4).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) || 
                                                        ((newInputData.criteria !== "" && l.enteredBy.shiftA.slot4 !== "" && l.enteredBy.shiftA.slot4 !== null && l.enteredBy.shiftA.slot4 === newInputData.criteria) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftA.slot4).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) ||
                                                        getStaffDataItems.filter(m=>m.id === newInputData.criteria && newInputData.criteria !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "") && newInputData.criteria !== l.enteredBy.shiftA.slot4).map(m=>{return "--"}) && "--"}</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[24]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[24].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[24].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[24].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[24].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[25]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[25].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[25].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[25].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[25].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[26]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[26].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[26].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[26].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[26].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[27]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[27].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[27].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[27].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[27].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[28]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[28].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[28].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[28].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[28].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[29]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[29].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[29].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[29].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[29].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[30]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[30].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[30].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[30].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[30].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[31]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[31].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[31].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[31].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[31].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                            </div>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion style={{ borderStyle: "none",top:'-6px' }} expanded={newAddExpanded === 'Shift B'} onChange={handleNewAddChange('Shift B')}>
                                    <AccordionSummary style={{ backgroundColor: "#F7FAFE",borderRadius:'6px' }} aria-controls="panel11Ad-content" id="panel11Ad-header">
                                        <Typography>
                                            <span style={{ fontFamily: "poppins", color: "#000", fontSize: "14px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal", position: "relative", top: "0px" }}>Shift B:
                                                <span style={{ fontFamily: "poppins", color: "#000", fontSize: "14px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal" }}>{newTimeSlot[32]} PM to {newTimeSlot[63]} PM</span>
                                            </span>
                                            <div style={{ position: "absolute", left: "unset",  top: "12px", width: "131px", display: "flex", gap: "7px",whiteSpace:"nowrap",right:"90px" }}>
                                                <img src={Rectangle6215}></img>
                                                <div style={{}}>Patient: {getPatientDataItems.filter(i=>i.id === l.pid).map(tableData =>{return tableData.basicDetails[0].name[0].given+" "+tableData.basicDetails[0].name[0].family.charAt(0,2)})}</div>
                                            </div>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails style={{ backgroundColor: "#F7FAFE",borderBottomLeftRadius:'6px',borderBottomRightRadius:'6px' }}>
                                        <Typography style={{ height: "448px", backgroundColor: "#F7FAFE" }}>
                                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                                <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[32]} PM to {newTimeSlot[39]} PM:
                                                
                                                    <div style={{ position: "absolute", left: "unset", top: "137px", width: "131px", display: "flex", gap: "7px",whiteSpace:"nowrap" }}>
                                                    <div style={{position:"relative",top:"5px",width:"fit-contant"}}>Entered By:</div>
                                                        <img src={Rectangle6215}></img>
                                                        <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal",position:"relative",top:"5px" }}>{((newInputData.criteria === "" && l.enteredBy.shiftB.slot1 !== "" && l.enteredBy.shiftB.slot1 !== null) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftB.slot1).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) || 
                                                        ((newInputData.criteria !== "" && l.enteredBy.shiftB.slot1 !== "" && l.enteredBy.shiftB.slot1 !== null && l.enteredBy.shiftB.slot1 === newInputData.criteria) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftB.slot1).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) ||
                                                        getStaffDataItems.filter(m=>m.id === newInputData.criteria && newInputData.criteria !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "") && newInputData.criteria !== l.enteredBy.shiftB.slot1).map(m=>{return "--"}) && "--"}</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[32]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[32].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[32].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[32].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[32].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[33]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[33].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[33].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[33].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[33].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[34]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[34].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[34].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[34].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[34].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[35]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[35].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[35].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[35].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[35].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[36]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[36].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[36].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[36].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[36].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[37]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[37].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[37].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[37].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[37].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[38]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[38].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[38].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[38].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[38].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[39]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[39].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[39].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[39].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[39].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>

                                            </div>
                                            <span style={{ textAlign: "center", border: "1px solid ", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "31px", borderColor: "#E3E8F1" }}></span>
                                            <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "46px" }}>
                                                <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[40]} PM to {newTimeSlot[47]} PM:
                                               
                                                    <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px",whiteSpace:"nowrap" }}>
                                                    <div style={{position:"relative",top:"5px",width:"fit-contant"}}>Entered By:</div>
                                                        <img src={Rectangle6215}></img>
                                                        <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal",position:"relative",top:"5px" }}>{((newInputData.criteria === "" && l.enteredBy.shiftB.slot2 !== "" && l.enteredBy.shiftB.slot2 !== null) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftB.slot2).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) || 
                                                        ((newInputData.criteria !== "" && l.enteredBy.shiftB.slot2 !== "" && l.enteredBy.shiftB.slot2 !== null && l.enteredBy.shiftB.slot2 === newInputData.criteria) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftB.slot2).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) ||
                                                        getStaffDataItems.filter(m=>m.id === newInputData.criteria && newInputData.criteria !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "") && newInputData.criteria !== l.enteredBy.shiftB.slot2).map(m=>{return "--"}) && "--"}</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[40]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[40].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[40].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[40].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[40].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[41]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[41].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[41].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[41].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[41].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[42]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[42].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[42].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[42].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[42].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[43]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[43].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[43].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[43].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[43].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[44]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[44].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[44].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[44].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[44].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[45]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[45].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[45].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[45].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[45].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[46]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[46].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[46].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[46].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[46].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[47]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[47].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[47].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[47].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[47].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>

                                            </div>
                                            <span style={{ textAlign: "center", border: "1px solid", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "75px", borderColor: "#E3E8F1" }}></span>
                                            <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "86px" }}>
                                                <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[48]} PM to {newTimeSlot[55]} PM:
                                               
                                                    <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px",whiteSpace:"nowrap" }}>
                                                    <div style={{position:"relative",top:"5px",width:"fit-contant"}}>Entered By:</div>
                                                        <img src={Rectangle6215}></img>
                                                        <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal",position:"relative",top:"5px" }}>{((newInputData.criteria === "" && l.enteredBy.shiftB.slot3 !== "" && l.enteredBy.shiftB.slot3 !== null) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftB.slot3).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) || 
                                                        ((newInputData.criteria !== "" && l.enteredBy.shiftB.slot3 !== "" && l.enteredBy.shiftB.slot3 !== null && l.enteredBy.shiftB.slot3 === newInputData.criteria) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftB.slot3).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) ||
                                                        getStaffDataItems.filter(m=>m.id === newInputData.criteria && newInputData.criteria !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "") && newInputData.criteria !== l.enteredBy.shiftB.slot3).map(m=>{return "--"}) && "--"}</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[48]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[48].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[48].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[48].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[48].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[49]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[49].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[49].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[49].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[49].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[50]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[50].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[50].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[50].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[50].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[51]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[51].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[51].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[51].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[51].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[52]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[52].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[52].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[52].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[52].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[53]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[53].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[53].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[53].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[53].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[54]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[54].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[54].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[54].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[54].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[55]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[55].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[55].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[55].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[55].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>

                                            </div>
                                            <span style={{ textAlign: "center", border: "1px solid", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "116px", borderColor: "#E3E8F1" }}></span>
                                            <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "130px" }}>
                                                <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[56]} PM to {newTimeSlot[63]} PM:
                                                
                                                    <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px",whiteSpace:"nowrap" }}>
                                                    <div style={{position:"relative",top:"5px",width:"fit-contant"}}>Entered By:</div>
                                                        <img src={Rectangle6215}></img>
                                                        <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal" ,position:"relative",top:"5px"}}>{((newInputData.criteria === "" && l.enteredBy.shiftB.slot4 !== "" && l.enteredBy.shiftB.slot4 !== null) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftB.slot4).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) || 
                                                        ((newInputData.criteria !== "" && l.enteredBy.shiftB.slot4 !== "" && l.enteredBy.shiftB.slot4 !== null && l.enteredBy.shiftB.slot4 === newInputData.criteria) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftB.slot4).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) ||
                                                        getStaffDataItems.filter(m=>m.id === newInputData.criteria && newInputData.criteria !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "") && newInputData.criteria !== l.enteredBy.shiftB.slot4).map(m=>{return "--"}) && "--"}</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[56]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[56].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[56].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[56].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[56].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[57]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[57].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[57].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[57].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[57].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[58]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[58].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[58].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[58].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[58].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[59]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[59].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[59].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[59].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[59].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[60]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[60].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[60].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[60].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[60].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[61]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[61].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[61].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[61].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[61].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[62]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[62].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[62].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[62].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[62].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[63]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[63].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[63].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[63].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[63].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>

                                            </div>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion style={{ borderStyle: "none" ,marginBottom:'40px'}} expanded={newAddExpanded === 'Shift C'} onChange={handleNewAddChange('Shift C')}>
                                    <AccordionSummary style={{ backgroundColor: "#F7FAFE",borderRadius:'6px'}} aria-controls="panel11Ad-content" id="panel11Ad-header">
                                        <Typography>
                                            <span style={{ fontFamily: "poppins", color: "#000", fontSize: "14px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal", position: "relative", top: "0px" }}>Shift C:
                                                <span style={{ fontFamily: "poppins", color: "#000", fontSize: "14px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal" }}>{newTimeSlot[64]} AM to {newTimeSlot[95]} AM</span>
                                            </span>
                                            <div style={{ position: "absolute", left: "unset", top: "12px", width: "131px", display: "flex", gap: "7px" ,whiteSpace:"nowrap",right:"90px"}}>
                                                <img src={Rectangle6215}></img>
                                                <div style={{}}>Patient: {l.pid !== "" ? getPatientDataItems.filter(i=>i.id === l.pid).map(tableData =>{return tableData.basicDetails[0].name[0].given+" "+tableData.basicDetails[0].name[0].family.charAt(0,2)}):"--"}</div>
                                            </div>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails style={{ backgroundColor: "#F7FAFE",borderBottomLeftRadius:'6px',borderBottomRightRadius:'6px' }}>
                                        <Typography style={{ height: "448px", backgroundColor: "#F7FAFE" }}>
                                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                                <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[64]} AM to {newTimeSlot[71]} AM:
                                                
                                                    <div style={{ position: "absolute", left: "unset", top: "137px", width: "131px", display: "flex", gap: "7px",whiteSpace:"nowrap"}}>
                                                    <div style={{position:"relative",top:"5px",width:"fit-contant"}}>Entered By:</div>
                                                        <img src={Rectangle6215}></img>
                                                        <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal",position:"relative",top:"5px" }}>{((newInputData.criteria === "" && l.enteredBy.shiftC.slot1 !== "" && l.enteredBy.shiftC.slot1 !== null) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftC.slot1).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) || 
                                                        ((newInputData.criteria !== "" && l.enteredBy.shiftC.slot1 !== "" && l.enteredBy.shiftC.slot1 !== null && l.enteredBy.shiftC.slot1 === newInputData.criteria) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftC.slot1).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) ||
                                                        getStaffDataItems.filter(m=>m.id === newInputData.criteria && newInputData.criteria !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "") && newInputData.criteria !== l.enteredBy.shiftC.slot1).map(m=>{return "--"}) && "--"}</div>
                                                    </div>
                                                </div>
                                              <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[64]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[64].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[64].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[64].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[64].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                               <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[65]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[65].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[65].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[65].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[65].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[66]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[66].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[66].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[66].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[66].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[67]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[67].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[67].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[67].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[67].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[68]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[68].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[68].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[68].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[68].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[69]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[69].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[69].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[69].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[69].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[70]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[70].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[70].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[70].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[70].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[71]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[71].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[71].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[71].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[71].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>

                                            </div>
                                            <span style={{ textAlign: "center", border: "1px solid ", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "31px", borderColor: "#E3E8F1" }}></span>
                                            <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "46px" }}>
                                                <div style={{ width: "157px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[72]} AM to {newTimeSlot[79]} AM:
                                                
                                                    <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px",whiteSpace:"nowrap" }}>
                                                    <div style={{position:"relative",top:"5px",width:"fit-contant"}}>Entered By:</div>
                                                        <img src={Rectangle6215}></img>
                                                        <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal",position:"relative",top:"5px" }}>{((newInputData.criteria === "" && l.enteredBy.shiftC.slot2 !== "" && l.enteredBy.shiftC.slot2 !== null) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftC.slot2).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) || 
                                                        ((newInputData.criteria !== "" && l.enteredBy.shiftC.slot2 !== "" && l.enteredBy.shiftC.slot2 !== null && l.enteredBy.shiftC.slot2 === newInputData.criteria) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftC.slot2).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) ||
                                                        getStaffDataItems.filter(m=>m.id === newInputData.criteria && newInputData.criteria !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "") && newInputData.criteria !== l.enteredBy.shiftC.slot2).map(m=>{return "--"}) && "--"}</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[72]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[72].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[72].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[72].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[72].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[73]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[73].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[73].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[73].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[73].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[74]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[74].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[74].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[74].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[74].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[75]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[75].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[75].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[75].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[75].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[76]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[76].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[76].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[76].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[76].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[77]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[77].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[77].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[77].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[77].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[78]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[78].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[78].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[78].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[78].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[79]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[79].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[79].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[79].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[79].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>

                                            </div>
                                            <span style={{ textAlign: "center", border: "1px solid", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "75px", borderColor: "#E3E8F1" }}></span>
                                            <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "86px" }}>
                                                <div style={{ width: "159px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[80]} AM to {newTimeSlot[87]} AM:
                                                
                                                    <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px",whiteSpace:"nowrap" }}>
                                                    <div style={{position:"relative",top:"5px",width:"fit-contant"}}>Entered By:</div>
                                                        <img src={Rectangle6215}></img>
                                                        <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal",position:"relative",top:"5px" }}>{((newInputData.criteria === "" && l.enteredBy.shiftC.slot3 !== "" && l.enteredBy.shiftC.slot3 !== null) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftC.slot3).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) || 
                                                        ((newInputData.criteria !== "" && l.enteredBy.shiftC.slot3 !== "" && l.enteredBy.shiftC.slot3 !== null && l.enteredBy.shiftC.slot3 === newInputData.criteria) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftC.slot3).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) ||
                                                        getStaffDataItems.filter(m=>m.id === newInputData.criteria && newInputData.criteria !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "") && newInputData.criteria !== l.enteredBy.shiftC.slot3).map(m=>{return "--"}) && "--"}</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[80]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[80].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[80].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[80].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[80].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[81]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[81].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[81].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[81].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[81].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[82]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[82].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[82].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[82].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[82].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[83]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[83].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[83].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[83].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[83].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[84]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[84].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[84].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[84].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[84].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[85]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[85].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[85].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[85].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[85].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[86]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[86].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[86].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[86].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[86].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[87]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[87].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[87].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[87].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[87].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>

                                            </div>
                                            <span style={{ textAlign: "center", border: "1px solid", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "116px", borderColor: "#E3E8F1" }}></span>
                                            <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "130px" }}>
                                                <div style={{ width: "158px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[88]} AM to {newTimeSlot[95]} AM:
                                                
                                                    <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px",whiteSpace:"nowrap" }}>
                                                    <div style={{position:"relative",top:"5px",width:"fit-contant"}}>Entered By:</div>
                                                        <img src={Rectangle6215}></img>
                                                        <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal",position:"relative",top:"5px" }}>{((newInputData.criteria === "" && l.enteredBy.shiftC.slot4 !== "" && l.enteredBy.shiftC.slot4 !== null) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftC.slot4).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) || 
                                                        ((newInputData.criteria !== "" && l.enteredBy.shiftC.slot4 !== "" && l.enteredBy.shiftC.slot4 !== null && l.enteredBy.shiftC.slot4 === newInputData.criteria) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "") && getStaffDataItems.filter(i=>i.id === l.enteredBy.shiftC.slot4).map(tableData =>{return tableData.name[0].given+" "+tableData.name[0].family.charAt(0,2)})) ||
                                                        getStaffDataItems.filter(m=>m.id === newInputData.criteria && newInputData.criteria !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "") && newInputData.criteria !== l.enteredBy.shiftC.slot4).map(m=>{return "--"}) && "--"}</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[88]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[88].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[88].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[88].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[88].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[89]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[89].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[89].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[89].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[89].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[90]}</span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[90].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[90].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[90].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[90].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[91]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[91].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[91].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[91].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[91].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[92]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[92].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[92].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[92].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "A"+newTimeSlot[92].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[93]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[93].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[93].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[93].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "B"+newTimeSlot[93].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[94]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[94].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[94].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[94].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "C"+newTimeSlot[94].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                    <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[95]} </span>
                                                    <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                    <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[95].slice(0,2) && m.location !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[95].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location}):"NA"}-{l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[95].slice(0,2) && m.activity !== "" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).length>0 ? l.data.filter(m=>m.q15Slot === "D"+newTimeSlot[95].slice(0,2) && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.activity}):"NA"}</span>
                                                </div>

                                            </div>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                </div>
                            </div>
                            </Typography>
                        </AccordionSummary>                              
                    </Accordion>))):(
                        <div style={{ fontFamily: "poppins", fontSize: "18px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal",textAlign:'center'}}>No Records Found</div>
                        /*
                         <Accordion style={{ borderStyle: "none" }} expanded={newExpanded === 'panel11'} onChange={handleNewChange('panel11')}>
                         <AccordionSummary style={{ backgroundColor: "#FFF" }} expandIcon={false} aria-controls="panel11d-content" id="panel11d-header">
                             <Typography style={{width:"-webkit-fill-available"}}>
                             
                             <div>
                                 <span style={{ color: "#000", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal",position:'relative',top:'-14px' }}>Shift Incharge</span>
                                 <div className="bedorgForm-fields" style={{ zIndex: 1, top: "-15px", display: "flex", flexDirection: "row-reverse", left: "unset", right: "-1px", width: "250px" }}>

                                     <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                         <InputLabel id="demo-select-small-label">Shift A</InputLabel>
                                         <Select
                                             labelId="demo-select-small-label"
                                             id="shift" name="shift"
                                             value={newInputData.shift}
                                             label="Shift"
                                             onChange={handleChanges}
                                         >
                                             <MenuItem value=""><em>None</em></MenuItem>
                                             <MenuItem  value="panel11A">Shift A</MenuItem>
                                             <MenuItem  value="panel11B">Shift B</MenuItem>
                                             <MenuItem  value="panel11C">Shift C</MenuItem>
                                         </Select>
                                     </FormControl>
                                     <span style={{ position: "relative", top: "20px" }}>Select Shift:</span>
                                 </div>
                                 <div style={{position:'relative',width:'100%',top:'18px',left:'-10px'}}>
                                 <Accordion style={{ borderStyle: "none",top:'-12px' }} expanded={newAddExpanded === 'panel11A'} onChange={handleNewAddChange('panel11A')}>
                                     <AccordionSummary style={{ backgroundColor: "#F7FAFE",borderRadius:'6px' }} aria-controls="panel11Ad-content" id="panel11Ad-header">
                                         <Typography >
                                             <span style={{ fontFamily: "poppins", color: "#000", fontSize: "14px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal", position: "relative", top: "0px" }}>Shift A:
                                                 <span style={{ fontFamily: "poppins", color: "#000", fontSize: "14px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal" }}>{newTimeSlot[0]} AM to {newTimeSlot[31]} PM</span>
                                             </span>
                                             <div style={{ position: "absolute", left: "unset", right: "0px", top: "12px", width: "131px", display: "flex", gap: "7px" }}>
                                                 <img src={Rectangle6215}></img>
                                                 <div style={{}}>--</div>
                                             </div>
                                         </Typography>
                                     </AccordionSummary>
                                     <AccordionDetails style={{ backgroundColor: "#F7FAFE",borderBottomLeftRadius:'6px',borderBottomRightRadius:'6px' }}>
                                         <Typography style={{ height: "448px", backgroundColor: "#F7FAFE",cursor:'auto' }}>
                                             <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                                 <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[0]} AM to 9:45 AM:
                                                     <div style={{ position: "absolute", left: "unset", top: "96px", width: "131px", display: "flex", gap: "7px" }}>

                                                         <img src={Rectangle6215}></img>
                                                         <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal" }}>--</div>
                                                     </div>
                                                 </div>
                                                 <a style={{cursor:'pointer'}} onClick={()=>{alert(k)}}><div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[0]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div></a>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[1]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[2]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[3]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[4]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[5]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[6]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[7]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>

                                             </div>
                                             <span style={{ textAlign: "center", border: "1px solid ", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "31px", borderColor: "#E3E8F1" }}></span>
                                             <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "46px" }}>
                                                 <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[8]} AM to {newTimeSlot[15]} AM:
                                                     <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px" }}>

                                                         <img src={Rectangle6215}></img>
                                                         <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal" }}>--</div>
                                                     </div>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[8]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[9]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[10]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[11]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[12]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[13]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[14]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[15]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>

                                             </div>
                                             <span style={{ textAlign: "center", border: "1px solid", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "75px", borderColor: "#E3E8F1" }}></span>
                                             <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "86px" }}>
                                                 <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[16]} PM to {newTimeSlot[23]} PM:
                                                     <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px" }}>

                                                         <img src={Rectangle6215}></img>
                                                         <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal" }}>--</div>
                                                     </div>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[16]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[17]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[18]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[19]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[20]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[21]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[22]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[23]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>

                                             </div>
                                             <span style={{ textAlign: "center", border: "1px solid", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "116px", borderColor: "#E3E8F1" }}></span>
                                             <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "130px" }}>
                                                 <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[24]} PM to {newTimeSlot[31]} PM:
                                                     <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px" }}>

                                                         <img src={Rectangle6215}></img>
                                                         <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal" }}>--</div>
                                                     </div>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[24]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[25]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[26]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[27]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[28]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[29]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[30]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[31]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>

                                             </div>
                                         </Typography>
                                     </AccordionDetails>
                                 </Accordion>
                                 <Accordion style={{ borderStyle: "none",top:'-6px' }} expanded={newAddExpanded === 'panel11B'} onChange={handleNewAddChange('panel11B')}>
                                     <AccordionSummary style={{ backgroundColor: "#F7FAFE",borderRadius:'6px' }} aria-controls="panel11Ad-content" id="panel11Ad-header">
                                         <Typography>
                                             <span style={{ fontFamily: "poppins", color: "#000", fontSize: "14px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal", position: "relative", top: "0px" }}>Shift B:
                                                 <span style={{ fontFamily: "poppins", color: "#000", fontSize: "14px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal" }}>{newTimeSlot[32]} PM to {newTimeSlot[63]} PM</span>
                                             </span>
                                             <div style={{ position: "absolute", left: "unset", right: "0px", top: "12px", width: "131px", display: "flex", gap: "7px" }}>
                                                 <img src={Rectangle6215}></img>
                                                 <div style={{}}>--</div>
                                             </div>
                                         </Typography>
                                     </AccordionSummary>
                                     <AccordionDetails style={{ backgroundColor: "#F7FAFE",borderBottomLeftRadius:'6px',borderBottomRightRadius:'6px' }}>
                                         <Typography style={{ height: "448px", backgroundColor: "#F7FAFE" }}>
                                             <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                                 <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[32]} PM to {newTimeSlot[39]} PM:
                                                     <div style={{ position: "absolute", left: "unset", top: "96px", width: "131px", display: "flex", gap: "7px" }}>

                                                         <img src={Rectangle6215}></img>
                                                         <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal" }}>--</div>
                                                     </div>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[32]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[33]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[34]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[35]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[36]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[37]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[38]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[39]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>

                                             </div>
                                             <span style={{ textAlign: "center", border: "1px solid ", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "31px", borderColor: "#E3E8F1" }}></span>
                                             <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "46px" }}>
                                                 <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[40]} PM to {newTimeSlot[47]} PM:
                                                     <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px" }}>

                                                         <img src={Rectangle6215}></img>
                                                         <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal" }}>--</div>
                                                     </div>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[40]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[41]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[42]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[43]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[44]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[45]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[46]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[47]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>

                                             </div>
                                             <span style={{ textAlign: "center", border: "1px solid", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "75px", borderColor: "#E3E8F1" }}></span>
                                             <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "86px" }}>
                                                 <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[48]} PM to {newTimeSlot[55]} PM:
                                                     <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px" }}>

                                                         <img src={Rectangle6215}></img>
                                                         <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal" }}>--</div>
                                                     </div>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[48]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[49]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[50]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[51]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[52]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[53]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[54]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[55]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>

                                             </div>
                                             <span style={{ textAlign: "center", border: "1px solid", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "116px", borderColor: "#E3E8F1" }}></span>
                                             <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "130px" }}>
                                                 <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[56]} PM to {newTimeSlot[63]} PM:
                                                     <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px" }}>

                                                         <img src={Rectangle6215}></img>
                                                         <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal" }}>--</div>
                                                     </div>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[56]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[57]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[58]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[59]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[60]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[61]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[62]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[63]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>

                                             </div>
                                         </Typography>
                                     </AccordionDetails>
                                 </Accordion>
                                 <Accordion style={{ borderStyle: "none" ,marginBottom:'40px'}} expanded={newAddExpanded === 'panel11C'} onChange={handleNewAddChange('panel11C')}>
                                     <AccordionSummary style={{ backgroundColor: "#F7FAFE",borderRadius:'6px'}} aria-controls="panel11Ad-content" id="panel11Ad-header">
                                         <Typography>
                                             <span style={{ fontFamily: "poppins", color: "#000", fontSize: "14px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal", position: "relative", top: "0px" }}>Shift C:
                                                 <span style={{ fontFamily: "poppins", color: "#000", fontSize: "14px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal" }}>{newTimeSlot[64]} AM to {newTimeSlot[95]} AM</span>
                                             </span>
                                             <div style={{ position: "absolute", left: "unset", right: "0px", top: "12px", width: "131px", display: "flex", gap: "7px" }}>
                                                 <img src={Rectangle6215}></img>
                                                 <div style={{}}>--</div>
                                             </div>
                                         </Typography>
                                     </AccordionSummary>
                                     <AccordionDetails style={{ backgroundColor: "#F7FAFE",borderBottomLeftRadius:'6px',borderBottomRightRadius:'6px' }}>
                                         <Typography style={{ height: "448px", backgroundColor: "#F7FAFE" }}>
                                             <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                                 <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[64]} AM to {newTimeSlot[71]} AM:
                                                     <div style={{ position: "absolute", left: "unset", top: "96px", width: "131px", display: "flex", gap: "7px" }}>

                                                         <img src={Rectangle6215}></img>
                                                         <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal" }}>--</div>
                                                     </div>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[64]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[65]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[66]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[67]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[68]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[69]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[70]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[71]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>

                                             </div>
                                             <span style={{ textAlign: "center", border: "1px solid ", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "31px", borderColor: "#E3E8F1" }}></span>
                                             <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "46px" }}>
                                                 <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[72]} AM to {newTimeSlot[79]} AM:
                                                     <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px" }}>

                                                         <img src={Rectangle6215}></img>
                                                         <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal" }}>--</div>
                                                     </div>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[72]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[73]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[74]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[75]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[76]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[77]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[78]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[79]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>

                                             </div>
                                             <span style={{ textAlign: "center", border: "1px solid", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "75px", borderColor: "#E3E8F1" }}></span>
                                             <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "86px" }}>
                                                 <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[80]} AM to {newTimeSlot[87]} AM:
                                                     <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px" }}>

                                                         <img src={Rectangle6215}></img>
                                                         <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal" }}>--</div>
                                                     </div>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[80]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[81]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[82]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[83]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[84]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[85]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[86]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[87]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>

                                             </div>
                                             <span style={{ textAlign: "center", border: "1px solid", position: "relative", left: "7px", display: "flex", width: "calc(100% - 11px)", top: "116px", borderColor: "#E3E8F1" }}></span>
                                             <div style={{ display: "flex", justifyContent: "space-evenly", position: "relative", top: "130px" }}>
                                                 <div style={{ width: "155px", fontFamily: "poppins", fontSize: "14px", fontWeight: 500, color: "#000", lineHeight: "normal" }}>{newTimeSlot[88]} AM to {newTimeSlot[95]} AM:
                                                     <div style={{ position: "absolute", left: "unset", top: "70px", width: "131px", display: "flex", gap: "7px" }}>

                                                         <img src={Rectangle6215}></img>
                                                         <div style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: 400, color: "#000", lineHeight: "normal" }}>--</div>
                                                     </div>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[88]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[89]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[90]}</span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[91]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[92]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[93]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[94]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>
                                                 <div style={{ display: "flex", gap: "10px", flexDirection: "column", width: "60px", height: "73px", border: "1px solid", borderRadius: "4px" }}>
                                                     <span style={{ textAlign: "center", color: " #415F9E", fontFamily: "poppins", fontSize: "15px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>{newTimeSlot[95]} </span>
                                                     <span style={{ textAlign: "center", border: "1px solid #E3E8F1", width: "45px", position: "relative", left: "7px" }}></span>
                                                     <span style={{ textAlign: "center", color: " #5E7494", fontFamily: "poppins", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.016px" }} >NA-NA</span>
                                                 </div>

                                             </div>
                                         </Typography>
                                     </AccordionDetails>
                                 </Accordion>
                                 </div>
                             </div>
                             </Typography>
                         </AccordionSummary>                              
                     </Accordion>
                    */
                    )
}
                </Typography>
            </AccordionDetails>
        </Accordion>          
       
    </div>     
)):<div style={{ fontFamily: "poppins", fontSize: "18px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal",textAlign:'center'}}>No Records Found</div>}
    </div>   
    </div>    
);


};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getAllPatientData, getAllStaffData } = state;
    return {
        deviceFormData, getAllPatientData, getAllStaffData
    };
};
export default connect(mapStateToProps)(Q15Reports)