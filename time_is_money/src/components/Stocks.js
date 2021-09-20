import React, {useState, useEffect} from 'react'
import axios from "axios"
import { CanvasJSChart } from "canvasjs-react-charts"
import { FormGroup } from 'reactstrap'
import { Link } from 'react-router-dom'

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
const [stockData, setStockData] = useState([])

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
        let stockChartX = []
        let stockChartY =[]
    
        console.log(result.data)
        for (let key in result.data["Time Series (Daily)"]) {            
            stockChartX.push(key)
            
            let quad = [
                parseFloat(result.data["Time Series (Daily)"][key]["1. open"]),
                parseFloat(result.data["Time Series (Daily)"][key]["2. high"]),
                parseFloat(result.data["Time Series (Daily)"][key]["3. low"]),
                parseFloat(result.data["Time Series (Daily)"][key]["4. close"]),
            ]
            stockChartY.push(quad)
        }
        let finalData = []
        for (let i=0; i < stockChartX.length; i++) {
        let dayData = {
            x: new Date(stockChartX[i]),
            y: stockChartY[i]
        }
        finalData.push(dayData)
    }
        console.log(finalData)
        setStockData(finalData)
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
    
            <h2 className="stock-title"> Stock Tracker </h2>
            <div className="btns-stocks">
                
                <Link to={`/watchlist`}>
                    <button className="see-watchlist"> My Watchlist</button>
                </Link>
               
            </div>
            <form onSubmit={handleSubmit}>
                <FormGroup className="ticker-group">
                    <label className="label ticks"> 
                        Ticker:
                    </label>
                    <input className="form-control stock-stock-ticker" onChange={handleChange} id="input" type="text" placeholder="Ex: AAPL"/> 
                </FormGroup>
                <FormGroup className="ticker-group">
                    <label className="label">
                        Date :   
                    </label>
                    <input className="form-control stock-date" onChange={handleChange} id="date" type="date"  />

                <button type="submit" className="btn btn-secondary submit">
                    Get Data
                </button>
                </FormGroup>
            </form>
            <div className="track-crypto-position">
            <Link to={`/cryptos`}>
                    <button className="see-crypto"> Track Crypto</button>
                </Link>
            </div>
            <div className="add-stock-position">
                <Link to={`/form`}>
                    <button className="add-stock">Add Stock</button>
                </Link>
            </div>
               
            <ul className="stock-ul">
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
            <CanvasJSChart
                options={ {
                    data: [
                        {
                            type: "candlestick",
                            dataPoints: stockData
                        } 
                        ] 
                    } 
                }
            />
        </div>
    )
    }

export default Stocks
