import { useNavigate } from "react-router-dom"
import mainlogo from '../../src/Assets/logo.jpeg'
import list from '../../src/Assets/icon.png'
export default function TitleComponent({title,logo,listicon,page})
{
    var navigate = useNavigate()
    return(<div style={{display:'flex', justifyContent:'space-between', fontFamily:'kanit'}} >
        <div style={{display:'flex', justifyContent:'center',  flexDirection:'column'}} >
            {/* <div style={{display:'flex', alignItems:'center'}} ><span><img src={mainlogo}width={170}></img></span></div> */}
            <div style={{color:'#636e72', fontSize:16, marginTop:'10px',fontWeight:'bolder'}} >{title}</div>
        </div>
        <div style={{cursor:'pointer'}} onClick={()=>navigate(page)} >
            <img src={list} width={40} />
        </div>




    </div>)
}