import axios from 'axios';
import React, { useState } from 'react'

const CreateForm = () => {

    const initialState = { ticker_symbol:'', name: '', current_stock_price:'', purchase_price:'', selling_price:'', purchase_date:'', percent_change:'' } //needs to add user
    const [stockState, setStockState] = useState(initialState)
    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(show => !show)
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setStockState(stockState => { return {...stockState, [event.target.id]: event.target.value} });
        console.log(event.target.id)
      };
      
      const percentChange = () => {
          let percentage = parseFloat(parseFloat((stockState.selling_price) - parseFloat(stockState.purchase_price)) / parseFloat(stockState.purchase_price) * 100)
          return percentage.toFixed(2)
      }

    const handleSubmit = (event) => {
        event.preventDefault()


        const newStock = {
            "ticker_symbol": stockState.ticker_symbol,
            "name": stockState.name,
            "current_stock_price": parseInt(stockState.current_stock_price),
            "purchase_price": parseInt(stockState.purchase_price),
            "selling_price": parseInt(stockState.selling_price),
            "purchase_date": stockState.purchase_date,
            "percent_change": percentChange(),
            "user": 1
        }
        
        console.log(newStock)
        console.log(stockState)
        axios.post("http://localhost:8000/api/watchlists/", newStock, {
            method: "post",
            credentials: "include",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then((res) => {
            setStockState(res.data)
            console.log(res.data)
            console.log(newStock)
        })


    }
    console.log(percentChange())

    return (
        <div>
            <container className="modal-div">
                <form noValidate onSubmit={handleSubmit}>
                    <h1 className="stock-title"> Add to WishList! </h1>
                    <div className="grid ">
                        <label htmlFor="ticker_symbol" >
                            Ticker Symbol:
                        </label>
                        <input
                            name="ticker_symbol"
                            id="ticker_symbol"
                            type="text"
                            onChange={handleChange}
                            // value= comes from the api
                            placeholder="Ex: AAPL"
                        />

                        <label htmlFor="name" >
                            Name:
                        </label>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            onChange={handleChange}
                            // value={stockState.name}
                            placeholder="Ex: Apple"
                        />
                            <label htmlFor="current_stock_price" >
                            Current Stock Price:
                            </label>
                        <div className="create-form">
                            <input
                                name="current_stock_price"
                                id="current_stock_price"
                                // className="create-form"
                                type="number"
                                onChange={handleChange}
                                // value="comes from api"
                                placeholder="Ex: $25.77"
                            />
                        </div>

                        <label htmlFor="purchase_price">
                        Purchase Price:
                        </label>
                        <div className="create-form">
                            <input
                                name="purchase_price"
                                id="purchase_price"
                                type="number"
                                onChange={handleChange}
                                // value={stockState.sets}
                                placeholder="Ex: $27.89"
                            />
                        </div>

                        <label htmlFor="selling_price">
                        Selling Price:
                        </label>
                        
                        <div className="create-form">
                            <input
                                name="selling_price"
                                id="selling_price"
                                type="number"
                                onChange={handleChange}
                                // value={stockState.description}
                                placeholder="Ex: $45.22"
                            />
                        </div>

                        <label htmlFor="purchase_date">
                        Purchase Date:
                        </label>
                        <input
                            name="purchase_date"
                            id="purchase_date"
                            type="date"
                            onChange={handleChange}
                            // value={stockState.description}
                            placeholder="Ex: 2020-2-7"
                        />

                        {/* <label htmlFor="purchase_date">
                        Percent Change:
                        </label>
                        <div className= "create-form-percentage">
                            <input
                                name="percent_change"
                                id="percent_change"
                                type="number"
                                onChange={handleChange}
                                // value={stockState.description}
                                placeholder="Ex: 26%"
                            />
                        </div> */}

                        <button type="submit" className="subBut">
                        Submit
                        </button>
                    </div>
                </form>
                <button onClick={openModal} className="modal-button">
                        Im a modal button
                </button>
            </container>
        </div>
    )
}

export default CreateForm

