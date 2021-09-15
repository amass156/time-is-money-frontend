import React, { useEffect, useState } from 'react'
import axios from 'axios'


const EditForm = ({match}) => {
    const [watchlistState, setWatchlistState] = useState([])

    const handleChange = (event) => {
        setWatchlistState({...watchlistState, [event.target.id]: event.target.value})
    }

    useEffect(() => {
        const id = match.params.id
        console.log(id)
        axios.get(`http://localhost:8000/api/watchlists/${id}`)
        .then((res) => {
            console.log(res.data)
            setWatchlistState(res.data)
        })
    }, [])

    const updateSubmit = (event) => {
        event.preventDefault()
        console.log(watchlistState)
        const id = match.params.id

        axios.put(`http://localhost:8000/api/watchlists/${id}/`, watchlistState)
        .then((res) => {
            console.log(res.data)
            setWatchlistState(res.data)
        })
    }


    return (
        <div>
             <form noValidate onSubmit={updateSubmit}>
                <h1 className="stock-title"> Edit  </h1>
                <div className="grid">
                <label htmlFor="ticker_symbol" >
                        Ticker Symbol:
                    </label>
                    <input
                        name="ticker_symbol"
                        id="ticker_symbol"
                        type="text"
                        onChange={handleChange}
                        value= {watchlistState.ticker_symbol}
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
                        value={watchlistState.name}
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
                        value={watchlistState.current_stock_price}
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
                        value={watchlistState.purchase_price}
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
                        value={watchlistState.selling_price}
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
                        value={watchlistState.purchase_date}
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
                        value={watchlistState.percent_change}
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

export default EditForm
