import './css/Ninja.css'

const Ninja = ({ ninja }) => {
    return (
        <div className={ninja.available ? 'ninja-item available' : 'ninja-item not-available'}>
            <span className="ninja-name">{ninja.name}</span>
            <span className="ninja-rank">{ninja.rank}</span>
            <span className="ninja-available">{ninja.available ? 'Available' : 'Not Available'}</span>
        </div>
    )
}

export default Ninja
