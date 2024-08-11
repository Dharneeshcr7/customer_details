
const Card=(props)=>{

    return(
        <div className="card">
           <div className="name">{props.user.name}</div>
           <div className="title">{props.user.title}</div>
        </div>
    )

}

export default Card;