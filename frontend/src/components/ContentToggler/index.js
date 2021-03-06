import React, {useState} from "react";

import './index.css';

const ContentToggler = ({ children, title }) => {
    const [openContent, setOpenContent] = useState(false);

    return (
        <>
            <div className="content-toggle" onClick={() => setOpenContent(!openContent)}>
                <i class="chat outline icon" />
                {title}
                <i class={openContent ? "icon caret down" : "icon caret right"} />
            </div>
            <div className={openContent ? "" : "hidden"}>
                {children}
            </div>
        </>
    )
}

export default ContentToggler;