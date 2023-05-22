import { TailSpin } from "react-loader-spinner";

export default function LoaderSpinner({wrapperClass = "", radius = "1", height = "80", width = "80"}) {
  return (
    <TailSpin
      height={height}
      width={width}
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius={radius}
      wrapperStyle={{}}
      wrapperClass={wrapperClass}
      visible={true}
    />
  );
}
