import * as S from './styled';

const Lable = ({htmlFor, text}) => {
    return (
        <S.Lable htmlFor={htmlFor}>
            {text}
        </S.Lable>
    )
}

export default Lable;