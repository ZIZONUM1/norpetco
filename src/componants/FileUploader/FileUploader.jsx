import React, { useState } from "react";
import { authAPI, nationalIDAPI, statisticsAPI } from "../../configs/apis";
import { toast } from "react-toastify";
import { systemRoles } from "../../utils/systemRoles";

const FileUploader = ({ formType }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(systemRoles.EMPLOYEE);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('file not uploaded')
      return;
    }

    setLoading(true);


    const formData = new FormData();
    formData.append("file", file);
    if(formType === "nationalID") formData.append("role" , role);
    try {
      let data;

      if(formType === "nationalID"){
        data = await nationalIDAPI.addNationalIDs(formData);
      }else{
        data = await statisticsAPI.addStatistics(formData);
      }
      console.log(data);

      toast.success(data.message);
    } catch (err) {
      toast.error(err?.response?.data?.message || "faild to add users")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form encType="multipart/form-data" className="flex flex-col items-center justify-center space-y-4 p-6 bg-white shadow-md rounded-lg w-full max-w-sm mx-auto">
        <h2 className="text-lg font-semibold text-gray-700">Upload Excel File</h2>
        {formType === "nationalID" && <div className="w-full">
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-2 rounded-md border border-gray-300 focus:outline-none"
          >
            <option value={systemRoles.ADMIN}>أدمن</option>
            <option value={systemRoles.EMPLOYEE}>موظف</option>
          </select>
        </div>}
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        <button
          type="button"
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition ${loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Uploading..." : "Upload Excel"}
        </button>

        {file && (
          <p className="text-sm text-gray-600">
            Selected: <span className="font-medium">{file.name}</span>
          </p>
        )}

      </form>
    </div>
  );
};

export default FileUploader;
