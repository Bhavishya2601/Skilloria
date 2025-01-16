import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext.tsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '../components/Loading.tsx';
import { MdOutlineFileUpload, MdDeleteForever } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import p2 from '../assets/p2.png'
import { useLocation } from 'react-router-dom';

interface Module {
  name: string;
  file: string | null;
}

interface Section {
  name: string;
  modules: Module[];
}

const CourseForm: React.FC = () => {
  const navigate = useNavigate()
  const { userData, isLoading } = useUser()
  const [courseDetails, setCourseDetails] = useState({
    name: '',
    duration: '',
    thumbnail: ''
  })
  const [sections, setSections] = useState<Section[]>([
    { name: '', modules: [{ name: '', file: null }] }
  ]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!userData && !isLoading) {
      navigate('/');
    } else if (userData && Object.entries(userData).length === 0 && !isLoading) {
      navigate('/');
    }
  }, [userData, isLoading, navigate]);

  useEffect(() => {
    console.log(courseDetails)
  }, [courseDetails])

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
    if (!userData) {
      console.log('User not found')
      toast.error('User not found')
      return
    }
    console.log('Submitted Data:', sections);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/course/addCourse`, {
        author: userData.name,
        email: userData.email,
        name: courseDetails.name,
        duration: courseDetails.duration,
        thumbnail: courseDetails.thumbnail,
        sections
      })
      console.log('Data sent successfully:', response.data)
    } catch (err) {
      console.log((err as Error).message)
    }
  };

  return (
    <div className='flex justify-around min-h-screen'>
      <div className='h-[calc(100vh-4rem)] w-1/2 flex items-center justify-center'>
        <img src={p2} alt="" className='max-w-full max-h-full' />
      </div>
      <div className='w-1/2 py-10 px-20'>

        <form onSubmit={handleSubmit} className='flex flex-col w-full gap-6 my-10 justify-center font-manrope'>
          <div className='text-5xl font-semibold text-center uppercase font-mono'>Course Form</div>
          <div className="relative">
            <input
              type="text"
              className="peer w-full p-2 pt-6 pb-2 border-2 border-gray-300 bg-transparent rounded-md outline-none focus:border-purple-500 transition-all"
              placeholder=" "
              name='name'
              value={courseDetails.name}
              onChange={(e) => setCourseDetails({ ...courseDetails, name: e.target.value })}
            />
            <label
              className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500 transition-all">
              Course Name
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              className="peer w-full p-2 pt-6 pb-2 border-2 border-gray-300 bg-transparent rounded-md outline-none focus:border-purple-500 transition-all"
              placeholder=" "
              name='duration'
              value={courseDetails.duration}
              onChange={(e) => setCourseDetails({ ...courseDetails, duration: e.target.value })}
            />
            <label
              className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500 transition-all">
              Course Duration
            </label>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='font-semibold uppercase'>
              Upload Thumbnail
            </div>
            <div className={`w-full border-2 border-dotted ${courseDetails.thumbnail ? "border-purple-500" : "border-gray-500"} h-48 rounded-lg flex cursor-pointer flex-col justify-center items-center`} onClick={() => document.getElementById('thumbnail')?.click()}>
              {
                courseDetails.thumbnail ?
                  <div className='w-full h-full'>
                    <img src={courseDetails.thumbnail} alt="thumbnail" className='w-full h-full rounded-lg p-2' />
                  </div> :

                  <div className='flex flex-col justify-center items-center '>
                    <MdOutlineFileUpload className='text-4xl text-black' />
                    <div className='text-gray-500 text-sm'>Upload files(.png, .jpeg, .jpg)</div>
                  </div>
              }
            </div>
            <input
              id='thumbnail'
              accept="image/png, image/jpeg, image/jpg"
              className='hidden'
              type="file"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setLoading(true)
                  const fileUrl = await uploadFileToCloudinary(file)

                  setLoading(false)
                  if (fileUrl) {
                    setCourseDetails({ ...courseDetails, thumbnail: fileUrl })
                  }
                }

              }}
              required
            />
          </div>

          {loading &&
            <div className='z-10 min-h-screen w-full bg-gray-900 bg-opacity-70 fixed top-0 left-0 flex justify-center items-center'>
              <Loading />
            </div>}

          <div className='flex flex-col gap-1'>
            <div className='font-semibold uppercase'>Upload content</div>

            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className='mb-4 p-3 border-[2px] rounded-lg border-[#ccc] flex flex-col gap-3' >
                <div className='flex justify-between items-center'>
                  <div className='text-lg'>Section {sectionIndex + 1}</div>
                  <div className='flex gap-2'>
                    <abbr title='Add New Section' onClick={addSection}><FaPlus className='text-4xl font-bold p-1 border-2 border-[#ccc] rounded-sm hover:text-purple-500 hover:p-[3px] cursor-pointer transition-all duration-300' /></abbr>
                    <abbr title='Delete Section' onClick={sections.length === 1 ? undefined : () => deleteSection(sectionIndex)}><MdDeleteForever className='text-4xl p-1 border-2 border-[#ccc] rounded-sm hover:text-[#ff2121] hover:p-[3px] cursor-pointer transition-all duration-300' /></abbr>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    className="peer w-3/4 p-2 pt-6 pb-2 border-2 border-gray-300 bg-transparent rounded-md outline-none focus:border-purple-500 transition-all"
                    placeholder=" "
                    name='Section Name'
                    value={section.name}
                    onChange={(e) => handleInputChange(sectionIndex, -1, 'name', e.target.value)}
                  />
                  <label
                    className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500 transition-all">
                    Section Name
                  </label>
                </div>

                <div className='flex flex-col gap-1'>
                  <div className='font-medium uppercase'>Add modules</div>

                  {section.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className='mb-2 flex flex-col gap-1'>
                      <div className='flex w-full items-center gap-2'>
                        <div className="relative w-full">
                          <input
                            type="text"
                            className="peer w-full p-2 pt-6 pb-2 border-2 border-gray-300 bg-transparent rounded-md outline-none focus:border-purple-500 transition-all"
                            placeholder=" "
                            name='name'
                            value={module.name}
                            onChange={(e) => handleInputChange(sectionIndex, moduleIndex, 'name', e.target.value)}
                          />
                          <label
                            className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500 transition-all">
                            {`Module ${moduleIndex + 1} Name`}
                          </label>
                        </div>
                        <div className='flex gap-2 h-full'>
                          <abbr title='Add New Module' onClick={() => addModule(sectionIndex)}><FaPlus className='text-4xl font-bold p-1 border-2 border-[#ccc] rounded-sm hover:text-purple-500 hover:p-[3px] cursor-pointer transition-all duration-300' /></abbr>
                          <abbr title='Delete Module' onClick={section.modules.length === 1 ? undefined : () => deleteModule(sectionIndex, moduleIndex)}><MdDeleteForever className='text-4xl p-1 border-2 border-[#ccc] rounded-sm hover:text-[#ff2121] hover:p-[3px] cursor-pointer transition-all duration-300' /></abbr>
                        </div>
                      </div>
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
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>


          {sections.some(section => section.modules.length < 1) && (
            <p style={{ color: 'red' }}>Each section must have at least 1 module.</p>
          )}

          <input type="submit" value="create course" disabled={loading} className='w-full py-3 text-white text-xl font-semibold rounded-lg bg-purple-600 hover:bg-purple-500 uppercase' />
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
