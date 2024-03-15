import { Fragment, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import DatePicker from "react-datepicker";

function PaymentMethod({payment,setPayment,errors}) {
  
  return (
    <>
      Payment Method<br/>
      
      <Form>
      {[ 'radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="Debit Card"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
            onChange={(e) => setPayment({...payment,type:"debit"})}
          />
          <Form.Check
            inline
            label="Credit Card"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            onChange={(e) => setPayment({...payment,type:"credit"})}
          />
          <Form.Check
            inline
            label="Skip (Test only)"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            onChange={(e) => setPayment({...payment,type:"skip"})}
          />
                {errors.type ? (
                    <span style={{ color: 'red', fontSize: 'small' }}>
                      {errors.type}
                    </span>
                  ) : null}
        </div>
      ))}



      Card Number       
      <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Search..."
                      aria-label="Search..."
                      aria-describedby="Search..."
                      type="text"
                      value={payment.cardNum}
                      onChange={(e) => setPayment({...payment,cardNum:e.target.value})}
                    />
              
      </InputGroup>
      {errors.cardNum ? (
                    <span style={{ color: 'red', fontSize: 'small' }}>
                      {errors.cardNum}
                    </span>
                  ) : null}



      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Full Name</Form.Label>
          <Form.Control placeholder="Full name Last name"                 
                value={payment.name} 
                onChange={(e) => setPayment({...payment,name:e.target.value})}
                />
          
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Exp. Date</Form.Label>
          <Form.Control placeholder="e.g 06/28"
                value={payment.expDate} 
                onChange={(e) => setPayment({...payment,expDate:e.target.value})}

          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>CVV</Form.Label>
          <Form.Control placeholder="XXX"
                onChange={(e) => setPayment({...payment,CVV:e.target.value})}
                value={payment.CVV} 
          />
        </Form.Group>

      </Row>
      {errors.detail ? (
                    <span style={{ color: 'red', fontSize: 'small' }}>
                      {errors.detail}
                    </span>
                  ) : null}
    </Form>
    </>
  );
}



function FilterableProductTable({ products,order,setOrder,viewOnly,payment,setPayment,errors }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [category, setCategory] = useState("Special");

  let vLine =  <div class="d-flex align-items-center justify-content-center" style={{height: "200px", width:"30px"}}>
  <div class="vr"></div>
</div>


  if (viewOnly){

    return(
      <div>
        
        <Summary order= {order} setOrder={setOrder} viewOnly = {true}/>
        <br/>
        
        <PaymentMethod payment = {payment} setPayment = {setPayment} errors = {errors}/>
      </div>

    )

  }else{
    return (
      <>

        <div class="d-flex flex-column align-items-center justify-content-center" style={{gap:'6px'}}>
        <CategoryButtons category = {category} clickCategory={setCategory}/>
        
        </div>

        {vLine}
        <div class="d-flex flex-column align-items-center justify-content-center" style={{gap:'6px'}}>
        <SearchBar
          filterText={filterText}
          inStockOnly={inStockOnly}
          onFilterTextChange={setFilterText}
          onInStockOnlyChange={setInStockOnly} />
        <ProductTable
          products={products}
          filterText={filterText}
          inStockOnly={inStockOnly}
          category = {category}
          order = {order}
          setOrder = {setOrder} />
          <Summary order= {order} setOrder={setOrder}/>
          </div>
  
      </>
    );
  }

}

function getPriceByName(name){
  let price = 0
  PRODUCTS.map(item =>{

    if(item.name === name){
        price = item.price
        
      }
    }
  );
  return price
}

function MyButton({txt,onClick}) {
  return (
    <Button variant="primary" onClick={onClick}>
      {txt}
    </Button>
  );

}

function AddButton({txt,onClick}) {
  return (
    <Button variant="custom2" size="sm" onClick={onClick}>
      {txt}
    </Button>
  );

}

function PlusButton({txt,onClick}) {
    return (
      <Button variant="custom" size="sm" onClick={onClick}>
        {txt}
      </Button>
    );

}

