import React, {useState} from 'react'

// import .axios from "axios"

const Stocks = () => {

let initialState = {
    "status": "",
    "from": "",
    "symbol": "",
    "open": 0,
    "high": 1,
    "low": 1,
    "close": 1,
    "volume": 1,
    "afterHours": 1,
    "preMarket": 1
}
const [symbol, setSymbol] = useState('')
const [data, setData] = useState(initialState)

let stockTicker = "AAPL"
let date = "2020-10-14"
let x = `https://api.polygon.io/v1/open-close/${stockTicker}/${date}?adjusted=true&apiKey=TRt8UyeHwn1IR3pejphSpA0PDkFCf6JE`


// fetch(x)
.then(res => res.json())
.then(data => {
        console.log(data)
        setSymbol(data.symbol)
        setData(data)
    })



    return (
        <div>
            <h1>{symbol}</h1>
            {/* <h3>{data}</h3> */}
            <h2> My Stocks </h2>
        </div>
    )
}

export default Stocks
