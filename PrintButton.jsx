import React from 'react'
import ReactToPrint from "react-to-print";
import { render } from "react-dom";
import { Box, Button } from '@mui/material';
import './label.css';
import PrintIcon from '@mui/icons-material/Print';
import QRCode from "react-qr-code";
import LocationOnIcon from '@mui/icons-material/LocationOn';

class ComponentToPrint extends React.PureComponent {
  
  render() {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
        
        { this.props.dataRow.map((item, index) => (
          <Box sx={{display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'flex-start', padding: '0', marginTop: '0'}} key={item}>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '42px'}}>
              <span style={{fontSize: item.length > 16 ? '8px': '14px', m: 0, height: '20px'}}>
                {item}
              </span>

              <Box sx={{ m: 0}}>
                <span style={{fontSize: '8px', fontWeight: 'bold'}}>
                {this.props.compInfo.name}
                </span>
              </Box>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', justifyContent: 'start'}}>
              <QRCode  
                style={{ width: '40px', height: '40px', margin: '5px'}} 
                value={item}/>

              <Box sx={{display: 'flex', flexDirection: 'column', marginBottom: '3px'}}>
                <span style={{fontSize: '8px'}}>
                  {this.props.compInfo.model}
                </span>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '5px', border: "solid 1px #000", padding: '0 3px', alignItems: 'center', justifyContent: 'flex-start'}}>
                  { this.props.compInfo.location !== '' &&  <LocationOnIcon sx={{ fontSize: '10px', marginRight: '5px'}}/>}
                  <span style={{fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '85px', textAlign: 'center'}}>
                  {this.props.compInfo.location}
                  </span>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
                  <span style={{fontSize: '8px'}}>Power by SCM.</span>
                </Box>
              </Box>
            </div>
          </Box>
        ))}

        </Box>
    );
  }
}

export class PrintButton extends React.Component {

  render() {
    const { dataRow, compInfo, onAfter, disabled } = this.props;

    return (
      <div>
        <ReactToPrint
          trigger={() =>  <Button disabled={disabled} variant="text" startIcon={<PrintIcon />}>Print</Button>}
          content={() => this.componentRef}
          onAfterPrint={() => onAfter()}
        />
        <Box sx={{display: 'none'}}>
          <ComponentToPrint ref={el => (this.componentRef = el)} dataRow={dataRow} compInfo={compInfo}/>
        </Box>
      </div>
    );
  }
}
