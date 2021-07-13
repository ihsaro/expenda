import { Layout } from "antd";

const { Header } = Layout;

export function LogonHeader(props) {
  const logonHeaderStyles = {
    backgroundColor: "white",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "40px",
    textAlign: "center",
  };

  return <Header style={logonHeaderStyles}>{props.title}</Header>;
}
