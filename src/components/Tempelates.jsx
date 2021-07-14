
const Tempelates=(props)=>{
return <div className="templates">
   {props.tempelates.map((tempelate, index) => (
        <div key={tempelate.id} className="template" 
       onClick={()=>props.setMeme(tempelate)} style={{backgroundImage:`url(${tempelate.url})`}}/>
      ))}
</div>
}

export default Tempelates