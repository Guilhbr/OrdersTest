import React from 'react';
import './App.css';
import imgSrc from './img/menu-point.png'

const data = [
  {
    id: '#0054', 
    type: 'Takeaway', 
    btn: 'Charge', 
    payMethod: 'Paying at Restaurant', 
    time: '10:54:51', 
    client: 'Sam (Phone: +1 (626) 112-4444)',
    itemNum: 3,
    items: [
      {name: 'Kinmedai', amount: 1},
      {name: 'Sashimi Platter A', amount: 1},
      {name: 'Premium Mix Sushi Set', amount: 1}
    ],
    dismissed: false,
  },
  {
    id: '#0055', 
    type: 'Takeaway', 
    btn: 'Dismiss', 
    payMethod: 'Paying at Restaurant', 
    time: '10:57:53', 
    client: 'Sam (Phone: +1 (626) 112-4444)',
    itemNum: 2,
    items: [
      {name: 'Spicy Seafood Ramen', amount: 1},
      {name: 'Tonkotsu Ramen', amount: 1},
    ],
    dismissed: false,
  }

]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: data, 
      loading: false,
      showMenu: false,
    }
  }

  hideOrder(order, index) {
    if (order.btn === 'Dismiss') {
      let orders = [...this.state.orders]
      order.dismissed = true
      orders[index] = order
      this.setState({loading: true, orders})
      setTimeout(() => this.setState({loading: false}), 3000)
    }
  }

  render() {
    const { loading, orders, showMenu } = this.state
    return (
      <div className="App">
        <div className={`modal ${(loading || showMenu) && 'd-block'}`}>
          <div className={`d-none loading ${(loading) && 'd-block'}`}>
            <h1 className="loadingText">...</h1>
          </div>
          <div className={`d-none menu ${showMenu && 'd-block'}`}>
            <div type="button" onClick={() => this.setState({showMenu: false})} className="menu-btn py-2">Modify Order</div> 
            <div type="button" onClick={() => this.setState({showMenu: false})} className="menu-btn py-2">Change to Takeaway</div>
            <div type="button" onClick={() => this.setState({showMenu: false})} className="menu-btn py-2" >Reject Order (Entire Order)</div> 
          </div>
        </div>
        <div className="Orders">
          {orders.map((order, k) => {
            return (
              <div key={k} className={`order-box ${order.dismissed && 'hide-box'}`}>
                <div className="d-flex flex-row justify-content-between bg-primary rounded align-items-center px-2 py-2">
                  <div className="d-flex flex-row">
                    <h4 className="order-id">{order.id}</h4>
                    <h4 className="separator mx-2">|</h4>
                    <h4 className="order-table-no">{order.type}</h4>
                  </div>
                  <div className="d-flex flex-row align-items-center"> 
                    <button type="button" onClick={() => this.hideOrder(order,k)}className="submit-btn btn btn-warning">{order.btn}</button>
                    <div type="button" onClick={() => this.setState({showMenu: true})} className="btn"> 
                      <img width="25px" height="25px" className="d-flex" src={imgSrc} alt=''/> 
                    </div> 
                  </div> 
                </div>
                <div className="d-flex flex-row my-2">
                  <span className="order-expand-collapse active"></span> 
                  <h5 className="order-payment-method">{order.payMethod}</h5> 
                  <h5 className="mx-2">|</h5> 
                  <h5 className="order-time">{order.time}</h5> 
                  <h5 className="mx-2">|</h5> 
                  <h5 className="order-client">{order.client}</h5> 
                  <h5 className="mx-2">|</h5> 
                  <h5 className="order-items"><span className="text-danger">{order.itemNum}</span> items </h5> 
                </div>
                <div className="d-flex flex-column flex-sm-row">
                  {order.items.map((item,k) => {
                    return (
                      <div key={k} style={{width: '250px'}}className="bg-light rounded d-flex flex-row m-2 p-2">
                        <h4 className="mr-2">{item.amount}x</h4>
                        <h4 className="text-danger">{item.name}</h4>
                      </div>
                    )
                  })}
                </div>
              </div>
          )})}
        </div>
      </div>
    );
  }
}
  
  export default App;
  