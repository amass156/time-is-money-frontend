import axios from 'axios'
import {React, useState, useEffect} from 'react'


function WatchList() {

const [stocks, setStocks] = useState('')

useEffect(() => {
//     axios.get('/location/')
//     .then(res => setLocations(res.data));
const url = "http://localhost:8000/api/watchlists"
axios.get(url)
    .then(res=> {
        console.log(res.data)
        setStocks(res.data)
        console.log("All stocks from Watchlist")
    })
    .catch(()=> {
        console.log("Error getting watchlist")
    })
}, []) 

// useEffect(() => {
//     const getStocks = async() => {
//         // const serverStocks = requestedStocks()
//         // setStocks(serverStocks)
//     }
//     setStocks()
// }, [])


const onDelete = ((id, e) => {
    e.preventDefault()
    axios.delete(`http://localhost:8000/api/watchlists/${id}`)
    console.log("You just deleted", id)
    setStocks(stocks => stocks.filter(stock => stock.id != id))
})



// // const addStock = () => {
//     const addStockUrl = "http://localhost:8000/api/watchlists"
//     axios.get(url)
//         .then(res=> {
//             console.log(res.data)
//             setStocks(res.data)
//             console.log("All stocks from Watchlist")
//         })
//         .catch(()=> {
//             console.log("Error getting watchlist")
//         })
// // }
// console.log(stocks[0].forEach(stock => percentChange()))
    return (
        <div className="test">
             <div className="watchlist-title">
               <h2> My Watchlist</h2>
            </div>
                <ul className="watchlist-nav-ul">
                    <li>
                        Ticker Symbol
                    </li>
                    <li>
                        Name
                    </li>
                    <li>
                        Current Price
                    </li>
                    <li>
                        Purchase Price
                    </li>
                    <li>
                        Selling Price
                    </li>
                    <li>
                        Purchase Date
                    </li>
                    <li>
                        Percent Change
                    </li>
                </ul>
            <div className="each-stock">
                {stocks 
                    ? stocks.map((stocks) => {
                        return (
                            <container className="watchlist-container">
                                <span className="watchlist-nav">
                                <ul className="watchlist-ul">
                                    <li className="watchlist-ticker">
                                        {stocks.ticker_symbol}
                                    </li>
                                    <li>
                                        {stocks.name}
                                    </li>
                                    <li>
                                        {stocks.current_stock_price}
                                    </li>
                                    <li>
                                         {stocks.purchase_price}
                                    </li>
                                    <li>
                                        {stocks.selling_price}
                                    </li>
                                    <li >
                                         {stocks.purchase_date}
                                    </li>
                                    <li className="create-form-percentage">
                                        {parseFloat(parseFloat((stocks.selling_price) - parseFloat(stocks.purchase_price)) / parseFloat(stocks.purchase_price) * 100).toFixed(2)}
                                    </li>
                                    <li>
                                    <a href={`/watchlist/${stocks.id}`}>
                                        <button className="watchlist-edit">Edit Stock</button>
                                    </a>
                                    </li>
                                    <li>
                                        <a href={`/watchlist/`}>
                                            <button
                                                onClick={(e) => onDelete(stocks.id, e)}
                                                className="watchlist-delete"
                                                >
                                                    Delete Stock
                                            </button>
                                        </a>
                                    </li>
                                </ul>
                                </span>
                            </container>
                        )
                    })

                : null}

            </div>
        </div>
    )
}

export default WatchList