function MinButton({txt,onClick}) {
  return (
    <Button variant="custom3" size="sm" onClick={onClick}>
      {txt}
    </Button>
  );

}

function RemoveButton({txt,onClick}) {
  return (
    <Button variant="light" size="sm" onClick={onClick}>
      {txt}
    </Button>
  );

}


function CateButton({txt,onClick,cate}) {
    if(txt === cate){
      return(
        <>
          <Button variant="custom"  onClick={onClick}>
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

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function Summary({order,setOrder,viewOnly}){
  // +- buttons in summary
  function plus(name){

    setOrder(order.map(item => {if (item.name === name){

      return {...item, qty:item.qty+1,price:item.price, total:(item.qty+1)*item.price}

    } else {

      return item
    }})
    )

  }

  function minus(name,hard=false){

    let remove = false
    
    setOrder(order.map(item => {if (item.name === name){

      if (item.qty>1){
        return {...item, qty:item.qty-1,price:item.price, total:(item.qty-1)*item.price}
      }else{
        remove = true
        return item
      }
      

    } else {

      return item
    }})
    )
    if (remove || hard){
      setOrder(
        order.filter(item =>
          item.name !== name
        )
      );
    }
  }


  let listItems = null;
  let total = 0;
  if (order.length != 0){
    listItems = order.map(item =>
    <tr key={item}>
      {/* <img
        src={getImageUrl(person)}
        alt={person.name}
      /> */}
        <td>{item.name}</td>
        <td>${item.price}</td>
        <td>{item.qty}</td>
        <td>${item.total}</td>

        {!viewOnly && (
        <td><PlusButton txt={"+"} onClick={() => plus(item.name)} /></td>
        )}
        
        {!viewOnly && (
        <td><MinButton txt={"-"} onClick={() => minus(item.name)} /></td>
        )}

        {!viewOnly && (
                <td><RemoveButton txt={"Remove"} onClick={() => minus(item.name,true)} /></td>
                )}

        {/* <CateButton txt={cate} onClick={() => clickCategory(cate)} cate={category}/> */}
        
    </tr>
    
    );
    // calculate total

    for(let i=0;i<order.length;i++){
      total+=order[i].total
    }

  }
  

  if(order.length != 0){
    return ( 
      <>
      <h5>Your Order Summary</h5>
  
      <table class="table table-striped">
  
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Subtotal</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
  
      <tbody>
        
      {listItems}
        
      </tbody>
      </table>
      <b>Total: ${total}</b>
      </>
    )
  }else{
    return ( 
      <>
      </>
      
    )
  }

  
}

function CategoryButtons({category, clickCategory}){

    const listItems = CATEGORY.map(cate =>

      <>

        <div key={cate}>
          {/* <img
            src={getImageUrl(person)}
            alt={person.name}
          /> */}


            <CateButton txt={cate} onClick={() => clickCategory(cate)} cate={category}/>
            
        </div>
      </>
      );
    return (

    <>
    {listItems}
    </>
    );      

}

// function ProductCategoryRow({ category }) {
//   return (
//     <tr>
//       <th colSpan="2">
//         {category}
//       </th>
//     </tr>
//   );
// }

function ProductRow({ product,order,setOrder}) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name} (Sold Out)
    </span>;

  function addOrder(order,setOrder,name,qty){

    let price = getPriceByName(name)
    let total = price*qty
    console.log(price,total)

    // first item
    if (order.length === 0){
      setOrder([{name:name,qty:qty,price:price, total:total}])
    } else {
      let exist = false
      setOrder(order.map(item => {if (item.name === name){
        // exist, add more
        exist = true
        return {...item, qty:item.qty+qty,price:price, total:item.total+qty*price}
  
      } else {
  
        return item
      }})
      )
  
      // not exist, add in
      if (!exist){
        setOrder([...order,{name:name,qty:qty,price:price, total:total}])
      }

    }

  }

  const [qty, setQty] = useState(0);
  // () => setOrder(order => [...order,{name:product.name,qty:qty}])
  const Qty =  product.stocked ? <input style={{ margin: '0 auto'}} class="form-control text-center w-25" type="text" value={qty} onChange={(e) => setQty(e.target.value)}/> : <></>
  const Add =  product.stocked ? <AddButton txt={"Add"} onClick={() => (qty > 0) && addOrder(order,setOrder,product.name,qty)}/> : <></>
  const Plus =  product.stocked ? <PlusButton txt={"+"} onClick={() => setQty(qty+1)}/> : <></>  
  const Minus =  product.stocked ? <MinButton txt={"-"} onClick={() => (qty > 0) && setQty(qty-1)}/> : <></>  

  return (
    <tr>
      <td >{name}</td>
      <td>${product.price}</td>
      <td>{Qty}</td>
      <td>{Add}</td>
      <td>{Plus}</td>
      <td>{Minus}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly, category,order,setOrder }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    )
     {
      return;
    }

    if(product.category != category){
        return
    }

    if (inStockOnly && !product.stocked) {
      return;
    }
    // if ((product.category !== lastCategory)) {
    //   rows.push(
    //     <ProductCategoryRow
    //       category={product.category}
    //       key={product.category} />
    //   );
    // }
    rows.push(
      <ProductRow
        product={product}
        key={product.name}
        order={order}
        setOrder={setOrder} />
    );
    lastCategory = product.category;
  });

  return (
    <table class="table table-striped">

      <thead>
        <tr>
          <th scope="col" width="180px">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Qty</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
  
}) {
  return (

    <form>

      <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search..."
                aria-label="Search..."
                aria-describedby="Search..."
                type="text"
                value={filterText} 
                onChange={(e) => onFilterTextChange(e.target.value)}
              />
              <InputGroup.Text id="basic-addon2">Only show available</InputGroup.Text>
              <InputGroup.Checkbox 
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockOnlyChange(e.target.checked)}
              
              
              aria-label="Checkbox for following text input" />
      </InputGroup>

    </form>
  );
}



