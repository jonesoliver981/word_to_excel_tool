import React, { useState, useEffect } from "react";
import "./FileProcessPage.css";
import UploadButton from "../Button/UploadButton";
import SubmitButton from "../Button/SubmitButton";
import DeleteButton from "../Button/DeleteButton";
import axios from "axios";
import AddButton from "../Button/AddButton";
import { ColorRing } from "react-loader-spinner";
import SuccessAlert from "../Alerts/SuccessAlert";
import ErrorAlert from "../Alerts/ErrorAlert";
import InfoAlert from "../Alerts/InfoAlert";
import WarmingAlert from "../Alerts/WarmingAlert";
import ModalAlert from "../Alerts/ModalAlert";
import GoogleDrivePicker from "../GoogleDriverPicker/GoogleDrivePicker";
import { Link, NavLink } from "react-router-dom";
import Header from "../header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPlus } from "@fortawesome/free-solid-svg-icons";



const FileProcessPage = () => {
  const [Files, setFiles] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showCateryErrorAlert, setShowCateryErrorAlert] = useState(false);
  const [showSubCateryErrorAlert, setShowSubCateryErrorAlert] = useState(false);
  const [showAddSubAlert, setShowAddSubAlert] = useState(false);
  const [showFileAlert, setshowFileAlert] = useState(false);
  const [showConevertAlert, setShowConevertAlert] = useState(false);
  const [showFileAlready, setshowFileAlready] = useState(false);
  const [showFileErrorAlert, setShowFileErrorAlert] = useState(false);
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState([""]);
  const [Loading, setLoading] = useState(false);
  const [isCategorySelected, setIsCategorySelected] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [initialCategory, setInitialCategory] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectCategoryOption, setselectCategoryOption] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isGoogleFile, setIsGoogleFile] = useState(false)
  const [googleFiles, setGoogleFiles] = useState([]);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const bodyEL = document.getElementsByTagName('body')[0]

  useEffect(() => {

    const DataApi = `${process.env.React_APP_DATA_API}`
    console.log(DataApi)
    axios
      .get(DataApi)
      .then((response) => {
        setselectCategoryOption(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);


  useEffect(() => {
    if (category && category !== initialCategory && Files.length > 0) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [category, initialCategory]);


  const handbuttonclick = (resetState) => {
    setShowModal(resetState);
    if (resetState) {
      setCategory(newCategory)
      setSubcategories([""]);
      setInitialCategory("");
      setFiles([]);
    }
  };


  const handleCategoryChange = (event) => {

    if (!initialCategory) {
      setInitialCategory(event.target.value);
    }
    if (Files.length > 0 && subcategories.some((subcategory) => subcategory !== '')) {
      setShowModal(true);
      setNewCategory(event.target.value)
      console.log('checking', Files)

    } else {
      setCategory(event.target.value)
      setIsCategorySelected(false);
    }
  };


  const handleFileSelect = (file, subcategory, index) => {
    const updatedFiles = [...Files];
    updatedFiles[index] = { file, subcategory };
    console.log('Updated Files:', updatedFiles);
    setFiles(updatedFiles);
    return
  };

  const handleGoogleDriveFile = (file, subcategory, index) => {

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 1) {
      
      const updatedFiles = [...Files];
      updatedFiles[index] = null;
      setFiles(updatedFiles);
      setShowWarningAlert(true);
      setTimeout(() => {
        setShowWarningAlert(false);
      }, 5000);
    }
  
    if (index > 0 && Files.some((item) => item && item.file && item.file.name === file.name)) {
      // Create a copy of Files array
      const updatedFiles = [...Files];

      // Set only the specific index to null
      updatedFiles[index] = null;

      // Update state with modified Files array
      setFiles(updatedFiles);

      // Show file already exists message
      setshowFileAlready(true);
      setTimeout(() => {
        setshowFileAlready(false);
      }, 4000);
    } else {
      // Handle file selection and update state
      handleFileSelect(file, subcategory, index);
      setGoogleFiles(file);
    }
  };


  const handleSubmit = () => {
    console.log(Files)
    setLoading(true);
    
    const formData = new FormData();
    if (!category) {
      setShowCateryErrorAlert(true);
      setTimeout(() => {
        setShowCateryErrorAlert(false);
      }, 5000);
      setLoading(false);
      return;
    }

    if (subcategories.some((subcategory) => subcategory === "")) {
      setShowSubCateryErrorAlert(true);
      setTimeout(() => {
        setShowSubCateryErrorAlert(false);
      }, 5000);
      setLoading(false);
      return;
    }

    if (Files && Files.filter((file) => file).length > 0) {

      Files.forEach((file, index) => {
        if (file) {
          formData.append(`file${index + 1}`, file.file);
          formData.append(`file${index + 1}_subcategory`, file.subcategory);
        }
      });
    } else {
      setshowFileAlert(true);
      setTimeout(() => {
        setshowFileAlert(false);
      }, 5000);
      setLoading(false);
      //bodyEL.classList.add('blur-background ');
      return;
    }
    const apiUrl = process.env.REACT_APP_EXCEL_DOWNLOAD_POST_API;
    console.log(apiUrl);

    axios.post(apiUrl, formData, {
      responseType: 'blob'
    }).then((response) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(response);
        }, 5000);
      });
    })
      .then((response) => {
        const mimeType = category.endsWith(".doc")
          ? "application/msword"
          : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        const file = new Blob([response.data], { type: mimeType });
        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > 5) {
          setShowConevertAlert(true);
          setTimeout(() => {
            setShowConevertAlert(false);
          }, 3000);
          return;
        }
        const fileURL = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = fileURL;
        const NewDate = new Date();
        // const NewDate = new Date();
        const month = NewDate.getMonth() + 1;
        const day = NewDate.getDate();
        const year = NewDate.getFullYear();
        const hours = NewDate.getHours();
        const minutes = NewDate.getMinutes();
        const formattedMonth = month < 10 ? `0${month}` : month;
        console.log(formattedMonth);
        const formattedDay = day < 10 ? `0${day}` : day;
        console.log(formattedDay);
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        console.log(formattedHours);
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        console.log(formattedMinutes);
        const formattedDate = `${formattedDay}_${formattedMonth}_${year}_${formattedHours}`;
        console.log(formattedDate);
        const filename = `${formattedDay}_${formattedMonth}_${year}_${formattedHours}${String.fromCharCode(0xA789)}${formattedMinutes}.xlsx`;
        console.log(filename)
        a.download = `${category}_${filename}`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("API error:", error);
        setShowFileErrorAlert(true);
        setTimeout(() => {
          setShowFileErrorAlert(false);
        }, 5000);
      })
      .finally(() => {
        setLoading(false);
      });
  };



  const handleSubcategoryChange = (index, event) => {
    const newSubcategories = [...subcategories];
    newSubcategories[index] = event.target.value;
    console.log(newSubcategories[index]);
    setSubcategories(newSubcategories);
  };



  const addSubcategory = () => {
    if (Files.length > 0) {
      setSubcategories([...subcategories, ""]);
    } else {
      setShowAddSubAlert(true);
      setTimeout(() => {
        setShowAddSubAlert(false);
      }, 5000);
    }
  };


  const handleResetFile = () => {
    setSelectedFile(null);
  };


  const handleDeleteClick = (index) => {
    const subcatToDelete = subcategories[index];
    const filesInSubcat = Files.filter(
      (file) => file && file.subcategory === subcatToDelete
    );

    if (filesInSubcat.length > 0) {
      setShowDeleteModal(true);
      setDeleteIndex(index);
    } else {
      deleteSubcategory(index);
    }
  };


  const handleDeleteConfirm = (confirmed) => {
    setShowDeleteModal(false);
    if (confirmed) {
      deleteSubcategory(deleteIndex);
    }
    setDeleteIndex(null);
  };


  const deleteSubcategory = (index) => {
    console.log(index);
    const newSubcategories = [...subcategories];
    newSubcategories.splice(index, 1);
    setSubcategories(newSubcategories);
    const newFile = [...Files];
    newFile.splice(index, 1);
    setFiles(newFile);
  };


  const hanldeShowCategory = () => {
    setShowCategoryModal(true)
  }
  const hanldeShowSubCategory = () => {
    setShowSubCategoryModal(true)
  }

  return (
    <React.Fragment>
      
          <div className="category-group category-group-main">
          <div className="category-label-group">
            <label className="category-label">Category </label>
            <NavLink to="/add-category" className="category-add-button" title="Create Category" > <FontAwesomeIcon icon={faCirclePlus} /></NavLink>
            </div>
            <select
              className="select-size"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {selectCategoryOption.map((option, index) => (
                <option key={index} value={option.category}>
                  {option.category}
                </option>
              ))}
            </select>
          </div>
          {subcategories.map((subcategory, index) => (
            <div className="category-group" key={index}>
              <div className="category-label-group">
              <label className="category-label">Sub Category</label>
              <NavLink to="/add-sub-category"  className="category-add-button" title="Create Sub Category" > <FontAwesomeIcon icon={faCirclePlus} /></NavLink>
              </div>
              <select
                className="select-size sub-category-container  sub-cat"
                value={subcategory}
                onChange={(e) => handleSubcategoryChange(index, e)}
                disabled={isCategorySelected}
              >
                <option className="select" value="">
                  Select Subcategory
                </option>
                {selectCategoryOption
                  .filter((option) => option.category === category)
                  .map((option) => {
                    return Object.keys(option)
                      .filter((key) => key !== "category" && key !== "id" && key.startsWith('sub category'))
                      
                      .filter(
                        (key) =>
                          !subcategories.slice(0, index).includes(option[key])
                      )
                      .map((key, subIndex) => (
                        <option
                          className="select-option"
                          key={subIndex}
                          value={option[key]}
                        >
                          {option[key]}
                        </option>
                      ));
                  })}
              </select>

              <UploadButton
                className="upload-button"
                onFileSelect={(file) =>
                  handleFileSelect(file, subcategory, index)
                }
                category={category}
                subcategory={subcategory}
                resetSelectedFile={handleResetFile}
                Files={Files}
                index={index}
                setFiles={setFiles}
                googleFile={googleFiles[index]}
              ></UploadButton>
              <div className="action-buttons">
              <GoogleDrivePicker category={category} subcategory={subcategory} className="drive-picker" onFileSelect={(file) => handleGoogleDriveFile(file, subcategory, index)} />


              
              <AddButton className="add-button1" onClick={addSubcategory} />
              {subcategories.length > 1 && (
                <DeleteButton onClick={(file) => handleDeleteClick(index)}>
                  Delete
                </DeleteButton>
              )}
              </div>
            </div>
          ))}
          <div className="submit-container">
            <SubmitButton className="submit-button" onClick={handleSubmit}>
              Convert
            </SubmitButton>
            </div>
            {Loading && (
              <div className="loader-overlay">
                <ColorRing
                  className="loader"
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                />
              </div>
            )}
            {/* <div className="menu-button">
            <HelpDropdown />
            </div> */}
            {isGoogleFile && (
              <WarmingAlert message="File was already uploaded in another way!!!" />
            )

            }
            {showSuccessAlert && (
              <SuccessAlert message="Files have been converted successfully!" />
            )}
            {showCateryErrorAlert && (
              <InfoAlert message="Please Select Category" />
            )}
            {showSubCateryErrorAlert && (
              <InfoAlert message="Please Select Sub Category" />
            )}
            {showFileAlert && (
              <InfoAlert message="No file uploaded to convert." />
            )}
            {showAddSubAlert && (
              <InfoAlert message="Please select File before adding another subcategory." />
            )}
            {showConevertAlert && (
              <ErrorAlert message="Files size exceeds the limit of 5MB. It cannot be converted." />
            )}
            {showFileAlready && (
              <WarmingAlert message="The same file has already been uploaded" />
            )}
            {showFileErrorAlert && (
              <ErrorAlert message="Something is wrong with uploaded files. Please check your document content." />
            )}
            {showWarningAlert && (
              <WarmingAlert message="File size exceeds the limit of 1MB." />
            )}
            {showModal && (
              <ModalAlert
                onSubmit={(e) => handbuttonclick(true)}
                onCancel={() => handbuttonclick(false)}
                onClose={() => handbuttonclick(false)}
              >
                Are you sure you want to change the category? If yes, your
                existing data will be lost.
              </ModalAlert>
            )}
            {showDeleteModal && (
              <ModalAlert
                onSubmit={() => handleDeleteConfirm(true)}
                onCancel={() => handleDeleteConfirm(false)}
                onClose={() => handleDeleteConfirm(false)}
              >
                Are you sure that you want to delete this document?
              </ModalAlert>
            )}
            {showFileAlready && (
              <WarmingAlert message="The same file has already been uploaded" />
            )}
           
      
       
     
    </React.Fragment>
  );
};

