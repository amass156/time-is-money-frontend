import React, {useState, useEffect} from 'react'
import axios from "axios"
import { CanvasJSChart } from "canvasjs-react-charts"
import { FormGroup } from 'reactstrap'

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
        const result = await getDailyChartForStock("TSLA")
        // setStockData(formatStockData(result.data["Time Series (Daily)"]))
        let stockChartX = []
        let stockChartY =[]
        let example = {
            "1. open": "717.9600",
            "2. high": "724.0000",
            "3. low": "703.3501",
            "4. close": "704.7400",
           " 5. volume": "29436995"
        }
        // setStockData(example)

        // console.log(formatStockData(result.data))
        console.log(result.data["Time Series (Daily)"])
        for (let key in result.data["Time Series (Daily)"]) {
            // console.log(key)
            stockChartX.push(key)
            stockChartY.push(result.data["Time Series (Daily)"]
            [key]["1. open"])
        }
        // console.log(stockChartY)
        setStockData({
                x: stockChartX,
                y: stockChartY
        })
    }

    fetchStockData()
}, [])


function formatStockData(stockData){
    return stockData.map(entries => {
        const [date, priceData] = entries

        return {
            date, 
            open: Number(priceData["1, open"]),
            high: Number(priceData["2, high"]),
            low: Number(priceData["3, low"]),
            close: Number(priceData["4, close"])
        }
    })
}


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
// console.log(stockData)


    return (
        <div>
            {/* <h3>{data}</h3> */}
            <h2> Stock Tracker </h2>
            <a href={`/form`}>
                    <button className="add-stock">Add Stock</button>
            </a>
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
                            dataPoints: [
                                {x: new Date(stockData.date), 
                                y: [
                                    stockData.open,
                                    stockData.high,
                                    stockData.low,
                                    stockData.close
                                ]
                                } 
                            ]
                        } 
                        ] 
                    } 
                }
            />
        </div>
    )
    }

export default Stocks
