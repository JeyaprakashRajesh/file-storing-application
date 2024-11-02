import { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import axios from "axios";

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:7000/files", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFiles(response.data.files);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="main">
      <div className="header">
        <div className="header-img"></div>
        <span>FILE MANAGER</span>
      </div>
      <div className="content">
        <div className="content-container">
          {loading ? (
            <div className="loading">Loading files...</div>
          ) : files.length > 0 ? (
            <div className="file-container">
              {files.map((file, index) => (
                <div key={index} className="file-item">
                  <a href={`http://localhost:7000${file.url}`} target="_blank" rel="noopener noreferrer" className="file-link">
                    {file.name}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="loading">No files in database</div>
          )}
        </div>
        <div className="content-container">
          <FileUpload setFile={setFiles} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
