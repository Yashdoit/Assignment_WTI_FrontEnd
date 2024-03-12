import MaterialTable from "@material-table/core";
import { useStyles } from "./ClientsCss"
import { useState,useEffect } from "react";
import { postData,getData,serverURL } from "../services/FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { Grid,Button,TextField,Avatar } from "@mui/material";
import TitleComponent from "../Screens/TitleComponent";
// import { InputLabel,FormControl,Select,MenuItem } from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function DisplayAllClients(){
    var classes = useStyles()
    var navigate = useNavigate()
    const [name,setName]=useState([])
    const [lastname,setLastName]=useState('')
    const [open,setOpen]=useState(false)
    const [email,setEmail]=useState('')
    const [mobileno,setMobileNo]=useState('')
    const [project,setProject]=useState('')
    const [clientid,setClientId]=useState('')
    const [error,setError]=useState('')
    const [clientData,setClientData]=useState([])

    // const [clientlist,setClientList]=useState([])



    const fetchAllClients=async()=>{
        var result = await getData("clients/display_all_clients")
        if(result.status)
        {
            setClientData(result.data)
        }
    }
    useEffect(function(){fetchAllClients()},[])




    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }
    



   const handleClose=()=>{
        setOpen(false)
    }


    const handleOpen=(rowData)=>{
        setOpen(true)
        setName(rowData.name)
        setLastName(rowData.lastname)
        setEmail(rowData.email)
        setMobileNo(rowData.mobileno)
        setProject(rowData.project)
        setClientId(rowData.clientid)
  
    }


    const handleEditClients=async()=>{
        var submit = true
        if(name.length==0)
        {
            handleError("name","Plz input Client name....")
            submit = false
        }
        if(lastname.length==0)
        {
            handleError("lastname","Plz input Client Last Name....")
            submit = false
        }
        if(email.length==0)
        {
            handleError("email","Plz input Client Email....")
            submit = false
        }
        if(mobileno.length==0)
        {
            handleError("mobileno","Plz input Client Mobile No....")
            submit = false
        }
        if(project.length==0)
        {
            handleError("project","Plz input Project....")
            submit = false
        }
        if(clientid.length==0)
        {
            handleError("clientid","Plz input client id....")
            submit = false
        }
        if(submit)
        {
            var body = {clientid:clientid, name:name, lastname:lastname, email:email, mobileno:mobileno, project:project}
            var result = await postData("clients/edit_clients",body)
            console.log(result)
            if(result.status)
            {
                Swal.fire({
                    icon: 'Success',
                    title: result.message,
                    timer: 1500,
                    toast: true
                })
            }
            else
            {
                Swal.fire({
                    icon: 'Error',
                    title: result.message,
                    timer: 1500,
                    toast: true
                })
            }
            fetchAllClients()
        }
    }




    const handleDeleteClient=async(rowData)=>{
        Swal.fire({
            title: "Do you want to Delete Client?",
            showDenyButton: true,
            showCancelButton: true,
            toast: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var body = {clientid:rowData.clientid}
                var result = await postData("clients/delete_clients",body)
                if(result.status)
                Swal.fire({toast:true,title:"Deleted!", icon:"success"});
                else
                Swal.fire({toast:true,title:"Cancel!", icon:"info"});
                } else if (result.isDenied) {
                Swal.fire({toast:true,title:"Your Record Is Safe!", icon:"info"});
            }
            fetchAllClients()
          });
    }



   const showClientsForm=()=>{
    return(
        <Dialog open={open} onClose={handleClose} maxWidth="md" >
            <DialogContent>
            <div className={classes.boxsubmit} >

                <Grid container spacing={3} >


                    <Grid item xs={12} >
                        <TitleComponent title="Clients" page="/displayallclients"  />
                    </Grid>

                    <Grid item xs={6} >
                        <TextField value={clientid} onFocus={()=>handleError('clientid',null)} error={error.clientid} helperText={error.clientid} onChange={(event)=>setClientId(event.target.value)} label="Client Id" fullWidth />
                    </Grid>

                    <Grid item xs={6} >
                        <TextField value={name} onFocus={()=>handleError('name',null)} error={error.name} helperText={error.name} onChange={(event)=>setName(event.target.value)} label="Name" fullWidth />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField value={lastname} onFocus={()=>handleError('lastname',null)} error={error.lastname} helperText={error.lastname} onChange={(event)=>setLastName(event.target.value)} label="Last Name" fullWidth />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField value={email} onFocus={()=>handleError('email',null)} error={error.email} helperText={error.email} onChange={(event)=>setEmail(event.target.value)} label="Email" fullWidth />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField value={mobileno} onFocus={()=>handleError('mobileno',null)} error={error.mobileno} helperText={error.mobileno} onChange={(event)=>setMobileNo(event.target.value)} label="Mobile No" fullWidth />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField value={project} onFocus={()=>handleError('project',null)} error={error.project} helperText={error.project} onChange={(event)=>setProject(event.target.value)} label="Project" fullWidth />
                    </Grid>

                </Grid>
            </div>
            </DialogContent>
            <DialogActions>
                    <Button onClick={handleEditClients} >Edit</Button>
                    <Button onClick={handleClose} >Close</Button>
                </DialogActions>
        </Dialog>
    )
   }
   






    function showAllClients(){
        return(
            <MaterialTable
            title="Clients"
            columns={[
                {title:'ClientId', field:'clientid'},
                {title:'Name', field:'name'},
                {title:'Last Name', field:'lastname'},
                {title:'Email', field:'email'},
                {title:'Mobileno', field:'mobileno'},
                {title:'Project', field:'project'}
            ]}


            options={{
                paging:true,
                pageSize:3,
                emptyRowsWhenPaging:false,
                pageSizeOptions:[3,5,7,10]
              }}
            
            data={clientData}        
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Client',
                  onClick: (event, rowData) => handleOpen(rowData)
                },

                {
                    icon: 'delete',
                    tooltip: 'Delete Client',
                    onClick: (event, rowData) => handleDeleteClient(rowData)
                  },

                  {
                    icon: 'add',
                    tooltip: 'Add Product',
                    isFreeAction:true,
                    onClick: (event) => navigate('/clients')
                  },
              ]} 
            
            />

        )
    }







    return(<div className={classes.root} >
        <div className={classes.boxClient} >
        {showAllClients()}
        </div>
        {showClientsForm()}
    </div>)
}