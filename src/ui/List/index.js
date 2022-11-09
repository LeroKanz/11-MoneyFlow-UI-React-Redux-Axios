import * as S from './styled';

const List = (props) => {
    return (
        <S.Li>
            {props.children}
        </S.Li>
    )
}

export default List;