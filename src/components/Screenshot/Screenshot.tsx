import React, { useCallback } from "react";
import styled from "styled-components";

const Button = styled.button`
    position: fixed;
    z-index: 100;
    right: 20px;
    top: 20px;
`;

export function Screenshot(props: {
    onScreenshot: () => void;
}) {
    return (
        <Button onClick={props.onScreenshot}>Save as image</Button>
    );
}
