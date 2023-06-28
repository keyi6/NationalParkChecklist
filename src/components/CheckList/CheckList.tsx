import { useState } from "react";
import styled from "styled-components";
import { IParkInfo, PARK_INFOS } from "../ParkNames";

const Wrapper = styled.div`
    height: 100vh;
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
    padding: 0 30px;
    zoom: ${Math.min(window.innerWidth / 700, 1)};
`;

const Grid = styled.div`
    width: 100%;
    display: grid;
    align-content: space-evenly;
    justify-content: center;
    user-select: none;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(9, 70px);
    gap: 24px 30px;
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
    }

    & > span {
        & > * {
            margin: 0;
            text-align: center;
        }

        & > h1 {
            font-size: .6rem;
            font-weight: 500;
        }

        & > p {
            font-size: .4rem;
            font-weight: 200;
        }
    }
`;

function Item(props: {
    filename: string;
    parkInfo: IParkInfo;
    initialSelected?: boolean;
}) {
    const [selected, setSelected] = useState<boolean>(props.initialSelected || false);

    return (
        <IconWrapper style={{ filter: selected ? 'none' : 'opacity(0.2)' }}
            onClick={() => setSelected(!selected)}>
            <img src={`Checklist/${props.filename}.jpg`} alt={props.parkInfo.name} />
            <span>
                <h1>{props.parkInfo.name}</h1>
                <p>{props.parkInfo.state}</p>
            </span>
        </IconWrapper>
    );
}

export function CheckList() {
    return (
        <Wrapper>
            <h1>National Parks Check List</h1>

            <Grid>
                {
                    new Array(9).fill(0).map((_, i) => (
                        new Array(7).fill(0).map((_, j) => (
                            <Item filename={`icon-${i}-${j}`} parkInfo={PARK_INFOS[i * 7 + j]} key={`item-${i}-${j}`} />
                        ))
                    ))
                }
            </Grid>

        </Wrapper>
    );
}
