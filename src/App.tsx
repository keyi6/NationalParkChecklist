import React, { useRef } from "react";
import { Checklist } from "./components/Checklist";
import { Screenshot, useScreenshot } from "./components/Screenshot";

export default function App() {
    const checklistRef = useRef<HTMLDivElement>(null);
    const onScreenshot = useScreenshot(checklistRef);

    return (
        <>
            <Screenshot onScreenshot={onScreenshot} />
            <Checklist ref={checklistRef} />
        </>
    );
}
