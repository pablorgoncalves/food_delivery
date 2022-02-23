import styled from "styled-components";

export const Container = styled.div`
    background-color: #000;
    color: #fff;
    font-family: 'Rock Salt', cursive;
    padding: 10px;
    box-sizing: border-box;
`;

export const Mobile = styled.div`
    display: block;
    @media(min-width: 800px){
      display: none;
    }
`;

export const Desktop = styled.div`
    display: none;
    @media(min-width: 800px){
      display: flex;
    }
`;

export const Items = styled.div`
    display: flex;
    flex-wrap: wrap;
`;


export const TypesCategory = styled.div`
    display: flex;
    flex-direction: column;
    span{
      margin-bottom: 20px;
      cursor: pointer;
    }
    .colorName{
      color: red;
    }
`;

export const SearchItemCategory = styled.div`
    display: flex;
    align-items:center;
    margin-bottom: 40px;
    span{
      margin-right: 10px;
    }
    input{
      background: #4F5066;
      border-radius: 20px;
      border: 0px;
      height: 20px;
      padding: 5px;
      color: #fff;
    }
`;

export const Product = styled.div`
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 12px;
    height: 9px;
  }
  &::-webkit-scrollbar-track {
    background: grey;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #04000586;
    border-radius: 20px;
  }
`;

export const ProductCarousel = styled.div`
   margin-top:20px;
`;

export const Title = styled.div`
  text-align:center;
  font-size: 30px;
  margin: 10px 0px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
`;

export const MyOrder = styled.div`
  display: flex;
  flex-direction:column;
  align-items: flex-end;
  a{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    margin-top:10px;
    text-decoration:none;
    color: #fff;
  }
  a:hover{
    color: red;
  }
`;

export const UserContainer = styled.div`
  svg{
    margin: 0px 10px;
    width: 30px;
    height: 30px;
    color: #fff;
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const IconsH = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonsMenuOff = styled.div`

    button{
        font-family: Rock Salt;
        font-style: normal;
        font-weight: normal;
        font-size: 10px;
        line-height: 10px;
        background: red;
        border: 0px;
        margin-right:20px;
        padding: 5px;
        color: #fff;
    }
    button:hover{
        background: #000;
        
    }
    .btn-login{
        background: transparent;
        color: #fff;
    }
    .btn-login:hover{
        background: #fff;
        color: #000;
    }
`