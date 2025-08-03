import { useState } from "react";


const useToggle = (initialState: boolean) => {
    const [open, setOpen] = useState(initialState);
    const toggle = () => setOpen(!open);
    return { open, toggle };
}


export default useToggle;


