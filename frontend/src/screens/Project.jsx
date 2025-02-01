import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Project = () => {
  const location = useLocation();
  console.log(location);

  const [isSidePanelOpen, setIsSIdePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);

  const users = [
    { id: 1, name: "User One" },
    { id: 2, name: "User Two" },
    { id: 3, name: "User Three" },
    { id: 4, name: "User One" },
    { id: 5, name: "User Two" },
    { id: 6, name: "User Two" },
    { id: 7, name: "User Two" },
    { id: 8, name: "User Two" }
  ]

  const handleUserClick = (id) => {
    setSelectedUserId([ ...selectedUserId, id ])
    // setIsModalOpen(false) 
  }

  return (
    <main className="h-screen w-screen flex">
      
      <section className="left relative flex flex-col h-full min-w-80 bg-slate-300">
        <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-100">

          <button className="flex" onClick={() => setIsModalOpen(true)}>
            <i class="ri-user-add-line mr-2"></i>
            <p>Add collaborate</p>
          </button>

          <button 
          onClick={() => setIsSIdePanelOpen(!isSidePanelOpen)}
          className="p-2">
            <i className="ri-group-fill"></i>
          </button>
        </header>

        <div className="conversation-area flex-grow flex flex-col">
          <div className="message-box p-1 flex-grow flex flex-col gap-2">
            <div className="message max-w-56 flex flex-col p-3 bg-slate-50 w-fit rounded-md">
                <small 
                    className="opacity-60"
                >example@gmail.com</small>
                <p className="text-sm">How are youssssssssssssssssssssssssss ssssssssssssssssssssssssssss ??</p>
            </div>

            <div className="ml-auto message max-w-56 flex flex-col p-3 bg-slate-50 w-fit rounded-md">
                <small 
                    className="opacity-60"
                >example@gmail.com</small>
                <p className="text-sm">How are you aaaaaabbbbbbbbb  ssssssssssssssssssssssssssss??</p>
            </div>

          </div>
          <div className="inputField bg-slate-100 flex items-center justify-left">
            <div>
              <input
                className="p-2 w-[270px] px-5 mr-2 border-none outline-none"
                type="text"
                placeholder="Enter Message"
              />
            </div>
            <div>
              <button className="flex-grow p-1 ml-[3px]">
                {/* <i class="ri-send-plane-fill"></i> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M1.94607 9.31543C1.42353 9.14125 1.4194 8.86022 1.95682 8.68108L21.043 2.31901C21.5715 2.14285 21.8746 2.43866 21.7265 2.95694L16.2733 22.0432C16.1223 22.5716 15.8177 22.59 15.5944 22.0876L11.9999 14L17.9999 6.00005L9.99992 12L1.94607 9.31543Z"></path>
                </svg>{" "}
              </button>
            </div>
          </div>
        </div>

        <div 
        className={`sidePanel flex flex-col gap-2 w-full h-full bg-slate-100 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
        
          <header className="flex justify-end p-2 px-4 bg-slate-300 ">
            <button onClick={() => setIsSIdePanelOpen(!isSidePanelOpen)}>
            <i class="ri-close-large-fill"></i>            
            </button>
          </header>

          <div className="users flex flex-col gap-2">
            <div className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
              
              <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-500">
                <i className="ri-user-fill absolute"></i>
              </div>

              <h1
              className="font-semibold text-lg" 
              >username</h1>

            </div>
          </div>

        </div>



      </section>

      {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className='p-2'>
                                <i className="ri-close-fill"></i>
                            </button>
                        </header>
                        <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                            {users.map(user => (
                                <div key={user.id} className={`user cursor-pointer hover:bg-slate-200 ${selectedUserId.indexOf(user.id) != -1 ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user.id)}>
                                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.name}</h1>
                                </div>
                            ))}
                        </div>
                        <button className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}

    </main>
  );
};

export default Project;
