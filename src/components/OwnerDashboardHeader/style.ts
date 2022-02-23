import styled from "styled-components";

interface ContainerProps {
    openMenu: boolean;
}

export const Container = styled.div`
    color: white;
    font-weight: bold;
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #221F1F;
`

export const BoxUser = styled.div`
    border-bottom: 3px solid #000000;
    display: flex;
    align-items: center;
    padding: 20px;
    font-family: sans-serif;
    width: 70%;
    justify-content: center;
    img {
        width: 50px;
        padding-right: 20px;
    }
`

export const ContentCategory = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 25vh;
    text-align: center;
    padding-top: 40px;
`

export const Box = styled.div`
    font-family: 'Rock Salt';
    font-size: 20px;
`

export const ContainerConfig = styled.div<ContainerProps>`
    background: #221F1F;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    display: ${(props) => (props.openMenu ?  "flex" : "none")};
`

export const ContainerBox = styled.div`
    background: #000000;
    display: flex;
    justify-content: space-between;
    color: white;
    font-family: 'Rock Salt', cursive;
    width: 100%;
    height: 60px;
    align-items: center;
    figure{
        img{
            width: 70%;
            cursor: pointer;
        }
    }
    svg{
        width: 60px;
        height: 25px;
    }
    @media(min-width: 920px){
        svg {
            display: none;
        }
    }
`

export const Content = styled.div`
    display: none;
    justify-content: space-around;
    align-items: center;
    h1{
        color: red;
        margin-right:30px;
        :hover{
            cursor: pointer;
        }
    }
    @media(min-width: 920px){
        display: flex;
    }
`

export const ContentConfig = styled.div`
    display: none;
    flex-direction: column;
    margin-right: 30px;
    font-family: sans-serif;
    font-weight: bold;
    justify-content: center;
    span {
        margin-right:20px;
        font-family: 'Rock Salt', cursive;
    }
    
    @media(min-width: 920px){
        display: flex;
        flex-direction:row;
        align-items:center;
        svg{
            display: block;
            height: 30px;
            width: 30px;
            color: #fff;
        }
    }
    
`