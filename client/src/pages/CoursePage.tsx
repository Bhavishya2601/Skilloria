import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import Loading from "../components/Loading"
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from "../context/UserContext"

type Module = {
    name: string;
    file: string
}

type Section = {
    name: string;
    modules: Module[]
}

interface Courseinfo {
    name: string;
    duration: number;
    author: string;
    email: string;
    thumbnail: string;
    adminApproved: Boolean;
    enrolledStudents: string[];
    content: Section[]
}

const CoursePage: React.FC = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const {userData, isLoading} = useUser()
    const [courseData, setCourseData] = useState<Courseinfo | null>(null)
    const [loadingContent, setLoadingContent] = useState(true)
    const [openSection, setOpenSection] = useState<number | null>(0)
    const [contentShown, setContentShown] = useState<string>('')

    useEffect(() => {
        if (!userData && !isLoading) {
          navigate('/');
        } else if (userData && Object.entries(userData).length === 0 && !isLoading) {
          navigate('/');
        }
      }, [userData, isLoading, navigate]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoadingContent(true)
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/course/fetchCourse`, {
                    token: id
                })
                setCourseData(response.data)
                setContentShown(response.data.content[0].modules[0].file.toString())
            } catch (err) {
                console.log((err as Error).message)
            } finally{
                setLoadingContent(false)
            }
        }
        fetchCourse()
    }, [])

    const handleOpenModule = (index: number) => {
        setOpenSection(index)
    }

    const handleChangeContent = (module: Module) => {
        setContentShown(module.file)
    }

    const handleDownload = (url: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop() || 'Skilloria';  
        link.click();
    }

    const getFileType = (file: string) => {
        const ext = file.split('.').pop()?.toLowerCase();
        if (ext === 'mp3' || ext === 'mp4') {
            return 'audio';
        } else if (['zip', 'ppt', 'pptx', 'doc', 'docx', 'pdf'].includes(ext || '')) {
            handleDownload(contentShown);
            return 'download';
        } else if (ext === 'png' || ext==='jpg' || ext==='jpeg') {
            return 'image'
        }
        return 'unknown';
    }

    return (
        <>
            {loadingContent ? <Loading /> : (
                courseData &&
                <div className="flex flex-col mdd:flex-row h-[calc(100vh-5rem)] font-manrope">
                    <div className="w-full mdd:w-2/3 flex flex-col shadow-md">
                        <div className="h-auto mdd:h-[70%]">
                            {getFileType(contentShown) === 'audio' ? (
                                <video src={contentShown}
                                    controls
                                    autoPlay
                                    poster='' // add a loading pic or something
                                    className="h-full w-full"
                                />
                            ) : getFileType(contentShown) === 'image' ? (
                                <img src={contentShown} alt="module preview" className="h-full w-full object-contain" />
                            ) : (
                                <div className="h-[70%]">
                                    <div className="h-full w-full flex flex-col justify-center items-center">
                                        <div className="text-4xl font-bold">File Preview Not Available</div>
                                        <div className="text-2xl font-semibold">Please Wait...</div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="h-[30%] p-6 xs:px-10 flex flex-col gap-2">
                            <div className="text-3xl font-medium break-words">{courseData.name}</div>
                            <div>By:  {courseData.author}</div>
                            <div className="flex flex-col xs:flex-row xs:gap-10">
                            <div><span className="font-bold">Total:</span> {courseData.duration} hours</div>
                            <div><span className="font-bold">Enrolled Students:</span> {courseData.enrolledStudents.length}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mdd:w-1/3">
                        {courseData.content.map((content, contentIndex) => {
                            return (
                                <div key={contentIndex} >
                                    <div className="p-5 border-b-2 cursor-pointer font-bold text-xl break-words bg-[#f6f7f9]" onClick={() => handleOpenModule(contentIndex)}>
                                        Section {contentIndex+1}: {content.name}
                                    </div>
                                    <AnimatePresence initial={false}>
                                        {openSection === contentIndex && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                {content.modules.map((module, moduleIndex) => {
                                                    return (
                                                        <div key={moduleIndex} className="p-3 px-5 border-b-2 cursor-pointer text-xl break-words" onClick={() => handleChangeContent(module)}>
                                                            {moduleIndex+1}:&ensp;{module.name}
                                                        </div>
                                                    )
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default CoursePage
