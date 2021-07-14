import { useState } from "react";


const Meme = (props)=>{

     const [data,setData]=useState(
         {
             id:props.meme.id,
             username:"DeepakChaturvedi",
             password:"MemeGenerate",
             values:[]
         }
     )
     const [errorMsg,setErrorMsg]=useState("");

     async function fetchMeme(url)
     {
        const res=await fetch(url)
        const resData = await res.json()
        console.log(resData)
        try{
            props.setMeme({...props.meme,url:resData.data.url});
            setErrorMsg(resData.error_message)
        }
        catch(error){
            console.log(resData.error_message)
            setErrorMsg(resData.error_message)
        }
        
     }
     const generateMeme=()=>{
         let url=`https://api.imgflip.com/caption_image?template_id=${data.id}&username=${data.username}&password=${data.password}`
        data.values.map((items,index)=>{
            url+=`&boxes[${index}][text]=${items.text}`;
        })

        fetchMeme(url)
     }

    function forceDownload(url, fileName){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function(){
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}

    return(
    <div className="memeContainer">
        <img src={props.meme.url} alt="" className="meme"/>
        <div className="input-fields">
           {[...Array(props.meme.box_count)].map((items,index)=>(<input className="inputs" key={index} placeholder={`Meme Caption ${index+1}`} onChange={(e)=>{
               var newValues=data.values;
               newValues[index]={text:e.target.value}
               setData({...data,values:newValues})
           }}/>))}
        </div>
        <div className="btns">
            <button className="choose-template buttons" onClick={()=>props.setMeme(null)}>Choose Templates</button>
            <button className="generate-meme buttons" onClick={generateMeme}>Generate Meme</button>
            <button className="buttons" onClick={()=>forceDownload(props.meme.url,"myMeme")}>Download Meme</button>
        </div>
        <div className="msg">
            {errorMsg}
        </div>
       
        
    </div>
    )
}

export default Meme;