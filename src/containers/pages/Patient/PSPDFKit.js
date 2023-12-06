import React from 'react';
import moment from "moment";
import { Document, Text, Page, View, StyleSheet } from '@react-pdf/renderer';

var newData = JSON.parse(localStorage.getItem("Q15ReportsData"));
var newInputData = JSON.parse(localStorage.getItem("Q15InputData"));
var calendarData = JSON.parse(localStorage.getItem("Q15CalendarData"));
var getStaffDataItems = JSON.parse(localStorage.getItem("StaffDataItem"));
var getPatientDataItems = JSON.parse(localStorage.getItem("PatientDataItem"));
console.log(JSON.stringify(calendarData));
console.log((newInputData));
//console.log(JSON.stringify(getStaffDataItems));
//console.log(JSON.stringify(getPatientDataItems));

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
    left: 245,
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
    left: 440,
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
    left: 70,
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
  }
});


const MyDocument = () => (
  <Document>
     {calendarData.length !== 0 ? Object.keys(calendarData).map(k => (
                                newData !== null && newData.length > 0 &&
                                (
                                  newData.filter(j=>calendarData[k] === moment(j.q15Date).format("YYYYMMDD")).length > 0 ? newData.filter(j=>calendarData[k] === moment(j.q15Date).format("YYYYMMDD")&& (newInputData.shiftIncharge === "" || j.shiftIncharge.shiftInchargeA === newInputData.shiftIncharge || j.shiftIncharge.shiftInchargeB === newInputData.shiftIncharge || j.shiftIncharge.shiftInchargeC === newInputData.shiftIncharge) && (newInputData.patientName === "" || newInputData.patientName === j.pid)).map(l => (
                                        <>
    <Page size="A4" style={styles.page}>
      <Text style={styles.line3} />

      <View style={styles.section}>
        <Text style={styles.topSection101}>{getPatientDataItems.filter(i=>i.id === l.pid).map(newData =>{return newData.basicDetails[0].name[0].given+" "+newData.basicDetails[0].name[0].family.charAt(0,2)})}</Text>
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
        <Text style={styles.Location3}>Precation(circle)</Text>
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
        <Text style={styles.topSection0000}>Document Location code and staff initilats every 15 minutes</Text>
      </View>
     
      <View style={styles.sections}>
        <View style={styles.section8}>
          <Text style={styles.line70} />
          <Text style={styles.topSection1}>0800</Text>
          <Text style={styles.line7} />
          <Text style={styles.topSection2}>0815</Text>
          <Text style={styles.line8} />
          <Text style={styles.topSection3}>0830</Text>
          <Text style={styles.line9} />
          <Text style={styles.topSection4}>0845</Text>
          <Text style={styles.line10} />
          <Text style={styles.topSection5}>0900</Text>
          <Text style={styles.line11} />
          <Text style={styles.topSection1330}>0915</Text>
          <Text style={styles.line12} />
          <Text style={styles.topSection1345}>0930</Text>
          <Text style={styles.line13} />
          <Text style={styles.topSection1400}>0945</Text>
          <Text style={styles.line14} />
          <Text style={styles.topSection1415}>1000</Text>
          <Text style={styles.line15} />
          <Text style={styles.topSection1430}>1015</Text>
          <Text style={styles.line16} />
          <Text style={styles.topSection1445}>1030</Text>
          <Text style={styles.line17} />
          <Text style={styles.topSection1500}>1045</Text>
          <Text style={styles.line18} />
          <Text style={styles.topSection1515}>1100</Text>
          <Text style={styles.line19} />
          <Text style={styles.topSection1530}>1115</Text>
          <Text style={styles.line20} />
          <Text style={styles.topSection1545}>1130</Text>
          <Text style={styles.line21} />
          <Text style={styles.topSection1230}>1145</Text>
          <Text style={styles.line22} />

          <Text style={styles.line24} />
        </View>

        <Text style={styles.topSection0}>Location Code</Text>


        <View style={styles.section9}>

          <Text style={styles.topSection1}>{l.data.filter(m=>m.q15Slot === "A08" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection2}>{l.data.filter(m=>m.q15Slot === "B08" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection3}>{l.data.filter(m=>m.q15Slot === "C08" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection4}>{l.data.filter(m=>m.q15Slot === "D08" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection5}>{l.data.filter(m=>m.q15Slot === "A09" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1330}>{l.data.filter(m=>m.q15Slot === "B09" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1345}>{l.data.filter(m=>m.q15Slot === "C09" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1400}>{l.data.filter(m=>m.q15Slot === "D09" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1415}>{l.data.filter(m=>m.q15Slot === "A10" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1430}>{l.data.filter(m=>m.q15Slot === "B10" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1445}>{l.data.filter(m=>m.q15Slot === "C10" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1500}>{l.data.filter(m=>m.q15Slot === "D10" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1515}>{l.data.filter(m=>m.q15Slot === "A11" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1530}>{l.data.filter(m=>m.q15Slot === "B11" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1545}>{l.data.filter(m=>m.q15Slot === "C11" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1230}>{l.data.filter(m=>m.q15Slot === "D11" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>
          
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

          <Text style={styles.topSection1}>1200</Text>

          <Text style={styles.topSection2}>1215</Text>

          <Text style={styles.topSection3}>1230</Text>

          <Text style={styles.topSection4}>1245</Text>

          <Text style={styles.topSection5}>1300</Text>

          <Text style={styles.topSection1330}>1315</Text>

          <Text style={styles.topSection1345}>1330</Text>

          <Text style={styles.topSection1400}>1345</Text>

          <Text style={styles.topSection1415}>1400</Text>

          <Text style={styles.topSection1430}>1415</Text>

          <Text style={styles.topSection1445}>1430</Text>

          <Text style={styles.topSection1500}>1445</Text>

          <Text style={styles.topSection1515}>1500</Text>

          <Text style={styles.topSection1530}>1515</Text>

          <Text style={styles.topSection1545}>1530</Text>

          <Text style={styles.topSection1230}>1545</Text>

        
          <Text style={styles.line27} />
        </View>

        <Text style={styles.topSection00}>Location Code</Text>


        <View style={styles.section12}>

          <Text style={styles.topSection1}>{l.data.filter(m=>m.q15Slot === "A12" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection2}>{l.data.filter(m=>m.q15Slot === "B12" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection3}>{l.data.filter(m=>m.q15Slot === "C12" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection4}>{l.data.filter(m=>m.q15Slot === "D12" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection5}>{l.data.filter(m=>m.q15Slot === "A13" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1330}>{l.data.filter(m=>m.q15Slot === "B13" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1345}>{l.data.filter(m=>m.q15Slot === "C13" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1400}>{l.data.filter(m=>m.q15Slot === "D13" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1415}>{l.data.filter(m=>m.q15Slot === "A14" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1430}>{l.data.filter(m=>m.q15Slot === "B14" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1445}>{l.data.filter(m=>m.q15Slot === "C14" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1500}>{l.data.filter(m=>m.q15Slot === "D14" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1515}>{l.data.filter(m=>m.q15Slot === "A15" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1530}>{l.data.filter(m=>m.q15Slot === "B15" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1545}>{l.data.filter(m=>m.q15Slot === "C15" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1230}>{l.data.filter(m=>m.q15Slot === "D15" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "")).map(n=>{return n.location})}</Text>
       
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
          <Text style={styles.line28} />
        </View>
        <View style={styles.section14}>

          <Text style={styles.topSection1}>1600</Text>

          <Text style={styles.topSection2}>1615</Text>

          <Text style={styles.topSection3}>1630</Text>

          <Text style={styles.topSection4}>1645</Text>

          <Text style={styles.topSection5}>1700</Text>

          <Text style={styles.topSection1330}>1715</Text>

          <Text style={styles.topSection1345}>1730</Text>

          <Text style={styles.topSection1400}>1745</Text>

          <Text style={styles.topSection1415}>1800</Text>

          <Text style={styles.topSection1430}>1815</Text>

          <Text style={styles.topSection1445}>1830</Text>

          <Text style={styles.topSection1500}>1845</Text>

          <Text style={styles.topSection1515}>1900</Text>

          <Text style={styles.topSection1530}>1915</Text>

          <Text style={styles.topSection1545}>1930</Text>

          <Text style={styles.topSection1230}>1945</Text>

       
          <Text style={styles.line29} />
        </View>

        <Text style={styles.topSection000}>Location Code</Text>


        <View style={styles.section15}>

          <Text style={styles.topSection1}>{l.data.filter(m=>m.q15Slot === "A16" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection2}>{l.data.filter(m=>m.q15Slot === "B16" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection3}>{l.data.filter(m=>m.q15Slot === "C16" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection4}>{l.data.filter(m=>m.q15Slot === "D16" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection5}>{l.data.filter(m=>m.q15Slot === "A17" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1330}>{l.data.filter(m=>m.q15Slot === "B17" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1345}>{l.data.filter(m=>m.q15Slot === "C17" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1400}>{l.data.filter(m=>m.q15Slot === "D17" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1415}>{l.data.filter(m=>m.q15Slot === "A18" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1430}>{l.data.filter(m=>m.q15Slot === "B18" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1445}>{l.data.filter(m=>m.q15Slot === "C18" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1500}>{l.data.filter(m=>m.q15Slot === "D18" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1515}>{l.data.filter(m=>m.q15Slot === "A19" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1530}>{l.data.filter(m=>m.q15Slot === "B19" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1545}>{l.data.filter(m=>m.q15Slot === "C19" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1230}>{l.data.filter(m=>m.q15Slot === "D19" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>
          
          <Text style={styles.line29} />
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
          <Text style={styles.topSection1}>2000</Text>
          <Text style={styles.line7} />
          <Text style={styles.topSection2}>2015</Text>
          <Text style={styles.line8} />
          <Text style={styles.topSection3}>2030</Text>
          <Text style={styles.line9} />
          <Text style={styles.topSection4}>2045</Text>
          <Text style={styles.line10} />
          <Text style={styles.topSection5}>2100</Text>
          <Text style={styles.line11} />
          <Text style={styles.topSection1330}>2115</Text>
          <Text style={styles.line12} />
          <Text style={styles.topSection1345}>2130</Text>
          <Text style={styles.line13} />
          <Text style={styles.topSection1400}>2145</Text>
          <Text style={styles.line14} />
          <Text style={styles.topSection1415}>2200</Text>
          <Text style={styles.line15} />
          <Text style={styles.topSection1430}>2215</Text>
          <Text style={styles.line16} />
          <Text style={styles.topSection1445}>2230</Text>
          <Text style={styles.line17} />
          <Text style={styles.topSection1500}>2245</Text>
          <Text style={styles.line18} />
          <Text style={styles.topSection1515}>2300</Text>
          <Text style={styles.line19} />
          <Text style={styles.topSection1530}>2315</Text>
          <Text style={styles.line20} />
          <Text style={styles.topSection1545}>2330</Text>
          <Text style={styles.line21} />
          <Text style={styles.topSection1230}>2345</Text>
          <Text style={styles.line22} />

          <Text style={styles.line24} />
        </View>

        <Text style={styles.topSection0}>Location Code</Text>


        <View style={styles.section9}>

          <Text style={styles.topSection1}>{l.data.filter(m=>m.q15Slot === "A20" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection2}>{l.data.filter(m=>m.q15Slot === "B20" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection3}>{l.data.filter(m=>m.q15Slot === "C20" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection4}>{l.data.filter(m=>m.q15Slot === "D20" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection5}>{l.data.filter(m=>m.q15Slot === "A21" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1330}>{l.data.filter(m=>m.q15Slot === "B21" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1345}>{l.data.filter(m=>m.q15Slot === "C21" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1400}>{l.data.filter(m=>m.q15Slot === "D21" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1415}>{l.data.filter(m=>m.q15Slot === "A22" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1430}>{l.data.filter(m=>m.q15Slot === "B22" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1445}>{l.data.filter(m=>m.q15Slot === "C22" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1500}>{l.data.filter(m=>m.q15Slot === "D22" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1515}>{l.data.filter(m=>m.q15Slot === "A23" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1530}>{l.data.filter(m=>m.q15Slot === "B23" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1545}>{l.data.filter(m=>m.q15Slot === "C23" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1230}>{l.data.filter(m=>m.q15Slot === "D23" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeB !== "")).map(n=>{return n.location})}</Text>        
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

          <Text style={styles.topSection1}>0000</Text>

          <Text style={styles.topSection2}>0015</Text>

          <Text style={styles.topSection3}>0030</Text>

          <Text style={styles.topSection4}>0045</Text>

          <Text style={styles.topSection5}>0100</Text>

          <Text style={styles.topSection1330}>0115</Text>

          <Text style={styles.topSection1345}>0130</Text>

          <Text style={styles.topSection1400}>0145</Text>

          <Text style={styles.topSection1415}>0200</Text>

          <Text style={styles.topSection1430}>0215</Text>

          <Text style={styles.topSection1445}>0230</Text>

          <Text style={styles.topSection1500}>0245</Text>

          <Text style={styles.topSection1515}>0300</Text>

          <Text style={styles.topSection1530}>0315</Text>

          <Text style={styles.topSection1545}>0330</Text>

          <Text style={styles.topSection1230}>0345</Text>

        
          <Text style={styles.line27} />
        </View>

        <Text style={styles.topSection00}>Location Code</Text>


        <View style={styles.section12}>

          <Text style={styles.topSection1}>{l.data.filter(m=>m.q15Slot === "A00" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection2}>{l.data.filter(m=>m.q15Slot === "B00" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection3}>{l.data.filter(m=>m.q15Slot === "C00" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection4}>{l.data.filter(m=>m.q15Slot === "D00" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection5}>{l.data.filter(m=>m.q15Slot === "A01" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1330}>{l.data.filter(m=>m.q15Slot === "B01" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1345}>{l.data.filter(m=>m.q15Slot === "C01" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1400}>{l.data.filter(m=>m.q15Slot === "D01" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1415}>{l.data.filter(m=>m.q15Slot === "A02" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1430}>{l.data.filter(m=>m.q15Slot === "B02" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1445}>{l.data.filter(m=>m.q15Slot === "C02" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1500}>{l.data.filter(m=>m.q15Slot === "D02" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1515}>{l.data.filter(m=>m.q15Slot === "A03" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1530}>{l.data.filter(m=>m.q15Slot === "B03" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1545}>{l.data.filter(m=>m.q15Slot === "C03" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1230}>{l.data.filter(m=>m.q15Slot === "D03" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

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
          <Text style={styles.line28} />
        </View>
        <View style={styles.section14}>

          <Text style={styles.topSection1}>0400</Text>

          <Text style={styles.topSection2}>0415</Text>

          <Text style={styles.topSection3}>0430</Text>

          <Text style={styles.topSection4}>0445</Text>

          <Text style={styles.topSection5}>0500</Text>

          <Text style={styles.topSection1330}>0515</Text>

          <Text style={styles.topSection1345}>0530</Text>

          <Text style={styles.topSection1400}>0545</Text>

          <Text style={styles.topSection1415}>0600</Text>

          <Text style={styles.topSection1430}>0615</Text>

          <Text style={styles.topSection1445}>0630</Text>

          <Text style={styles.topSection1500}>0645</Text>

          <Text style={styles.topSection1515}>0700</Text>

          <Text style={styles.topSection1530}>0715</Text>

          <Text style={styles.topSection1545}>0730</Text>

          <Text style={styles.topSection1230}>0745</Text>

       
          <Text style={styles.line29} />
        </View>

        <Text style={styles.topSection000}>Location Code</Text>


        <View style={styles.section15}>

          <Text style={styles.topSection1}>{l.data.filter(m=>m.q15Slot === "A04" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection2}>{l.data.filter(m=>m.q15Slot === "B04" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection3}>{l.data.filter(m=>m.q15Slot === "C04" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection4}>{l.data.filter(m=>m.q15Slot === "D04" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection5}>{l.data.filter(m=>m.q15Slot === "A05" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1330}>{l.data.filter(m=>m.q15Slot === "B05" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1345}>{l.data.filter(m=>m.q15Slot === "C05" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1400}>{l.data.filter(m=>m.q15Slot === "D05" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1415}>{l.data.filter(m=>m.q15Slot === "A06" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1430}>{l.data.filter(m=>m.q15Slot === "B06" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1445}>{l.data.filter(m=>m.q15Slot === "C06" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1500}>{l.data.filter(m=>m.q15Slot === "D06" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1515}>{l.data.filter(m=>m.q15Slot === "A07" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1530}>{l.data.filter(m=>m.q15Slot === "B07" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1545}>{l.data.filter(m=>m.q15Slot === "C07" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>

          <Text style={styles.topSection1230}>{l.data.filter(m=>m.q15Slot === "D07" && ((newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "") || newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeC !== "")).map(n=>{return n.location})}</Text>
          
          <Text style={styles.line29} />
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
          <Text style={styles.topSections1530}>8:00 to 15:45</Text>
          <Text style={styles.line31} />
          <Text style={styles.topSections1120}>16:00 to 23:45</Text>
          <Text style={styles.line32} />
          <Text style={styles.topSections2156}>00:00 to 8:45</Text>

        </View>
        <Text style={styles.line34} />
        <View style={styles.sectionsss}>
       

          <Text style={styles.topSectionsShifts}>Print Name</Text>

          <Text style={styles.topSections1530}>{newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeA).map(newData =>{return newData.name[0].given+" "+newData.name[0].family}) ||
          newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeA && i.id === newInputData.shiftIncharge).map(newData =>{return newData.name[0].given+" "+newData.name[0].family}) || "Unknown"}</Text>

          <Text style={styles.topSections1120}>{newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeB).map(newData =>{return newData.name[0].given+" "+newData.name[0].family}) ||
          newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeB && i.id === newInputData.shiftIncharge).map(newData =>{return newData.name[0].given+" "+newData.name[0].family}) || "Unknown"}</Text>

          <Text style={styles.topSections2156}>{newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeC).map(newData =>{return newData.name[0].given+" "+newData.name[0].family}) ||
          newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeC && i.id === newInputData.shiftIncharge).map(newData =>{return newData.name[0].given+" "+newData.name[0].family}) || "Unknown"}</Text>

        </View>
        <Text style={styles.line35} />
        <View style={styles.sectionssss}>
        

          <Text style={styles.topSectionsShifts}>Initial</Text>

          <Text style={styles.topSections1530}>{newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeA).map(newData =>{return newData.name[0].family.charAt(0,2)}) ||
          newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeA && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeA && i.id === newInputData.shiftIncharge).map(newData =>{return newData.name[0].family.charAt(0,2)}) || "Unknown"}</Text>

          <Text style={styles.topSections1120}>{newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeB).map(newData =>{return newData.name[0].family.charAt(0,2)}) ||
          newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeB && l.shiftIncharge.shiftInchargeB !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeB && i.id === newInputData.shiftIncharge).map(newData =>{return newData.name[0].family.charAt(0,2)}) || "Unknown"}</Text>

          <Text style={styles.topSections2156}>{newInputData.shiftIncharge === "" && l.shiftIncharge.shiftInchargeA !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeC).map(newData =>{return newData.name[0].family.charAt(0,2)}) ||
          newInputData.shiftIncharge !== "" && newInputData.shiftIncharge === l.shiftIncharge.shiftInchargeC && l.shiftIncharge.shiftInchargeC !== "" && getStaffDataItems.filter(i=>i.id === l.shiftIncharge.shiftInchargeC && i.id === newInputData.shiftIncharge).map(newData =>{return newData.name[0].family.charAt(0,2)}) || "Unknown"}</Text>

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
);

export default MyDocument;