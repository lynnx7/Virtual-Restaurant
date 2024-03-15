import { useState } from 'react';
import Menu from './Menu.js'
import Book from './Book.js'
import Serve from './Serve.js'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import logo from './img/logo6.png'

import Image from 'react-bootstrap/Image';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

function MyButton({txt,onClick}) {
    return (
      <Button variant="custom" onClick={onClick}>
        {txt}
      </Button>
    );
  }

function NextButton({txt,onClick,disable}) {
  if(disable){
    return (
      <Button variant="custom" onClick={onClick} disabled>
        {txt}
      </Button>
    );
  }else{
    return (
      <Button variant="custom" onClick={onClick}>
        {txt}
      </Button>
    );
  }

  }

function BackButton({onClick}) {
    return (
      <Button variant="light" onClick={onClick}>
        Go Back
      </Button>
    );
  }


// appearance components

function ChooseRestaurant({service, reservation,setReservation,onBack,onNext}){
  const [errors, setErrors] = useState({});

  function validate(){
    const err = validateValues(reservation)
    setErrors(err)
    if(Object.keys(err).length != 0){
      console.log("error found")
    }else{
      console.log("next")
      onNext()
    }

  }

  const validateValues = (input) => {
    console.log(input)
    let errors = {};
    if (input.mail === null || input.mail.length < 10) {
      errors.mail = "*Email is too short";
    }
    if (input.phone === null || input.phone.length < 5 ) {
      errors.phone = "*Phone number is too short";
    }
    if (input.date ===null) {
      errors.date = "*You must pick a date";
    }
    if (input.time ===null) {
      errors.time = "*You must pick a time";
    }
    if (input.seat ===null) {
      errors.seat = "*You must select number of seats";
    }    
    console.log(errors)
    return errors;
  };

  let hint = null
  if (reservation.restaurant.length===0){
    hint = "Choose your desired Restaurant..."
  }else{
    hint = "Filling your booking details..."
  }

  return (

    <>
    

    <div class="d-flex justify-content-center align-items-center flex-column ">
      <Card>
        <Card.Header> Booking 📓 </Card.Header>
        <Card.Body>
          <Card.Title class="text-center">{hint}</Card.Title>
          <div class="d-flex justify-content-center align-items-center">
            <Book reservation={reservation} setReservation={setReservation} viewOnly={false} errors={errors} />
          </div>
          <div class="d-flex justify-content-between mt-4">
            <BackButton txt="Go back" onClick={onBack} />
            <NextButton txt="Next" onClick={validate} />
          </div>
        </Card.Body>
      </Card>
    </div>

    </>
  );      

}

function ChooseMenu({order, setOrder, onBack,onCheckout,payment,setPayment}){

  let nextButton = <NextButton txt = "Check-out" onClick={onCheckout}/>
  if(order.length===0){
    nextButton = <NextButton txt = "Check-out" disable={true} onClick={onCheckout}/>
  }
  

  return (

    <>
    
    <div class="d-flex justify-content-center align-items-center flex-column ">
      <Card>
        <Card.Header> Ordering 🛎 </Card.Header>
        <Card.Body>
          {/* <Card.Title class="text-center">Take a look in our fantastic menu...</Card.Title> */}
          <div class="d-flex justify-content-center align-items-center">
      <Menu order = {order} setOrder = {setOrder} viewOnly = {false}/>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <BackButton txt = "Go back" onClick={onBack}/>

        
        {nextButton}
      </div>

      </Card.Body>
        </Card>
    </div>
    </>
  );      
}

function ChooseBookConfirm({service, reservation,setReservation,onBack,onNext}){

  return (

    <>
    
    <div class="d-flex justify-content-center align-items-center flex-column ">

    <Card >
      <Card.Header>
          Booking 📓</Card.Header>
      <Card.Body>
        <Card.Title class="text-center">Confirm your information</Card.Title>
      
      <div class="d-flex justify-content-center align-items-center flex-column ">
    
      <Book reservation={reservation} setReservation={setReservation} viewOnly = {true}/>


      </div>
      
      <div class="d-flex justify-content-between mt-4">
        <BackButton txt = "Go back" onClick={onBack}/>
        <NextButton txt = "Submit" onClick={onNext}/>
      </div>
      </Card.Body>
      </Card>
      </div>

    </>



  );      
}

function ChooseBookComplete({service, onBack}){

  return (

    <div class="d-flex justify-content-center align-items-center flex-column ">
    <Card>
      <Card.Header> Booking Complete </Card.Header>
      <Card.Body>
      <div class="p-2"><p class="text-success">✅Your Reservation is Complete!</p></div>
        <div class="d-flex justify-content-between mt-4">
          <BackButton txt="Go back" onClick={onBack} />
        </div>
      </Card.Body>
    </Card>
  </div>


  );      
}

