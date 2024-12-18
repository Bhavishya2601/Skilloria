import React, { useState } from 'react';
import axios from 'axios';

interface Module {
  name: string;
  file: string | null;
}

interface Section {
  name: string;
  modules: Module[];
}

const CourseForm: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([
    { name: '', modules: [{ name: '', file: null }] }
  ]);
  const [loading, setLoading] = useState(false);

  const addSection = () => {
    setSections([...sections, { name: '', modules: [{ name: '', file: null }] }]);
  };

  const deleteSection = (sectionIndex: number) => {
    if (sections.length > 1) {
      setSections(sections.filter((_, index) => index !== sectionIndex));
    }
  };

  const addModule = (sectionIndex: number) => {
    setSections(sections.map((section, index) => {
      if (index === sectionIndex) {
        return { ...section, modules: [...section.modules, { name: '', file: null }] };
      }
      return section;
    }));
  };

  const deleteModule = (sectionIndex: number, moduleIndex: number) => {
    setSections(sections.map((section, index) => {
      if (index === sectionIndex && section.modules.length > 1) {
        const updatedModules = section.modules.filter((_, idx) => idx !== moduleIndex);
        return { ...section, modules: updatedModules };
      }
      return section;
    }));
  };

  const uploadFileToCloudinary = async (file: File) => {
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dxmowzzi3/upload';
    const uploadPreset = 'Skilloria';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    let resourceType = 'auto';
    if (file.type.includes('pdf') || file.type.includes('zip') || file.type.includes('text')) {
      resourceType = 'raw';
    } else if (file.type.includes('video')) {
      resourceType = 'video';
    }

    try {
      const response = await axios.post(`${cloudinaryUrl}?resource_type=${resourceType}`, formData)
      return response.data.secure_url;
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      return null;
    }
  };

  const handleFileUpload = async (sectionIndex: number, moduleIndex: number, file: File) => {
    setLoading(true);
    const fileUrl = await uploadFileToCloudinary(file);
    if (fileUrl) {
      setSections(sections.map((section, sIndex) => {
        if (sIndex === sectionIndex) {
          const updatedModules = section.modules.map((module, mIndex) => {
            if (mIndex === moduleIndex) {
              return { ...module, file: fileUrl };
            }
            return module;
          });
          return { ...section, modules: updatedModules };
        }
        return section;
      }));
    }
    setLoading(false);
  };

  const handleInputChange = (
    sectionIndex: number,
    moduleIndex: number,
    field: string,
    value: string
  ) => {
    setSections(sections.map((section, sIndex) => {
      if (sIndex === sectionIndex) {
        if (moduleIndex === -1) {
          return { ...section, name: value };
        }
        const updatedModules = section.modules.map((module, mIndex) => {
          if (mIndex === moduleIndex) {
            return { ...module, [field]: value };
          }
          return module;
        });
        return { ...section, modules: updatedModules };
      }
      return section;
    }));
  };

  const handleSubmit = async () => {
    console.log('Submitted Data:', sections);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/course/addCourse`, {
        author: "rahul", //name
        email : "rahul@gmail.com", // email
        name: "dsa",
        duration: 10,
        thumbnail: 'thumbanil url',
        sections
      })
      console.log('Data sent successfully:', response.data)
    } catch (err) {
      console.log((err as Error).message)
    }
  };

  return (
    <div>
      <h2>Course Form</h2>
      <input type="text" placeholder='Course Name' /> <br /><br />
      <input type="text" placeholder='Course Duration' /> <br /><br />
      thumbnail <input type="file" />

      {loading && <p>Uploading file, please wait...</p>}

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>Section {sectionIndex + 1}</h3>
          <input
            type="text"
            placeholder={`Section ${sectionIndex + 1} Name`}
            value={section.name}
            onChange={(e) => handleInputChange(sectionIndex, -1, 'name', e.target.value)}
          />

          {section.modules.map((module, moduleIndex) => (
            <div key={moduleIndex} style={{ marginTop: '10px' }}>
              <input
                type="text"
                placeholder={`Module ${moduleIndex + 1} Name`}
                value={module.name}
                onChange={(e) => handleInputChange(sectionIndex, moduleIndex, 'name', e.target.value)}
              />
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(sectionIndex, moduleIndex, file);
                }}
                required
              />
              {module.file && (
                <p>
                  Uploaded File: <a href={module.file} target="_blank" rel="noopener noreferrer">View File</a>
                </p>
              )}
              <button
                type="button"
                onClick={() => deleteModule(sectionIndex, moduleIndex)}
                disabled={section.modules.length === 1}
                style={{ marginLeft: '10px' }}
              >
                Delete Module
              </button>
            </div>
          ))}

          <button type="button" onClick={() => addModule(sectionIndex)} style={{ marginTop: '10px' }}>
            Add Module
          </button>
          <button
            type="button"
            onClick={() => deleteSection(sectionIndex)}
            disabled={sections.length === 1}
            style={{ marginLeft: '10px', color: 'red' }}
          >
            Delete Section
          </button>
        </div>
      ))}

      <button type="button" onClick={addSection} style={{ marginTop: '10px' }}>
        Add Section
      </button>

      {sections.some(section => section.modules.length < 1) && (
        <p style={{ color: 'red' }}>Each section must have at least 1 module.</p>
      )}

      <button type="button" onClick={handleSubmit} disabled={loading} style={{ marginTop: '20px' }}>
        Submit
      </button>
    </div>
  );
};

export default CourseForm;
