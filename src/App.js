import './App.css';
import React, { Component } from 'react';
import Resizer from "react-image-file-resizer";

class Upload extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: 0,
      file: null,
      file1: null,
      file2: null,
      file3: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleChange(event) {
    //alert(this.state.count)
    alert(URL.createObjectURL(event.target.files[0]))
    if(this.state.count % 3===0){
      this.setState({
      file1: URL.createObjectURL(event.target.files[0])
      })
    } else if(this.state.count % 3===1){
      this.setState({
      file2: URL.createObjectURL(event.target.files[0])
      })
    } else if(this.state.count % 3===2){
      this.setState({
      file3: URL.createObjectURL(event.target.files[0])
      })
    }
    this.setState({
      count: this.state.count+1
    })
  }

  handleClick(imgNo){
    //alert(imgNo)
    if(imgNo===1){
      this.setState({
        file: this.state.file1
      })
    } else if(imgNo===2){
      this.setState({
        file: this.state.file2
      })
    }else if(imgNo===3){
      this.setState({
        file: this.state.file3
      })
    }
  }

  render() {
    return (
      <div style={{width: "50%",paddingTop: "30px"}}>
        <input type="file" onChange={this.handleChange}/>
        <div style={{display:"flex",flexDirection:"row", marginTop:"30px"}}>
        <div>
        <div style={{paddingTop:"10px"}}>
          <span id="box1" style={{paddingRight:"10px"}}><img src={this.state.file1} width="50px" height="50px" onClick={()=>this.handleClick(1)}/></span>
          <span id="box2" style={{paddingRight:"10px"}}><img src={this.state.file2} width="50px" height="50px" onClick={()=>this.handleClick(2)}/></span>
          <span id="box3" style={{paddingRight:"10px"}}><img src={this.state.file3} width="50px" height="50px" onClick={()=>this.handleClick(3)}/></span>
          </div>
</div>
<div style={{display:"flex",width:"50%"}}>
        <img src={this.state.file} width="400px" height="400px"/>
        </div>
        </div>
      </div>
    );
  }
}

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreview_Url: ''
        };

        this.handleImageChange = this.handleImageChange.bind(this);
        this.SaveSubmit = this.SaveSubmit.bind(this);
    }

    SaveSubmit(e) {
        e.preventDefault();
        console.log(this.state.imagePreview_Url);
        alert(this.state.imagePreview_Url)
        //TODO - save > this.state.imagePreview_Url in you DB using your API logic.
    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreview_Url: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    render() {
        return (
            <div style={{paddingTop:40,display:"flex"}}>
                <div>
                    <input type="file" onChange={this.handleImageChange} />
                    <button style={{marginRight:"90px"}} onClick={this.SaveSubmit}>Save/Upload Image in DB</button>
                </div>
                <div style={{paddingRight:"30px"}}>
                    <img src={this.state.imagePreview_Url} width="500px" height="500px" />
                </div>                           
            </div>
        )
    }
}

class ImgResize extends Component {
  constructor(props) {
    super(props);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.state = {
      newImage: "",
    };
  }

  fileChangedHandler(event) {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          88,
          88,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            this.setState({ newImage: uri });
          },
          "base64",
          88,
          88
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
  render() {
    return (
      <div className="App">
        <input type="file" onChange={this.fileChangedHandler} />
        <img src={this.state.newImage} alt="" width="88px" height="88px"/>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App" style={{display:"flex"}}>
      {/*<Upload />
      <ImageUpload />*/}
      <ImgResize />
    </div>
  );
}


export default App;
