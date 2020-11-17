import { useState } from 'react';
import './css/AddNinja.css';

const AddNinja = ({ getActualData }) => {
    const [name, setName] = useState('');
    const [rank, setRank] = useState('');
    const [description, setDescription] = useState('');
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
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const removeMessage = () => {
        setTimeout(() => {
            setMessage([]);
        }, 2000)
    }

    const cleanForm = () => {
        setName('');
        setRank('');
        setDescription('');
        setAvailable(false);
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
                cleanForm();
            })
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name, rank, available, description };
        addNinja(data)
        removeMessage();

    }


    return (
        <>
            {/* <div className={message.messageType === "error" ? 'message-container error' : 'message-container success'}> */}
            {/* <div className={message.messageType === 'error' ? 'message error' : 'message success'}>
                {message ? <h3>{message.message}</h3> : ''}
            </div> */}
            {/* </div> */}
            <div>
                {message ? <h3 className={message.messageType === "error" ? 'error' : 'success'}>{message.message}</h3> : ''}
            </div>
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
                        <option value={true}>Available</option>
                        <option value={false}>Not Available</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="description">Description</label>
                    <textarea rows="6" name="description" id="description" onChange={handleDescriptionChange} value={description} />
                </div>
                <div className="button-wrapper">
                    <button className="add-button" type="submit">Add Ninja</button>
                </div>
            </form>
        </>
    )
}

export default AddNinja
