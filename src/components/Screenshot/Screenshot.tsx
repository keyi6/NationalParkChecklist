import React, { useCallback } from "react";
import styled from "styled-components";

const Button = styled.button`
    position: fixed;
    z-index: 100;
    right: 20px;
    top: 20px;
`;

export function Screenshot() {
    const onSave = useCallback(() => {

    }, []);

    return (
        <Button onClick={onSave}>Save as image</Button>
    );
}
