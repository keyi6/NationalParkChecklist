import React, { forwardRef, useMemo, useState } from "react";
import styled from "styled-components";
import { IParkInfo, PARK_INFOS } from "./ParkNames";

const Wrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    & > h1 { padding-top: 40px; }

    @media (min-width: 768px) {
        max-width: 900px;
    }
`;

const Grid = styled.div`
    width: 100%;
    display: grid;
    align-content: space-evenly;
    justify-content: center;
    user-select: none;
    padding: 10px 30px;
    gap: 20px 0;
    grid-template-columns: repeat(4, 1fr);

    @media (min-width: 768px) {
        padding: 10px 30px;
        gap: 40px 30px;
        grid-template-columns: repeat(7, 1fr);
    }
`;

const IconWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    & > img {
        object-fit: contain;
        width: 100%;
        height: 40px;
        @media (min-width: 768px) {
            height: 80px;
        }
    }

    & > span {
        & > * {
            margin: 0;
            text-align: center;
        }

        & > h1 {
            font-size: .7rem;
            font-weight: 500;
        }

        & > p {
            font-size: .5rem;
            font-weight: 200;
        }
    }
`;

function Item(props: {
    parkInfo: IParkInfo;
    initialSelected?: boolean;
}) {
    const [selected, setSelected] = useState<boolean>(props.initialSelected || false);
    const { name, state } = props.parkInfo;
    const filename = useMemo(() => `icons/${name.replaceAll(' ', '')}.jpg`, [name]);

    return (
        <IconWrapper style={{ opacity: selected ? 1 : 0.2 }}
            onClick={() => setSelected(!selected)}>
            <img src={filename} alt={props.parkInfo.name} />
            <span>
                <h1>{name}</h1>
                <p>{state}</p>
            </span>
        </IconWrapper>
    );
}

export const Checklist = forwardRef<HTMLDivElement>((_, ref) => (
    <Wrapper ref={ref}>
        <h1>National Park Checklist</h1>
        <Grid>
            {
                PARK_INFOS.map((info) => (
                    <Item parkInfo={info} key={`icon-${info.name}`} />
                ))
            }
        </Grid>
    </Wrapper>
));
