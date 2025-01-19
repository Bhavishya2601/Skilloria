import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Loading from "../components/Loading"
import { motion, AnimatePresence } from 'framer-motion'

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
    like?: number;
    dislike?: number;
    thumbnail: string;
    adminApproved: Boolean;
    comment?: string[];
    enrolledStudents: string[];
    content: Section[]
}

const CoursePage: React.FC = () => {
    const { id } = useParams()
    const [courseData, setCourseData] = useState<Courseinfo | null>(null)
    const [isloading, setIsLoading] = useState(true)
    const [openSection, setOpenSection] = useState<number | null>(null)
    const [contentShown, setContentShown] = useState<string>('')

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/course/fetchCourse`, {
                    token: id
                })
                setCourseData(response.data)
                console.log(response.data)
                setContentShown(response.data.content[0].modules[0].file.toString())
                setIsLoading(false)
            } catch (err) {
                console.log((err as Error).message)
            }
        }
        fetchCourse()
    }, [])

    const handleOpenModule = (index: number) => {
        setOpenSection(index)
    }

    const handleChangeContent = (module: Module) => {
        console.log(module.file)
        setContentShown(module.file)
    }

    return (
        <>
            {isloading ? <Loading /> : (
                courseData &&
                <div className="flex h-[calc(100vh-5rem)] font-manrope">
                    <div className="w-2/3 flex flex-col">
                        <div className="h-[70%]">
                            <video src={contentShown}
                                controls
                                autoPlay
                                poster='' // add a loading pic or something
                                className="h-full w-full"
                            />
                        </div>
                        <div className="h-[30%] p-3">
                            <div>{courseData.name}</div>
                            <div>{courseData.duration}h</div>
                            <div>like {courseData.like}</div>
                            <div>dislike {courseData.dislike}</div>
                            <div>comment section</div>
                        </div>
                    </div>
                    <div className="w-1/3   ">
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
