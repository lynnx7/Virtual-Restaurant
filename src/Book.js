
import { useState } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import "react-datepicker/dist/react-datepicker.css";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const RESTAURANT = [
    {name: "Server A", location: "Ringwood"},
    {name: "Server B", location: "Murarrie"},
    {name: "Server C", location: "Keilor"},
    {name: "Server D", location: "Tongala"},
    {name: "Server E", location: "Julatten"},
  ];

function CategoryButtons({category, clickCategory,reservation}){

    const listItems = RESTAURANT.map(cate =>

      <>
        
        {/* <div class="d-flex justify-content-center align-items-center flex-column " style={{width:"100px"}}> */}


        <div key={cate}>
          {/* <img
            src={getImageUrl(person)}
            alt={person.name}
          /> */}
            <CateButton txt={cate.name+" "+cate.location} onClick={() => clickCategory({...reservation,restaurant:cate.name,location:cate.location})} nowCate={category} cate={cate.name}/>
            
            
        {/* </div> */}
        </div>
      </>
      );
    return (

    <>
    {listItems}
    </>
    );      

}


function CateButton({txt,onClick,nowCate,cate}) {
    if(cate === nowCate){
      return(
        <>
          <Button variant="custom" onClick={onClick}>
            {txt}
          </Button>
        </>

      )

    }
    return (
      <Button variant="secondary" onClick={onClick}>
        {txt}
      </Button>
    );
}

function PickTime({restaurant,reservation,setReservation,errors}){

    
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState('');

    const seatChange = (event) => {
      setReservation({...reservation,seat:event.target.value})
    };


    const timeChange = (event) => {
      setTime(event.target.value)
      setReservation({...reservation,time:event.target.value})
    };



    if(restaurant.length!=0){
      
        return(<>

        Choose your Date:
        <DatePicker selected={reservation.date} onChange={(date) => {setStartDate(date),setReservation({...reservation,date:date})} } 
        minDate={moment().toDate()}/>

        {errors.date ? (
                    <span style={{ color: 'red', fontSize: 'small' }}>
                      {errors.date}
                    </span>
                  ) : null}

        Choose your Time:
        <select value={reservation.time} onChange={timeChange}>
            <option value="--"> --</option>
            <option value="9:00-10:00">9:00-10:00 </option>
            <option value="10:00-11:00">10:00-11:00</option>
            <option value="11:00-12:00">11:00-12:00</option>
            <option value="12:00-13:00">12:00-13:00</option>
            
        </select>

        {errors.time ? (
                    <span style={{ color: 'red', fontSize: 'small' }}>
                      {errors.time}
                    </span>
                  ) : null}

        Numbers of people:
        <select value={reservation.seat} onChange={seatChange}>
            <option value="--"> --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
        </select>

        {errors.seat ? (
                    <span style={{ color: 'red', fontSize: 'small' }}>
                      {errors.seat}
                    </span>
                  ) : null}

        Your phone number
        <input value = {reservation.phone} placeholder='+12 3456789' onChange={(e) => setReservation({...reservation,phone:e.target.value})} required/>
        
          {errors.phone ? (
            <span style={{ color: 'red', fontSize: 'small'}}>
              {errors.phone}
            </span>
          ) : null}

        Your e-mail
        <input value = {reservation.mail} placeholder='xxx@gmail.com' onChange={(e) => setReservation({...reservation,mail:e.target.value})} required/>
        {errors.mail ? (
            <span style={{ color: 'red', fontSize: 'small' }}>
              {errors.mail}
            </span>
          ) : null}
        
        </>)

    }

    return(<></>)
}

export default function Book({reservation,setReservation,viewOnly,errors}) {
  
    let vLine =  <div class="d-flex align-items-center justify-content-center" style={{height: "200px", width:"30px"}}>
    <div class="vr"></div>
  </div>

    if (viewOnly){
      return (

        <>
          <div class="p-2"><b>{reservation.restaurant} {reservation.location}</b></div>
          <div class="p-1"><b>{ reservation.date.toDateString()}</b></div>
          <div class="p-1"><b>{ reservation.time}</b></div>
          <div class="p-1"><b>{reservation.seat} seat(s)</b></div>

          <div class="p-0 mt-2">phone: {reservation.phone}</div>
          <div class="p-0">e-mail: {reservation.mail}</div>

        </>

      )


    }else{

      if(reservation.restaurant.length===0){vLine=null}

      return (
    
            <>
            <div class="d-flex flex-column align-items-center justify-content-center" style={{gap:'6px'}}>
            <CategoryButtons category = {reservation.restaurant} clickCategory = {setReservation} reservation = {reservation}/>
            </div>
            
            {vLine}
            
            <div class="d-flex flex-column ">
            <PickTime restaurant = {reservation.restaurant} reservation = {reservation} setReservation = {setReservation} errors = {errors}/>
            </div>
            </>
      );    
    }

  }

function MyButton({txt,onClick}) {
    return (
      <button onClick={onClick}>
        {txt}
      </button>
    );

}