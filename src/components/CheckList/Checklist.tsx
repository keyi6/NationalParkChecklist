import React, { forwardRef, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { IParkInfo, PARK_INFOS } from "./ParkNames";
import { useLocalStorage } from "./useLocalStorage";

const BREAK_POINT = '600px';
const CHECKED_LIST_KEY = "checked_list";

const Wrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;

    & > h1 {
        padding-top: 30px;
        font-size: 1.5rem;
        font-weight: bolder;
    }

    @media (min-width: ${BREAK_POINT}) {
        max-width: 900px;
    }
`;

const Grid = styled.div`
    width: 100%;
    display: grid;
    align-content: space-evenly;
    justify-content: center;
    user-select: none;
    gap: 20px 0;
    grid-template-columns: repeat(4, 1fr);

    @media (min-width: ${BREAK_POINT}) {
        padding: 10px 30px;
        gap: 10px 10px;
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
        height: 60px;
        @media (min-width: ${BREAK_POINT}) {
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

function Item({ parkInfo, onChange, initialSelected }: {
    parkInfo: IParkInfo;
    onChange: (v: boolean) => void;
    initialSelected: boolean;
}) {
    const [selected, setSelected] = useState<boolean>(initialSelected || false);
    useEffect(() => setSelected(!!initialSelected), [initialSelected]);

    const { id, name, state } = parkInfo;
    const filename = useMemo(() => `icons/${id}.jpg`, [id]);

    return (
        <IconWrapper style={{ opacity: selected ? 1 : 0.2 }}
            onClick={() => {
                onChange(!selected);
                setSelected(!selected);
            }}>
            <img src={filename} alt={name} />
            <span>
                <h1>{name}</h1>
                <p>{state}</p>
            </span>
        </IconWrapper>
    );
}

export const Checklist = forwardRef<HTMLDivElement>((_, ref) => {
    const [list, setList] = useLocalStorage<string[]>(CHECKED_LIST_KEY, []);

    return (
        <Wrapper ref={ref}>
            <h1>National Park Checklist</h1>
            <Grid>
                {
                    PARK_INFOS.map((info) => (
                        <Item key={`icon-${info.id}`} parkInfo={info} initialSelected={!!list?.some(x => x === info.id)}
                            onChange={(isSelected) => {
                                if (isSelected) setList(prev => [...(prev || []), info.id]);
                                else setList(prev => [...(prev || []).filter(x => x !== info.id)]);
                            }} />
                    ))
                }
            </Grid>
        </Wrapper>
    )
});
