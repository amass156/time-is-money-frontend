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
const [symbol, setSymbol] = useState(initialState)
const [data, setData] = useState(initialState)


let stockTicker = "AAPL"
let date = "2020-10-14"

const handleChange = (event) => {
    setSymbol({...symbol, [event.target.id]:event.target.value})
}
// fetch(x)
// .then(res => res.json())
// .then(data => {
    //         console.log(data)
    //         setSymbol(data.symbol)
    //         setData(data)
    //     })
    
const handleSubmit = (data) => {
    console.log(symbol)
    console.log(data)
    let openCloseByDate = `https://api.polygon.io/v1/open-close/${symbol.symbol}/${symbol.date}?adjusted=true&apiKey=TRt8UyeHwn1IR3pejphSpA0PDkFCf6JE`
    data.preventDefault();
    // console.log(input);
    const searchedStock = {
        // stockTicker: 
    }

    fetch(openCloseByDate)
        .then(res => res.json())
        .then(data => {
        console.log(data)
        setData(data)
    })

}

    return (
        <div>
            {/* <h3>{data}</h3> */}
            <h2> My Stocks </h2>
            <form onSubmit={handleSubmit}>
                <label > 
                    Stock Ticker:
                </label>
                <input onChange={handleChange} id="symbol" type="text" placeholder="Ex: AAPL"/> 
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
                    {symbol.high}
                </li>
                <li>
                    {symbol.close}
                </li> 
                <li>
                    {/* {high} */}
                </li> 
                <li>
                    {symbol.open}
                </li> <li>
                    {/* {symbol} */}
                </li> <li>
                    {/* {symbol} */}
                </li> <li>
                    {/* {symbol} */}
                </li> <li>
                    {/* {symbol} */}
                </li>
            </ul>
        </div>
    )
}

export default Stocks
