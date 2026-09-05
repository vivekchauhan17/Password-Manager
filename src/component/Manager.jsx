import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordsArray, setpasswordsArray] = useState([])

    // const getPasswords = async () => {
    //     let req = await fetch("http://localhost:3000/")
    //     let passwords = await req.json()
    //     setpasswordsArray((passwords))
    //     console.log(passwords)
    //     setpasswordsArray(passwords)
    // }


    const getPasswords = async () => {
        const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
        setpasswordsArray(passwords);
    };


    useEffect(() => {
        getPasswords()

    }, [])

    const copyText = (text) => {
        toast("Copied to clipboard", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: {Bounce}, // use the actual component, not a string
        });
        navigator.clipboard.writeText(text);
    };

    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }

    }


    // const savePassword = async () => {


    //     // password form handeling


    //     if (form.site.length < 1) {
    //         toast("Website URL is required!");
    //         return;
    //     }

    //     if (form.username.length <= 3) {
    //         toast("Username must be at least 3 characters!");
    //         return;
    //     }

    //     if (form.password.length <= 3) {
    //         toast("Password must be at least 3 characters!");
    //         return;
    //     }


    //     if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
    //         const newPassword = { ...form, id: uuidv4() }; // generate ONE id, reuse it

    //         // Only delete if you're actually editing an existing entry
    //         if (form.id) {
    //             await fetch("http://localhost:3000/", {
    //                 method: "DELETE",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({ id: form.id })
    //             });
    //         }

    //         await fetch("http://localhost:3000/", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(newPassword)
    //         });

    //         setpasswordsArray([...passwordsArray.filter(p => p.id !== form.id), newPassword]);

    //         setform({ site: "", username: "", password: "", id: "" }); // clear id too!

    //         toast("Password Saved", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, draggable: true, progress: undefined, theme: "dark" });
    //     } else {
    //         toast('Error: Password not saved!');
    //     }
    // }


    const savePassword = () => {
        if (form.site.length < 3 || form.username.length < 3 || form.password.length < 3) {
            toast.error("Please enter valid details");
            return;
        }

        let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

        if (form.id) {
            passwords = passwords.filter(item => item.id !== form.id);
        }

        const newPassword = {
            ...form,
            id: form.id || uuidv4()
        };

        passwords.push(newPassword);

        localStorage.setItem("passwords", JSON.stringify(passwords));

        setpasswordsArray(passwords);

        setform({
            site: "",
            username: "",
            password: ""
        });

        toast.success("Password Saved");
    };


    // const deletePassword = async (id) => {
    //     // console.log("delete password with id", id)
    //     let c = confirm("Do you really want to delete this password")
    //     if (c) {

    //         setpasswordsArray(passwordsArray.filter(item => item.id !== id))
    //         // localStorage.setItem("passwords", JSON.stringify([...passwordsArray.filter(item => item.id !== id)]))
    //         await fetch("http://localhost:3000/", {
    //             method: "DELETE", headers: { "content-Type": "application/json" },
    //             body: JSON.stringify({ id })
    //         })
    //     }
    //     toast("Password deleted!", {
    //         position: "top-right",
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //     });


    // }

    const deletePassword = (id) => {
        let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

        passwords = passwords.filter(item => item.id !== id);

        localStorage.setItem("passwords", JSON.stringify(passwords));

        setpasswordsArray(passwords);

        toast.success("Password Deleted");
    };


    // const editPassword = (id) => {
    //     // console.log("edit password with id", id)
    //     setform({ ...passwordsArray.filter(i => i.id === id)[0], id: id })
    //     setpasswordsArray(passwordsArray.filter(item => item.id !== id))
    // }


    const editPassword = (id) => {
        const password = passwordsArray.find(item => item.id === id);

        setform(password);
    };



    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }

    const onClick = (e) => {

    }

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            // transition= "Bounce" // same fix here
            />


            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_bottom,#8080800a_1px,transparent_1px),linear-gradient(to_right,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div></div>

            <div className=" p-3 md:px-0 md:mycontainer min-h-[86vh] ">
                <h1 className='text-4xl font-bold text-center  '>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>Safe/&gt;</span>
                </h1>
                <p className='text-green-700 text-lg text-center '>Your Own Password Manager</p>


                {/*enter the website url */}


                <div className='flex flex-col p-4 text-black gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type='text' name='site' id='site' />

                    {/* enter the username */}
                    <div className=' md:flex-row flex-col flex w-full justify-between  gap-8'>
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' type='text' name='username' id='username' placeholder='Enter Username' />
                        <div className="relative">

                            {/* enter the password */}

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className="rounded-full border border-green-500 w-full p-4 py-1" type='password' name='password' id='password' />


                            <span className="absolute right-[3px] top-[3px] cursor-pointer " onClick=
                                {showPassword}>
                                <img ref={ref} className='p-1' width={30} src="/icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 gap-2 hover:bg-green-300 rounded-full px-5 py-1.5 w-fit border-green-900 border-2 '>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>Save Password</button>

                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordsArray.length === 0 && <div>No passwords to show</div>}
                    {passwordsArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden ">

                        <thead className='bg-green-800 text-white'>
                            <tr className='py-2 border border-white text-center w-32'>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordsArray.map((item, index) => {
                                return <tr key={index}>


                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>

                                    </td>


                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer ' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>


                                    <td className=' py-2 border border-white text-center'>
                                        <div className=' flex items-center justify-center' ><span>{'*'.repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    {/*edit password */}


                                    <td className=' py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1 ' onClick={() => { editPassword(item.id) }} >
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>

                                        {/* //delete password */}

                                        <span className='cursor-pointer mx-1' onClick={() => deletePassword(item.id)}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>

                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </div >

        </>
    )
}

export default Manager