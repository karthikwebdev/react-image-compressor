import React,{useState} from 'react';
import imageCompression from 'browser-image-compression';
import './style.css'

function App() {
  const [image, setimage] = useState("")
  const [size, setsize] = useState()
  const [width, setwidth] = useState(0)
  const CompressImage = (event) =>{
    var options = {
      maxSizeMB: size/1000,
      onProgress: (percent) => setwidth(percent)
    }
    imageCompression(event.target.files[0], options)
      .then(compressedFile => {
        var reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => setimage(reader.result)
      })
      .catch((error) => console.log(error.message));
  }
  return (
    <div className="App">
      <h1 style={{textAlign:"center",color:"teal"}}>Image Compresser</h1>
      <div>
      <input type="number" value={size} id="size" onChange={(e) => e.target.value >= 0  && setsize(e.target.value)} placeholder="Enter Max. KB Size" autoFocus/>
      </div>
      <label htmlFor="file" className="btn" style={{visibility:size > 0 ? "visible" : "hidden"}}>Upload Image</label>
      <input type="file" accept='image/*' style={{display:"none"}} id="file"  onChange={CompressImage} />
      <div className="loader" style={{visibility:width > 0 ? "visible" : "hidden"}}>
      <div style={{visibility:width > 0 ? "visible" : "hidden" }}>Compression Progress {width}%</div>
        <div style={{width:width + "%",height:"10px",backgroundColor:"teal"}}></div>
      </div>
      <a href={image} className="btn" style={{visibility:image ? "visible" : "hidden" }} download>Download</a>
    </div>
  );
}

export default App;
