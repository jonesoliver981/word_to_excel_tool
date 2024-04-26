// import React, { useState } from 'react';
// import { LuUpload } from 'react-icons/lu';
// import './UploadButton.css';

// const UploadButton = ({ children, className, onFileSelect }) => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
//       setSelectedFile(file);
//       onFileSelect(file);
//     } else {
//       console.error(
//         `Unsupported file type: "${file.name}". Only .doc and .docx files are supported.`
//       );
//       alert('Invalid file format. Only .doc and .docx files are supported.');
//     }
//   };

//   return (
//     <label className={`upload-button1 ${className}`}>
//       {selectedFile ? (
//         <span className="file-name">{selectedFile.name}</span>
//       ) : (
//         <>
//           {children}
//           <input
//             type="file"
//             onChange={handleFileSelect}
//             style={{ display: 'none' }}
//             required
//           />
//           <LuUpload className="icon" />
//         </>
//       )}
//     </label>
//   );
// };

// export default UploadButton;
import React, { useState } from 'react';
import { LuUpload } from 'react-icons/lu';
import './UploadButton.css';
import '../Alerts/InfoAlert.css'
import InfoAlert from '../Alerts/InfoAlert';

const UploadButton = ({ children, className, onFileSelect, index, subcategory }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFileFormatAlert,setshowFileFormatAlert] =useState(false)

  const handleFileSelect = (file, subcategory) => {
    if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
      setSelectedFile(file);
      onFileSelect(file, subcategory, index);
    } else {
      console.error(
        `Unsupported file type: "${file.name}". Only .doc and .docx files are supported.`
      );
      setshowFileFormatAlert(true)
      setTimeout(() => {
        setshowFileFormatAlert(false)
      }, 3000);
      // alert('Invalid file format. Only .doc and .docx files are supported.');
    }
  };

  return (
    <label className={`upload-button1 ${className}`}>
      {children}
      <input
        type="file"
        accept=".doc, .docx"
        onChange={(e) => handleFileSelect(e.target.files[0], subcategory)}
        style={{ display: 'none' }}
        required
      />
      <LuUpload className={selectedFile ? 'icon-hidden' : 'icon'} />
      {showFileFormatAlert && <InfoAlert message="File format is unsupported. Please upload .doc or .docx format."/>}
    </label>
    
  );
};

export default UploadButton;
