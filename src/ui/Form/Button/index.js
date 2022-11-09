import * as S from './styled';

const Button = ({ text, disabled, onClick }) => {

    return (
        <S.Container>
            <S.Button disabled={disabled} onClick={onClick}>
                {text}
            </S.Button>
        </S.Container>
    )
}

export default Button;

