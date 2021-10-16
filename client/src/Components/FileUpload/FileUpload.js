import React, {useRef} from "react";


const FileUpload = ({props}) => {

    const fileInput = useRef(null)

       const handleFileInput = (e) => {
        // handle validations
        props(e.target.files[0])
       }
    
  return (
  
        <div className="file-uploader">
             <input type="file" onChange = {handleFileInput}
                name="cv" accept=".doc,.docx,.pdf,.jpg" />
            <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary" />
        </div>
    
  );
};

export default FileUpload
