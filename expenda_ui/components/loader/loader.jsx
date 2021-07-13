import { Progress } from "antd";

export function Loader() {
  const loaderStyles = {
    textAlign: "center",
    marginTop: "20%",
    fontFamily: "'Montserrat', sans-serif",
  };

  const loaderProgressStyles = {
    width: "25%",
  };

  return (
    <div style={loaderStyles}>
      <Progress
        percent={100}
        status="active"
        showInfo={false}
        style={loaderProgressStyles}
      />
      <p>Loading!</p>
    </div>
  );
}
