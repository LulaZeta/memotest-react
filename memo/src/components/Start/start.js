import './start.css'

const Start = () => {
    const refreshPage = () => window.location.reload(false)
     

    return(
        <div className="start-container">
            <button className="start-button"onClick = {e => {refreshPage(e)}} >
                START
            </button>
        </div>
    )
}
export default Start;