import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
const API_URL = import.meta.env.VITE_API_URL;

const Manager = () => {
    const ref = useRef(null);
    const passwordRef = useRef(null);

    const [form, setForm] = useState({
        site: "",
        username: "",
        password: "",
        id: "",
    });

    const [passwordsArray, setPasswordsArray] = useState([]);

    // Get authentication token
    const getToken = () => {
        return localStorage.getItem("token");
    };

    // Common headers
    const getHeaders = () => {
        const token = getToken();

        return {
            "Content-Type": "application/json",
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
        };
    };

    // Get all passwords
    //   const getPasswords = async () => {
    //     try {
    //       const response = await fetch("http://localhost:3000/", {
    //         method: "GET",
    //         headers: getHeaders(),
    //       });

    //       if (!response.ok) {
    //         throw new Error(`Server returned ${response.status}`);
    //       }

    //       const passwords = await response.json();

    //       console.log("Passwords:", passwords);

    //       setPasswordsArray(passwords);
    //     } catch (error) {
    //       console.error("Error fetching passwords:", error);
    //       toast.error("Could not load passwords");
    //     }
    //   };

    const getPasswords = async () => {
        const token = getToken();

        // User is not logged in
        if (!token) {
            setPasswordsArray([]);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-store",
            });

            if (response.status === 401) {
                // Token is invalid or expired
                localStorage.removeItem("token");
                setPasswordsArray([]);
                return;
            }

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const passwords = await response.json();

            setPasswordsArray(passwords);
        } catch (error) {
            console.error("GET PASSWORDS ERROR:", error);
            setPasswordsArray([]);
        }
    };


    useEffect(() => {
        const token = getToken();

        if (token) {
            getPasswords();
        } else {
            setPasswordsArray([]);
        }
    }, []);

    // Copy text
    const copyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text);

            toast.success("Copied to clipboard", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
            });
        } catch (error) {
            console.error("Copy error:", error);
            toast.error("Could not copy");
        }
    };

    // Show / hide password
    const showPassword = () => {
        if (!passwordRef.current || !ref.current) return;

        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text";
            ref.current.src = "/icons/eyecross.png";
        } else {
            passwordRef.current.type = "password";
            ref.current.src = "/icons/eye.png";
        }
    };

    // Save password
    const savePassword = async () => {
        // Validate website
        if (form.site.trim().length < 1) {
            toast.error("Website URL is required!");
            return;
        }

        // Validate username
        if (form.username.trim().length < 4) {
            toast.error("Username must be at least 4 characters!");
            return;
        }

        // Validate password
        if (form.password.length < 4) {
            toast.error("Password must be at least 4 characters!");
            return;
        }

        try {
            const id = form.id || uuidv4();

            const passwordData = {
                site: form.site.trim(),
                username: form.username.trim(),
                password: form.password,
                id,
            };

            // If editing an existing password,
            // delete the old record first.
            if (form.id) {
                const deleteResponse = await fetch(`${API_URL}/`, {
                    method: "DELETE",
                    headers: getHeaders(),
                    body: JSON.stringify({
                        id: form.id,
                    }),
                });

                if (!deleteResponse.ok) {
                    throw new Error("Could not update existing password");
                }
            }

            // Save password
            const response = await fetch(`${API_URL}/`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(passwordData),
            });

            if (!response.ok) {
                throw new Error("Password could not be saved");
            }

            // Update UI
            setPasswordsArray((previousPasswords) => {
                const filteredPasswords = previousPasswords.filter(
                    (item) => item.id !== form.id
                );

                return [...filteredPasswords, passwordData];
            });

            // Clear form
            setForm({
                site: "",
                username: "",
                password: "",
                id: "",
            });

            toast.success("Password saved!", {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
            });
        } catch (error) {
            console.error("Save password error:", error);
            toast.error("Password not saved!");
        }
    };


    // Delete password
    const deletePassword = async (id) => {
        const token = getToken();

        // Check if user is logged in
        if (!token) {
            toast.error("Please login first!");
            return;
        }

        const confirmed = window.confirm(
            "Do you really want to delete this password?"
        );

        if (!confirmed) return;

        try {
            const response = await fetch(`${API_URL}/`, {
                method: "DELETE",
                headers: getHeaders(),
                body: JSON.stringify({ id }),
            });

            // Token expired or invalid
            if (response.status === 401) {
                localStorage.removeItem("token");
                setPasswordsArray([]);
                toast.error("Session expired. Please login again!");
                return;
            }

            if (!response.ok) {
                throw new Error("Could not delete password");
            }

            setPasswordsArray((previousPasswords) =>
                previousPasswords.filter((item) => item.id !== id)
            );

            toast.success("Password deleted!", {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
            });
        } catch (error) {
            console.error("Delete password error:", error);
            toast.error("Password could not be deleted");
        }
    };


    // Edit password
    const editPassword = (id) => {
        const password = passwordsArray.find((item) => item.id === id);

        if (!password) return;

        setForm({
            site: password.site,
            username: password.username,
            password: password.password,
            id: password.id,
        });
    };

    // Handle input changes
    const handleChange = (e) => {
        setForm((previousForm) => ({
            ...previousForm,
            [e.target.name]: e.target.value,
        }));
    };

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
            />

            {/* Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_bottom,#8080800a_1px,transparent_1px),linear-gradient(to_right,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="p-3 md:px-0 md:mycontainer min-h-[86vh]">

                {/* Header */}
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-green-500">&lt;</span>
                    Pass
                    <span className="text-green-500">Safe/&gt;</span>
                </h1>

                <p className="text-green-700 text-lg text-center">
                    Your Own Password Manager
                </p>

                {/* Password Form */}
                <div className="flex flex-col p-4 text-black gap-8 items-center">

                    {/* Website */}
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter Website URL"
                        className="rounded-full border border-green-500 w-full p-4 py-1"
                        type="text"
                        name="site"
                        id="site"
                    />

                    {/* Username and Password */}
                    <div className="md:flex-row flex-col flex w-full justify-between gap-8">

                        {/* Username */}
                        <input
                            value={form.username}
                            onChange={handleChange}
                            className="rounded-full border border-green-500 w-full p-4 py-1"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter Username"
                        />

                        {/* Password */}
                        <div className="relative w-full">
                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="rounded-full border border-green-500 w-full p-4 py-1"
                                type="password"
                                name="password"
                                id="password"
                            />

                            <span
                                className="absolute right-[3px] top-[3px] cursor-pointer"
                                onClick={showPassword}
                            >
                                <img
                                    ref={ref}
                                    className="p-1"
                                    width={30}
                                    src="/icons/eye.png"
                                    alt="Show password"
                                />
                            </span>
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={savePassword}
                        className="flex justify-center items-center bg-green-400 gap-2 hover:bg-green-300 rounded-full px-5 py-1.5 w-fit border-green-900 border-2"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        ></lord-icon>

                        {form.id ? "Update Password" : "Save Password"}
                    </button>
                </div>

                {/* Password List */}
                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4">
                        Your Passwords.....
                    </h2>

                    {passwordsArray.length === 0 && (
                        <div>Please Login with Google to see and manage your saved passwords.</div>
                    )}

                    {passwordsArray.length !== 0 && (
                        <table className="table-auto w-full rounded-md overflow-hidden">

                            <thead className="bg-green-800 text-white">
                                <tr className="py-2 border border-white text-center w-32">
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Action</th>
                                </tr>
                            </thead>

                            <tbody className="bg-green-1000">

                                {passwordsArray.map((item) => (
                                    <tr key={item.id}>

                                        {/* Site */}
                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center">

                                                <a
                                                    href={item.site}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {item.site}
                                                </a>

                                                <div
                                                    className="lordiconcopy size-7 cursor-pointer"
                                                    onClick={() => copyText(item.site)}
                                                >
                                                    <lord-icon
                                                        style={{
                                                            width: "25px",
                                                            height: "25px",
                                                            paddingTop: "3px",
                                                            paddingLeft: "3px",
                                                        }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Username */}
                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center">

                                                <span>{item.username}</span>

                                                <div
                                                    className="lordiconcopy size-7 cursor-pointer"
                                                    onClick={() => copyText(item.username)}
                                                >
                                                    <lord-icon
                                                        style={{
                                                            width: "25px",
                                                            height: "25px",
                                                            paddingTop: "3px",
                                                            paddingLeft: "3px",
                                                        }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Password */}
                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center">

                                                <span>
                                                    {"*".repeat(item.password.length)}
                                                </span>

                                                <div
                                                    className="lordiconcopy size-7 cursor-pointer"
                                                    onClick={() => copyText(item.password)}
                                                >
                                                    <lord-icon
                                                        style={{
                                                            width: "25px",
                                                            height: "25px",
                                                            paddingTop: "3px",
                                                            paddingLeft: "3px",
                                                        }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="py-2 border border-white text-center">

                                            {/* Edit */}
                                            <span
                                                className="cursor-pointer mx-1"
                                                onClick={() => editPassword(item.id)}
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{
                                                        width: "25px",
                                                        height: "25px",
                                                    }}
                                                ></lord-icon>
                                            </span>

                                            {/* Delete */}
                                            <span
                                                className="cursor-pointer mx-1"
                                                onClick={() => deletePassword(item.id)}
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{
                                                        width: "25px",
                                                        height: "25px",
                                                    }}
                                                ></lord-icon>
                                            </span>

                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