export default FileProcessPage;


























// import React, { useState } from "react";
// import './FileProcessPage.css'
// import UploadButton from "../Button/UploadButton";
// import SubmitButton from "../Button/SubmitButton"
// import DeleteButton from "../Button/DeleteButton";
// import axios from 'axios'
// import AddButton from "../Button/AddButton";
// import { ColorRing } from 'react-loader-spinner'
// import SuccessAlert from '../Alerts/SuccessAlert'
// import ErrorAlert from '../Alerts/ErrorAlert';
// import InfoAlert from "../Alerts/InfoAlert";
// import WarmingAlert from "../Alerts/WarmingAlert";

// const FileProcessPage = () => {
//     const [Files, setFiles] = useState([]);
//     const [showSuccessAlert, setShowSuccessAlert] = useState(false);
//     const [showCateryErrorAlert, setShowCateryErrorAlert] = useState(false);
//     const [showSubCateryErrorAlert, setShowSubCateryErrorAlert] = useState(false);
//     const [showAddSubAlert,setShowAddSubAlert] =useState(false)
//     const [showFileAlert,setshowFileAlert] = useState(false)
//     const [showWarningAlert,setShowWarningAlert] =useState(false)
//     const [showConevertAlert,setShowConevertAlert] =useState(false)
//     const [showFileAlready,setshowFileAlready] =useState(false)
//     // const [checkFileName,setCheckFilename]=useState(false)

