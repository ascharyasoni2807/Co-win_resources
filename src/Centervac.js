function Centervac(props){

   const centers = ()=>{
       const style ={marginTop:'32px',
                    width: "100%",
                    display: "flex",
                    flexFlow: "wrap",
                    flexDirection: "row",
                    justifyContent: "center"}


     return   props.centerArray.map((center)=>{
            const isArray =Array.isArray(center.sessions);
            const sessions = (item)=>{
                return center.sessions[0][item]
            }
            return <div className="card" key = {Math.random()}>
                <div>
                    <span style={{fontSize: 'x-large'}}>{center.name}</span>
                     {isArray ?
                         <span className="vaccine-name">
                         {sessions("vaccine")}</span>
                         :
                         <span className="vaccine-name">{center.vaccine}</span>} 
                </div>
                {isArray?
                <div className="section">
                    vaccine available for {sessions("available_capacity")} people above {sessions("min_age_limit")} age
                    </div>:
                    <div className="section">
                    vaccine available for {center.available_capacity} people above {center.min_age_limit} age
                    </div>}
                <div className ="address">In The {center.address}</div>
                {isArray?
                    <div style={style}>
                    {sessions("slots").map((x)=> <span key = {Math.random()} className="slot">{x}</span>)
                }
                                   
                    </div>
                    :
                    <div style={style}>
                        {center?.slots?.map(x => <span key = {Math.random()} className="slot">{x}</span>)}
                        </div>
                    
                        }
            </div>
        })
   }

    return(
        <div>
            {centers()}
        </div>
    )
}

export default Centervac