const CATEGORY = [
    "❤️‍🔥Special",
    "🥗Brunch",
    "🍗Korean Fried",
    "🍜Japanses Ramen",
    "🥡Chinese Cuisine",
    "🍹Drinks",
    "🍧Ice Cream"
]

const PRODUCTS = [
  {category: "❤️‍🔥Special", price: 20, stocked: true, name: "Cheese Burger"},
  {category: "❤️‍🔥Special", price: 15, stocked: true, name: "Sashimi"},
  {category: "🥗Brunch", price: 12, stocked: true, name: "Sandwich"},
  {category: "🍗Korean Fried", price: 7, stocked: true, name: "Fried Wing"},
  {category: "🍗Korean Fried", price: 7, stocked: true, name: "Fried Drumstick"},
  {category: "🍜Japanses Ramen", price: 25, stocked: true, name: "Deluxe Ramen"},
  {category: "🍜Japanses Ramen", price: 16, stocked: true, name: "Spicy Ramen"},
  {category: "🍜Japanses Ramen", price: 16, stocked: true, name: "Standard Ramen"},
  {category: "🥡Chinese Cuisine", price: 15, stocked: true, name: "Fried Rice"},
  {category: "🥡Chinese Cuisine", price: 10, stocked: false, name: "Dumpling"},
  {category: "🍹Drinks", price: 4, stocked: true, name: "Coke"},
  {category: "🍹Drinks", price: 3, stocked: true, name: "Water"},
  {category: "🍹Drinks", price: 3.5, stocked: true, name: "Lemonade"},
  {category: "🍧Ice Cream", price: 8, stocked: true, name: "Mango Ice-cream"},
  {category: "🍧Ice Cream", price: 7, stocked: true, name: "Strawberry Ice-cream"},
  {category: "🍧Ice Cream", price: 7, stocked: true, name: "Chocolate Ice-cream"},
];

export default function Menu({order,setOrder,viewOnly,payment,setPayment,errors}) {
  
  return <FilterableProductTable products={PRODUCTS} order={order} setOrder={setOrder} viewOnly={viewOnly}     payment = {payment}
  setPayment = {setPayment} errors={errors}/>;
}
