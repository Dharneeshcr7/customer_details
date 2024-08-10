const Card=(data)=>{

    return(
        <div className="card">
           <div className="name">{data.name}</div>
           <div className="title">{data.title}</div>
        </div>
    )

}

export default Card;