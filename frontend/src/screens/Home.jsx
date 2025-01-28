import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user.context';
import axios from '../config/axios.js';
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const { user } = useContext(UserContext) 
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ projectName, setProjectName ] = useState('');
    const [ project, setProject ] = useState([]);

    const navigate = useNavigate();

    function createProject() {
        console.log("Create Project", {projectName});

        axios.post('/projects/create', {
            name: projectName,
        })
        .then((res) => {
            console.log(res);
            setProjectName('');
            setIsModalOpen(false);
        }).catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        
        axios.get('/projects/all').then((res)=>{
            // console.log(res.data);
            setProject(res.data.projects);
        }).catch((err)=>{
            console.log(err);
        })

    }, [])

    return (
        <main className='p-4'>
            <div className='projects flex flex-wrap gap-3'>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="project p-4 border border-slate-300 rounded-md hover:bg-slate-50"
                >New Project
                    <i className="ri-add-large-fill ml-2"></i>   
                </button>

                {
                    project.map((project) => (
                        <div key={project._id}
                            onClick={() => {
                                navigate(`/project`,{
                                    state: { project }
                                })
                            }}
                            className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200">
                            <h2
                                className='font-semibold'
                            >{project.name}</h2>

                            <div className="flex gap-2">
                                <p> <small> <i className="ri-user-line"></i> Collaborators</small> :</p>
                                {project.users.length}
                            </div>

                        </div>
                    ))
                }


            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            createProject();
                        }}>
                            <div className="mb-4">
                                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    id="projectName"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter project name"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Home