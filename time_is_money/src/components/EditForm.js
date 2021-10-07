import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import { FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"


const EditForm = ({match}) => {
    const [watchlistState, setWatchlistState] = useState([])
    let history = useHistory()

    const percentChange = () => {
        let percentage = parseFloat(parseFloat((watchlistState.selling_price) - parseFloat(watchlistState.purchase_price)) / parseFloat(watchlistState.purchase_price) * 100)
        return percentage
    }

    const handleChange = (event) => {
        setWatchlistState({...watchlistState, [event.target.id]: event.target.value})
    }

    useEffect(() => {
        const id = match.params.id
        console.log(id)
        axios.get(`https://ancient-beyond-38651.herokuapp.com/api/watchlists/${id}/`)
        .then((res) => {
            console.log(res.data)
            setWatchlistState(res.data)
        })
    }, [])

    const updateSubmit = (event) => {
        event.preventDefault()
        console.log(watchlistState)
        const id = match.params.id

        axios.put(`https://ancient-beyond-38651.herokuapp.com/api/watchlists/${id}/`, watchlistState)
        .then((res) => {
            console.log(res.data)
            setWatchlistState(res.data)
            history.push("/watchlist")
        })
    }

    return (
        <div>
            <Modal isOpen={true} className="edit-modal" >
                <ModalHeader > <h2> Edit Value</h2></ModalHeader>
                <ModalBody> 
                    <form classname="edit-form" noValidate onSubmit={updateSubmit}>
                        <div className="grid">
                            <FormGroup>
                                <Label className="edit-label" htmlFor="ticker_symbol" > Ticker Symbol: </Label>
                                    <input
                                        className="form-control"
                                        name="ticker_symbol"
                                        id="ticker_symbol"
                                        type="text"
                                        onChange={handleChange}
                                        value= {watchlistState.ticker_symbol}
                                        placeholder="Ex: AAPL"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label className="edit-label" htmlFor="name" > Name: </Label>
                                    <input
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        type="text"
                                        onChange={handleChange}
                                        value={watchlistState.name}
                                        placeholder="Ex: Apple"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label className="edit-label" htmlFor="current_stock_price"> Current Stock Price: </Label>
                                    <input
                                        className="form-control"
                                        name="current_stock_price"
                                        id="current_stock_price"
                                        type="number"
                                        onChange={handleChange}
                                        value={watchlistState.current_stock_price}
                                        placeholder="Ex: $25.77"
                                    />
                            </FormGroup>

                            <FormGroup>
                                <Label className="edit-label" htmlFor="purchase_price"> Purchase Price: </Label>
                                <input
                                    className="form-control"
                                    name="purchase_price"
                                    id="purchase_price"
                                    type="number"
                                    onChange={handleChange}
                                    value={watchlistState.purchase_price}
                                    placeholder="Ex: $27.89"
                                />
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="selling_price">
                                Selling Price:
                                </label>
                                <input
                                    className="form-control"
                                    name="selling_price"
                                    id="selling_price"
                                    type="number"
                                    onChange={handleChange}
                                    value={watchlistState.selling_price}
                                    placeholder="Ex: $45.22"
                                />
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="purchase_date">
                                Purchase Date:
                                </label>
                                <input
                                    className="form-control"
                                    name="purchase_date"
                                    id="purchase_date"
                                    type="date"
                                    onChange={handleChange}
                                    value={watchlistState.purchase_date}
                                    placeholder="Ex: 2020-2-7"
                                />
                            </FormGroup>

                        </div>
                        <ModalFooter>
                            <a href={`/watchlist`}>
                                <button className="btn btn-danger">
                                    Cancel
                                </button>
                            </a>

                            <button type="submit" className="subBut btn btn-primary">
                                Submit
                            </button>

                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default EditForm