//     const [category, setCategory] = useState('');
//     const [subcategories, setSubcategories] = useState(['']);
//     const [Loading, setLoading]=useState(false);

//     const handleFileSelect = (file, subcategory, index) => {
//         if (!file) {
//             console.error("Invalid file");
//             return;
//         }
//         console.log(file.name)
//         const fileSizeInMB = file.size / (1024 * 1024);
//         if (fileSizeInMB > 2) {
//             setShowWarningAlert(true);
//             setTimeout(() => {
//                 setShowWarningAlert(false);
//             }, 3000);
//             return;
//         }

//         // Check for duplicates only if it's not the first file
//         if (index > 0 && Files.some(item => item && item.file && item.file.name === file.name)) {
//             setshowFileAlready(true);
//             setTimeout(() => {
//                 setshowFileAlready(false);
//             }, 3000);
//             return;
//         }

//         console.log('filessss', file);
//         const updatedFiles = [...Files];
//         updatedFiles[index] = { file, subcategory };
//         console.log('updated--file---->',updatedFiles);
//         // setFiles(updatedFiles);
//         if (!Files.some(item => item && item.file.name === file.name) || index === 0) {
//             setFiles(updatedFiles);
//         }

//     };

//     const handleSubmit = () => {
//         setLoading(true);

