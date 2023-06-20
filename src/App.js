  import React, { useState, useEffect } from "react";
  import { data } from "./components/Data";
  import { Header } from "./components/Header";
  import { AudioPlayer } from "./components/AudioPlayer";
  import { DocumentViewer } from "./components/DocumentViewer";
  import { VideoPlayer } from "./components/VideoPlayer";
  import { ImageViewer } from "./components/ImageViewer";
  import { Lock } from './components/Lock';
  import "./static/lock.css";
  import { Pie, Bar } from "react-chartjs-2";
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend,
  } from "chart.js";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  export default function App() {
    const [myFiles, setMyFiles] = useState([
      { password: "", ...data },
      { Locked: false, ...data }
    ]);  
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePath, setFilePath] = useState("/file-server/");
    const [showChartModal, setShowChartModal] = useState(false);
    const [showLock, setshowLock] = useState(false) 
    const [hoveredFile, setHoveredFile] = useState(null);
    const [isLocked, setIsLocked] = useState(null)


    useEffect(() => {
      setMyFiles(data);
    }, []);
    var barChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Files Breakdown",
        },
      },
    };
    const handleDeleteFile = (fileId) => {
      const updatedFiles = myFiles.filter((file) => file.id !== fileId);
      setMyFiles(updatedFiles);
      setSelectedFile(null);
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const fileType = reader.result.split("/")[0].split(":")[1];
          const newFile = {
            id: myFiles.length + 1,
            name: file.name,
            path: URL.createObjectURL(file),
            type: fileType,
            password: '',
            Locked: undefined
          };

          setMyFiles((prevFiles) => [...prevFiles, newFile]);
          setSelectedFile(newFile);
        };
        reader.readAsDataURL(file);
      }
    };

    const PassManager = (_File) => {
      setIsLocked(_File)    
      if(_File.Locked === true){
        setshowLock(true);
        showLock && <Lock show={setshowLock} id={isLocked} files={myFiles} selected={setSelectedFile}/>
      }else{
        setSelectedFile(_File)
      }
    }

    return (
      <>
      {showLock && <Lock show={setshowLock} id={isLocked} files={myFiles} selected={setSelectedFile} isLocked={setIsLocked}/>}

        {showChartModal && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>
                <p style={{ fontWeight: "bold" }}>Files Breakdown</p>
                <button
                  style={styles.closeButton}
                  onClick={() => setShowChartModal(false)}
                >
                  close
                </button>
              </div>
              <div style={styles.modalBody}>
                <Pie
                  data={{
                    labels: ["Video", "Audio", "Document", "Image"],
                    datasets: [
                      {
                        label: "Files Breakdown",
                        data: [
                          myFiles.filter((file) => file.type === "video").length,
                          myFiles.filter((file) => file.type === "audio").length,
                          myFiles.filter((file) => file.type === "document")
                            .length,
                          myFiles.filter((file) => file.type === "image").length,
                        ],
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 206, 86, 0.2)",
                          "rgba(75, 192, 192, 0.2)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
                <Bar
                  data={{
                    labels: ["Video", "Audio", "Document", "Image"],
                    datasets: [
                      {
                        label: "Files Breakdown",
                        data: [
                          myFiles.filter((file) => file.type === "video").length,
                          myFiles.filter((file) => file.type === "audio").length,
                          myFiles.filter((file) => file.type === "document")
                            .length,
                          myFiles.filter((file) => file.type === "image").length,
                        ],
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 206, 86, 0.2)",
                          "rgba(75, 192, 192, 0.2)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={barChartOptions}
                />
              </div>
            </div>
          </div>
        )}
        <div className="App">
          <Header />
          <div style={styles.container}>
            <div style={{ padding: 10, paddingBottom: 0 }}>
              <p style={{ fontWeight: "Bold" }}>My Files</p>
              <p>
                {selectedFile ? "/file-server/" + selectedFile.name : filePath}
              </p>
            </div>
            <div style={styles.controlTools}>
              <button
                style={styles.controlButton}
                onClick={() => {
                  if (selectedFile) {
                    const newFiles = myFiles.map((file) => {
                      if (file.id === selectedFile.id) {
                        return {
                          ...file,
                          name: prompt("Enter new name"),
                        };
                      }
                      return file;
                    });
                    setMyFiles(newFiles);
                    setSelectedFile(null);
                  }
                }}
              >
                Rename
              </button>
              <button
                style={styles.controlButton}
                onClick={() => {
                  setShowChartModal(true);
                }}
              >
                Files Breakdown
              </button>
              <button
                style={styles.controlButton}
                onClick={() => {
                  if (selectedFile) {
                    window.open(selectedFile.path, "_blank");
                  }
                }}
              >
                Download
              </button>
              <button
                style={styles.controlButton}
                onClick={() => {
                  if (selectedFile) {
                    handleDeleteFile(selectedFile.id);
                    setSelectedFile(null);
                  }
                }}
              >
                Delete
              </button>
              <label htmlFor="file-upload" style={styles.uploadButton}>
                Upload
              </label>
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />

              <button
                style={{ ...styles.controlButton, ...styles.reset }}
                id="reset"
                onClick={() => {
                  window.location.reload();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-clockwise"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                </svg>
              </button>
            </div>

            <div style={styles.fileContainer}>
              <div style={{ width: "100%", padding: 10 }}>
                {myFiles.map((file) => {
                  return (
                    <div
                      style={styles.file}
                      className="files"
                      key={file.id}
                      onMouseEnter={() => setHoveredFile(file.id)}
                      onMouseLeave={() => setHoveredFile(null)}
                      onClick={() => {
                        if (selectedFile && selectedFile.id === file.id) {
                          setSelectedFile(null);
                          return;
                        }        
                        PassManager(file)            
                      }}
                    >
                      <p>{file.name}</p>
                      <button
                        style={{ ...styles.controlButton }}
                        className={`lock ${hoveredFile === file.id ? "visible" : ""} ${file.Locked === true ? 'locked' : ''}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsLocked(file)
                          setshowLock(true);
                        }}
                      >

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          className={`bi bi-lock${file.locked ? "Fill" : ""}`}
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
              {selectedFile && (
                <div style={styles.fileViewer}>
                  {selectedFile.type === "video" && (
                    <VideoPlayer path={selectedFile.path} />
                  )}
                  {selectedFile.type === "audio" && (
                    <AudioPlayer path={selectedFile.path} />
                  )}
                  {selectedFile.type === "document" && (
                    <DocumentViewer path={selectedFile.path} />
                  )}
                  {selectedFile.type === "image" && (
                    <ImageViewer path={selectedFile.path} />
                  )}
                  <p style={{ fontWeight: "bold", marginTop: 10 }}>
                    {selectedFile.name}
                  </p>
                  <p>
                    path:{" "}
                    <span style={{ fontStyle: "italic" }}>
                      /file-server/{selectedFile.name}
                    </span>
                  </p>
                  <p>
                    file type:{" "}
                    <span style={{ fontStyle: "italic" }}>
                      {selectedFile.type}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  const styles = {
    uploadButton: {
      padding: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      backgroundColor: "#eee",
      color: "#000",
      position: "relative",
      overflow: "hidden",
      display: "inline-block",
      verticalAlign: "middle",
      textAlign: "center",
    },

    reset: {
      position: "absolute",
      right: 10,
      top: "125px",
    },
    container: {
      backgroundColor: "#fff",
      color: "#000",
    },
    fileContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexDirection: "row",
    },
    file: {
      backgroundColor: "#eee",
      padding: "10px",
      marginBottom: "10px",
      cursor: "pointer",
      width: "100%",
    },
    fileViewer: {
      padding: "10px",
      margin: "10px",
      width: "30vw",
      height: "100vh",
      cursor: "pointer",
      borderLeft: "1px solid #000",
    },
    controlTools: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      flexDirection: "row",
      padding: "10px",
    },
    controlButton: {
      padding: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
    },

    // modal
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
    modalContent: {
      backgroundColor: "#fff",
      padding: "20px",
      height: "50vh",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "column",
    },
    modalClose: {
      position: "absolute",
      top: 0,
      right: 0,
      padding: "10px",
      cursor: "pointer",
    },
    modalBody: {
      width: "100%",
      height: "90%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      padding: "10px",
    },
    modalHeader: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    closeButton: {
      padding: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      backgroundColor: "#eee",
    },
  };
