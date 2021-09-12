import axios from 'axios';
import React, { useState } from 'react'

const CreateForm = () => {

    const initialState = { ticker_symbol:'', name: '', current_stock_price:'', purchase_price:'', selling_price:'', purchase_date:'', percent_change:'' } //needs to add user
    const [stockState, setStockState] = useState(initialState)

    const handleChange = (event) => {
        console.log(event.target.value);
        setStockState({ ...stockState, [event.target.id]: event.target.value });
      };

    const handleSubmit = (event) => {
        event.preventDefault()

        const newStock = {
            "ticker symbol": stockState.ticker_symbol,
            name: stockState.name,
            "current stock price": stockState.current_stock_price,
            "purchase price": stockState.purchase_price,
            "selling price": setStockState.selling_price,
            "purchase date": setStockState.purchase_date,
            "percent change": setStockState.percent_change
            // "user": setStockState.user
        }

        axios.post("http://localhost:8000/api/watchlists/", newStock, {
            method: "post",
            credentials: "incldue",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then((res) => {
            setStockState(res.data)
            console.log(res.data)
        })


    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className="stock-title"> Add to WishList! </h1>
                <div className="grid">
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
                    <label htmlFor="current_stock_price">
                    Current Stock Price:
                    </label>
                    <input
                        name="current_stock_price"
                        id="current_stock_price"
                        type="number"
                        onChange={handleChange}
                        // value="comes from api"
                        placeholder="Ex: $25.77"
                    />

                    <label htmlFor="purchase_price">
                    Purchase Price:
                    </label>
                    <input
                        name="purchase_price"
                        id="purchase_price"
                        type="number"
                        onChange={handleChange}
                        // value={stockState.sets}
                        placeholder="Ex: $27.89"
                    />

                    <label htmlFor="selling_price">
                    Selling Price:
                    </label>
                    <input
                        name="selling_price"
                        id="selling_price"
                        type="number"
                        onChange={handleChange}
                        // value={stockState.description}
                        placeholder="Ex: $45.22"
                    />

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

                    <label htmlFor="purchase_date">
                    Percent Change:
                    </label>
                    <input
                        name="percent_change"
                        id="percent_change"
                        type="number"
                        onChange={handleChange}
                        // value={stockState.description}
                        placeholder="Ex: 26%"
                    />

                    <button type="submit" className="subBut">
                    Submit
                    </button>
      </div>
    </form>
        </div>
    )
}

export default CreateForm

