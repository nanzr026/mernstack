import React, { useState } from "react";

function MoonForm({ onUserAdded }) {
    const [name, setName] = useState("");
    const [color,setcolor] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;
        if (!color) return;
        try {
            const res = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name,color })
            });
            const newUser = await res.json();
            onUserAdded(newUser);
            setName("");
            setcolor("");
        } catch (err) {
            console.log("Error adding user:", err);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter your Name😊"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /><br></br>
            <input 
                type ="text"
                placeholder="Enter your Favoritecolor😸"
                value ={color}
                onChange ={(e) => setcolor(e.target.value)}
            /><br></br>
            <button type="submit">Add user</button> 
        </form>
    );
}
export default MoonForm;