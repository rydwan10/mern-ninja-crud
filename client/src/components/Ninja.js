import './css/Ninja.css'

const Ninja = ({ ninja, getActualData }) => {
    const handleDeleteNinja = () => {
        let confirmDelete = window.confirm('Delete this ninja?');
        if (confirmDelete) {
            fetch(`http://localhost:1337/api/ninjas/${ninja._id}`, {
                method: 'DELETE'
            }).then(res => res.json()).then(data => {
                alert(data.message)
                getActualData();
            });
        }
    }

    return (
        <div className={ninja.available ? 'ninja-item available' : 'ninja-item not-available'}>
            <button onClick={handleDeleteNinja} className="delete-ninja-button">X</button>
            <span className="ninja-name">
                {ninja.name}
            </span>
            <span className="ninja-rank">{ninja.rank}</span>
            <span className="ninja-available">{ninja.available ? 'Available' : 'Not Available'}</span>
            <span className="ninja-available">{ninja.description}</span>
        </div>

    )
}

export default Ninja
