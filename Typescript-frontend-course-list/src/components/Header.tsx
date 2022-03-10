const Header = (props: HeaderProps) => {

    return (
        <h1>{props.courseName}</h1>
    )
}

interface HeaderProps {
    courseName: string;
}

export default Header;