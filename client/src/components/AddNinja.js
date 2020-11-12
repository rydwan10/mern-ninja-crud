import { useState } from 'react';
import './css/AddNinja.css';

const AddNinja = ({ getActualData }) => {
    const [name, setName] = useState('');
    const [rank, setRank] = useState('');
    const [available, setAvailable] = useState(false);

    const [message, setMessage] = useState([]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleRankChange = (e) => {
        setRank(e.target.value);
    }

    const handleAvailableChange = (e) => {
        setAvailable(e.target.value);
    }

    const removeMessage = () => {
        setTimeout(() => {
            setMessage([]);
        }, 2000)
    }

    const addNinja = async (data) => {
        // try {
        //     const response = await fetch('http://localhost:1337/api/ninjas', {
        //         method: 'POST',
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     })
        //     getActualData();

        // } catch (error) {
        //     console.log(error);
        // }
        fetch('http://localhost:1337/api/ninjas', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setMessage(data)
                getActualData();
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name, rank, available };
        addNinja(data)
        removeMessage();
    }


    return (
        <>
            {/* <div className={message.messageType === "error" ? 'message-container error' : 'message-container success'}>
                <span className="message">{message ? message.message : ''}</span>
            </div> */}

            {
                message === [] ? console.log('tidak ada pesan') : console.log('ada pesan')
            }

            <h4 className="title">Add Ninja</h4>
            <form className="__form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" onChange={handleNameChange} value={name} />
                </div>
                <div className="input-group">
                    <label htmlFor="rank">Rank</label>
                    <select name="rank" id="rank" onChange={handleRankChange} defaultValue={rank}>
                        <option value="">Choose Rank</option>
                        <option value="Red">Red</option>
                        <option value="Green">Green</option>
                        <option value="Blue">Blue</option>
                        <option value="White">White</option>
                        <option value="Black">Black</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="available">Available</label>
                    <select name="available" id="available" onChange={handleAvailableChange} defaultValue={available}>
                        <option value={false}>Not Available</option>
                        <option value={true}>Available</option>
                    </select>
                </div>
                <div className="button-wrapper">
                    <button type="submit">Add Ninja</button>
                </div>
            </form>
        </>
    )
}

export default AddNinja
