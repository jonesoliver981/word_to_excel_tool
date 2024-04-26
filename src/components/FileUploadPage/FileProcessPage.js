import React, { useState } from "react";
import './FileProcessPage.css'
import UploadButton from "../Button/UploadButton";
import SubmitButton from "../Button/SubmitButton"
import DeleteButton from "../Button/DeleteButton";
import axios from 'axios'
import AddButton from "../Button/AddButton";
import { ColorRing } from 'react-loader-spinner'
import SuccessAlert from '../Alerts/SuccessAlert'
import ErrorAlert from '../Alerts/ErrorAlert';
import InfoAlert from "../Alerts/InfoAlert";
import WarmingAlert from "../Alerts/WarmingAlert";

const FileProcessPage = () => {
    const [Files, setFiles] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showCateryErrorAlert, setShowCateryErrorAlert] = useState(false);
    const [showSubCateryErrorAlert, setShowSubCateryErrorAlert] = useState(false);
    const [showAddSubAlert,setShowAddSubAlert] =useState(false)
    const [showFileAlert,setshowFileAlert] = useState(false)
    const [showWarningAlert,setShowWarningAlert] =useState(false)
    const [showConevertAlert,setShowConevertAlert] =useState(false)
    const [showFileAlready,setshowFileAlready] =useState(false)
    // const [checkFileName,setCheckFilename]=useState(false)


    const [category, setCategory] = useState('');
    const [subcategories, setSubcategories] = useState(['']);
    const [Loading, setLoading]=useState(false);

    const handleFileSelect = (file, subcategory, index) => {
        console.log(file.name)
        const fileSizeInMB = file.size / (1024 * 1024); 
        if (fileSizeInMB > 2) {
            setShowWarningAlert(true);
            setTimeout(() => {
                setShowWarningAlert(false);
            }, 3000);
            return;
        }
    
        // Check for duplicates only if it's not the first file
        if (index > 0 && Files.some(item => item && item.file.name === file.name)) {
            setshowFileAlready(true);
            setTimeout(() => {
                setshowFileAlready(false);
            }, 3000);
            return; 
        }
        
        
        console.log('filessss', file);
        const updatedFiles = [...Files];
        updatedFiles[index] = { file, subcategory };
        console.log('updated--file---->',updatedFiles);
        setFiles(updatedFiles);
    };  
    
    
    const handleSubmit = () => {
        setLoading(true); 
    
        const formData = new FormData();
        if (!category) {
            setShowCateryErrorAlert(true)
            setTimeout(() => {
                setShowCateryErrorAlert(false)
            }, 3000);
            setLoading(false); 
            return;
        }
        if (subcategories.some(subcategory => subcategory === '')) {
            setShowSubCateryErrorAlert(true)
            setTimeout(() => {
                setShowSubCateryErrorAlert(false)
            }, 3000);
            setLoading(false); 
            return;
        }
        if (Files.filter(file => file).length > 0) {
            Files.forEach((file, index) => {
                if (file) {
                    formData.append(`file${index + 1}`, file.file);
                    formData.append(`file${index + 1}_subcategory`, file.subcategory);
                }
            });
        } else {
            setshowFileAlert(true)
            setTimeout(() => {
                setshowFileAlert(false)
            }, 3000);
            setLoading(false); 
            return;
        }
        axios.post('http://127.0.0.1:8000/api/combine-excel/', formData, {
            responseType: 'blob' 
        })
            .then(response => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(response);
                    }, 3000);
                });
            })
            .then(response => {
                const mimeType = category.endsWith('.doc') ? 'application/msword' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                const file = new Blob([response.data], { type: mimeType });
                const fileSizeInMB = file.size / (1024 * 1024);
                if (fileSizeInMB > 5) {
                    setShowConevertAlert(true)
                    setTimeout(() => {
                        setShowConevertAlert(false)
                    }, 5000);
                    return; 
                }
                const fileURL = URL.createObjectURL(file);
                const a = document.createElement('a');
                a.href = fileURL;
                a.download = `${category}.xlsx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setShowSuccessAlert(true)
                setTimeout(() => {
                    setShowSuccessAlert(false)
                }, 3000);
            })
            .catch(error => {
                console.error('API error:', error);
            })
            .finally(() => {
                setLoading(false); 
            });
    };
    

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSubcategoryChange = (index, event) => {
        const newSubcategories = [...subcategories];
        newSubcategories[index] = event.target.value;
        
        // Dynamically update the subcategories
        if (index > 0) {
            for (let i = index + 1; i < subcategories.length; i++) {
                if (newSubcategories[i] === event.target.value) {
                    newSubcategories[i] = '';
                }
            }
        }
        setSubcategories(newSubcategories);
    };

    const addSubcategory = () => {
        if (Files.length > 0 || subcategories.every(subcategory => subcategory !== '')) {
            setSubcategories([...subcategories, '']);
        } else if (Files.length === 0) {
            setShowAddSubAlert(true)
            setTimeout(() => {
                setShowAddSubAlert(false)
            }, 3000);
        }
    };

    const deleteSubcategory = (index) => {
        const newSubcategories = [...subcategories];
        newSubcategories.splice(index, 1);
        setSubcategories(newSubcategories);
    };

    const categories = ['Category1', 'Category2', 'Category3', 'Category4', 'Category5'];
    const subcategories1 = ['Culture& Heritage', 'Modern Tourist Attractions', 'Museums'];
    const generateOptions = (list, exclude = []) => {
        return list
            .filter(option => !exclude.includes(option))
            .map((category, index) => ({ value: category, label: category, index: index }));
    };
    return (
        //className={Loading ? "blur-background" : ""}
        <div className={Loading ? "blur-background" : ""}>
            <img src="/Picture_travel.png" alt="travel_bot" />
            <h1 className="headers-content">Convert WORD to EXCEL </h1>
            <div className="category1">
                <div className="cat-lab">
                    <label>Category </label>
                    <select className="select-size" value={category} onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        {generateOptions(categories).map(option => (
                            <option key={option.index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                {subcategories.map((subcategory, index) => (
                    <div className="cat-lab" key={index}>
                        <label className="label-cat">Sub Category</label>
                        <select className="select-size sub-category-container  sub-cat" value={subcategory} onChange={(e) => handleSubcategoryChange(index, e)}>
                            <option className="select" value="">Select Subcategory</option>
                            {generateOptions(subcategories1, subcategories.slice(0, index)).map(option => (
                                <option className="select-option" key={option.index} value={option.value}>{option.label}</option>
                            ))}
                        </select>
    
                        <UploadButton
                            className="upload-button"
                            onFileSelect={(file) => handleFileSelect(file, subcategory, index)}
                        >{Files[index] ? (
                                <b className="after-file-uploaded">{Files[index].file.name}</b>
                            ) : (
                                <b>Choose Word file <span>or Drop Word file</span></b>
                            )}
                        </UploadButton>
    
                        <AddButton className='add-button1' onClick={addSubcategory} />
                        <DeleteButton onClick={() => deleteSubcategory(index)}>Delete</DeleteButton>
                    </div>
                ))}
                <div className="submit-container">
                    <SubmitButton className="submit-button" onClick={handleSubmit}>
                        Convert
                    </SubmitButton>
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
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                />
                        </div>
                    )}
                    {showSuccessAlert && <SuccessAlert  message="Files have been converted successfully!" />}
                    {showCateryErrorAlert && <InfoAlert message="Please Select Category" />}
                    {showSubCateryErrorAlert && <InfoAlert message="Please Select Sub Category"/>}
                    {showFileAlert && <InfoAlert message="No file uploaded to convert."/>}
                    {showAddSubAlert && <InfoAlert message="Please upload a file first before adding another subcategory."/>}
                    {showWarningAlert && <WarmingAlert message="File size exceeds the limit of 2MB."/>}
                    {showConevertAlert && <ErrorAlert message="Files size exceeds the limit of 5MB. It cannot be converted."/>}
                    {showFileAlready && <InfoAlert message='The same file has already been uploaded'/>}

                </div>
            </div>
        </div>
    )
    

   }

export default FileProcessPage








 
















































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