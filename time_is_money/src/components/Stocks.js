import React, {useState, useEffect} from 'react'
import axios from "axios"

const Stocks = () => {

let initialState = {
    "status": "",
    "from": "",
    "input": "",
    "open": "",
    "high": "",
    "low": "",
    "close": "",
    "volume": "",
    "afterHours": "",
    "preMarket": ""
}
const [input, setInput] = useState(initialState)
const [data, setData] = useState(initialState)

const axiosInstance = axios.create({
    baseURL: "https://www.alphavantage.co/query"
})

const getDailyChartForStock = (symbol) => {
    return axiosInstance.get("", {
        params: {
            function: "TIME_SERIES_DAILY",
            symbol,
            apikey: "LC5Z4UX820R0C7WK"
        }
    })
}

useEffect(() => {
    const fetchStockData = async () => {
        const result = await getDailyChartForStock(input.input)
        console.log(input)
        console.log(result.data)
    }

    fetchStockData()
}, [])


const handleChange = (event) => {
    setInput({...input, [event.target.id]:event.target.value})
}

    
const handleSubmit = (data) => {
    console.log(input)
    console.log(data)
    let openCloseByDate = `https://api.polygon.io/v1/open-close/${input.input}/${input.date}?adjusted=true&apiKey=TRt8UyeHwn1IR3pejphSpA0PDkFCf6JE`
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
            {/* <h3>{data}</h3> */}
            <h2> Stock Tracker </h2>
            <form onSubmit={handleSubmit}>
                <label > 
                    Stock Ticker:
                </label>
                <input onChange={handleChange} id="input" type="text" placeholder="Ex: AAPL"/> 
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
                   Open: {data.open}
                </li>
                <li>
                    High: {data.high}
                </li> 
                <li>
                    Low: {data.low}
                </li> 
                <li>
                    Close: {data.close}
                </li> 
                <li>
                    Volume: {data.volume}
                </li> 
                <li>
                   AfterHours: {data.afterHours}
                </li> 
                <li>
                   PreMarket: {data.preMarket}
                </li> <li>
                    {data.from}
                </li>
            </ul>
        </div>
    )
    }

export default Stocks