function ChooseCheckout({order,setOrder, onCheckout,onBack,payment,setPayment}){

  const [errors, setErrors] = useState({});

  function validate(){
    const err = validateValues(payment)
    setErrors(err)
    if(Object.keys(err).length != 0){
      console.log("error found")
    }else{
      console.log("next")
      onCheckout()
    }

  }

  const validateValues = (input) => {
    console.log(input)
    let errors = {};
    if (input.type ==="skip") {
      return errors;
    }
    if (input.type ==="") {
      errors.type = "*You must pick a method";
    }
    if (input.cardNum ==="") {
      errors.cardNum = "*You must enter card number";
    }
    if (input.name ==="" || input.expDate ==="" || input.CVV ==="") {
      errors.detail = "*You must fill your payment details";
    }
    console.log(errors)
    return errors;
  };


  return (

  
    <div class="d-flex justify-content-center align-items-center flex-column ">
      <Card>
        <Card.Header> Ordering 🛎 </Card.Header>
        <Card.Body>
          {/* <Card.Title class="text-center">Confirm your order</Card.Title> */}
          <div class="d-flex justify-content-center align-items-center">
      <Menu order = {order} setOrder = {setOrder} viewOnly = {true}  payment = {payment} setPayment = {setPayment} errors={errors}/>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <BackButton txt = "Go back" onClick={onBack}/>

        <NextButton txt = "Submit" onClick={validate}/>
      </div>

      </Card.Body>
        </Card>
    </div>
  );      
}

function ServeFood({onBack,order}){
  return (

  
    <div class="d-flex justify-content-center align-items-center flex-column ">
      <Card>
        <Card.Header> Food Serve 🛎 </Card.Header>
        <Card.Body>
        <Serve order={order}/>
      <div class="d-flex justify-content-between mt-4">
        <BackButton txt = "Go back" onClick={onBack}/>
      </div>

        </Card.Body>
        </Card>
    </div>
  );  
}


// logical pipeline

export default function App() {
  const [service, setService] = useState("null"); // which page
  const [order, setOrder] = useState([])
  const [reservation, setReservation] = useState({restaurant:"",location:"",time:null,date:null,mail:null,phone:null,seat:null})

  const [payment,setPayment] = useState({type:"",cardNum:"",name:"",expDate:"",CVV:""})

  let page = null
  let info = null
  

  if(service === "null"){
    // main title page


    page = 
      <div class="d-flex justify-content-center align-items-center " style={{gap:'20px'}}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://images.unsplash.com/photo-1634234498573-29224acf2907?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <Card.Body>
            <Card.Title>Plan to Dine-in?</Card.Title>
            <Card.Text>
              Make a reservation is fast and easy.
            </Card.Text>
            <MyButton txt ="Book Now" onClick={() => setService('book')}> </MyButton>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfDB8MHx8fDA%3D" />
          <Card.Body>
            <Card.Title>Already in store?</Card.Title>
            <Card.Text>
              Browse our astonishing menu and make your delicious choice!
            </Card.Text>
            <MyButton txt ="Order Now" onClick={() => setService('order')}> </MyButton>
          </Card.Body>
        </Card>
    </div>
  
    info = 
    <Card className="text-center" >
        <Card.Header>About Us</Card.Header>
        <Card.Body>
          <Card.Text>
            We deliver the Finest AI-generated food for you and your family.<br/>
            ✉️Email: VRestaurant@rest.com<br/>
            📞TEL: 111-22233456<br/>
          </Card.Text>
        </Card.Body>
      </Card>

  }else if(service === "book"){

    page = 
    <ChooseRestaurant service = {service} 
    onNext={() => setService('bookConfirm')}
    onBack={() => setService('null')}
    
    reservation = {reservation}
    setReservation = {setReservation}
    
    />

  }else if(service === "bookConfirm"){

    page = <ChooseBookConfirm service = {service} 
    onNext={() => setService('bookComplete')}
    onBack={() => setService('book')}
    
    reservation = {reservation}
    setReservation = {setReservation}
    
    />

  }else if(service === "bookComplete"){

    page = <ChooseBookComplete service = {service} 
    onBack={() => setService('null')}
    
    />

  }else if(service === "order"){

    page = <ChooseMenu service = {service} 
    onCheckout={() => setService('checkout')}
    onBack={() => setService('null')}
    
    order = {order}
    setOrder = {setOrder}
    
    payment = {payment}
    setPayment = {setPayment}
    />
    

  }else if(service === "checkout"){

    page = <ChooseCheckout service = {service} 
    onCheckout={() => setService('serve')}
    onBack={() => setService('order')}
    order = {order}
    setOrder = {setOrder}

    payment = {payment}
    setPayment = {setPayment}

    />
  }else if(service === "serve"){

    page = <ServeFood 
    order = {order}
    onBack={() => setService('null')}
    />
    
  }
  
  return(
    <div class="d-flex justify-content-center align-items-center flex-column " style={{height:'80vh'}}>


    <style type="text/css">
          {`
        .btn-custom {
            background-color: #F3A089;
            color: white;
        }

        .btn-custom:hover {
          background-color: #BDF0D6;
          color: white;
      }


        .btn-custom2 {
          background-color: #FFD294;;
          color: white;
        }

        .btn-custom2:hover {
          background-color: #FFD294;
          color: white;
      }

      .btn-custom3 {
        background-color: #BDF0D6;
        color: white;
      }

      .btn-custom3:hover {
        background-color: #BDF0D6;
        color: white;
    }

        .card{
          background-color: #F7EBDB;
      }

      .form-check-input:checked {
        background-color: #F3A089;
        border-color:#F3A089;
      }
        `}
        </style>

    <div class="d-flex">
    <Image src={logo} alt="Logo" class="img-thumbnail" style={{height:'180px',padding:'40px',marginTop:'80px'}}/>
    </div>
    <div class="d-flex">{page}</div>


    <div class="d-flex" style={{padding:'30px'}}>      
      {info}
    </div>
    </div>
  )

}
