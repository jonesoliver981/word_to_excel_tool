// import React, { useState, useEffect } from "react";
// import { LuUpload } from "react-icons/lu";
// import "./UploadButton.css";
// import "../Alerts/InfoAlert.css";
// import WarmingAlert from "../Alerts/WarmingAlert";

// const UploadButton = ({
//   children,
//   className,
//   onFileSelect,
//   index,
//   category,
//   subcategory,
//   resetSelectedFile,
//   Files,
//   setFiles,
//   googleFile,
// }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [showFileFormatAlert, setShowFileFormatAlert] = useState(false);
//   const [showWarningAlert, setShowWarningAlert] = useState(false);
//   const [showFileAlready, setshowFileAlready] = useState(false);

//   useEffect(() => {
//     if (!subcategory && selectedFile) {
//       setSelectedFile(null);
//     }
//   }, [subcategory,selectedFile]);



//   const handleFileSelect = (e, subcategory) => {

//     const files = e.target.files;
//     let file =files &&  files[0];

//     if (!file) {
//       return;
//     }

//     if (
//       index > 0 &&
//       Files.some((item) => item && item.file && item.file.name === file.name)
//     ) {
//       setshowFileAlready(true);
//       setSelectedFile(null);
//       setTimeout(() => {
//         setshowFileAlready(false);
//       }, 5000);
//       const updatedFiles = [...Files];
//       updatedFiles[index] = null;
//       setFiles(updatedFiles);
//       return;
//     }

//     if (file.name.endsWith(".doc") || file.name.endsWith(".docx")) {
//       console.log(file)
//       setSelectedFile(file);
//       onFileSelect(file, subcategory, index); 
//     } else {
//       setShowFileFormatAlert(true);
//       setTimeout(() => {
//         setShowFileFormatAlert(false);
//       }, 5000);
//       const updatedFiles = [...Files];
//       updatedFiles[index] = null;
//       setFiles(updatedFiles);
//       return;
//     }


//     const fileSizeInMB = file.size / (1024 * 1024);

//     if (fileSizeInMB > 1) {
//       console.log("File size exceeds the limit");
//       e.target.value = "";
//       setShowWarningAlert(true);
//       setSelectedFile(null);
//       setTimeout(() => {
//         setShowWarningAlert(false);
//       }, 5000);
//       return; 
//     }
//   };
//   console.log('selectedFile',selectedFile)

//   return (
//     <label className={`upload-button1 ${className}`}>
//       {(selectedFile || (Files && Files[0] && Files[0].file)) ? (
//         <div className="file-name-container">
//           <b className="file-name">
//             {selectedFile ? selectedFile.name : Files[0].file.name}
//           </b>
//         </div>
//       ) : (
//         <b>
//           Choose Word file <span>or Drop Word file</span>
//         </b>
//       )}
//       <input
//         type="file"
//         accept=".doc, .docx"
//         key={Date.now()}
//         onChange={(e) => handleFileSelect(e, subcategory)}
//         style={{ display: "none" }}
//         disabled={!category || !subcategory}
//         required
//       />
//       <LuUpload className={selectedFile ? "icon-hidden" : "icon"} />
//       {showFileFormatAlert && (
//         <WarmingAlert message="File format is unsupported. Please upload .doc or .docx format." />
//       )}
//       {showWarningAlert && (
//         <WarmingAlert message="File size exceeds the limit of 1MB." />
//       )}
//       {showFileAlready && (
//         <WarmingAlert message="The same file has already been uploaded" />
//       )}
//     </label>
//   );
// };

// export default UploadButton;




import React, { useState, useEffect } from "react";
import { LuUpload } from "react-icons/lu";
import "./UploadButton.css";
import "../Alerts/InfoAlert.css";
import WarmingAlert from "../Alerts/WarmingAlert";

