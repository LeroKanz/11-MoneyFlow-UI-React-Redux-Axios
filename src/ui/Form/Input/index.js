import * as S from './styled';

const Input = ({type, id, value, onChange}) => {
    return (
        <S.Input 
        type={type} 
        id={id}
        value={value}
        onChange={onChange}>            
        </S.Input>
    )
}

export default Input;