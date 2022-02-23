import { useState } from 'react'
import Header from '../../components/Header'
import PopupWarning from '../../components/PopupWarning'
import ButtonComponent from '../../components/Button'
import {
  Container,
  Title,
  UserContainer,
  HeaderContainer,
  MyOrder,
  IconsH,
  OrderPrice,
  SubTitle,
  Form,
  FormBox,
  ButtonReview,
  ButtonReviewSize,
  Page,
  BottomReview,
  RatingDiv,
  CardProducts,
  DetailsOrderTitle,
} from './style'
import { FaSignOutAlt } from 'react-icons/fa'
import StarIcon from '@mui/icons-material/Star'
import { TextField, Rating } from '@mui/material'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {Link, useHistory, useParams} from "react-router-dom"
import CardProductCart from '../../components/CardProductCart'
import { useRequest } from '../../context/Request/RequestContext'
import {GiShoppingCart} from "react-icons/gi";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../context/Auth/AuthContext'
import { useCart } from '../../context/Cart/CartContext'
import CardProductDetails from '../../components/CardProductDetails'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid red`,
    padding: '0 2px',
    background: "red",
    marginRight: "10px"
  },
}));

interface ReviewCredentials {
  review?: string
  rating?: number
}


function User() {
  const [popupWarning, setPopupWarning] = useState(false)
  const [stars, setStars] = useState<number>(0)
  const {id} = useParams<{id: string | undefined}>();
  const {request, createRating, rating} = useRequest();
  const {accessToken, user, signOut} = useAuth();
  const {cart} = useCart();
  const history = useHistory();
  console.log(rating)
  
  const activePopupWarning = () => {
    setPopupWarning(!popupWarning)
  }

  const formSchema = yup.object().shape({
    review: yup.string().required(),
    rating: yup.number().required("Quantidade de estrelas obrigatória"),
  })

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ReviewCredentials>({
    resolver: yupResolver(formSchema),
  })

  const onSubmitFunction = ({ review, rating }: ReviewCredentials) => {
    createRating({nameUser: user.name, stars: rating, review: review, idRequest: id, userId: Number(request.find((item) => item.id === id)?.user.id)})
  }

  return (
    <Container>
      {popupWarning && (
        <PopupWarning activePopupWarning={activePopupWarning}></PopupWarning>
      )}
      <HeaderContainer>
        <Header></Header>

        <UserContainer>
              <MyOrder>
                    <span>Olá, {user.name}</span>
                    <Link to={"/request"}>Meus Pedidos</Link>
                </MyOrder>
             
                <IconsH>
                    <StyledBadge badgeContent={cart.length} color="secondary">
                        <GiShoppingCart onClick={() => history.push("/cart")}/>
                    </StyledBadge>
                    <FaSignOutAlt onClick={signOut}/>
                </IconsH>
          </UserContainer> 
      </HeaderContainer>
      <Title>Meu pedido</Title>
      <DetailsOrderTitle>
        <SubTitle>Detalhes do pedido:</SubTitle>
        <OrderPrice>Valor da compra: R$ {request.find((item) => item.id === id)?.price.toFixed(2).toString().replace(".", ",")}</OrderPrice>
      </DetailsOrderTitle>
      <Page>
          <CardProducts>
            {
              request.find((item) => item.id === id)?.details.map((itemCard) => (
                <CardProductDetails key={itemCard.id} product={itemCard} />  
              ))
            }
          </CardProducts>
        {
          request.find((item) => item.id === id)?.status === "Finalizado" && 
          rating.filter((item) => item.idRequest === id)?.length === 0 &&      
          <FormBox>
            <Form onSubmit={handleSubmit(onSubmitFunction)}>
              <TextField
                fullWidth
                id='review'
                multiline
                rows={5}
                label='Avaliação'
                error={!!errors.review?.message}
                sx={{
                  backgroundColor: '#4F5066',
                  borderRadius: '15px',
                  fontSize: '2rem',
                  width: '100%',
                  '&:hover': {
                    backgroundColor: '#4F5066',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'white',
                    backgroundColor: '#4F5066',
                    borderRadius: '15px',
                    border: 0,
                  },
                }}
                variant='filled'
                {...register('review')}
              />
              <BottomReview>
                <input
                  type='number'
                  value={stars}
                  hidden
                  readOnly
                  {...register('rating')} 
                />
                <RatingDiv>
                  <Rating
                    value={stars}
                    onChange={(event, newValue) => {
                      if (!!newValue) {
                        setStars(newValue)
                      }
                    }}
                    emptyIcon={
                      <StarIcon
                        style={{
                          opacity: 0.55,
                          color: '#4F5066',
                        }}
                        fontSize='inherit'
                      />
                    }
                  />
                </RatingDiv>

                <ButtonReview>
                  <ButtonReviewSize>
                    <ButtonComponent
                      type='submit'
                      color='true'
                      text={'Enviar'}
                      onClick={() => setValue('rating', stars)}
                    ></ButtonComponent>
                  </ButtonReviewSize>
                </ButtonReview>
              </BottomReview>
            </Form>
          </FormBox>
        }
        {
          request.find((item) => item.id === id)?.status === "Cancelado" &&
          <div className='div-info-cancel'>Seu pedido foi cancelado</div>
        }
      </Page>
    </Container>
  )
}

export default User