//         const formData = new FormData();
//         if (!category) {
//             setShowCateryErrorAlert(true)
//             setTimeout(() => {
//                 setShowCateryErrorAlert(false)
//             }, 3000);
//             setLoading(false);
//             return;
//         }
//         if (subcategories.some(subcategory => subcategory === '')) {
//             setShowSubCateryErrorAlert(true)
//             setTimeout(() => {
//                 setShowSubCateryErrorAlert(false)
//             }, 3000);
//             setLoading(false);
//             return;
//         }
//         if (Files.filter(file => file).length > 0) {
//             Files.forEach((file, index) => {
//                 if (file) {
//                     formData.append(`file${index + 1}`, file.file);
//                     formData.append(`file${index + 1}_subcategory`, file.subcategory);
//                 }
//             });
//         } else {
//             setshowFileAlert(true)
//             setTimeout(() => {
//                 setshowFileAlert(false)
//             }, 3000);
//             setLoading(false);
//             return;
//         }
//         axios.post('http://127.0.0.1:8000/api/combine-excel/', formData, {
//             responseType: 'blob'
//         })
//             .then(response => {
//                 return new Promise(resolve => {
//                     setTimeout(() => {
//                         resolve(response);
//                     }, 3000);
//                 });
//             })
//             .then(response => {
//                 const mimeType = category.endsWith('.doc') ? 'application/msword' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
//                 const file = new Blob([response.data], { type: mimeType });
//                 const fileSizeInMB = file.size / (1024 * 1024);
//                 if (fileSizeInMB > 5) {
//                     setShowConevertAlert(true)
//                     setTimeout(() => {
//                         setShowConevertAlert(false)
//                     }, 5000);
//                     return;
//                 }
//                 const fileURL = URL.createObjectURL(file);
//                 const a = document.createElement('a');
//                 a.href = fileURL;
//                 a.download = `${category}.xlsx`;
//                 document.body.appendChild(a);
//                 a.click();
//                 document.body.removeChild(a);
//                 setShowSuccessAlert(true)
//                 setTimeout(() => {
//                     setShowSuccessAlert(false)
//                 }, 3000);
//             })
//             .catch(error => {
//                 console.error('API error:', error);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     const handleCategoryChange = (event) => {
//         setCategory(event.target.value);
//     };

