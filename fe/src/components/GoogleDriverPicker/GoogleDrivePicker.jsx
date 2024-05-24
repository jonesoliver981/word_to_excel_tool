
import React, {useState, useEffect } from 'react';
import useDrivePicker from 'react-google-drive-picker';
import '../GoogleDriverPicker/GoogleDrivePicker.css';
import WarmingAlert from "../Alerts/WarmingAlert";
import { Link } from 'react-router-dom';

function GoogleDrivePicker({ onFileSelect ,subcategory,category}) {
  const [openPicker] = useDrivePicker();
  const [showWarning,setShowWarning]=useState(false);

  useEffect(() => {
    function initializeGapi() {
      window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
          scope: 'https://www.googleapis.com/auth/drive.file',
        }).then(() => {
          console.log('GAPI client initialized');
        }).catch(error => {
          console.error('Error initializing GAPI client:', error);
        });
      });
    }

    if (window.gapi) {
      initializeGapi();
    } else {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = initializeGapi;
      document.body.appendChild(script);
    }
  }, []);

  const handleOpenPicker = () => {
    openPicker({
      clientId: process.env.REACT_APP_CLIENT_ID,
      developerKey: process.env.REACT_APP_DEVELOPER_KEY,
      scope: ['https://www.googleapis.com/auth/drive.file'],
      onAuthenticate: () => console.log('authenticated'),
      viewId: 'DOCS',
      
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      appId: process.env.REACT_APP_APP_ID,
      mimeTypes: ['application/vnd.google-apps.document', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      callbackFunction: async (data) => {
        try {
          if (data.action === 'picked') {
            const selectedFile = data.docs[0];
            const accessToken = window.gapi.auth.getToken().access_token;
            
            if (selectedFile.mimeType !=='application/vnd.google-apps.document' && !selectedFile.name.endsWith('.doc') && !selectedFile.name.endsWith('.docx')){
              setShowWarning(true);
                setTimeout(() => {
                  setShowWarning(false)
                }, 4000);
                return;
            }

            if (selectedFile.mimeType === 'application/vnd.google-apps.document') {
              const exportResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${selectedFile.id}/export?mimeType=application/vnd.openxmlformats-officedocument.wordprocessingml.document`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
  
              if (!exportResponse.ok) {
                throw new Error(`Error exporting Google Docs file: ${exportResponse.statusText}`);
              }
  
              const fileBlob = await exportResponse.blob();
              const fileName = `${selectedFile.name}.docx`;
              const convertedFile = new File([fileBlob], fileName, {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              });
  
              onFileSelect(convertedFile);
            } else {
              // Handle other file types
              const response = await fetch(`https://www.googleapis.com/drive/v3/files/${selectedFile.id}?alt=media`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
  
              if (!response.ok) {
                throw new Error(`Error fetching file: ${response.statusText}`);
              }
  
              const fileBlob = await response.blob();
              const fileName = (selectedFile.name.endsWith('.doc') || selectedFile.name.endsWith('.docx')) ? selectedFile.name : `${selectedFile.name}.docx`;
              const convertedFile = new File([fileBlob], fileName, {
                type: selectedFile.mimeType,
              });
  
              onFileSelect(convertedFile);
            }
          } else {
            console.log('User clicked cancel/close button');
          }
        } catch (error) {
          console.error('Error handling file from Google Drive:', error);
        }
      },
    });
    
  };
  
  return (
    <React.Fragment>
      <Link
        to="#"
        accept={['application/vnd.google-apps.document', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
        onClick={handleOpenPicker}
        className={!category || !subcategory ? 'disabled' : ''}
        disabled={!category || !subcategory}
      >
        <img className="google-img" src="/google-drive.svg" alt="google-drive-img" />
      </Link>
      {showWarning && (
      <WarmingAlert message="File format is unsupported. Please upload .doc or .docx format." />
    )}
    </React.Fragment>
  );
}

export default GoogleDrivePicker;








































// import { useState } from 'react';
// import useDrivePicker from 'react-google-drive-picker';
// import '../GoogleDriverPicker/GoogleDrivePicker.css';

// function GoogleDrivePicker({ onFileSelect }) {
//   const [openPicker] = useDrivePicker();
//   // const [data,setdata] = useState([]);
//   const [uploadfile,setUploadFile] =useState([])

//   const handleOpenPicker = () => {
//     openPicker({
//       clientId: process.env.React_APP_ClIENT_Id,
//       developerKey: process.env.React_APP_DEVELOPER_KEY,
//       scope: ['https://www.googleapis.com/auth/drive.file'],
//       onAuthenticate: () => console.log('authenticated'),
//       viewId: "DOCS",
//       showUploadView: true,
//       showUploadFolders: true,
//       supportDrives: true,
//       multiselect: true,
//       appId:process.env.React_APP_APP_ID,
//       mimeTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
//       callbackFunction: (data) => {
//         if (data.action === 'picked') {
//           console.log(data)
//           const selectedFile = data.docs[0]; 
//           console.log('wwcbddhkj',selectedFile)
//           // setUploadFile(selectedFile)
//           onFileSelect(selectedFile); 
//         } else {
//           console.log('User clicked cancel/close button');
//         }
//       },
//     });
//   };
  

//   return (
//     <div>
//       <a href="#"  onClick={handleOpenPicker}>
//         <img className='google-img' src="/google-drive.svg" alt="google-drive-img" />
//       </a>
//     </div>
//   );
// }

// export default GoogleDrivePicker;


// // Your React component code

// // Import necessary modules
// // import React, { useState } from 'react';
// // import { GooglePicker } from 'react-google-picker';

// // // Define your component
// // const FileUploader = () => {
// //   const [uploadedFile, setUploadedFile] = useState(null);

// //   // Handle file selection
// //   const handleFileUpload = (data) => {
// //     if (data.action === 'picked') {
// //       const file = data.docs[0];
// //       // Check if the file format is what you want
// //       if (file.mimeType === 'application/msword' || file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
// //         setUploadedFile(file);
// //       } else {
// //         alert('Please select a .doc or .docx file.');
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <GooglePicker
// //         clientId={'YOUR_GOOGLE_CLIENT_ID'}
// //         developerKey={'YOUR_GOOGLE_DEVELOPER_KEY'}
// //         scope={['https://www.googleapis.com/auth/drive.file']}
// //         onChange={handleFileUpload}
// //         onAuthenticate={() => console.log('authenticated')}
// //         onAuthFailed={() => console.log('failed to authenticate')}
// //         multiselect={false}
// //         navHidden={true}
// //         authImmediate={false}
// //         mimeTypes={['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']} // Specify the allowed MIME types for .doc and .docx files
// //         viewId={'DOCS'}
// //         appId={'YOUR_GOOGLE_APP_ID'}
// //       >
// //         <button>Upload File</button>
// //       </GooglePicker>
// //       {uploadedFile && (
// //         <div>
// //           <p>Uploaded File:</p>
// //           <p>Name: {uploadedFile.name}</p>
// //           <p>Type: {uploadedFile.mimeType}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default FileUploader;


// import useDrivePicker from 'react-google-drive-picker';
// import '../GoogleDriverPicker/GoogleDrivePicker.css';

// function GoogleDrivePicker({ onFileSelect }) {
//   const [openPicker] = useDrivePicker();

//   const handleOpenPicker = () => {
//     openPicker({
//       clientId: process.env.React_APP_ClIENT_Id,
//       developerKey: process.env.React_APP_DEVELOPER_KEY,
//       scope: ['https://www.googleapis.com/auth/drive.file'],
//       onAuthenticate: () => console.log('authenticated'),
//       viewId: "DOCS",
//       showUploadView: true,
//       showUploadFolders: true,
//       supportDrives: true,
//       multiselect: true,
//       token:process.env.REACT_APP_TOKEN,
//       appId: process.env.React_APP_APP_ID,
//       // mimeTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
//       callbackFunction: async (data) => {
//         if (data.action === 'picked') {
//           const selectedFile = data.docs[0];
//           // Fetch the file content
//           const token =process.env.REACT_APP_TOKEN
//           const response = await fetch(`https://www.googleapis.com/drive/v3/files/${selectedFile.id}?alt=media`, {
//             headers: {
//               Authorization: `Bearer ${token}`, // You need to replace 'yourAccessToken' with the access token obtained after user authentication
//             },
//           });
//           console.log(response)
//           const fileContent = await response.blob();
//           console.log(fileContent)
//           const convertedFile = new File([fileContent], `${selectedFile.name}`, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
//           onFileSelect(convertedFile);
//         } else {
//           console.log('User clicked cancel/close button');
//         }
//       },
//     });
//   };

//   return (
//     <div>
//       <a href="#" onClick={handleOpenPicker}>
//         <img className='google-img' src="/google-drive.svg" alt="google-drive-img" />
//       </a>
//     </div>
//   );
// }

// export default GoogleDrivePicker;