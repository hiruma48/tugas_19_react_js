import axios from "axios";
import React, { Component } from "react";
import "./header.css";
const judul = {
  color:"white",
  backgroundColor:"Chocolate",
  marginTop:"50px"
};

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      dataApi:[],
      edit:false,
      dataPost: {
        id: 0,
        nama_karyawan:"",
        jabatan:"",
        jenis_kelamin:"",
        tanggal_lahir:""
      }
    };
    this.handeleRemove=this.handeleRemove.bind(this);
    this.inputchange=this.inputchange.bind(this);
    this.onSubmitForm=this.onSubmitForm.bind(this);
  }
  reloadData(){
    axios.get('http://localhost:3005/posts').then(res=>{
      this.setState({
        dataApi:res.data,
        edit: false
      })
    }
      
    );
  }
  handeleRemove(e){
    console.log(e.target.value);
    fetch(`http://localhost:3005/posts/${e.target.value}`,{method:"DELETE"}).then(res=>this.reloadData());
  }
  inputchange(e){
    let newdatapost = {...this.state.dataPost};
    if(this.state.edit===false){
    newdatapost['id']=new Date().getTime();
    }
    newdatapost[e.target.name]=e.target.value;
    this.setState({
      dataPost: newdatapost
    },()=>console.log(this.state.dataPost))
  }
  clearData =()=>{
    let newdatapost = {...this.state.dataPost};

    newdatapost['id']="";
    newdatapost['nama_karyawan']="";
    newdatapost['jabatan']="";
    newdatapost['jenis_kelamin']="";
    newdatapost['tanggal_lahir']="";

    this.setState({
      dataPost : newdatapost
    })
  }
  onSubmitForm(){
    if(this.state.edit===false){
    axios.post('http://localhost:3005/posts',this.state.dataPost).then(()=>{
      this.reloadData();
    this.clearData();
    } 
    );
  }else{
    axios.put(`http://localhost:3005/posts/${this.state.dataPost.id}`,this.state.dataPost).then(()=>{
      this.reloadData();
      this.clearData();
    })
  }
  }
  getDataId=(e)=>{
    axios.get(`http://localhost:3005/posts/${e.target.value}`).then(res=>{
      this.setState({
        dataPost:res.data,
        edit:true
      })
    })

  }
  componentDidMount(){
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => response.json())
    //   .then(res => {
    //     this.setState({
    //       dataApi: res
    //     })
    //   })
    this.reloadData();
  }
  render(){
    return(
      <div>
        <center><h1 style={judul}>Data Karyawan</h1></center>
        <input type="text" className="form"name="nama_karyawan" value={this.state.dataPost.nama_karyawan} placeholder="Masukkan Nama Karyawan" onChange={this.inputchange}/>
        <input type="text" className="form" name="jabatan" value={this.state.dataPost.jabatan}  placeholder="Masukkan jabatan" onChange={this.inputchange}/>
        <input type="text" className="form" name="jenis_kelamin" value={this.state.dataPost.jenis_kelamin}  placeholder="Masukkan jenis kelamin" onChange={this.inputchange}/>
        <input type="text" className="form" name="tanggal_lahir" value={this.state.dataPost.tanggal_lahir}  placeholder="mm/dd/yyyy" onChange={this.inputchange}/>
        <button type="submit" className="savedata" onClick={this.onSubmitForm}>save Data</button>
        
        
        {this.state.dataApi.map((dat,index)=>
        {
          return(

             
          <div key={index} className="card">
            
            <p>Nama : {dat.nama_karyawan}</p>  
            <p>jabatan : {dat.jabatan}</p>
            <p>jenis kelamin : {dat.jenis_kelamin}</p>
            <p>Tanggal Lahir : {dat.tanggal_lahir}</p>

            <button value={dat.id} onClick={this.handeleRemove} className="Delete">Delete</button>
            <button value={dat.id} onClick={this.getDataId} className="editData" >edit data</button>
            
            </div>);
        }
        )}
       
         
      </div>
      
    )
  }
}


export default App;
