import './css/NinjaList.css'
import Ninja from './Ninja';

const NinjaList = ({ ninjas, isLoading, getActualData }) => {
    return isLoading ? (<h3>Loading...</h3>) : (
        <>
            <h4 className="title">List of Ninjas</h4>
            <div className="ninja-list">

                {ninjas.map(ninja => {
                    return <Ninja ninja={ninja} key={ninja._id} getActualData={() => { getActualData() }} />
                })}

            </div>
        </>
    )
}

export default NinjaList