//     const handleSubcategoryChange = (index, event) => {
//         const newSubcategories = [...subcategories];
//         newSubcategories[index] = event.target.value;

//         // Dynamically update the subcategories
//         if (index > 0) {
//             for (let i = index + 1; i < subcategories.length; i++) {
//                 if (newSubcategories[i] === event.target.value) {
//                     newSubcategories[i] = '';
//                 }
//             }
//         }
//         setSubcategories(newSubcategories);
//     };

//     const addSubcategory = () => {
//         if (Files.length > 0 || subcategories.every(subcategory => subcategory !== '')) {
//             setSubcategories([...subcategories, '']);
//         } else if (Files.length === 0) {
//             setShowAddSubAlert(true)
//             setTimeout(() => {
//                 setShowAddSubAlert(false)
//             }, 3000);
//         }
//     };

//     const deleteSubcategory = (index) => {
//         const newSubcategories = [...subcategories];
//         newSubcategories.splice(index, 1);
//         setSubcategories(newSubcategories);
//     };

//     const categories = ['Category1', 'Category2', 'Category3', 'Category4', 'Category5'];
//     const subcategories1 = ['Culture& Heritage', 'Modern Tourist Attractions', 'Museums'];
//     const generateOptions = (list, exclude = []) => {
//         return list
//             .filter(option => !exclude.includes(option))
//             .map((category, index) => ({ value: category, label: category, index: index }));
//     };
//     return (
//         //className={Loading ? "blur-background" : ""}
//         <div className={Loading ? "blur-background" : ""}>
//             <img src="/Picture_travel.png" alt="travel_bot" />
//             <h1 className="headers-content">Convert WORD to EXCEL </h1>
//             <div className="category1">
//                 <div className="cat-lab">
//                     <label>Category </label>
//                     <select className="select-size" value={category} onChange={handleCategoryChange}>
//                         <option value="">Select Category</option>
//                         {generateOptions(categories).map(option => (
//                             <option key={option.index} value={option.value}>{option.label}</option>
//                         ))}
//                     </select>
//                 </div>
//                 {subcategories.map((subcategory, index) => (
//                     <div className="cat-lab" key={index}>
//                         <label className="label-cat">Sub Category</label>
//                         <select className="select-size sub-category-container  sub-cat" value={subcategory} onChange={(e) => handleSubcategoryChange(index, e)}>
//                             <option className="select" value="">Select Subcategory</option>
//                             {generateOptions(subcategories1, subcategories.slice(0, index)).map(option => (
//                                 <option className="select-option" key={option.index} value={option.value}>{option.label}</option>
//                             ))}
//                         </select>

//                         <UploadButton
//                             className="upload-button"
//                             onFileSelect={(file) => handleFileSelect(file, subcategory, index)}
//                         >{Files[index] ? (
//                                 <b className="after-file-uploaded">{Files[index].file.name}</b>
//                             ) : (
//                                 <b>Choose Word file <span>or Drop Word file</span></b>
//                             )}
//                         </UploadButton>

