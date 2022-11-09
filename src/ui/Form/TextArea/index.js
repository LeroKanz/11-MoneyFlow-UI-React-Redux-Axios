import * as S from './styled';

const TextArea = (props) => {
    return (
        <S.TextArea>            
            {props.children}
        </S.TextArea>
    )
}

export default TextArea;