const UploadButton = ({
  children,
  className,
  onFileSelect, 
  index,
  category,
  subcategory,
  resetSelectedFile,
  Files, 
  setFiles, 
  googleFile,
}) => {
  const [showFileFormatAlert, setShowFileFormatAlert] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [showFileAlready, setshowFileAlready] = useState(false);

  useEffect(() => {
    if (!subcategory && Files[index]) {
      setFiles((prevFiles) => [...prevFiles.slice(0, index), null, ...prevFiles.slice(index + 1)]); // Clear file if subcategory is removed
    }
  }, [subcategory, Files, index]);

  

  const handleFileSelect = (event, subcategory) => {
    const files = event.target?.files || [googleFile]; 
    let file = files && files[0];
    // debugger
    console.log('svbsvbsvbsvjhb',file.name)

    if (!file) {
      return;
    }
    if (
      index > 0 &&
      // Files &&
      // Files.length > index &&
      // Files[index] &&
      Files.some((item) => item && item.file && item.file.name === file.name)
  ) {
      setshowFileAlready(true);
      // setSelectedFile(null);
      setTimeout(() => {
          setshowFileAlready(false);
      }, 5000);
      const updatedFiles = [...Files];
      updatedFiles[index] = null;
      setFiles(updatedFiles);
      return;
  }
  
    

    // const isDuplicate = Files.some((item) => item && item.file && item.file.name === file.name);

    // if (isDuplicate) {
    //   setFiles([])
    //   setshowFileAlready(true);
    //   setTimeout(() => {
    //     setshowFileAlready(false);
    //   }, 5000);
    //   return;
    // }

    if (file.name.endsWith(".doc") || file.name.endsWith(".docx")) {
      setFiles((prevFiles) => [...prevFiles.slice(0, index), { file }, ...prevFiles.slice(index + 1)]); // Update shared file state at specific index
      onFileSelect(file, subcategory, index); // Pass file and index to parent component
    } else {
      setShowFileFormatAlert(true);
      setTimeout(() => {
        setShowFileFormatAlert(false);
      }, 5000);
    }

    const fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > 1) {
      console.log("File size exceeds the limit");
      event.target.value = "";
      const updatedFiles = [...Files];
      updatedFiles[index] = null;
      setFiles(updatedFiles);
      setShowWarningAlert(true);
      setTimeout(() => {
        setShowWarningAlert(false);
      }, 5000);
    }
  };

  return (
    <label className={`upload-button1 ${className}`}>
       <LuUpload className={Files[index]?.file ? "icon-hidden" : "icon"} />
      {Files[index]?.file?.name ? (
        <div className="file-name-container">
          <span className="file-name">{Files[index].file.name}</span>
        </div>
      ) : (
        <span>
          Choose Word file <span>or Drop Word file</span>
        </span>
      )}
      <input
        type="file"
        accept=".doc, .docx"
        key={Date.now()}
        onChange={(e) => handleFileSelect(e, subcategory)}
        style={{ display: "none" }}
        disabled={!category || !subcategory}
        required
      />
     
      {showFileFormatAlert && (
        <WarmingAlert message="File format is unsupported. Please upload .doc or .docx format." />
      )}
      
     {showWarningAlert && (
        <WarmingAlert message="File size exceeds the limit of 1MB." />
      )}
      {showFileAlready && (
        <WarmingAlert message="The same file has already been uploaded" />
      )}
    </label>
  );
};

export default UploadButton;















// import React, { useState } from 'react';
// import { LuUpload } from 'react-icons/lu';
// import './UploadButton.css';
// import InfoAlert from '../Alerts/InfoAlert';

// const UploadButton = ({ children, className, onFileSelect }) => {
//   const [showFileFormatAlert, setShowFileFormatAlert] = useState(false);

//   const handleFileSelect = (e) => {
//     const file = e.target.files[0];
//     if (!file) {
//       return;
//     }

//     if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
//       onFileSelect(file);
//       setShowFileFormatAlert(false);
//     } else {
//       console.error(`Unsupported file type: "${file.name}". Only .doc and .docx files are supported.`);
//       setShowFileFormatAlert(true);
//       setTimeout(() => {
//         setShowFileFormatAlert(false);
//       }, 3000);
//     }
//   };

//   return (
//     <label className={`upload-button1 ${className}`}>
//       {children}
//       <input
//         type="file"
//         accept=".doc, .docx"
//         onChange={handleFileSelect}
//         style={{ display: 'none' }}
//         required
//       />
//       <LuUpload className={children ? 'icon-hidden' : 'icon'} />
//       {showFileFormatAlert && <InfoAlert message="File format is unsupported. Please upload .doc or .docx format." />}
//     </label>
//   );
// };

// export default UploadButton;
// import React, { useState , useEffect } from 'react';
// import { LuUpload } from 'react-icons/lu';
// import './UploadButton.css';
// import '../Alerts/InfoAlert.css'
// import InfoAlert from '../Alerts/InfoAlert';

// const UploadButton = ({ children, className, onFileSelect, index, subcategory }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [showFileFormatAlert,setshowFileFormatAlert] =useState(false)
//   const [previousFileName, setPreviousFileName] = useState('');

//   const handleFileSelect = (file, subcategory) => {

//     useEffect(() => {
//       // Reset previousFileName when component unmounts or index changes
//       return () => {
//         setPreviousFileName('');
//       };
//     }, [index]);
//     if(!file){
//       return;
//     }
//     if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
//       setSelectedFile(file);
//       onFileSelect(file, subcategory, index);
//     } else {
//       console.error(
//         `Unsupported file type: "${file.name}". Only .doc and .docx files are supported.`
//       );
//       setshowFileFormatAlert(true)
//       setTimeout(() => {
//         setshowFileFormatAlert(false)
//       }, 3000);
//       // alert('Invalid file format. Only .doc and .docx files are supported.');
//     }
//   };

//   return (
//     <label className={`upload-button1 ${className}`}>
//       {children}
//       <input
//         type="file"
//         accept=".doc, .docx"
//         onChange={(e) => handleFileSelect(e.target.files[0], subcategory)}
//         style={{ display: 'none' }}
//         required
//       />
//       <LuUpload className={selectedFile ? 'icon-hidden' : 'icon'} />
//       {showFileFormatAlert && <InfoAlert message="File format is unsupported. Please upload .doc or .docx format."/>}
//     </label>

//   );
// };

// export default UploadButton;
