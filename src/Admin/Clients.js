import { useState } from "react";
import { Button, Grid, TextField, Avatar } from "@mui/material";
import { useStyles } from "./ClientsCss";
import TitleComponent from "../Screens/TitleComponent"
import { postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function Clients(props)
{   var classes=useStyles()

    const [name,setName]=useState('')
    const [lastname,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [mobileno,setMobileNo]=useState('')
    const [project,setProject]=useState('')
    const [clientid,setClientId]=useState('')
    const [error,setError]=useState({})

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }


    const handleSubmit=async()=>{
        var submit = true
        if(name.length==0)
        {
            handleError('name','Pls Input Client Name...')
            submit = false
        }
        if(lastname.length==0)
        {
            handleError('lastname','Pls Input Client Last Name...')
            submit = false
        }
        if(email.length==0)
        {
            handleError('email','Pls Input Client Email...')
            submit = false
        }
        if(mobileno.length==0)
        {
            handleError('mobileno','Pls Input Client Mobileno...')
            submit = false
        }
        if(project.length==0)
        {
            handleError('project','Pls Input Client Project...')
            submit = false
        }
        if(clientid.length==0)
        {
            handleError('clientid','Pls Input Client Id...')
            submit = false
        }
        
        if(submit)
        {
            var body = {name:name, lastname:lastname, email:email, mobileno:mobileno, project:project, clientid:clientid}
            var result = await postData("clients/submit_clients",body)
            console.log(result)
            if(result.status)
            {
                Swal.fire({
                    icon: 'Success',
                    title: result.message,
                    timer: 1500
                })
            }
            else
            {
                Swal.fire({
                    icon: 'Error',
                    title: result.message,
                    timer: 1500
                })
            }
        }
    }


    const handleReset=async()=>{
        setName('')
        setLastName('')
        setEmail('')
        setMobileNo('')
        setProject('')
        setClientId('')
    }





    return(<div className={classes.root}>
        <div className={classes.box}>
        <Grid container spacing={3}>

            <Grid item xs={12} >
                <TitleComponent title='Create Client' logo listicon="icon.png" page="/displayallclients" />
            </Grid>
            
            <Grid item xs={6} >
                <TextField value={clientid} onFocus={()=>handleError('clientid',null)} error={error.clientid} helperText={<span style={{fontFamily:'kanit'}}>{error.clientid}</span>} onChange={(event)=>setClientId(event.target.value)} label="Client Id" fullWidth />
            </Grid>

            <Grid item xs={6} >
                <TextField value={name} onFocus={()=>handleError('name',null)} error={error.name} helperText={<span style={{fontFamily:'kanit'}}>{error.name}</span>} onChange={(event)=>setName(event.target.value)} label="Name" fullWidth />
            </Grid>

            <Grid item xs={12} >
                <TextField value={lastname} onFocus={()=>handleError('lastname',null)} error={error.lastname} helperText={<span style={{fontFamily:'kanit'}}>{error.lastname}</span>} onChange={(event)=>setLastName(event.target.value)} label="Last Name" fullWidth />
            </Grid>

            <Grid item xs={12} >
                <TextField value={email} onFocus={()=>handleError('email',null)} error={error.email} helperText={<span style={{fontFamily:'kanit'}}>{error.email}</span>} onChange={(event)=>setEmail(event.target.value)} label="Email" fullWidth />
            </Grid>

            <Grid item xs={12} >
                <TextField value={mobileno} onFocus={()=>handleError('mobileno',null)} error={error.mobileno} helperText={<span style={{fontFamily:'kanit'}}>{error.mobileno}</span>} onChange={(event)=>setMobileNo(event.target.value)} label="Mobileno." fullWidth />
            </Grid>

            <Grid item xs={12} >
                <TextField value={project} onFocus={()=>handleError('project',null)} error={error.project} helperText={<span style={{fontFamily:'kanit'}}>{error.project}</span>} onChange={(event)=>setProject(event.target.value)} label="Project" fullWidth />
            </Grid>

            

            <Grid item xs={6} >
                <Button onClick={handleSubmit} variant="contained" fullWidth >
                    Create Client                    
                </Button>
            </Grid>

            <Grid item xs={6} >
                <Button onClick={handleReset} variant="contained" fullWidth >
                    RESET
                </Button>
            </Grid>










        </Grid>

        </div>

    </div>)
}