import React, { useEffect, useState } from "react";
import { Button, Card,Form,Input, Select} from 'antd';
import {RiCoinsLine} from 'react-icons/ri';
function Convertor() {
    
    const apiUrl = `https://api.coingecko.com/api/v3/exchange_rates`;
    const[cryptoList, setcryptoList]=useState([]);
    const [inputValue, setinputValue]=useState(0);
    const [result, setResult]= useState(0);
    const defaultfirstValue= "Bitcoin";
    const defaultsecondValue= "Ether";
    const [firstSelect, setfirstSelect]=useState(defaultfirstValue);
    const[secondSelect, setsecondSelect]=useState(defaultsecondValue);

    useEffect(()=>{
        fetchData();

    },[]);

    useEffect(()=> {
 if(cryptoList.length == 0) return;

        const firstSelectRate=cryptoList.find((item)=>{
            return item.value=== firstSelect
        }).rate;
            const secondSelectRate=cryptoList.find((item)=>{
            return item.value=== secondSelect
        }).rate;

        const resultValue =(inputValue * secondSelectRate)/firstSelectRate;
        setResult(resultValue.toFixed(6));
    
    },[inputValue, firstSelect,secondSelect])
    
    async function fetchData(){
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        const  data = jsonData.rates;
     
     
        //Converts the objects into 2 parts of array with key and value
          const tempArrary = Object.entries(data).map(item => {
            return {
                value: item[1].name,
                label: item[1].name,
                rate: item[1].value
            
          }
       
          })
          setcryptoList(tempArrary);
         
    }
        
  return (
  <div className="container">
    <Card  className='crypto-card' title={<h1> <RiCoinsLine />Crypto Convetor</h1>} >
        <Form size="large">
            <Form.Item>
                <Input onChange={(event)=> 
                    setinputValue(event.target.value) 
                } />
            </Form.Item>
        </Form>
        <div className="select-box">
        <Select style={{width: '200px'}} 
        defaultValue={defaultfirstValue} 
        options={cryptoList}
        onChange={(value)=> setfirstSelect(value)}
         />
        <Select style={{width: '200px'}} 
        defaultValue={defaultsecondValue} 
        options={cryptoList}
        onChange={(value)=> setsecondSelect(value)}
         />
        </div>
        <p>{inputValue} {firstSelect} = {result} {secondSelect} </p>
       
    </Card>
    
  </div>
  );
}

export default Convertor;
