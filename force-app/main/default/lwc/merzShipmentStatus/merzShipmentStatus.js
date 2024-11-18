import { LightningElement, api, wire, track } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

import SHIP_NUM_FIELD from '@salesforce/schema/Shipment__c.Shipment_Number__c';
const FIELDS = [SHIP_NUM_FIELD];
const endpoint = 'https://merzcommunities--tina.sandbox.my.salesforce-sites.com/services/apexrest/mockShipmentStatus';


export default class merzShipmentStatus extends LightningElement {

   @api recordId;
   @track shipStat = 'Please click Fetch Status to fetch latest shipping status';
   
    @wire (getRecord, { recordId: "$recordId", fields: FIELDS}) 
    shipment__c;     
    
      handleRefresh() {   
        
        let shipmentNumber = getFieldValue(this.shipment__c.data, SHIP_NUM_FIELD);
      
        console.log('@@@Endpont' + endpoint + '?trackingNumber='+ shipmentNumber);
      
                fetch(endpoint + '?trackingNumber='+ this.shipmentNumber, {
                   method: 'GET',
                   mode: 'cors'                   
                })    
                .then((response) => {
                  if(!response.ok) 
                     throw new Error('No data returned for shipments');
                  else{
                        return response.json(); 
                        console.log('@@@ Response' +response.json());  
                    }    
                })
                .then(data => {
                    this.shipStat = data;
                    console.log('@@@ ShipStat' +this.shipStat);
                })
            .catch(error => {
                console.log(error);
            }) 
            
            
            
    }    
}