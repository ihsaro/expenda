export function Footer() {

    const footerStyles = {
        position: "fixed",
        width: "100%",
        bottom: 0,
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "15px",
        padding: "0px 0px 0px 20px",
        borderTop: "1px solid #f0f0f0",
        lineHeight: "46px"
    }

    return (
        <footer style={footerStyles}>
            Built using Django Rest Framework and React JS powered by Ant Design
        </footer>
    )
}