//                         <AddButton className='add-button1' onClick={addSubcategory} />
//                         <DeleteButton onClick={() => deleteSubcategory(index)}>Delete</DeleteButton>
//                     </div>
//                 ))}
//                 <div className="submit-container">
//                     <SubmitButton className="submit-button" onClick={handleSubmit}>
//                         Convert
//                     </SubmitButton>
//                     {Loading && (
//                         <div className="loader-overlay">
//                             <ColorRing
//                                 className="loader"
//                                 visible={true}
//                                 height="80"
//                                 width="80"
//                                 ariaLabel="color-ring-loading"
//                                 wrapperStyle={{}}
//                                 wrapperClass="color-ring-wrapper"
//                                 colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
//                                 />
//                         </div>
//                     )}
//                     {showSuccessAlert && <SuccessAlert  message="Files have been converted successfully!" />}
//                     {showCateryErrorAlert && <InfoAlert message="Please Select Category" />}
//                     {showSubCateryErrorAlert && <InfoAlert message="Please Select Sub Category"/>}
//                     {showFileAlert && <InfoAlert message="No file uploaded to convert."/>}
//                     {showAddSubAlert && <InfoAlert message="Please select subcategory before adding another subcategory."/>}
//                     {showWarningAlert && <WarmingAlert message="File size exceeds the limit of 2MB."/>}
//                     {showConevertAlert && <ErrorAlert message="Files size exceeds the limit of 5MB. It cannot be converted."/>}
//                     {showFileAlready && <InfoAlert message='The same file has already been uploaded'/>}

//                 </div>
//             </div>
//         </div>
//     )

//    }

// export default FileProcessPage

// const addSubcategory = () => {
//     console.log(Files)
//     if (Files.length > 0 || subcategories.every(subcategory => subcategory !== '')) {
//         console.log('fileesss',Files)
//         setSubcategories([...subcategories, '']);
//         console.log(setSubcategories)
//     }
// else {
//     setShowAddSubAlert(true)
//     setTimeout(() => {
//         setShowAddSubAlert(false)
//     }, 3000);
// }
// };

// useEffect(() => {
//     if (category) {
//         // Reset subcategories when the category changes
//         setSubcategories(['']);
//         // Clear uploaded files when category changes
//         setFiles([]);
//         // Enable category select option
//         setIsCategorySelected(false);
//     } else {
//         setIsCategorySelected(true);
//     }
// }, [category]);

// return (
//     <div className={Loading ? "blur-background" : ""}>
//         <img src="/Picture_travel.png" alt="travel_bot" />
//         <h1 className="headers-content">Convert WORD to EXCEL </h1>
//         <div className="category1">
//             <div className="cat-lab">
//                 <label>Category </label>
//                 <select className="select-size" value={category} onChange={handleCategoryChange}>
//                     <option value="">Select Category</option>
//                     {generateOptions(categories).map(option => (
//                         <option key={option.index} value={option.value}>{option.label}</option>
//                     ))}

//                 </select>
//             </div>
//             {subcategories.map((subcategory, index) => (
//                 <div className="cat-lab" key={index}>
//                     <label className="label-cat">Sub Category {index + 1}</label>
//                     <select className="select-size sub-category-container  sub-cat" value={subcategory} onChange={(e) => handleSubcategoryChange(index, e)}>
//                         <option className="select" value="">Select Subcategory</option>
//                         {generateOptions(subcategories1, subcategories.slice(0, index)).map(option => (
//                             <option className="select-option" key={option.index} value={option.value}>{option.label}</option>
//                         ))}
//                     </select>

//                     <UploadButton
//                         className="upload-button"
//                         onFileSelect={(file) => handleFileSelect(file, subcategory, index)}
//                     >
//                         {Files[index] ? (
//                             <b className="after-file-uploaded">{Files[index].file.name}</b>
//                         ) : (
//                             <b>Choose Word file <span>or Drop Word file</span></b>
//                         )}
//                     </UploadButton>

//                     <AddButton className='add-button1' onClick={addSubcategory} />
//                     <DeleteButton onClick={() => deleteSubcategory(index)}>Delete</DeleteButton>
//                 </div>
//             ))}
//             <div className="submit-container">
//                 <SubmitButton className="submit-button" onClick={handleSubmit}>
//                     Convert
//                 </SubmitButton>
//                 {Loading && (
//                 <div className="loader-overlay">
//                     <Loader className="loader" width="5rem" height="5rem" />
//                 </div>
//             )}

//             </div>
//         </div>
//     </div>

