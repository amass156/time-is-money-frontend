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

    return (
        <div>
             <div className="watchlist-title">
               Watchlist
            </div>
            <div>
                {stocks 
                    ? stocks.map((stocks) => {
                        return (
                            <span className="watchlist-nav">
                            <ul className="watchlist-ul">
                                <li>
                                    Ticker Symbol: {stocks.ticker_symbol}
                                </li>
                                <li>
                                    Name: {stocks.name}
                                </li>
                                <li>
                                    Current Stock Price: {stocks.current_stock_price}
                                </li>
                                <li>
                                    Purchase Price: {stocks.purchase_price}
                                </li>
                                <li>
                                    Selling Price:{stocks.selling_price}
                                </li>
                                <li>
                                    Purchase Date: {stocks.purchase_date}
                                </li>
                                <li>
                                    Percent Change: {stocks.percent_change}
                                </li>
                                <li>
                                <a href={`/watchlist/${stocks.id}`}>
                                    <button className="watchlist-edit">Edit Workout</button>
                                 </a>
                                </li>
                                <li>
                                    <a href={`/watchlist/`}>
                                        <button
                                            onClick={(e) => onDelete(stocks.id, e)}
                                            className="watchlist-delete"
                                            >
                                                Delete Workout
                                        </button>
                                    </a>
                                </li>
                            </ul>
                        </span>
                        )
                    })

                : null}

            </div>
        </div>
    )
}

export default WatchList

