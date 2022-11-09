import * as S from './styled';

const Card = (props) => {
    return (
        <S.Wrapper>
            {props.children}
        </S.Wrapper>
    )
}

export default Card;