// )

// const handleSubmit = () => {
//     const formData = new FormData();
//     if (!category) {
//         alert('Please Select Category');
//         return;
//     }
//     if (subcategories.some(subcategory => subcategory === '')) {
//         alert("Please Select Sub Category");
//         return;
//     }
//     console.log('file---checking', Files);
//     if (Files.filter(file => file).length > 0) {
//         console.log(Files);
//         Files.forEach((file, index) => {
//             console.log(file.file)
//             if (file) {
//                 formData.append(`file${index + 1}`, file.file);
//                 formData.append(`file${index + 1}_subcategory`, file.subcategory);
//             }
//         });
//     } else {
//         alert('No file uploaded to convert.');
//         return;
//     }
//     axios.post('http://127.0.0.1:8000/api/combine-excel/', formData, {
//         responseType: 'blob' // Set response type to blob to handle binary data
//     })
//         .then(response => {
//             // Create a blob from the response data
//             const mimeType = category.endsWith('.doc') ? 'application/msword' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
//             // Create a blob from the response data with the correct MIME type
//             const file = new Blob([response.data], { type: mimeType });
//             // Create a URL for the blob
//             const fileURL = URL.createObjectURL(file);
//             // Create a temporary anchor element
//             const a = document.createElement('a');
//             a.href = fileURL;
//             // Set the file name
//             a.download = `${category}.xlsx`;
//             // Append the anchor to the body
//             document.body.appendChild(a);
//             // Click the anchor to trigger the download
//             setTimeout(() => {
//                 setLoading(true)
//                 a.click();
//             // Remove the anchor from the body
//                 document.body.removeChild(a);

//             }, 3000);

//         })
//         .catch(error => {
//             console.error('API error:', error);
//         });
// };

// const handleSubmit = () => {
//     setLoading(true);
//     const formData = new FormData();

//     // Check if a category is selected
//     if (!category) {
//         setShowCateryErrorAlert(true);
//         setTimeout(() => {
//             setShowCateryErrorAlert(false);
//         }, 3000);
//         setLoading(false);
//         return;
//     }

//     // Check if all subcategories are selected
//     if (subcategories.some(subcategory => subcategory === '')) {
//         setShowSubCateryErrorAlert(true);
//         setTimeout(() => {
//             setShowSubCateryErrorAlert(false);
//         }, 3000);
//         setLoading(false);
//         return;
//     }

//     // Check if any subcategory has an associated uploaded file
//     if (Files.every((file, index) => file[index] === '')) {
//         console.log(Files);
//         setshowFileAlert(true);
//         setTimeout(() => {
//             setshowFileAlert(false);
//         }, 3000);
//         setLoading(false);
//         return;
//     }

//     // Append uploaded files to formData
//     Files.forEach((file, index) => {
//         if (file) {
//             formData.append(`file${index + 1}`, file.file);
//             formData.append(`file${index + 1}_subcategory`, file.subcategory);
//         }
//     });

//     // Continue with form submission and file processing...
//     axios.post('http://127.0.0.1:8000/api/combine-excel/', formData, {
//         responseType: 'blob'
//     })
//     .then(response => {
//         return new Promise(resolve => {
//             setTimeout(() => {
//                 resolve(response);
//             }, 3000);
//         });
//     })
//     .then(response => {
//         const mimeType = category.endsWith('.doc') ? 'application/msword' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
//         const file = new Blob([response.data], { type: mimeType });
//         const fileSizeInMB = file.size / (1024 * 1024);
//         if (fileSizeInMB > 5) {
//             setShowConevertAlert(true);
//             setTimeout(() => {
//                 setShowConevertAlert(false);
//             }, 5000);
//             return;
//         }
//         const fileURL = URL.createObjectURL(file);
//         const a = document.createElement('a');
//         a.href = fileURL;
//         a.download = `${category}.xlsx`;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         setShowSuccessAlert(true);
//         setTimeout(() => {
//             setShowSuccessAlert(false);
//         }, 3000);
//     })
//     .catch(error => {
//         console.error('API error:', error);
//         setShowFileErrorAlert(true);
//         setTimeout(() => {
//             setShowFileErrorAlert(false);
//         }, 3000);
//     })
//     .finally(() => {
//         setLoading(false);
//     });
// };
