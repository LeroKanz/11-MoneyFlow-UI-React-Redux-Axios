import * as S from './styled';

const Form = (props) => {
    
    return (
        <S.Form>
            <S.Wrapper> 
            {props.children}
            </S.Wrapper>           
        </S.Form>
    )
}

export default Form;