import { useState } from "react";

const usePopup = () => {
    const [open, setOpen] = useState(false);
    const showPopup = () => setOpen(true);
    const hidePopup = () => setOpen(false);
    return [open, showPopup, hidePopup];
}

export default usePopup;