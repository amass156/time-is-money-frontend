import React, {useState} from 'react'
import { Link, useHistory } from "react-router-dom"


// import .axios from "axios"

const Stocks = () => {

let initialState = {
    "symbol": "",
    "open": "",
    "close": "",
}
const [input, setInput] = useState(initialState)
const [data, setData] = useState(initialState)


const handleChange = (event) => {
    setInput({...input, [event.target.id]:event.target.value})
}

    
const handleSubmit = (data) => {
    console.log(input.from)
    console.log(data)
    let openCloseByDate = `https://api.polygon.io/v1/open-close/crypto/${input.from}/${input.to}/${input.date}?adjusted=true&apiKey=TRt8UyeHwn1IR3pejphSpA0PDkFCf6JE&date=2020-10-14&from=${input.from}&to=${input.to}`
    data.preventDefault();
   
    fetch(openCloseByDate)
        .then(res => res.json())
        .then(data => {
        console.log(data)
        setData(data)
    })

}

    return (
        <div>
            <h2> Crypto Tracker </h2>
            <Link to={`/`}>
                <button className="see-stocks"> Track a Stock</button>
            </Link>
            <Link to={`/watchlist`}>
                <button className="see-watchlist"> My Watchlist</button>
            </Link>
            <Link to={`/form`}>
                    <button className="add-stock">Add Crypto</button>
            </Link>
            <form onSubmit={handleSubmit}>
                <label > 
                    From:
                </label>
                <input onChange={handleChange} id="from" type="text" placeholder="Ex: BTC"/> 
                <label > 
                    To:
                </label>
                <input onChange={handleChange} id="to" type="text" placeholder="Ex: USD"/> 
                <label>
                    Date:
                </label>
                <input onChange={handleChange} id="date" type="date"  />

                <button type="submit" >
                    Submit
                </button>
            </form>
            <ul>
                <li>
                    Symbol: {data.symbol}
                </li>
                <li>
                   Open: {data.open}
                </li> 
            
                <li>
                    Close: {data.close}
                </li> 
               
            </ul>
        </div>
    )
    }

export default Stocks

